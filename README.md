# buildah

TypeScript client for [`buildah`](https://github.com/containers/buildah).

## Installation

First, ensure you have installed the `buildah` command-line interface.

Next, install with your preferred package manager:

```shell
$ yarn add @containers-js/buildah
$ npm install @containers-js/buildah
$ pnpm add @containers-js/buildah
```

## Usage

```typescript
import {Buildah} from '@containers-js/buildah'

const client = new Buildah()

await client.from('library/ubuntu', {...})
```

## License

MIT License, see `LICENSE`
