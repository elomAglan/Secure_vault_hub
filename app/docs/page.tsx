export const metadata = {
  title: 'Getting Started - SecureVault Docs',
  description: 'Get started with SecureVault authentication in minutes',
}

export default function DocsPage() {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <h1>Getting Started with SecureVault</h1>

      <p>
        Welcome to SecureVault! This guide will help you get up and running with our
        authentication platform in just a few minutes.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>A SecureVault account (sign up for free)</li>
        <li>Node.js 14+ or equivalent</li>
        <li>Your favorite web framework (Next.js, React, Vue, etc.)</li>
      </ul>

      <h2>1. Create a Project</h2>
      <p>
        Once you've signed up, create your first project. This will generate API keys that you'll use to authenticate requests.
      </p>

      <h2>2. Install the SDK</h2>
      <pre><code className="language-bash">npm install @securevault/sdk</code></pre>

      <h2>3. Initialize the Client</h2>
      <pre><code className="language-javascript">
{`import { SecureVault } from '@securevault/sdk'

const client = new SecureVault({
  apiKey: process.env.SECUREVAULT_API_KEY,
  projectId: process.env.SECUREVAULT_PROJECT_ID,
})`}
      </code></pre>

      <h2>4. Implement Login</h2>
      <pre><code className="language-javascript">
{`// Create a login session
const session = await client.auth.createSession({
  email: 'user@example.com',
  password: 'secure_password',
})

console.log('Session created:', session.id)`}
      </code></pre>

      <h2>Next Steps</h2>
      <ul>
        <li>Read the API Reference for detailed documentation</li>
        <li>Check out our Integration Guide for framework-specific examples</li>
        <li>Review Security best practices</li>
        <li>Setup Webhooks for event notifications</li>
      </ul>

      <h2>Support</h2>
      <p>
        Need help? Contact our support team at support@securevault.com or visit our community forum.
      </p>
    </div>
  )
}
