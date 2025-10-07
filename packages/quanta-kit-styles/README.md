# quanta-kit-styles

Shared CSS module-based styling library for Quanta Kit design system.

## Usage

1. Install this package in your Angular, React, or Vue project.
2. Import the built CSS in your app entry or component:
   - **Angular**: `@import '~quanta-kit-styles/dist/quanta-kit-styles.css';`
   - **React**: `import 'quanta-kit-styles/dist/quanta-kit-styles.css';`
   - **Vue**: `import 'quanta-kit-styles/dist/quanta-kit-styles.css';`
3. Use the utility classes or CSS variables in your components.
4. For component-specific styles, use the relevant class names (e.g., `.qk-btn`, `.qk-chip`, `.qk-tooltip`).

## Structure

- `src/_tokens.scss`: Design tokens (variables) for the system.
- `src/quanta-kit-styles.module.scss`: Global CSS variables and utility classes.
- `src/components/`: Component-based SCSS modules (e.g., `button.module.scss`, `chip.module.scss`, `tooltip.module.scss`).
- `src/index.scss`: Entry point that imports all component and global styles.

## Development

- Edit tokens in `src/_tokens.scss`.
- Add or update styles in the relevant file in `src/components/` for each component.
- Add or update global utilities in `src/quanta-kit-styles.module.scss`.
- Run `npm run build` to generate distributable CSS.
