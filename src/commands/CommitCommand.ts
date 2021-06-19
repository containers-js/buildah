import {booleanFlag, Command, numberArrayFlag, numberFlag, stringArrayFlag, stringFlag} from './Command'

export interface CommitOptions {
  image?: string

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
   * The `[protocol:keyfile]` specifies the encryption protocol, which can be JWE (RFC7516), PGP (RFC4880), and PKCS7 (RFC2315) and the key material required for image encryption. For instance, `jwe:/path/to/key.pem` or `pgp:admin@example.com` or `pkcs7:/path/to/x509-file`.
   */
  encryptionKeys?: string[]

  /**
   * Layer(s) to encrypt: 0-indexed layer indices with support for negative indexing (e.g. 0 is the first layer, -1 is the last layer). If not defined, will encrypt all layers if encryption-key flag is specified.
   */
  encryptLayers?: number[]

  /**
   * Use certificates at specified path (`*.crt`, `*.cert`, `*.key`) to connect to the registry. The default certificates directory is `/etc/containers/certs.d`.
   */
  certDir?: string

  /**
   * The `[username[:password]]` to use to authenticate with the registry if required. If one or both values are not supplied, a command line prompt will appear and the value can be entered. The password is entered without echo.
   */
  creds?: string

  /**
   * The `[username[:password]]` to use to authenticate with the registry if required. If one or both values are not supplied, a command line prompt will appear and the value can be entered. The password is entered without echo.
   */
  disableCompression?: boolean

  /**
   * Control the format for the built image's manifest and configuration data. Recognized formats include `oci` (OCI image-spec v1.0, the default) and `docker` (version 2, using schema format 2 for the manifest).
   *
   * **Note:** You can also override the default format by setting the `BUILDAH_FORMAT` environment variable.
   *
   * ```shell
   * export BUILDAH_FORMAT=docker
   * ```
   */
  format?: string

  /**
   * Name of the manifest list to which the image will be added. Creates the manifest list if it does not exist. This option is useful for building multi architecture images.
   */
  manifest?: string

  /**
   * Write the image ID to the file.
   */
  iidfile?: string

  omitTimestamp?: boolean

  /**
   * Set the create timestamp to seconds since epoch to allow for deterministic builds (defaults to current time). By default, the created timestamp is changed and written into the image manifest with every commit, causing the image's sha256 hash to be different even if the sources are exactly the same otherwise. When `timestamp` is set, the created timestamp is always set to the time specified and therefore not changed, allowing the image's sha256 to remain the same. All files committed to the layers of the image will be created with the timestamp.
   */
  timestamp?: number

  /**
   * When writing the output image, suppress progress output.
   */
  quiet?: boolean

  referenceTime?: string

  signBy?: string

  /**
   * Remove the working container and its contents after creating the image. Default leaves the container and its content in place.
   */
  rm?: boolean
  signaturePolicy?: string

  /**
   * Squash all of the new image's layers (including those inherited from a base image) into a single new layer.
   */
  squash?: boolean

  /**
   * Require HTTPS and verification of certificates when talking to container registries (defaults to true). TLS verification cannot be used when talking to an insecure registry.
   */
  tlsVerify?: boolean
}

export class CommitCommand extends Command<CommitOptions> {
  name = 'commit'
  flags = {
    image: stringFlag(false),

    authfile: stringFlag('--authfile'),
    blobCache: stringFlag('--blob-cache'),
    encryptionKeys: stringArrayFlag('--encryption-key'),
    encryptLayers: numberArrayFlag('--encrypt-layer'),
    certDir: stringFlag('--cert-dir'),
    creds: stringFlag('--creds'),
    disableCompression: booleanFlag('--disable-compression'),
    format: stringFlag('--format'),
    manifest: stringFlag('--manifest'),
    iidfile: stringFlag('--iidfile'),
    omitTimestamp: booleanFlag('--omit-timestamp'),
    timestamp: numberFlag('--timestamp'),
    quiet: booleanFlag('--quiet'),
    referenceTime: stringFlag('--reference-time'),
    signBy: stringFlag('--sign-by'),
    rm: booleanFlag('--rm'),
    signaturePolicy: stringFlag('--signature-policy'),
    squash: booleanFlag('--squash'),
    tlsVerify: booleanFlag('--tls-verify'),
  }
}
