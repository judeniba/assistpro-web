# Content Security Policy (CSP) Notes

## Current CSP Configuration

The CSP headers in `vercel.json` and `netlify.toml` include `unsafe-inline` and `unsafe-eval` directives.

## Why These Are Needed

This Next.js application requires these directives because:

1. **Next.js Hydration**: Next.js uses inline scripts for client-side hydration
2. **React DevTools**: Development mode uses eval for debugging
3. **Framer Motion**: Animation library may use inline styles
4. **Next.js Script Optimization**: Inlined critical JavaScript for performance

## Security Considerations

While `unsafe-inline` and `unsafe-eval` reduce XSS protection, they are necessary for this application to function. The risk is mitigated by:

- All dependencies are from trusted sources (npm)
- No user-generated content is rendered unsanitized
- Other security headers (X-Frame-Options, X-Content-Type-Options) are in place
- HTTPS is enforced by deployment platforms

## Production Hardening (Optional)

For maximum security, consider:

### 1. Nonce-Based CSP
Implement a nonce-based CSP using Next.js middleware:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { randomBytes } from 'crypto';

export function middleware(request: NextRequest) {
  const nonce = randomBytes(16).toString('base64');
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' data: https:;
    font-src 'self' data:;
    connect-src 'self';
    media-src 'self' blob:;
    object-src 'none';
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
  `.replace(/\s{2,}/g, ' ').trim();

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('x-nonce', nonce);

  return response;
}
```

Then add the nonce to your scripts:
```jsx
// app/layout.tsx
import { headers } from 'next/headers';

export default function RootLayout({ children }) {
  const nonce = headers().get('x-nonce');
  
  return (
    <html>
      <head>
        <script nonce={nonce}>
          // Your inline scripts
        </script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2. Remove Unused Directives

Review and remove CSP directives you don't need based on your actual usage.

### 3. Report-Only Mode

Test stricter CSP rules without breaking the site:

```
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self'; report-uri /api/csp-report
```

## Testing CSP Changes

After modifying CSP:
1. Test all pages and features
2. Check browser console for CSP violations
3. Verify animations and interactions work
4. Test in multiple browsers
5. Use Chrome DevTools → Network → Headers to inspect CSP

## Resources

- [MDN CSP Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Next.js Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [Report URI](https://report-uri.com/)

## Recommendation

**For this landing page project**: The current CSP is appropriate. It provides basic protection while allowing Next.js and React to function normally.

**For high-security applications**: Implement nonce-based CSP with strict-dynamic.
