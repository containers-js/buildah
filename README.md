# buildah

TypeScript client for [`buildah`](https://github.com/containers/buildah).

## Installation

First, ensure you have installed the `buildah` command-line interface.

Next, install with your preferred package manager:

```shell
$ yarn add @containers/buildah
$ npm install @containers/buildah
$ pnpm add @containers/buildah
```

## Usage

```typescript
import {Buildah} from '@containers/buildah'

const client = new Buildah()

await client.from('library/ubuntu', {...})
```

## License

MIT License, see `LICENSE`
