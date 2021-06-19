import {booleanFlag, Command, stringArrayFlag, stringFlag} from './Command'

export interface PullOptions {
  /**
   * All tagged images in the repository will be pulled.
   */
  allTags?: boolean

  /**
   * Set the ARCH of the image to be pulled to the provided value instead of using the architecture of the host. (Examples: aarch64, arm, i686, ppc64le, s390x, x86_64)
   */
  arch?: string

  /**
   * Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json`. If `XDG_RUNTIME_DIR` is not set, the default is `/run/containers/$UID/auth.json`. This file is created using using `buildah login`.
   *
   * If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using `docker login`.
   *
   * **Note:** You can also override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable.
   *
   * ```shell
   * export REGISTRY_AUTH_FILE=path
   * ```
   */
  authfile?: string
  blobCache?: string

  /**
   * Use certificates at specified path (`*.crt`, `*.cert`, `*.key`) to connect to the registry. The default certificates directory is `/etc/containers/certs.d`.
   */
  certDir?: string

  /**
   * The `[username[:password]]` to use to authenticate with the registry if required. If one or both values are not supplied, a command line prompt will appear and the value can be entered. The password is entered without echo.
   */
  creds?: string

  /**
   * The `[key[:passphrase]]` to be used for decryption of images. Key can point to keys and/or certificates. Decryption will be tried with all keys. If the key is protected by a passphrase, it is required to be passed in the argument and omitted otherwise.
   */
  decryptionKeys?: string[]

  /**
   * Set the OS of the image to be pulled to the provided value instead of using the current operating system of the host.
   */
  os?: string

  /**
   * Pull image policy. The default is `missing`.
   *
   * * `missing` attempt to pull the latest image from the registries listed in registries.conf if a local image does not exist. Raise an error if the image is not in any listed registry and is not present locally.
   * * `always` Pull the image from the first registry it is found in as listed in registries.conf. Raise an error if not found in the registries, even if the image is present locally.
   * * `never` do not pull the image from the registry, use only the local version. Raise an error if the image is not present locally.
   *
   * @default 'missing'
   */
  pullPolicy?: string

  /**
   * If an image needs to be pulled from the registry, suppress progress output.
   */
  quiet?: boolean

  /**
   * Don't copy signatures when pulling images.
   */
  removeSignatures?: boolean
  signaturePolicy?: string

  /**
   * Require HTTPS and verification of certificates when talking to container registries (defaults to true). TLS verification cannot be used when talking to an insecure registry.
   */
  tlsVerify?: boolean

  /**
   * Set the architecture variant of the image to be pulled.
   */
  variant?: string
}

export class PullCommand extends Command<PullOptions> {
  name = 'pull'
  flags = {
    allTags: booleanFlag('--all-tags'),
    authfile: stringFlag('--authfile'),
    blobCache: stringFlag('--blob-cache'),
    certDir: stringFlag('--cert-dir'),
    creds: stringFlag('--creds'),
    pullPolicy: stringFlag('--policy'),
    removeSignatures: booleanFlag('--remove-signatures'),
    signaturePolicy: stringFlag('--signature-policy'),
    decryptionKeys: stringArrayFlag('--decryption-key'),
    quiet: booleanFlag('--quiet'),
    os: stringFlag('--os'),
    arch: stringFlag('--arch'),
    variant: stringFlag('--variant'),
    tlsVerify: booleanFlag('--tls-verify'),
  }
}
