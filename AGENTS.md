# AGENTS.md - Codebase Guide for AI Agents

## Project Overview

**junviglund-cms** is a Sanity CMS content studio for managing blog content. It provides a structured content management interface for posts, authors, and categories with rich text editing capabilities.

**Project ID**: `uy0ayswl`  
**Default Dataset**: `stage` (configurable via `SANITY_DATASET` env var)

---

## Tech Stack

### Core Technologies
- **Sanity CMS v4.10.2** - Headless CMS platform
- **React 19.0.0** - UI framework
- **TypeScript 5.9.3** - Type-safe development
- **Node.js v22 LTS** - Runtime environment

### Key Dependencies
- `@sanity/vision` - GraphQL query tool for Sanity
- `sanity/desk` - Desk tool for content management UI
- `styled-components` - CSS-in-JS styling
- `react-icons` - Icon library

### Development Tools
- **ESLint** - Code linting with `@sanity/eslint-config-studio`
- **Prettier** - Code formatting (semi: false, single quotes, 100 char width)
- **TypeScript** - Strict mode enabled

---

## Project Structure

```
junviglund-cms/
├── schemas/              # Sanity schema definitions
│   ├── index.ts         # Schema registry (exports schemaTypes)
│   ├── post.ts          # Post document schema
│   ├── author.ts        # Author document schema
│   ├── category.ts      # Category document schema
│   └── blockContent.ts  # Rich text block schema
├── static/              # Static assets (currently empty)
├── .devcontainer/       # Dev container configuration
├── sanity.config.ts     # Main Sanity configuration
├── sanity.cli.ts        # Sanity CLI configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── .eslintrc            # ESLint configuration
```

---

## Entry Points

### Main Configuration
**`sanity.config.ts`** - Primary configuration file that:
- Defines project metadata (name, title, projectId, dataset)
- Registers plugins (deskTool, visionTool)
- Imports and registers schema types
- Entry point for Sanity Studio

### CLI Configuration
**`sanity.cli.ts`** - CLI-specific configuration for:
- Project ID and dataset settings
- Used by Sanity CLI commands

### Schema Registry
**`schemas/index.ts`** - Central schema export:
- Aggregates all document and type schemas
- Exports `schemaTypes` array consumed by sanity.config.ts

---

## Content Schema Architecture

### Document Types

#### 1. **Post** (`schemas/post.ts`)
Primary content type for blog posts.

**Fields:**
- `title` (string) - Post title
- `slug` (slug) - URL-friendly identifier (auto-generated from title, max 96 chars)
- `author` (reference) - Reference to Author document
- `mainImage` (image) - Featured image with hotspot support
- `images` (array of images) - Gallery with grid layout
- `categories` (array of references) - Multiple category references
- `publishedAt` (datetime) - Publication timestamp
- `body` (blockContent) - Rich text content

**Preview:** Shows title, author name, and main image

#### 2. **Author** (`schemas/author.ts`)
Author profiles and biographical information.

**Fields:**
- `name` (string) - Author name
- `slug` (slug) - URL-friendly identifier (auto-generated from name)
- `image` (image) - Author photo with hotspot
- `bio` (array of blocks) - Simple rich text bio (normal style only, no lists)

**Preview:** Shows name and image

#### 3. **Category** (`schemas/category.ts`)
Content categorization.

**Fields:**
- `title` (string) - Category name
- `description` (text) - Category description

### Reusable Types

#### **Block Content** (`schemas/blockContent.ts`)
Flexible rich text editor configuration.

**Features:**
- **Styles:** Normal, H1-H4, Blockquote
- **Lists:** Bullet lists
- **Marks:** Strong (bold), Emphasis (italic)
- **Annotations:** URL links with href field
- **Embedded Media:** Images with hotspot support

**Usage:** Referenced as `type: 'blockContent'` in other schemas

---

## Key Patterns & Conventions

### Schema Definition Pattern
All schemas use Sanity's type-safe helpers:
```typescript
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'schemaName',
  title: 'Display Title',
  type: 'document',
  fields: [
    defineField({
      name: 'fieldName',
      title: 'Field Title',
      type: 'fieldType',
    }),
  ],
})
```

### Reference Pattern
Cross-document references use:
```typescript
defineField({
  name: 'author',
  type: 'reference',
  to: {type: 'author'},
})
```

### Image Handling
Images consistently use hotspot for focal point control:
```typescript
defineField({
  name: 'image',
  type: 'image',
  options: {
    hotspot: true,
  },
})
```

### Slug Generation
Slugs auto-generate from source fields:
```typescript
defineField({
  name: 'slug',
  type: 'slug',
  options: {
    source: 'title',
    maxLength: 96,
  },
})
```

---

## Available Scripts

```bash
npm run dev              # Start development server (port 3333)
npm run build            # Build production bundle
npm run deploy           # Deploy studio to Sanity hosting
npm run deploy-graphql   # Deploy GraphQL API
npm run lint             # Lint TypeScript files
npm run lintfix          # Auto-fix linting issues
npm run export           # Export production dataset
npm run import           # Import dataset to stage
```

---

## Development Workflow

### Starting Development
1. Ensure Node.js v22 LTS is installed
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the studio
4. Access studio at the provided URL (typically port 3333)

### Adding New Schema Types
1. Create new schema file in `schemas/` directory
2. Define schema using `defineType` and `defineField`
3. Export default from the file
4. Import and add to `schemaTypes` array in `schemas/index.ts`
5. Restart dev server to see changes

### Modifying Existing Schemas
1. Edit the relevant schema file in `schemas/`
2. Changes hot-reload automatically in dev mode
3. For breaking changes, consider data migration

### Code Style
- **No semicolons** (enforced by Prettier)
- **Single quotes** for strings
- **100 character line width**
- **Strict TypeScript** mode enabled
- Follow `@sanity/eslint-config-studio` rules

---

## Environment Configuration

### Dataset Selection
The active dataset is determined by:
```typescript
dataset: process.env.SANITY_DATASET || 'stage'
```

Set `SANITY_DATASET` environment variable to switch datasets (e.g., `production`, `stage`).

### Dev Container
Project includes dev container configuration with:
- Docker-in-Docker support
- Node.js LTS with nvm
- VSCode extensions: markdownlint, errorlens, Volar

---

## Important Notes

### Data Management
- **Production dataset exports**: Use `npm run export` to backup
- **Stage dataset imports**: Use `npm run import` to restore from backup
- Dataset operations require appropriate Sanity project permissions

### Commented Features
- Google Maps input plugin is commented out in `sanity.config.ts`
- Uncomment and install `@sanity/google-maps-input` if location fields are needed

### TypeScript Configuration
- Target: ES2017
- Strict mode enabled
- JSX preserved (handled by Sanity build)
- Module resolution: Node

---

## Common Tasks

### Adding a New Field to Post Schema
1. Open `schemas/post.ts`
2. Add new `defineField()` to the fields array
3. Save and verify in studio UI

### Creating a New Document Type
1. Create `schemas/newType.ts`
2. Define schema with `defineType()`
3. Add to `schemas/index.ts` schemaTypes array
4. Restart dev server

### Updating Block Content Styles
1. Edit `schemas/blockContent.ts`
2. Modify `styles`, `marks`, or `annotations` arrays
3. Changes apply to all fields using `blockContent` type

### Deploying Changes
1. Run `npm run build` to create production bundle
2. Run `npm run deploy` to deploy to Sanity hosting
3. Verify deployment at your studio URL

---

## Troubleshooting

### Schema Not Appearing
- Verify schema is exported from its file
- Check it's added to `schemaTypes` in `schemas/index.ts`
- Restart dev server

### TypeScript Errors
- Run `npm run lint` to identify issues
- Check `tsconfig.json` includes the file
- Verify all imports use correct paths

### Build Failures
- Clear `.sanity` directory (temporary runtime files)
- Delete `node_modules` and run `npm install`
- Check for TypeScript errors with `npm run lint`

---

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)
- [Sanity Studio Configuration](https://www.sanity.io/docs/configuration)
- [Community Slack](https://slack.sanity.io/)
