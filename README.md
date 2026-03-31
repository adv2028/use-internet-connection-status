# useInternetConnectionStatus

A React hook to detect the user's internet connection status.

## How it works

The hook uses the browser's native APIs to detect connectivity:

1. **Initial state**: Reads `navigator.onLine` to get the current connection status
2. **Events**: Listens to the `online` and `offline` events on the global object (`globalThis`)
3. **Synchronization**: When connectivity changes, the state is updated

The hook returns an object with the `online` property (boolean) that indicates whether the user is connected to the internet.

## Requirements

- **Node.js**: >= 22
- **React**: >= 19.2.4

> The hook may work with earlier React versions, but React 19.2.4 is recommended as it includes security patches for [CVE-2025-55184 and CVE-2025-67779](https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components). If your app’s React code does not use a server, your app is not affected by this vulnerability.

## Installation

```bash
bun install
```

### What is `--ignore-scripts`?

During installation, some packages may run post-installation scripts. If you don't need these features or want a faster installation, you can use:

```bash
bun install --ignore-scripts
```

In this project, `--ignore-scripts` is enabled by default for security.

This skips all post-installation scripts. Use it when:
- You only need the JavaScript/TypeScript code
- You want to speed up the installation process
- The scripts are not necessary for your use case

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Install dependencies | `bun install` | Installs all project dependencies |
| Build | `bun run build` | Compiles the project using Rollup |
| Development | `bun run dev` | Compiles in watch mode (automatically recompiles when detecting changes) |

### Build

Generates CommonJS and ES Modules files in the `dist/` folder:

```bash
bun run build
```

### Development (Watch mode)

Automatically compiles whenever changes are detected in the code:

```bash
bun run dev
```

## Project Configuration

This project includes security and best practice configurations in the following files:

### `.npmrc`

Configuration file for npm/bun:

```ini
ignore-scripts = true    # Prevents scripts from running during installation
engine-strict = true    # Fails if Node version doesn't satisfy the engines field in package.json
audit = true            # Reports vulnerabilities in dependencies after installation
min-release-age = 10080 # Prevents installing packages released in the last 7 days
```

### `bunfig.toml`

Bun-specific configuration file:

```toml
[install]
ignoreScripts = true # Prevents scripts from running during installation
audit = true # Reports vulnerabilities in dependencies

minimumReleaseAge = 604800 # Prevents installing packages released in the last 7 days

minimumReleaseAgeExcludes = [] # These packages will bypass the 7-day minimum age requirement
```

### Configuration Explanation

| Configuration | File | What it does |
|--------------|------|--------------|
| `ignore-scripts` | .npmrc, bunfig.toml | Prevents malicious scripts from running during `bun install`. Improves security. |
| `engine-strict` | .npmrc | Requires Node.js version to meet `engines` in package.json (>= 22). Prevents incompatible versions. |
| `audit` | .npmrc, bunfig.toml | After installing, shows a summary of known vulnerabilities in dependencies. |
| `minimumReleaseAge` | .npmrc, bunfig.toml | Prevents installing packages released in the last 7 days. Avoids vulnerabilities in new packages. |
| `minimumReleaseAgeExcludes` | bunfig.toml | Packages that will bypass the 7-day minimum age requirement |

### `.npmignore`

File that specifies which files are excluded from the published npm package:

```
node_modules/       # Dependencies (already included in install)
src/                # Source code (already compiled to dist/)
rollup.config.js    # Build configuration
tsconfig.json       # TypeScript configuration
bunfig.toml         # Bun configuration
.git/               # Git folder
bun.lock            # Bun lock file
*.md                # Documentation (except README)
```

Only published to npm: `dist/`, `package.json`, `README.md` and `README-en.md`.

## React Usage Example

```tsx
import { useInternetConnectionStatus } from 'use-internet-connection-status'

function App() {
  const { online } = useInternetConnectionStatus()

  return (
    <div>
      <h1>Connection Status</h1>
      {online ? (
        <p>✅ You are connected to the internet</p>
      ) : (
        <p>❌ No internet connection</p>
      )}
    </div>
  )
}

export default App
```

### Example with fallback message

```tsx
import { useInternetConnectionStatus } from 'use-internet-connection-status'

function NetworkStatus() {
  const { online } = useInternetConnectionStatus()

  if (!online) {
    return (
      <div style={{ padding: '1rem', backgroundColor: '#fee2e2' }}>
        ⚠️ You have disconnected from the internet. Some features may not be available.
      </div>
    )
  }

  return (
    <div style={{ padding: '1rem', backgroundColor: '#dcfce7' }}>
      🌐 Connected
    </div>
  )
}
```

## API

### Returns

| Property | Type | Description |
|-----------|------|-------------|
| `online` | `boolean` | `true` if there is an internet connection, `false` otherwise |
