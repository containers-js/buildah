import {booleanFlag, Command, numberArrayFlag, stringArrayFlag, stringFlag, virtualFlag} from './Command'

export interface PushOptions {
  /**
   * The destination location to store a container image. If omitted, the source image parameter will be reused as destination.
   *
   * The destination uses a `transport:details` format. Multiple transports are supported:
   *
   * - `docker://docker-reference` (Default) An image in a registry implementing the "Docker Registry HTTP API V2". By default, uses the authorization state in $XDG\_RUNTIME\_DIR/containers/auth.json, which is set using (buildah login). If XDG_RUNTIME_DIR is not set, the default is /run/containers/$UID/auth.json. If the authorization state is not found there, $HOME/.docker/config.json is checked, which is set using (docker login). If docker-reference does not include a registry name, localhost will be consulted first, followed by any registries named in the registries configuration.
   * - `dir:path` An existing local directory path containing the manifest, layer tarballs, and signatures in individual files. This is a non-standardized format, primarily useful for debugging or noninvasive image inspection.
   * - `docker-archive:path` An image is retrieved as a docker load formatted file.
   * - `docker-daemon:docker-reference` An image docker-reference stored in the docker daemon's internal storage. docker-reference must include either a tag or a digest. Alternatively, when reading images, the format can also be docker-daemon:algo:digest (an image ID).
   * - `oci:path:tag` An image tag in a directory compliant with "Open Container Image Layout Specification" at path.
   * - `oci-archive:path:tag` An image tag in a directory compliant with "Open Container Image Layout Specification" at path.
   *
   * If the `transport` part of the destination is omitted, "docker://" is assumed.
   */
  destination?: string

  /**
   * If specified image is a manifest list or image index, push the images in addition to the list or index itself.
   */
  all?: boolean

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
   * After copying the image, write the digest of the resulting image to the file.
   */
  digestfile?: string

  /**
   * Don't compress copies of filesystem layers which will be pushed.
   */
  disableCompression?: boolean

  /**
   * The `[protocol:keyfile]` specifies the encryption protocol, which can be JWE (RFC7516), PGP (RFC4880), and PKCS7 (RFC2315) and the key material required for image encryption. For instance, `jwe:/path/to/key.pem` or `pgp:admin@example.com` or `pkcs7:/path/to/x509-file`.
   */
  encryptionKeys?: string[]

  /**
   * Layer(s) to encrypt: 0-indexed layer indices with support for negative indexing (e.g. 0 is the first layer, -1 is the last layer). If not defined, will encrypt all layers if encryption-key flag is specified.
   */
  encryptLayers?: number[]

  /**
   * Manifest Type (oci, v2s2, or v2s1) to use when pushing an image. (default is manifest type of the source image, with fallbacks)
   */
  format?: string

  /**
   * When writing the output image, suppress progress output.
   */
  quiet?: boolean

  /**
   * Don't copy signatures when pushing images.
   */
  removeSignatures?: boolean

  /**
   * When pushing a the manifest list or image index, delete them from local storage if pushing succeeds.
   */
  rm?: boolean
  signaturePolicy?: string

  /**
   * Sign the pushed image using the GPG key that matches the specified fingerprint.
   */
  signBy?: string

  /**
   * Require HTTPS and verification of certificates when talking to container registries (defaults to true). TLS verification cannot be used when talking to an insecure registry.
   */
  tlsVerify?: boolean
}

export class PushCommand extends Command<PushOptions> {
  name = 'push'
  flags = {
    destination: virtualFlag(),

    all: booleanFlag('--all'),
    authfile: stringFlag('--authfile'),
    blobCache: stringFlag('--blob-cache'),
    certDir: stringFlag('--cert-dir'),
    creds: stringFlag('--creds'),
    digestfile: stringFlag('--digestfile'),
    disableCompression: booleanFlag('--disable-compression'),
    format: stringFlag('--format'),
    quiet: booleanFlag('--quiet'),
    rm: booleanFlag('--rm'),
    removeSignatures: booleanFlag('--remove-signatures'),
    signBy: stringFlag('--sign-by'),
    signaturePolicy: stringFlag('--signature-policy'),
    encryptionKeys: stringArrayFlag('--encryption-key'),
    encryptLayers: numberArrayFlag('--encrypt-layer'),
    tlsVerify: booleanFlag('--tls-verify'),
  }
}
