import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

/** Pinned: v2.x exposes search/execute/multi-execute; static deploy is hosting_deploy-static-website */
const HOSTINGER_MCP_VERSION = process.env.HOSTINGER_MCP_VERSION || '2.11.0';
const STATIC_DEPLOY_OPERATION = 'hosting_deploy-static-website';

const archivePath = process.env.DEPLOY_ARCHIVE || 'hospitalarias_astro_dist.zip';
const domain = process.env.HOSTINGER_DOMAIN || 'hospitalarias.in';

if (!process.env.HOSTINGER_API_TOKEN) {
  throw new Error('HOSTINGER_API_TOKEN is required.');
}

if (!existsSync(archivePath)) {
  throw new Error(`Deploy archive not found: ${archivePath}`);
}

const proc = spawn(
  'npx',
  ['--yes', `--package=hostinger-api-mcp@${HOSTINGER_MCP_VERSION}`, 'hostinger-hosting-mcp'],
  {
    env: process.env,
    stdio: ['pipe', 'pipe', 'inherit'],
  },
);

let requestId = 0;

function send(message) {
  proc.stdin.write(`${JSON.stringify(message)}\n`);
}

function readJsonLine(timeoutMs = 60_000) {
  return new Promise((resolve, reject) => {
    let buffer = '';
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('Timed out waiting for Hostinger MCP response.'));
    }, timeoutMs);

    function cleanup() {
      clearTimeout(timer);
      proc.stdout.off('data', onData);
    }

    function onData(chunk) {
      buffer += chunk.toString();
      const newline = buffer.indexOf('\n');
      if (newline === -1) return;
      const line = buffer.slice(0, newline);
      cleanup();
      try {
        resolve(JSON.parse(line));
      } catch (error) {
        reject(error);
      }
    }

    proc.stdout.on('data', onData);
  });
}

function nextId() {
  requestId += 1;
  return requestId;
}

async function callTool(name, arguments_) {
  send({
    jsonrpc: '2.0',
    id: nextId(),
    method: 'tools/call',
    params: { name, arguments: arguments_ },
  });
  const response = await readJsonLine(600_000);
  if (response.error) {
    throw new Error(`MCP error ${response.error.code}: ${response.error.message}`);
  }
  if (response.result?.isError) {
    const text = response.result?.content?.[0]?.text || 'Unknown Hostinger MCP error';
    throw new Error(text);
  }
  return response.result;
}

try {
  send({
    jsonrpc: '2.0',
    id: nextId(),
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'github-actions-hostinger-deploy', version: '2' },
    },
  });
  await readJsonLine();

  send({ jsonrpc: '2.0', method: 'notifications/initialized', params: {} });

  const listResponse = await (async () => {
    send({
      jsonrpc: '2.0',
      id: nextId(),
      method: 'tools/list',
      params: {},
    });
    return readJsonLine();
  })();

  const toolNames = listResponse.result?.tools?.map((t) => t.name) ?? [];
  if (!toolNames.includes('execute')) {
    throw new Error(
      `Unexpected Hostinger MCP surface (hostinger-api-mcp@${HOSTINGER_MCP_VERSION}): ` +
        `expected meta-tool "execute", got [${toolNames.join(', ')}].`,
    );
  }

  const result = await callTool('execute', {
    operation: STATIC_DEPLOY_OPERATION,
    params: {
      domain,
      archivePath,
      removeArchive: true,
    },
  });

  const text = result?.content?.[0]?.text || '';
  const deployResult = text ? JSON.parse(text) : {};
  if (deployResult.upload?.status !== 'success' || deployResult.deploy?.status !== 'success') {
    throw new Error(`Hostinger deploy did not finish successfully: ${JSON.stringify(deployResult)}`);
  }

  console.log(
    `Hostinger deploy accepted for ${domain} via ${STATIC_DEPLOY_OPERATION} (mcp ${HOSTINGER_MCP_VERSION}).`,
  );
} finally {
  proc.kill();
}
