# Hospitalarias CMS Guide

## Current Status

The website is a static Astro build deployed to Hostinger. The public site is live, but production editing at `/admin` is intentionally paused until Tina Cloud is connected with secure credentials and a Git-based publishing workflow.

Do not publish Tina Cloud tokens or API keys inside `public/`, `dist/`, or committed source files.

## Safe Editing Flow Now

1. Edit content in `src/content/`.
2. Add images under `public/images/`.
3. Run `npm run build`.
4. Deploy the generated `dist/` folder to Hostinger.

## Local CMS Test

Use this only on a developer machine:

```bash
TINA_CLIENT_ID="..." TINA_ORG="..." TINA_TOKEN="..." npm run dev:cms
```

The Tina config reads credentials from environment variables:

- `TINA_CLIENT_ID`
- `TINA_ORG`
- `TINA_TOKEN`
- `GITHUB_BRANCH`

## Production CMS Setup Checklist

### Step 1: Create Tina Cloud Account

1. Go to https://tina.io
2. Click "Get Started" (it's free!)
3. Sign up with your email address
4. Verify your email

### Step 2: Create a Project

1. After logging in, click "Create Project"
2. Enter project name: `hospitalarias`
3. Connect your GitHub repository: `luisblancofontela/hospitalarias.in`
4. Choose the `main` branch

### Step 3: Invite Team Members

1. Go to Project Settings → Team
2. Click "Invite Member"
3. Enter the email address of each sister who needs access
4. They will receive an email to create their account

### Step 4: Configure Secrets

Set the Tina credentials in the deploy environment, not in source code.

### Step 5: Configure Publishing

Because Hostinger is serving a static upload, edits made in Tina must commit to Git and trigger a new static deploy. Until that pipeline exists, `/admin` should stay as the setup page.

---

## How to Publish a News Article

### Step-by-Step:

1. **Go to** https://hospitalarias.in/admin
2. **Log in** with your email
3. **Click "News"** in the left sidebar
4. **Click the blue "+" button** (top right)
5. **Fill in the form:**

   | Field | What to Enter |
   |-------|---------------|
   | Title | The headline (e.g., "New Rehabilitation Programme Launched") |
   | Publication date | Select today's date |
   | Category | Choose: Campaigns, Vatican, Mission, Community, Events, or General |
   | Cover image | Click "Upload" and select a photo from your computer |
   | Image alt text | Describe the photo (e.g., "Sisters gathered for community prayer") |
   | Short description | 1-2 sentences summarizing the news |
   | Content | Write the full article using the formatting tools |

6. **Click "Save"** (green button, top right)
7. **Wait 1-2 minutes** for the site to update
8. **Visit** https://hospitalarias.in/en/news/ to see your article!

### Tips for Writing:

- **Keep titles short** and clear
- **Use the formatting toolbar** to add **bold**, *italics*, or lists
- **Add line breaks** between paragraphs
- **Upload high-quality photos** (at least 800px wide)
- **Always add alt text** for accessibility

---

## How to Add Photos to the Gallery

1. Go to **Gallery** in the left menu
2. Click **"+"** to add a new photo
3. Fill in:
   - **Title**: Brief title for the photo
   - **Date**: When the photo was taken
   - **Photo**: Upload the image
   - **Caption**: Describe what's happening in the photo
   - **Category**: Therapy, Activities, Community, Culture, Outdoors, or General
4. Click **Save**

---

## How to Update Team Members

1. Go to **Team** in the left menu
2. You'll see a list of current team members
3. To **add** a new member: Click "+" and fill in Name, Role, and Photo
4. To **edit** a member: Click on their name and make changes
5. To **remove** a member: Click the three dots (⋯) and select "Delete"
6. Click **Save**

---

## Frequently Asked Questions

### Q: How long until my article appears on the website?
**A:** About 1-2 minutes. The system needs to rebuild the site after each save.

### Q: Can I edit an article after publishing?
**A:** Yes! Go to News, click on the article, make changes, and save.

### Q: What if I make a mistake?
**A:** You can always go back and edit. The system keeps a history of changes.

### Q: Do I need a special program to use the CMS?
**A:** No! Just a web browser (Chrome, Safari, Firefox, or Edge) on any device.

### Q: Can I use my phone?
**A:** Yes, but a computer is easier for writing longer articles.

### Q: What image size should I use?
**A:** Photos should be at least 800px wide. The system will resize them automatically.

---

## Troubleshooting

### "I can't log in"
- Make sure you're using the email address the admin invited you with
- Check your spam folder for the invitation email
- Contact the administrator to resend the invitation

### "My photo isn't uploading"
- Make sure the file is a JPG, PNG, or GIF
- Try a smaller file size (under 5MB)
- Check your internet connection

### "The site looks different after I saved"
- Wait 2-3 minutes for the rebuild to complete
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- If still broken, contact the technical team

---

## Need Help?

Contact the website administrator for:
- Account issues
- Technical problems
- Training requests

---

*Last updated: July 2026*
