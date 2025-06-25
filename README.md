# Creative Coding Dashboard

This is a personal dashboard for managing and showcasing creative coding projects. It allows you to upload, browse, and interact with various generative art and visual coding projects in one unified interface.

## Features

- **Canvas:** Displays active project.
- **Control Panel:** Change parameters of active project.
- **Gallery:** Search the range of existing projects.
- **Screenshot & Fullscreen:** Capture screenshots and toggle fullscreen mode.

## Project Structure

- `/src/components`: Reusable UI components based on Shadcn component library.
- `/src/context`: React context for managing active project state.
- `/src/hooks`: Custom hooks managing controls and state logic.
- `/src/lib`: Helper functions for loading projects and data.
- `/src/projects`: Houses all of the creative coding designs.

## Getting Started

1. Clone the repo
2. Run `npm install` or `yarn` to install dependencies
3. Run `npm run dev` to start the development server
4. Open your browser to the local server address to explore the dashboard

## Testing

- Run `npm run test` to execute unit tests with Jest and React Testing Library.

## Useful bits

### Adding a new control input

- Add new control component folder and file in src/components/Menu/Controls
- Add handle helper function in src/components/Menu/Controls/useControls.ts
- Add component in src/components/Menu/Controls/Controls.tsx
- Add typeguard in src/lib/controlTypeGuards.ts
- Add new type in src/lib/types.ts, and add new type to Control
- Add to randomiseControls in src/context/ActiveProjectContext.tsx

## TOZOS

- Deploy project so you can play on your phone
- Hook project inputs up to keyboard
