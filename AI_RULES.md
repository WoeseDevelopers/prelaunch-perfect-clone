# AI Rules for This Project

## Tech Stack
- **Framework**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/) for fast development and bundling.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and better developer experience.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- **Components**: [shadcn/ui](https://ui.shadcn.com/) (built on top of Radix UI) for accessible and customizable components.
- **Icons**: [Lucide React](https://lucide.dev/) and [Tabler Icons](https://tabler-icons.io/ (via @tabler/icons-react)) for consistent iconography.
- **Routing**: [React Router](https://reactrouter.com/) for client-side navigation.
- **State Management**: React Hooks (useState, useMemo, useEffect) for local and shared state.
- **Deployment/Execution**: Bun as the package manager and runtime.

## Core Rules & Library Usage

### 1. Component Architecture
- **Location**: Place all reusable components in `src/components/`.
- **Pages**: Define main view components in `src/pages/`.
- **Routing**: Keep all route definitions in `src/App.tsx`.
- **Focused Components**: Keep components small, focused, and well-named.

### 2. Styling Guidelines
- **Tailwind Only**: Use Tailwind CSS classes for all styling. Avoid custom CSS files unless absolutely necessary.
- **Shadcn UI**: Always check if a component can be built using existing `src/components/ui/` components before creating a new one.
- **Responsive Design**: Ensure all features are mobile-responsive using Tailwind's breakpoint prefixes (e.g., `md:`, `lg:`).

### 3. TypeScript Usage
- **Strict Typing**: Avoid using `any`. Define interfaces/types for all component props and data structures.
- **Data Files**: Keep static data and types in `src/data/` or `src/types/`.

### 4. Iconography
- **Primary**: Use `Lucide React` for standard UI icons.
- **Secondary**: Use `@tabler/icons-react` if specific icons are needed that Lucide doesn't provide.

### 5. Code Quality
- **Simplicity**: Do not overengineer. Prioritize readable and maintainable code over "clever" solutions.
- **Verification**: Always run type checks after significant changes.
- **No Placeholders**: Never leave TODOs or partial implementations. Every feature must be fully functional.

### 6. UI/UX Specifics
- **Sticky Elements**: Ensure key navigation or status elements (like "Suas Fichas") are easily accessible, often fixed or sticky as requested.
- **Animations**: Use Tailwind's transition classes or basic CSS animations for smooth UI interactions.
