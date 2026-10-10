# junviglund-cms

Sanity CMS content studio for managing blog content with a structured content model for posts,
authors, and categories.

## Overview

This project provides a headless CMS interface built on Sanity v6, featuring:

- **Post Management** - Blog posts with rich text editing, image galleries, and categorization
- **Author Profiles** - Author information with biographical content and profile images
- **Category System** - Organize content by topic
- **Rich Text Editor** - Flexible block content with headings, lists, links, and embedded images
- **Image Management** - Hotspot support for focal point control and alt text for accessibility

## Tech Stack

- **Sanity CMS** 6.18.0 - Headless CMS platform
- **React** 19.3.0 - UI framework
- **TypeScript** 7.0.2 - Type-safe development
- **Node.js** v24 LTS - Runtime environment
- **Oxlint** - Fast JavaScript and TypeScript linting
- **Oxfmt** - Prettier-compatible code formatting
- **Vite** - Build tooling

## Getting Started

### Prerequisites

- Node.js v24 LTS
- npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The studio will be available at the provided URL (default port 3333).

### Building

Build for production:

```bash
npm run build
```

### Deployment

Deploy to Sanity hosting:

```bash
npm run deploy
```

Deploy GraphQL API:

```bash
npm run deploy-graphql
```

## Project Structure

```text
junviglund-cms/
├── schemas/              # Sanity schema definitions
│   ├── post.ts          # Blog post schema
│   ├── author.ts        # Author profile schema
│   ├── category.ts      # Category schema
│   └── blockContent.ts  # Rich text editor config
├── .github/workflows/   # CI/CD workflows
├── sanity.config.ts     # Main Sanity configuration
└── sanity.cli.ts        # CLI configuration
```

## Content Model

### Post

- Title (required)
- Slug (required, auto-generated)
- Author (reference)
- Main image with alt text
- Image gallery
- Categories (multiple)
- Published date (auto-populated)
- Rich text body

### Author

- Name (required)
- Slug (required, auto-generated)
- Profile image with alt text
- Biography

### Category

- Title (required)
- Description

## Scripts

```bash
npm run dev              # Start development server
npm run build            # Build production bundle
npm run deploy           # Deploy studio to Sanity hosting
npm run deploy-graphql   # Deploy GraphQL API
npm run lint             # Lint TypeScript files
npm run lintfix          # Auto-fix linting issues
npm run typecheck        # Check TypeScript types without emitting files
npm run format           # Format supported files
npm run format:check     # Check formatting without writing files
npm run export           # Export production dataset
npm run import           # Import dataset to stage
```

## Configuration

### Datasets

The active dataset is controlled by the `SANITY_DATASET` environment variable:

```bash
SANITY_DATASET=production npm run dev
```

Default: `stage`

### Project Details

- **Project ID**: `uy0ayswl`
- **Studio URL**: [https://junviglund.sanity.studio](https://junviglund.sanity.studio)

## Development Environment

This project includes:

- **Dev Container** configuration for consistent development environments
- **GitHub Actions** workflows for CI/CD
- **Dependabot** for automated dependency updates
- **Oxlint** and **Oxfmt** for linting and formatting

## License

UNLICENSED - Private project
