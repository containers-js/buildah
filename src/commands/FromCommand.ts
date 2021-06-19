import {booleanFlag, Command, stringFlag} from './Command'
import {fromAndBudFlags} from './commonFlags'

export interface FromOptions {
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

  /**
   * Use certificates at specified path (`*.crt`, `*.cert`, `*.key`) to connect to the registry. The default certificates directory is `/etc/containers/certs.d`.
   */
  certDir?: string

  /**
   * Write the container ID to the file.
   */
  cidfile?: string

  /**
   * The `[username[:password]]` to use to authenticate with the registry if required. If one or both values are not supplied, a command line prompt will appear and the value can be entered. The password is entered without echo.
   */
  creds?: string

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
   * A name for the working container
   */
  name?: string

  /**
   * When the flag is enabled, attempt to pull the latest image from the registries listed in registries.conf if a local image does not exist or the image is newer than the one in storage. Raise an error if the image is not in any listed registry and is not present locally.
   *
   * If the flag is disabled (with `pull: false`), do not pull the image from the registry, use only the local version. Raise an error if the image is not present locally.
   */
  pull?: boolean

  /**
   * Pull the image from the first registry it is found in as listed in registries.conf. Raise an error if not found in the registries, even if the image is present locally.
   */
  pullAlways?: boolean

  /**
   * Do not pull the image from the registry, use only the local version. Raise an error if the image is not present locally.
   */
  pullNever?: boolean

  /**
   * If an image needs to be pulled from the registry, suppress progress output.
   */
  quiet?: boolean
  signaturePolicy?: string

  /**
   * Require HTTPS and verification of certificates when talking to container registries (defaults to true). TLS verification cannot be used when talking to an insecure registry.
   */
  tlsVerify?: boolean
}

export class FromCommand extends Command<FromOptions> {
  name = 'from'
  flags = {
    authfile: stringFlag('--authfile'),
    certDir: stringFlag('--cert-dir'),
    cidfile: stringFlag('--cidfile'),
    creds: stringFlag('--creds'),
    format: stringFlag('--format'),
    name: stringFlag('--name'),
    pull: booleanFlag('--pull'),
    pullAlways: booleanFlag('--pull-always'),
    pullNever: booleanFlag('--pull-never'),
    quiet: booleanFlag('--quiet'),
    signaturePolicy: stringFlag('--signature-policy'),
    tlsVerify: booleanFlag('--tls-verify'),

    ...fromAndBudFlags,
  }
}
