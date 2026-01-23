# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within AssistPro Web, please send an email to seaointeralia@gmail.com. All security vulnerabilities will be promptly addressed.

Please include the following information:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Security Measures Implemented

### Production Security

✅ **Security Headers**
- Strict-Transport-Security (HSTS)
- X-Frame-Options (Clickjacking protection)
- X-Content-Type-Options (MIME-sniffing protection)
- X-XSS-Protection
- Content Security Policy ready
- Referrer-Policy
- Permissions-Policy

✅ **Environment Variables**
- Secure configuration management
- Server-side only variables protected
- .env files in .gitignore

✅ **Dependencies**
- Regular dependency audits
- No production vulnerabilities detected

### Known Issues

⚠️ **Dev Dependencies**
- Some dev-only dependencies have known vulnerabilities (glob in eslint-config-next)
- These do NOT affect production builds
- These are in ESLint tooling only, not in deployed code
- Will be resolved when upgrading to Next.js 15

## Security Best Practices

When contributing or deploying:

1. **Never commit secrets** to the repository
2. **Use environment variables** for sensitive data
3. **Keep dependencies updated** regularly
4. **Run `npm audit`** before deploying
5. **Enable HTTPS** in production
6. **Review security headers** in next.config.js
7. **Validate user input** if forms are added
8. **Implement rate limiting** when adding APIs

## Deployment Security Checklist

Before deploying to production:

- [ ] All environment variables set in hosting platform
- [ ] HTTPS enabled
- [ ] Security headers verified
- [ ] No secrets in codebase
- [ ] Dependencies audited
- [ ] Error messages don't expose sensitive info
- [ ] Analytics configured with privacy in mind
- [ ] CORS properly configured (when API is added)

## Contact

For security concerns: seaointeralia@gmail.com
