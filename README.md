# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

USING PRISMA:

AFTER CHANGES TO SCHEMA:

1. npx prisma migrate dev --name name_of_migration
   Replace name_of_migration with a descriptive name for your migration.

2. npx prisma migrate deploy

VISUAL STUDIO CONFIGURATION (LINTER & FORMATTING):

- to add extensions, Code --> Settings --> Extensions

1. Add Prettier - Code Formatter extension
2. Add ESLint extension
3. Then open 'Command Palette' (View --> Command Palette)
4. Search 'settings.json', and click on 'Preferences: Open Workspace Settings'
5. Make sure your settings.json matches the following:

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnPaste": true,
  "eslint.alwaysShowStatus": true,
  "eslint.validate": ["javascript", "javascriptreact", "vue"]
}

```
