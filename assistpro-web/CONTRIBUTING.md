# Contributing to AssistPro Web

Thank you for your interest in contributing to AssistPro Web! This document provides guidelines and instructions for contributing.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/judeniba/assistpro-web.git
   cd assistpro-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in the required values in `.env`

4. **Run development server**
   ```bash
   npm run dev
   ```

## Code Quality

### Before Submitting

1. **Run linter**
   ```bash
   npm run lint
   ```

2. **Run tests**
   ```bash
   npm test
   ```

3. **Format code**
   ```bash
   npm run format
   ```

### Code Style

- We use ESLint for linting
- We use Prettier for code formatting
- Follow Next.js best practices
- Write meaningful commit messages

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Add tests for new features
4. Ensure all tests pass
5. Update documentation if needed
6. Submit a pull request

### PR Guidelines

- Keep PRs focused and small
- Write clear PR descriptions
- Reference related issues
- Update the README if needed

## Testing

We use Jest and React Testing Library for testing.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Reporting Issues

When reporting issues, please include:

- Browser and version
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable

## Questions?

Feel free to open an issue for questions or contact the maintainers.
