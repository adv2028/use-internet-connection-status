# useInternetConnectionStatus

Un hook de React para detectar el estado de conexión a internet del usuario.

## Cómo funciona

El hook utiliza las APIs nativas del navegador para detectar la conectividad:

1. **Estado inicial**: Lee `navigator.onLine` para obtener el estado actual de conexión
2. **Eventos**: Escucha los eventos `online` y `offline` en el objeto global (`globalThis`)
3. **Sincronización**: Cuando ocurre un cambio en la conectividad, actualiza el estado

El hook retorna un objeto con la propiedad `online` (booleano) que indica si el usuario está conectado a internet.

## Requisitos

- **Node.js**: >= 22
- **React**: >= 19.2.4

> El hook puede funcionar con versiones anteriores de React, pero se recomienda React 19.2.4 ya que incluye parches de seguridad para [CVE-2025-55184 y CVE-2025-67779](https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components). Estas vulnerabilidades solo afectan a los Server Components; si tu aplicación no los utiliza, no te afectarán.

## Instalación

```bash
bun install
```

### ¿Qué es `--ignore-scripts`?

Durante la instalación, algunos paquetes pueden ejecutar scripts post-instalación (como compilar código nativo). Si no necesitas estas funcionalidades o quieres una instalación más rápida, puedes usar:

```bash
bun install --ignore-scripts
```

En este proyecto `--ignore-scripts` está activo por defecto por seguridad.

Esto salta todos los scripts de post-instalación. Úsalo cuando:

- Solo necesitas el código JavaScript/TypeScript
- Quieres acelerar el proceso de instalación
- Los scripts no son necesarios para tu caso de uso

## Scripts disponibles

| Script                | Comando         | Descripción                                                           |
| --------------------- | --------------- | --------------------------------------------------------------------- |
| Instalar dependencias | `bun install`   | Instala todas las dependencias del proyecto                           |
| Build                 | `bun run build` | Compila el proyecto usando Rollup                                     |
| Desarrollo            | `bun run dev`   | Compila en modo watch (recompila automáticamente al detectar cambios) |

### Build

Genera los archivos para CommonJS y ES Modules en la carpeta `dist/`:

```bash
bun run build
```

### Desarrollo (Watch mode)

Compila automáticamente cada vez que detecte cambios en el código:

```bash
bun run dev
```

## Configuración del proyecto

Este proyecto incluye configuraciones de seguridad y buenas prácticas en los siguientes archivos:

### `.npmrc`

Archivo de configuración para npm/bun:

```ini
ignoreScripts = true    # Impide que se ejecuten scripts durante la instalación
engine-strict = true    # Fallará si la versión de Node no satisface el campo engines en package.json
audit = true            # Reporta vulnerabilidades en las dependencias después de instalar
minimumReleaseAge = 10080 # Evita instalar paquetes publicados hace menos de 7 días
```

### `bunfig.toml`

Archivo de configuración específico de Bun:

```toml
[install]
ignoreScripts = true    # Impide que se ejecuten scripts durante la instalación
audit = true            # Reporta vulnerabilidades en las dependencias

[install.engines]
strict = true           # Versión estricta del motor (Node >= 22)

[install.resolution]
minimumReleaseAge = "7d" # Evita instalar paquetes publicados hace menos de 7 días
```

### Explicación de cada configuración

| Configuración       | Archivo             | Qué hace                                                                                                     |
| ------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `ignoreScripts`     | .npmrc, bunfig.toml | Impide que se ejecuten scripts maliciosos durante `bun install`. Mejora la seguridad.                        |
| `engine-strict`     | .npmrc              | Exige que la versión de Node.js cumpla con `engines` en package.json (>= 22). Evita versiones incompatibles. |
| `audit`             | .npmrc, bunfig.toml | Después de instalar, muestra un resumen de vulnerabilidades conocidas en las dependencias.                   |
| `strict`            | bunfig.toml         | Versión estricta del motor para bun (equivalente a engine-strict).                                           |
| `minimumReleaseAge` | .npmrc, bunfig.toml | Evita instalar paquetes publicados hace menos de 7 días. Previene vulnerabilidades en paquetes nuevos.       |

### `.npmignore`

Archivo que especifica qué archivos se excluyen del paquete npm publicado:

```
node_modules/       # Dependencias (ya incluidas en el install)
src/                # Código fuente (ya compilado en dist/)
rollup.config.js    # Configuración de build
tsconfig.json       # Configuración de TypeScript
bunfig.toml         # Configuración de bun
.git/               # Carpeta de git
bun.lock            # Lock file de bun
*.md                # Documentación (excepto README)
```

Solo se publican en npm: `dist/`, `package.json`, `README.md` y `README-en.md`.

## Ejemplo de uso en React

```tsx
import { useInternetConnectionStatus } from 'use-internet-connection-status'

function App() {
  const { online } = useInternetConnectionStatus()

  return (
    <div>
      <h1>Estado de conexión</h1>
      {online ? (
        <p>✅ Estás conectado a internet</p>
      ) : (
        <p>❌ No hay conexión a internet</p>
      )}
    </div>
  )
}

export default App
```

### Ejemplo con mensaje de fallback

```tsx
import { useInternetConnectionStatus } from 'use-internet-connection-status'

function NetworkStatus() {
  const { online } = useInternetConnectionStatus()

  if (!online) {
    return (
      <div style={{ padding: '1rem', backgroundColor: '#fee2e2' }}>
        ⚠️ Te has desconectado de internet. Algunas funciones pueden no estar
        disponibles.
      </div>
    )
  }

  return (
    <div style={{ padding: '1rem', backgroundColor: '#dcfce7' }}>
      🌐 Conectado
    </div>
  )
}
```

## API

### Retorna

| Propiedad | Tipo      | Descripción                                                  |
| --------- | --------- | ------------------------------------------------------------ |
| `online`  | `boolean` | `true` si hay conexión a internet, `false` en caso contrario |
