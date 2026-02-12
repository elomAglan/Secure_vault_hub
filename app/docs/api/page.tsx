export const metadata = {
  title: 'API Reference - SecureVault Docs',
  description: 'Complete API reference for SecureVault authentication',
}

export default function ApiDocsPage() {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <h1>API Reference</h1>

      <p>
        SecureVault provides a RESTful API for managing authentication and user sessions.
      </p>

      <h2>Authentication</h2>
      <p>
        All API requests require authentication using your secret API key. Include it in the
        Authorization header:
      </p>

      <pre><code className="language-bash">{`curl https://api.securevault.com/v1/users \\
  -H "Authorization: Bearer sk_live_YOUR_SECRET_KEY"`}</code></pre>

      <h2>Base URL</h2>
      <pre><code>https://api.securevault.com/v1</code></pre>

      <h2>Endpoints</h2>

      <h3>Create User</h3>
      <pre><code className="language-bash">{`POST /users

{
  "email": "user@example.com",
  "password": "secure_password",
  "name": "John Doe"
}`}</code></pre>

      <h3>List Users</h3>
      <pre><code className="language-bash">GET /users?limit=10&offset=0</code></pre>

      <h3>Get User</h3>
      <pre><code className="language-bash">GET /users/:userId</code></pre>

      <h3>Update User</h3>
      <pre><code className="language-bash">{`PATCH /users/:userId

{
  "name": "Jane Doe"
}`}</code></pre>

      <h3>Delete User</h3>
      <pre><code className="language-bash">DELETE /users/:userId</code></pre>

      <h2>Error Handling</h2>
      <p>
        The API uses standard HTTP status codes to indicate success or failure:
      </p>
      <ul>
        <li><code>200</code> - Success</li>
        <li><code>400</code> - Bad Request</li>
        <li><code>401</code> - Unauthorized</li>
        <li><code>404</code> - Not Found</li>
        <li><code>500</code> - Server Error</li>
      </ul>

      <h2>Rate Limiting</h2>
      <p>
        API requests are rate-limited to 1000 requests per minute. You can check your remaining
        requests in the response headers.
      </p>

      <h2>Pagination</h2>
      <p>
        List endpoints support pagination using <code>limit</code> and <code>offset</code> query parameters.
      </p>
    </div>
  )
}
