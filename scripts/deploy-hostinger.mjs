import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

const archivePath = process.env.DEPLOY_ARCHIVE || 'hospitalarias_astro_dist.zip';
const domain = process.env.HOSTINGER_DOMAIN || 'hospitalarias.in';

if (!process.env.HOSTINGER_API_TOKEN) {
  throw new Error('HOSTINGER_API_TOKEN is required.');
}

if (!existsSync(archivePath)) {
  throw new Error(`Deploy archive not found: ${archivePath}`);
}

const proc = spawn('npx', ['--yes', '--package=hostinger-api-mcp@latest', 'hostinger-hosting-mcp'], {
  env: process.env,
  stdio: ['pipe', 'pipe', 'inherit'],
});

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

try {
  send({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'github-actions-hostinger-deploy', version: '1' },
    },
  });
  await readJsonLine();

  send({ jsonrpc: '2.0', method: 'notifications/initialized', params: {} });
  send({
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
      name: 'hosting_deployStaticWebsite',
      arguments: { domain, archivePath },
    },
  });

  const response = await readJsonLine(600_000);
  if (response.error) {
    throw new Error(JSON.stringify(response.error));
  }

  const text = response.result?.content?.[0]?.text || '';
  const deployResult = text ? JSON.parse(text) : {};
  if (deployResult.upload?.status !== 'success' || deployResult.deploy?.status !== 'success') {
    throw new Error(`Hostinger deploy did not finish successfully: ${JSON.stringify(deployResult)}`);
  }

  console.log(`Hostinger deploy accepted for ${domain}.`);
} finally {
  proc.kill();
}
