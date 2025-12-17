# FurFam - Premium Dog Breeds & Pet Care Platform

FurFam is a comprehensive Next.js-based web platform connecting families with premium dog breeds. The platform provides detailed breed information, educational blog content, and administrative tools for managing gallery items.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Functionality](#key-functionality)
- [API Routes](#api-routes)
- [Development](#development)
- [Deployment](#deployment)

## Overview

FurFam is a modern pet adoption and information platform that helps families discover the perfect dog breed for their lifestyle. The platform features:

- Comprehensive breed catalog with detailed information
- Educational blog content about dog care and ownership
- Interactive gallery showcasing available puppies
- Administrative panel for content management
- User authentication system for admin access

## Features

### Public Features

- **Breed Discovery**: Browse dogs by type (Sporting, Working, Herding, Toy, Terrier, Hound) with detailed characteristics, care information, and pricing
- **Blog System**: Read educational articles about dog care, breed selection, and ownership tips
- **Gallery**: View available puppies with detailed information
- **Services**: Learn about puppy matching, health guarantees, training, and grooming services
- **FAQ Section**: Common questions about adoption, care, and services
- **About**: Company mission, values, and history
- **Contact**: Get in touch with the FurFam team

### Admin Features

- **Gallery Management**: Upload, view, and delete gallery items (puppies)
- **User Management**: Create and manage admin user accounts
- **Authentication**: Secure login system for admin access

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Component Library**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React, HugeIcons
- **Markdown**: react-markdown with remark-gfm
- **Analytics**: Vercel Analytics
- **Image Storage**: Cloudinary
- **Fonts**: Google Fonts (Nunito, Fredoka)

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd furfam
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

The application uses the following environment variables:

**Required:**

- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

**Optional:**

- `NEXT_PUBLIC_SITE_URL`: Base URL for the site (defaults to `https://furfam.vercel.app` if not set)

Create a `.env.local` file in the root directory:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cloudinary Configuration (Required)
# Get these from your Cloudinary dashboard: https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Setting up Cloudinary:**

1. Sign up for a free account at [Cloudinary](https://cloudinary.com)
2. Navigate to your [Dashboard](https://cloudinary.com/console)
3. Copy your Cloud Name, API Key, and API Secret
4. Add them to your `.env.local` file

Note: For production deployments, make sure to set these environment variables in your hosting platform (Vercel, etc.).

## Project Structure

```
furfam/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   │   ├── login/
│   │   │   │   ├── logout/
│   │   │   │   ├── me/
│   │   │   │   └── users/    # User management
│   │   │   └── gallery/      # Gallery API endpoints
│   │   ├── admin/            # Admin panel pages
│   │   │   └── gallery/      # Gallery management
│   │   ├── about/            # About page
│   │   ├── blogs/            # Blog listing and individual posts
│   │   ├── breeds/           # Breed browsing pages
│   │   ├── contact/          # Contact page
│   │   ├── faqs/             # FAQ page
│   │   ├── services/         # Services page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components (shadcn/ui)
│   │   └── ...              # Feature-specific components
│   ├── content/             # Content files
│   │   └── blogs/          # Markdown blog posts
│   └── lib/                # Utility functions
│       ├── auth-utils.ts   # Authentication helpers
│       ├── blog-utils.ts   # Blog content parsing
│       ├── breeds-data.ts  # Breed data definitions
│       ├── gallery-storage.ts # Gallery storage utilities
│       └── utils.ts        # General utilities
├── data/                    # Data storage (JSON files)
│   ├── users.json         # User accounts
│   ├── sessions.json      # Active sessions
│   └── gallery.json       # Gallery items
├── public/                 # Static assets
│   └── ...               # Static files (images stored in Cloudinary)
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.js
```

## Key Functionality

### Authentication System

The application uses a file-based authentication system stored in JSON files:

- **Users**: Stored in `data/users.json`
- **Sessions**: Stored in `data/sessions.json`
- **Password Hashing**: SHA-256 with salt
- **Session Management**: Token-based with expiration

To create an admin account, you'll need to either:

1. Use the admin panel's user creation feature (if logged in as an admin)
2. Manually create a user entry in `data/users.json` with a hashed password

### Breed Data

Breed information is defined in `src/lib/breeds-data.ts` as TypeScript objects. Each breed includes:

- Basic information (name, type, size, origin)
- Characteristics (friendliness, energy, trainability, etc.)
- Care information (exercise, grooming, nutrition, training)
- Pricing and availability details
- Fun facts and descriptions

### Blog System

Blog posts are stored as Markdown files in `src/content/blogs/`. The system supports:

- Front matter metadata (title, date, description, etc.)
- GitHub Flavored Markdown (GFM) syntax
- Automatic parsing and rendering
- Individual post pages with clean URLs

### Gallery Management

Gallery items are stored in `data/gallery.json` with images hosted on Cloudinary. The admin panel allows:

- Uploading new gallery items with images (stored in Cloudinary)
- Viewing all gallery items
- Deleting gallery items and their associated images from Cloudinary

Images are uploaded to Cloudinary in the `furfam/gallery` folder and referenced by their Cloudinary URL in the gallery data.

## API Routes

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user session
- `GET /api/auth/users` - List all users (admin only)
- `POST /api/auth/users` - Create new user (admin only)
- `DELETE /api/auth/users/[id]` - Delete user (admin only)

### Gallery

- `GET /api/gallery` - Get all gallery items
- `POST /api/gallery` - Create new gallery item (admin only)
- `DELETE /api/gallery/[id]` - Delete gallery item (admin only)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Data Storage

The application uses file-based storage for simplicity. All data is stored in JSON files within the `data/` directory:

- Data is automatically created when needed
- No database setup required for development
- Suitable for small to medium deployments

For production deployments with higher traffic, consider migrating to a database (PostgreSQL, MongoDB, etc.).

### Adding New Breeds

Edit `src/lib/breeds-data.ts` and add new breed objects following the existing `Breed` interface structure.

### Adding Blog Posts

Create new Markdown files in `src/content/blogs/` with front matter:

```markdown
---
title: "Your Blog Post Title"
date: "2024-01-01"
description: "Post description"
author: "Author Name"
---

Your blog content here...
```

### Styling

The project uses Tailwind CSS 4 with custom configuration. Components are built using shadcn/ui for consistent design patterns.

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel Platform](https://vercel.com):

1. Push your code to a Git repository
2. Import the project in Vercel
3. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:

1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Ensure environment variables are set
4. Ensure the `data/` directory has write permissions

### Production Considerations

- **Data Persistence**: For production, consider migrating from JSON file storage to a database
- **Image Storage**: Images are stored in Cloudinary (configured via environment variables)
- **Authentication**: Consider implementing more robust authentication (OAuth, JWT tokens)
- **Security**: Ensure proper security headers and rate limiting
- **Environment Variables**: Set all required environment variables in your hosting platform:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `NEXT_PUBLIC_SITE_URL` (set to your production domain)

## License

This project is private and proprietary.
