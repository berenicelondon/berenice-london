# 🤝 Contributing to Berenice London

We love your input! We want to make contributing to the Berenice London e-commerce platform as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## 🚀 Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### 📋 Pull Request Process

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## 📝 Any Contributions You Make Will Be Under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## 🐛 Report Bugs Using GitHub's Issues

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/berenicelondon/berenice-london/issues/new?template=bug_report.yml); it's that easy!

### 📋 Write Bug Reports With Detail, Background, and Sample Code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## 💻 Development Setup

### Prerequisites

- Node.js 18.17 or later
- Bun package manager
- Git

### Local Development

```bash
# Clone your fork
git clone https://github.com/your-username/berenice-london.git
cd berenice-london

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
bun dev
```

### 🧪 Testing

```bash
# Run all tests
bun test

# Run linting
bun run lint

# Run type checking
bunx tsc --noEmit

# Format code
bun format
```

## 📐 Code Style

### TypeScript Guidelines

- Use TypeScript for all new code
- Prefer explicit types over `any`
- Use interfaces for object shapes
- Export types alongside implementation

### Code Formatting

- We use Biome for code formatting
- 2 spaces for indentation
- Semicolons are required
- Single quotes for strings
- Trailing commas where supported

### Component Guidelines

- Use functional components with hooks
- Prefer composition over inheritance
- Keep components small and focused
- Use descriptive prop names

### Naming Conventions

- **Files**: kebab-case for files (`user-profile.tsx`)
- **Components**: PascalCase (`UserProfile`)
- **Functions**: camelCase (`getUserData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserData`, `ApiResponse`)

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
│   ├── ui/             # Base UI primitives
│   ├── auth/           # Authentication components
│   ├── shop/           # E-commerce components
│   └── admin/          # Admin panel components
├── lib/                # Utility functions and configurations
├── types/              # TypeScript type definitions
└── styles/             # Global styles and themes
```

## 🔀 Git Workflow

### Branch Naming

- **Feature branches**: `feature/description-of-feature`
- **Bug fixes**: `fix/description-of-bug`
- **Hotfixes**: `hotfix/description-of-hotfix`
- **Documentation**: `docs/description-of-change`

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

#### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

#### Examples

```bash
feat(auth): add two-factor authentication
fix(cart): resolve checkout calculation error
docs(readme): update installation instructions
style(button): improve button hover states
```

## 🎯 Feature Development

### Before Starting

1. Check existing issues to avoid duplication
2. Create an issue to discuss major changes
3. Get approval from maintainers for significant features

### Development Process

1. **Plan**: Break down the feature into small, manageable tasks
2. **Design**: Consider the user experience and technical approach
3. **Implement**: Write code following our guidelines
4. **Test**: Add comprehensive tests
5. **Document**: Update relevant documentation
6. **Review**: Submit a pull request for review

## 🔒 Security

### Reporting Security Vulnerabilities

Please **DO NOT** file a public issue. Instead, send your report privately to [security@berenicelondon.co.uk](mailto:security@berenicelondon.co.uk).

Security reports are greatly appreciated, and we will publicly thank you for it.

### Security Guidelines

- Never commit secrets, API keys, or passwords
- Use environment variables for sensitive configuration
- Validate all user inputs
- Follow OWASP security best practices
- Implement proper authentication and authorization

## 🧪 Testing Guidelines

### Unit Tests

- Test individual functions and components in isolation
- Mock external dependencies
- Aim for high code coverage
- Use descriptive test names

### Integration Tests

- Test component interactions
- Test API endpoints
- Test user workflows

### E2E Tests

- Test critical user journeys
- Test payment flows
- Test authentication flows

## 📖 Documentation

### Code Documentation

- Use JSDoc comments for functions and components
- Document complex logic and algorithms
- Include usage examples for utilities

### API Documentation

- Document all API endpoints
- Include request/response examples
- Document error codes and messages

### User Documentation

- Update README for new features
- Create guides for complex features
- Include screenshots and videos where helpful

## 🏷️ Labels and Issues

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority: high/medium/low`: Priority levels
- `e-commerce`: E-commerce functionality
- `payments`: Payment processing
- `authentication`: User authentication
- `virtual-try-on`: Virtual try-on feature
- `ai-chatbot`: AI chatbot functionality
- `admin-panel`: Admin panel features

## 🎉 Recognition

Contributors who make significant improvements to the project will be:

- Added to the contributors list in the README
- Mentioned in release notes
- Invited to join the core team (for exceptional contributors)

## 📞 Getting Help

### Community Support

- [GitHub Discussions](https://github.com/berenicelondon/berenice-london/discussions) for questions and ideas
- [GitHub Issues](https://github.com/berenicelondon/berenice-london/issues) for bugs and feature requests

### Direct Contact

- Email: [support@berenicelondon.co.uk](mailto:support@berenicelondon.co.uk)
- For security issues: [security@berenicelondon.co.uk](mailto:security@berenicelondon.co.uk)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Thank You!

Your contributions to open source, large or small, make great projects like this possible. Thank you for taking the time to contribute!

---

**Happy coding! 🚀**
