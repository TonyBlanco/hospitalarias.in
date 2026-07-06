import { defineConfig } from 'tinacms';

const branch = process.env.GITHUB_BRANCH || 'main';

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  // Build output
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  schema: {
    collections: [
      // ============================================
      // NEWS
      // ============================================
      {
        label: '📰 News',
        name: 'news',
        path: 'src/content/news',
        format: 'md',
        ui: {
          filename: {
            showExtension: false,
          },
        },
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            label: 'Publication date',
            name: 'date',
            required: true,
            ui: {
              dateFormat: 'YYYY-MM-DD',
            },
          },
          {
            type: 'string',
            label: 'Category',
            name: 'category',
            options: [
              { label: 'Campaigns', value: 'Campaigns' },
              { label: 'Vatican', value: 'Vatican' },
              { label: 'Mission', value: 'Mission' },
              { label: 'Community', value: 'Community' },
              { label: 'Events', value: 'Events' },
              { label: 'General', value: 'General' },
            ],
          },
          {
            type: 'image',
            label: 'Cover image',
            name: 'image',
            required: true,
          },
          {
            type: 'string',
            label: 'Image alt text',
            name: 'imageAlt',
            required: true,
            description: 'Describe the image for accessibility',
          },
          {
            type: 'string',
            label: 'Short description',
            name: 'description',
            ui: {
              component: 'textarea',
            },
            description: 'Appears on the news card in the listing',
          },
          {
            type: 'rich-text',
            label: 'Content',
            name: 'body',
            isBody: true,
          },
        ],
      },
      // ============================================
      // GALLERY
      // ============================================
      {
        label: '🖼️ Gallery',
        name: 'gallery',
        path: 'src/content/gallery',
        format: 'md',
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            label: 'Date',
            name: 'date',
            required: true,
          },
          {
            type: 'image',
            label: 'Photo',
            name: 'image',
            required: true,
          },
          {
            type: 'string',
            label: 'Caption',
            name: 'caption',
            required: true,
          },
          {
            type: 'string',
            label: 'Category',
            name: 'category',
            options: [
              { label: 'Therapy', value: 'Therapy' },
              { label: 'Activities', value: 'Activities' },
              { label: 'Community', value: 'Community' },
              { label: 'Culture', value: 'Culture' },
              { label: 'Outdoors', value: 'Outdoors' },
              { label: 'General', value: 'General' },
            ],
          },
        ],
      },
      // ============================================
      // TEAM
      // ============================================
      {
        label: '👥 Team',
        name: 'team',
        path: 'src/content/settings',
        format: 'json',
        match: {
          include: 'team',
        },
        fields: [
          {
            type: 'object',
            label: 'Team members',
            name: 'members',
            list: true,
            ui: {
              itemProps: (item) => ({
                label: `${item.name || 'New member'} - ${item.role || 'No role'}`,
              }),
            },
            fields: [
              {
                type: 'string',
                label: 'Name',
                name: 'name',
                required: true,
              },
              {
                type: 'string',
                label: 'Role',
                name: 'role',
                options: [
                  { label: 'Sister Hospitaller', value: 'Sister Hospitaller' },
                  { label: 'Social Worker', value: 'Social Worker' },
                  { label: 'Nurse', value: 'Nurse' },
                  { label: 'Driver', value: 'Driver' },
                  { label: 'Team Member', value: 'Team Member' },
                  { label: 'Administrator', value: 'Administrator' },
                  { label: 'Volunteer Coordinator', value: 'Volunteer Coordinator' },
                ],
              },
              {
                type: 'image',
                label: 'Photo',
                name: 'image',
              },
            ],
          },
        ],
      },
      // ============================================
      // SITE SETTINGS
      // ============================================
      {
        label: '⚙️ Settings',
        name: 'site',
        path: 'src/content/settings',
        format: 'json',
        match: {
          include: 'site',
        },
        fields: [
          {
            type: 'string',
            label: 'Centre name',
            name: 'name',
          },
          {
            type: 'string',
            label: 'Website URL',
            name: 'url',
          },
          {
            type: 'string',
            label: 'Description',
            name: 'description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            label: 'Contact email',
            name: 'email',
          },
          {
            type: 'string',
            label: 'Phone',
            name: 'phone',
          },
          {
            type: 'string',
            label: 'Address',
            name: 'address',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'object',
            label: 'Social media',
            name: 'social',
            list: true,
            fields: [
              {
                type: 'string',
                label: 'Name',
                name: 'label',
              },
              {
                type: 'string',
                label: 'Link',
                name: 'href',
              },
            ],
          },
        ],
      },
    ],
  },
});
