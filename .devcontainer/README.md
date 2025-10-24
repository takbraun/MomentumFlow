# Dev Container Configuration

This directory contains the configuration for GitHub Codespaces and VS Code Dev Containers.

## What's Included

- **Node.js 20**: Latest LTS version with npm
- **TypeScript**: Full TypeScript support
- **VS Code Extensions**: Pre-configured extensions for Next.js, React, TypeScript, and Tailwind CSS development
- **Auto-formatting**: Prettier configured to format on save
- **Linting**: ESLint integration with auto-fix on save
- **Port Forwarding**: Automatic forwarding of port 3000 for the Next.js dev server

## Getting Started

### Using GitHub Codespaces

1. Navigate to the repository on GitHub
2. Click the "Code" button
3. Select "Codespaces" tab
4. Click "Create codespace on main" (or your desired branch)
5. Wait for the codespace to build and initialize
6. Once ready, run `npm run dev` to start the development server
7. Access the app at the forwarded port 3000

### Using VS Code Dev Containers (Local)

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) in VS Code
3. Open the repository in VS Code
4. Press `F1` and select "Dev Containers: Reopen in Container"
5. Wait for the container to build
6. Run `npm run dev` to start the development server

## Features

### Pre-installed VS Code Extensions

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Tailwind CSS IntelliSense**: Autocomplete for Tailwind classes
- **ES7+ React/Redux/React-Native snippets**: React code snippets
- **Auto Rename Tag**: Automatically rename paired HTML/JSX tags
- **Path Intellisense**: Autocomplete for file paths
- **Material Icon Theme**: Better file icons

### Automatic Setup

When the container starts:
- Dependencies are automatically installed (`npm install`)
- Welcome message is displayed with usage instructions

## Environment Variables

For Supabase integration (Phase 1), you'll need to create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

See `.env.example` for reference.

## Troubleshooting

### Container fails to build
- Ensure Docker is running
- Check Docker has enough resources allocated (memory/CPU)
- Try rebuilding: "Dev Containers: Rebuild Container"

### Port 3000 is not accessible
- Check the PORTS tab in VS Code
- Ensure the dev server is running (`npm run dev`)
- Try manually forwarding port 3000

### Dependencies not installing
- Manually run `npm install` in the terminal
- Check npm logs for errors
- Ensure package.json is valid

## Customization

To modify the dev container configuration, edit `.devcontainer/devcontainer.json` and rebuild the container.
