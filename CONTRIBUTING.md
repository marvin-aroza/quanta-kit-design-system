# Contributing to QuantaKit Angular

Thank you for your interest in contributing to QuantaKit Angular! This is a modern Angular UI component library built for scale, featuring atomic design principles, blazing performance, and WCAG accessibility. This guide will help you get started with contributing to our component library.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Submitting Changes](#submitting-changes)
4. [Getting Help](#getting-help)
5. [Code of Conduct](#code-of-conduct)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 22 or higher)
- **npm** (comes with Node.js)
- **Git**

### Cloning the Repository

1. Clone the repository directly to your local machine:

```bash
git clone https://github.com/marvin-aroza/quanta-kit-angular.git
cd quanta-kit-angular
```

### Setting Up the Development Environment

1. **Install Dependencies**

```bash
npm install
```

2. **Environment Configuration**

Currently, this project doesn't require specific environment variables. If any are needed in the future, they will be documented here.

3. **Running Storybook (Recommended for Development)**

```bash
npm run storybook
```

This will start Storybook at `http://localhost:6006`. Storybook provides an isolated environment for developing and testing UI components, making it the preferred way to work with the component library.

4. **Alternative: Running the Angular Development Server**

```bash
npm start
```

This will start the Angular development server at `http://localhost:4200`. However, for component library development, Storybook is recommended.

5. **Running Tests**

```bash
# Run tests once
npm test

# Run Storybook tests
npm run test-storybook
```

6. **Building the Library**

```bash
# Build the component library
npm run build

# Build Storybook for production
npm run build-storybook

# Build and watch for changes
npm run watch
```

## Development Workflow

### Code Style and Best Practices

#### Angular Library Conventions
- Follow the [Angular Style Guide](https://angular.io/guide/styleguide)
- Follow [Angular Library Best Practices](https://angular.io/guide/creating-libraries)
- Use TypeScript strict mode
- Implement proper component lifecycle management
- Use reactive programming patterns with RxJS

#### Component Library Guidelines
- Follow atomic design principles (atoms, molecules, organisms)
- Ensure all components are reusable and composable
- Implement proper accessibility (WCAG) standards
- Design components to be framework-agnostic for future Web Components migration
- Maintain consistent API patterns across all components
- Write comprehensive Storybook stories for each component variant
- Include interactive controls (args) in Storybook stories
- Document component props, events, and slots thoroughly

#### Code Formatting
- The project uses Prettier for code formatting
- Configuration is included in `package.json`
- Code will be automatically formatted on commit using Husky hooks

#### Testing Guidelines
- Write unit tests for all components and services
- Create comprehensive Storybook tests for component interactions
- Test accessibility compliance for all components
- Maintain or improve code coverage
- Use Angular Testing Utilities and Jasmine/Karma
- Test files should be named `*.spec.ts`

#### Storybook Standards
- Create stories for all component variants and states
- Include comprehensive documentation in story descriptions
- Use Storybook controls for interactive component testing
- Organize stories logically within the component hierarchy
- Include examples of common usage patterns
- Test responsive behavior across different viewports

### Branch Naming Convention

Create branches using the following format:

```
<type>/<ticket-number>-<brief-description>
```

**Examples:**
- `feat/qka123-button-component`
- `fix/qka456-dropdown-accessibility-issue`
- `docs/qka789-storybook-documentation-update`

**Types:**
- `feat` - New components or features
- `fix` - Bug fixes in components
- `docs` - Documentation or Storybook updates
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

## Submitting Changes

### Commit Message Format

Follow the conventional commit format:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Structure:**
- **type**: The type of change (feat, fix, docs, style, refactor, test, chore)
- **scope**: The ticket number (e.g., QKA123)
- **description**: A brief description of the change

**Examples:**
```
feat(QKA123): add button component with variants

fix(QKA456): resolve dropdown keyboard navigation issue

docs(QKA789): update button component storybook documentation

style(QKA101): format components according to prettier rules

refactor(QKA202): optimize component bundle size

test(QKA303): add accessibility tests for form components
```

### Pull Request Process

1. **Pull latest changes** (ensure you're working with the latest code from the default `main` branch):
```bash
git checkout main
git pull origin main
```

2. **Create and switch to your feature branch**:
```bash
git checkout -b feat/qka123-your-feature-description
```

3. **Make your changes and commit**:
```bash
git add .
git commit -m "feat(QKA123): add your feature description"
```

4. **Push to the repository**:
```bash
git push --set-upstream origin feat/qka123-your-feature-description
```

5. **Create a Pull Request**:
   - Navigate to the repository on GitHub
   - Click "New Pull Request"
   - Select your branch and target the `main` branch (default branch)
   - Fill out the PR template with the required information

### Pull Request Requirements

Your PR description should include:

1. **Task Description**: What component or feature does this PR add/modify?
2. **Changes Made**: List the key changes to components or library structure
3. **Testing**: How was this tested? Include Storybook story testing
4. **Storybook Screenshots**: Screenshots of new/updated component stories
5. **Accessibility**: How accessibility was tested and ensured
6. **Breaking Changes**: Note any breaking changes to component APIs
7. **Related Issues**: Reference any related issues or tickets

**PR Title Format:**
```
[QKA123] Brief description of the change
```

**Example PR Description:**
```markdown
## Task Description
Adds a new Button component with multiple variants, sizes, and states to the QuantaKit library.

## Changes Made
- Created Button component with primary, secondary, and ghost variants
- Implemented different sizes (small, medium, large)
- Added disabled and loading states
- Created comprehensive Storybook stories with interactive controls
- Added accessibility features (ARIA labels, keyboard navigation)
- Included unit tests for all component functionality

## Testing
- All unit tests pass
- Storybook stories created and tested for all variants
- Accessibility tested with screen readers
- Keyboard navigation verified
- Responsive behavior confirmed across viewports

## Storybook Screenshots
[Include screenshots of the component stories]

## Accessibility
- ARIA labels implemented
- Keyboard navigation support
- Color contrast compliance verified
- Screen reader compatibility tested

## Related Issues
Closes #QKA123
```

### Review Process

1. All PRs require at least one approval from a maintainer
2. All tests must pass (unit tests and Storybook tests)
3. Storybook stories must be comprehensive and functional
4. Accessibility standards must be met
5. Code coverage should not decrease
6. Follow-up on any requested changes promptly

## Getting Help

### Documentation
- [Angular Documentation](https://angular.io/docs)
- [Angular Library Guide](https://angular.io/guide/creating-libraries)
- [Storybook Documentation](https://storybook.js.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Project README](./README.md)

### Community Support
- Create an issue for bugs, component requests, or feature requests
- Join discussions in existing issues
- Reach out to maintainers for guidance on component design patterns

### Reporting Issues
When reporting issues, please include:
- Angular version
- Node.js version
- Browser and version
- Component affected
- Steps to reproduce the issue
- Expected vs actual behavior
- Storybook story demonstrating the issue
- Console errors (if any)

### Component Requests
When requesting new components:
- Describe the component's purpose and use cases
- Provide design specifications or mockups
- List required props, events, and variants
- Reference similar components in other libraries
- Consider accessibility requirements from the start

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Standards

Examples of behavior that contributes to creating a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community and component library quality
- Showing empathy towards other community members
- Providing helpful and constructive feedback on component designs
- Prioritizing accessibility and inclusive design

Examples of unacceptable behavior include:

- The use of sexualized language or imagery
- Personal attacks or insulting/derogatory comments
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Project maintainers are responsible for clarifying standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Project maintainers have the right to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned with this Code of Conduct.

### Reporting

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.

---

Thank you for contributing to QuantaKit Angular! Your contributions help build a better, more accessible, and scalable component library for the Angular community. 🚀⚛️
