import {booleanFlag, Command, numberFlag, stringArrayFlag, stringFlag} from './Command'
import {fromAndBudFlags, FromAndBudOptions, layerFlags, LayerOptions} from './commonFlags'

export interface BudOptions extends LayerOptions, FromAndBudOptions {
  /**
   * Add an image annotation (e.g. `annotation=value`) to the image metadata. Can be used multiple times.
   *
   * **Note:** this information is not present in Docker image formats, so it is discarded when writing images in Docker formats.
   */
  annotation?: string

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
   * Specifies a build argument and its value, which will be interpolated in instructions read from the Containerfiles in the same way that environment variables are, but which will not be added to environment variable list in the resulting image's configuration.
   *
   * The following build arguments can be set to override the corresponding values set in the Containerfile using the ENV instruction:
   *
   * - `HTTP_PROXY`
   * - `HTTPS_PROXY`
   * - `FTP_PROXY`
   * - `NO_PROXY`
   */
  buildArg?: string

  /**
   * Images to utilise as potential cache sources. Buildah does not currently support --cache-from so this is a NOOP.
   */
  cacheFrom?: string

  /**
   * Use certificates at specified path (`*.crt`, `*.cert`, `*.key`) to connect to the registry. The default certificates directory is `/etc/containers/certs.d`.
   */
  certDir?: string

  /**
   * This option is added to be aligned with other containers CLIs. Buildah doesn't send a copy of the context directory to a daemon or a remote server. Thus, compressing the data before sending it is irrelevant to Buildah.
   */
  compress?: boolean

  /**
   * The `[username[:password]]` to use to authenticate with the registry if required. If one or both values are not supplied, a command line prompt will appear and the value can be entered. The password is entered without echo.
   */
  creds?: string

  /**
   * Don't compress filesystem layers when building the image unless it is required by the location where the image is being written. This is the default setting, because image layers are compressed automatically when they are pushed to registries, and images being written to local storage would only need to be decompressed again to be stored.
   *
   * Compression can be forced in all cases by specifying `disableCompression: false`.
   */
  disableCompression?: boolean

  /**
   * This is a Docker specific option to disable image verification to a Docker registry and is not supported by Buildah. This flag is a NOOP and provided solely for scripting compatibility.
   */
  disableContentTrust?: boolean

  /**
   * Specifies a Containerfile which contains instructions for building the image, either a local file or an http or https URL. If more than one Containerfile is specified, FROM instructions will only be accepted from the first specified file.
   *
   * If a local file is specified as the Containerfile and it does not exist, the context directory will be prepended to the local file value.
   *
   * If you specify `-f -`, the Containerfile contents will be read from stdin.
   */
  file?: string[]

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
   * Overrides the first `FROM` instruction within the Containerfile. If there are multiple `FROM` instructions in a Containerfile, only the first is changed.
   */
  from?: string

  /**
   * Path to an alternative `.containerignore` (`.dockerignore`) file.
   */
  ignoreFile?: string

  /**
   * Write the image ID to the file.
   */
  iidfile?: string

  /**
   * Run up to N concurrent stages in parallel. If the number of jobs is greater than 1, stdin will be read from `/dev/null`. If 0 is specified, then there is no limit in the number of jobs that run in parallel.
   */
  jobs?: number

  /**
   * Add an image label (e.g. `label=value`) to the image metadata. Can be used multiple times.
   *
   * Users can set a special `LABEL io.containers.capabilities=CAP1,CAP2,CAP3` in a Containerfile that specified the list of Linux capabilities required for the container to run properly. This label specified in a container image tells container engines, like Podman, to run the container with just these capabilities. The container engine launches the container with just the specified capabilities, as long as this list of capabilities is a subset of the default list.
   *
   * If the specified capabilities are not in the default set, container engines should print an error message and will run the container with the default capabilities.
   */
  label?: string

  /**
   * Log output which would be sent to standard output and standard error to the specified file instead of to standard output and standard error.
   */
  logfile?: string
  loglevel?: number
  logRusage?: boolean

  /**
   * Name of the manifest list to which the image will be added. Creates the manifest list if it does not exist. This option is useful for building multi architecture images.
   */
  manifest?: string
  noCache?: boolean

  /**
   * Set the OS/ARCH of the image to the provided value instead of using the current operating system and architecture of the host (for example `linux/arm`). If `platform` is set, then the values of the `arch` and `os` options will be overridden.
   */
  platform?: string

  /**
   * When the flag is enabled, attempt to pull the latest image from the registries listed in `registries.conf` if a local image does not exist or the image is newer than the one in storage. Raise an error if the image is not in any listed registry and is not present locally.
   *
   * If the flag is disabled (with `pull: false`), do not pull the image from the registry, unless there is no local image. Raise an error if the image is not in any registry and is not present locally.
   */
  pull?: boolean

  /**
   * Pull the image from the first registry it is found in as listed in `registries.conf`. Raise an error if not found in the registries, even if the image is present locally.
   */
  pullAlways?: boolean

  /**
   * Do not pull the image from the registry, use only the local version. Raise an error if the image is not present locally.
   */
  pullNever?: boolean

  /**
   * Suppress output messages which indicate which instruction is being processed, and of progress when pulling images from a registry, and when writing the output image.
   */
  quiet?: boolean

  /**
   * Remove intermediate containers after a successful build (default true).
   */
  rm?: boolean

  /**
   * Adds global flags for the container runtime. To list the supported flags, please consult the manpages of the selected container runtime.
   *
   * **Note:** Do not pass the leading `--` to the flag. To pass the runc flag `--log-format json` to `buildah bud`, the option given would be `runtimeFlags: ['log-format=json']`.
   */
  runtimeFlags?: string[]

  /**
   * Pass secret information to be used in the Containerfile for building images in a safe way that will not end up stored in the final image, or be seen in other stages. The secret will be mounted in the container at the default location of `/run/secrets/id`.
   *
   * To later use the secret, use the `--mount` flag in a `RUN` instruction within a Containerfile:
   *
   * ```Dockerfile
   * RUN --mount=type=secret,id=mysecret cat /run/secrets/mysecret
   * ```
   *
   * @example 'id=ID,src=PATH`
   */
  secrets?: string
  signaturePolicy?: string

  /**
   * Sign the built image using the GPG key that matches the specified fingerprint.
   */
  signBy?: string

  /**
   * Squash all of the image's new layers into a single new layer; any preexisting layers are not squashed.
   */
  squash?: boolean

  /**
   * Pass stdin into the RUN containers. Sometime commands being RUN within a Containerfile want to request information from the user. For example apt asking for a confirmation for install. Use `stdin` to be able to interact from the terminal during the build.
   */
  stdin?: boolean

  /**
   * Specifies the name which will be assigned to the resulting image if the build process completes successfully. If imageName does not include a registry name, the registry name localhost will be prepended to the image name.
   */
  tag?: string

  /**
   * Set the target build stage to build. When building a Containerfile with multiple build stages, `target` can be used to specify an intermediate build stage by name as the final stage for the resulting image. Commands after the target stage will be skipped.
   */
  target?: string

  /**
   * Set the create timestamp to seconds since epoch to allow for deterministic builds (defaults to current time). By default, the created timestamp is changed and written into the image manifest with every commit, causing the image's sha256 hash to be different even if the sources are exactly the same otherwise. When `timestamp` is set, the created timestamp is always set to the time specified and therefore not changed, allowing the image's sha256 to remain the same. All files committed to the layers of the image will be created with the timestamp.
   */
  timestamp?: number

  /**
   * Require HTTPS and verification of certificates when talking to container registries (defaults to true). TLS verification cannot be used when talking to an insecure registry.
   */
  tlsVerify?: boolean
}

export class BudCommand extends Command<BudOptions> {
  name = 'bud'
  flags = {
    // arch: stringFlag('--arch'),
    annotation: stringFlag('--annotation'),
    authfile: stringFlag('--authfile'),
    buildArg: stringFlag('--build-arg'),
    cacheFrom: stringFlag('--cache-from'),
    certDir: stringFlag('--cert-dir'),
    compress: booleanFlag('--compress'),
    creds: stringFlag('--creds'),
    disableCompression: booleanFlag('--disable-compression'),
    disableContentTrust: booleanFlag('--disable-content-trust'),
    from: stringFlag('--from'),
    ignoreFile: stringFlag('--ignorefile'),
    file: stringArrayFlag('--file'),
    format: stringFlag('--format'),
    iidfile: stringFlag('--iidfile'),
    jobs: numberFlag('--jobs'),
    label: stringFlag('--label'),
    logfile: stringFlag('--logfile'),
    loglevel: numberFlag('--loglevel'),
    logRusage: booleanFlag('--log-rusage'),
    manifest: stringFlag('--manifest'),
    noCache: booleanFlag('--no-cache'),
    // os: stringFlag('--os'),
    platform: stringFlag('--platform'),
    pull: booleanFlag('--pull'),
    pullAlways: booleanFlag('--pull-always'),
    pullNever: booleanFlag('--pull-never'),
    quiet: booleanFlag('--quiet'),
    rm: booleanFlag('--rm'),
    runtimeFlags: stringArrayFlag('--runtime-flag'),
    secrets: stringFlag('--secret'),
    signBy: stringFlag('--sign-by'),
    signaturePolicy: stringFlag('--signature-policy'),
    squash: booleanFlag('--squash'),
    stdin: booleanFlag('--stdin'),
    tag: stringFlag('--tag'),
    target: stringFlag('--target'),
    timestamp: numberFlag('--timestamp'),
    tlsVerify: booleanFlag('--tls-verify'),
    // variant: stringFlag('--variant'),

    ...layerFlags,
    ...fromAndBudFlags,
  }
}
