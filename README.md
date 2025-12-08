# Chiropractic Admin Panel

Chiropractic Admin Panel is a web-based admin panel built using **Nuxt 3** and **Vue 3** with **TypeScript**. It leverages **Prisma ORM** for database management, **Vuetify** for UI components, and various other modern web development tools. The project includes authentication via **Google OAuth** and utilizes **Firebase** for storing sensitive user credentials.

## Tech Stack

- **Frontend:** Nuxt 3 (Vue 3, TypeScript)
- **UI Framework:** Vuetify
- **Database:** PostgreSQL (managed via Prisma ORM)
- **Authentication:** Google OAuth
- **Hosting:**
  - Nuxt app hosted on **Vercel**
  - Database hosted on **Heroku**
  - Export service hosted on **Fly.io** (Node.js based)
- **Linting & Formatting:** ESLint, Prettier

## Setup

Ensure you have **Node.js** and **yarn/npm/pnpm** installed.

### Install Dependencies

```bash
yarn install  # Using Yarn
npm install   # Using npm
pnpm install  # Using pnpm
```

### Environment Variables

Create a `.env` file at the root of the project and configure it using the `.env.sample` provided.

## Development

### Start the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:3000**.

## Production

### Build the Application

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

For more details, refer to the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## Database Management (Prisma ORM)

When making schema changes, run the following commands:

1. Create a new migration:

   ```bash
   npx prisma migrate dev --name name_of_migration
   ```

   Replace `name_of_migration` with a descriptive name.

2. Deploy migrations:

   ```bash
   npx prisma migrate deploy
   ```

3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

## Code Linting & Formatting

Ensure a consistent coding style with **ESLint** and **Prettier**.

### Visual Studio Code Configuration

Install the following extensions:

- **Prettier - Code Formatter**
- **ESLint**

Then, configure `settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnPaste": true,
  "eslint.alwaysShowStatus": true,
  "eslint.validate": ["javascript", "javascriptreact", "vue"]
}
```

### Run Linting

```bash
npm run lint
```

To auto-fix linting issues:

```bash
npm run lintfix
```

## Export Service

The export service is a **Node.js** application that handles data exports and runs separately on **Fly.io**.

## Deprecations

- **TypeORM** is included but **deprecated** in favor of Prisma ORM.

## Scripts

Below are key scripts available in `package.json`:

```json
{
  "scripts": {
    "prepare": "husky install",
    "build": "prisma generate && nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare",
    "lint:js": "eslint --ext \".ts,.vue\" --ignore-path .gitignore .",
    "lint:prettier": "prettier --check .",
    "lint": "npm run lint:js && npm run lint:prettier",
    "lintfix": "prettier --write --list-different . && npm run lint:js --fix"
  }
}
```

## Contribution Guidelines

1. **Branch Naming**: Use descriptive branch names like `feature/add-dashboard` or `bugfix/fix-login`.
2. **Commits**: Follow conventional commit messages.
3. **Pull Requests**: Always open a PR before merging into `main`.
4. **Code Reviews**: Ensure code is reviewed before merging.

## License

This project is licensed under the MIT License.
