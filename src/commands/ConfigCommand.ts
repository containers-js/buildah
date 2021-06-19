import {booleanFlag, Command, numberFlag, stringArrayFlag, stringFlag} from './Command'

export interface ConfigOptions {
  /**
   * Add an entry to the image's history which will note changes to the settings for `cmd`, `entrypoint`, `env`, `healthcheck`, `label`, `onbuild`, `port`, `shell`, `stopSignal`, `user`, `volume`, and `workingdir`. Defaults to false.
   *
   * **Note:** You can also override the default value of `addHistory by setting the `BUILDAH_HISTORY` environment variable.
   *
   * ```shell
   * export BUILDAH_HISTORY=true
   * ```
   *
   * @default false
   */
  addHistory?: boolean

  /**
   * Add an image annotation (e.g. `annotation=annotation`) to the image manifest of any images which will be built using the specified container. Can be used multiple times. If annotation has a trailing `-`, then the annotation is removed from the config. If the annotation is set to `"-"` then all annotations are removed from the config.
   */
  annotation?: string[]

  /**
   * Set the target architecture for any images which will be built using the specified container. By default, if the container was based on an image, that image's target architecture is kept, otherwise the host's architecture is recorded.
   */
  arch?: string

  /**
   * Set contact information for the author for any images which will be built using the specified container.
   */
  author?: string

  /**
   * Set the default command to run for containers based on any images which will be built using the specified container. When used in combination with an entry point, this specifies the default parameters for the entry point.
   */
  cmd?: string

  /**
   * Set the image-level comment for any images which will be built using the specified container.
   *
   * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
   */
  comment?: string

  /**
   * Set the description of how the topmost layer was created for any images which will be created using the specified container.
   */
  createdBy?: string

  /**
   * Set the `domainName` to set when running containers based on any images built using the specified container.
   *
   * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
   */
  domainName?: string

  /**
   * Set the entry point for containers based on any images which will be built using the specified container. buildah supports two formats for entrypoint. It can be specified as a simple string, or as a array of commands.
   *
   * **Note:** When the entrypoint is specified as a string, container runtimes will ignore the cmd value of the container image. However if you use the array form, then the cmd will be appended onto the end of the entrypoint cmd and be executed together.
   */
  entrypoint?: string

  /**
   * Add a value (e.g. `env=value`) to the environment for containers based on any images which will be built using the specified container. Can be used multiple times. If env has a trailing `-`, then the env is removed from the config. If the env is set to `"-"` then all environment variables are removed from the config.
   */
  env?: string[]

  /**
   * Specify a command which should be run to check if a container is running correctly.
   *
   * Values can be `NONE`, `CMD ...` (run the specified command directly), or `CMD-SHELL ...` (run the specified command using the system's shell), or the empty value (remove a previously-set value and related settings).
   *
   * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
   */
  healthcheck?: string

  /**
   * Specify how often the command specified using the `healthcheck` option should be run.
   *
   * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
   */
  healthcheckInterval?: string

  /**
   * Specify how many times the command specified using the `healthcheck` option can fail before the container is considered to be unhealthy.
   *
   * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
   */
  healthcheckRetries?: number

  /**
   * Specify how much time can elapse after a container has started before a failure to run the command specified using the `healthcheck` option should be treated as an indication that the container is failing. During this time period, failures will be attributed to the container not yet having fully started, and will not be counted as errors. After the command succeeds, or the time period has elapsed, failures will be counted as errors.
   *
   * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
   */
  healthcheckStartPeriod?: string

  /**
   * Specify how long to wait after starting the command specified using the `healthcheck` option to wait for the command to return its exit status. If the command has not returned within this time, it should be considered to have failed.
   *
   * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
   */
  healthcheckTimeout?: string

  /**
   * Sets a comment on the topmost layer in any images which will be created using the specified container.
   */
  historyComment?: string

  /**
   * Set the hostname to set when running containers based on any images built using the specified container.
   *
   * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
   */
  hostname?: string

  /**
   * Add an image label (e.g. `label=value`) to the image configuration of any images which will be built using the specified container. Can be used multiple times. If label has a trailing `-`, then the label is removed from the config. If the label is set to `"-"` then all labels are removed from the config.
   */
  label?: string[]

  /**
   * Add an `ONBUILD` command to the image. `ONBUILD` commands are automatically run when images are built based on the image you are creating.
   *
   * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
   */
  onbuild?: string[]

  /**
   * Set the target operating system for any images which will be built using the specified container. By default, if the container was based on an image, its OS is kept, otherwise the host's OS's name is recorded.
   */
  os?: string

  /**
   * Add a port to expose when running containers based on any images which will be built using the specified container. Can be used multiple times. If port has a trailing `-`, and is already set, then the port is removed from the config. If the port is set to `"-"` then all exposed ports settings are removed from the config.
   */
  ports?: string[]

  /**
   * Set the default shell to run inside of the container image. The shell instruction allows the default shell used for the shell form of commands to be overridden. The default shell for Linux containers is `/bin/sh -c`.
   *
   * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
   */
  shell?: string

  /**
   * Set default stop signal for container. This signal will be sent when container is stopped, default is SIGINT.
   */
  stopSignal?: string

  /**
   * Set the default user to be used when running containers based on this image. The user can be specified as a user name or UID, optionally followed by a group name or GID, separated by a colon (`:`). If names are used, the container should include entries for those names in its `/etc/passwd` and `/etc/group` files.
   */
  user?: string

  /**
   * Add a location in the directory tree which should be marked as a volume in any images which will be built using the specified container. Can be used multiple times. If volume has a trailing `-`, and is already set, then the volume is removed from the config. If the volume is set to `"-"` then all volumes are removed from the config.
   */
  volume?: string[]

  /**
   * Set the initial working directory for containers based on images which will be built using the specified container.
   */
  workingDir?: string
}

export class ConfigCommand extends Command<ConfigOptions> {
  name = 'config'
  flags = {
    addHistory: booleanFlag('--add-history'),
    annotation: stringArrayFlag('--annotation'),
    arch: stringFlag('--arch'),
    author: stringFlag('--author'),
    cmd: stringFlag('--cmd'),
    comment: stringFlag('--comment'),
    createdBy: stringFlag('--created-by'),
    domainName: stringFlag('--domainname'),
    entrypoint: stringFlag('--entrypoint'),
    env: stringArrayFlag('--env'),
    healthcheck: stringFlag('--healthcheck'),
    healthcheckInterval: stringFlag('--healthcheck-interval'),
    healthcheckRetries: numberFlag('--healthcheck-retries'),
    healthcheckStartPeriod: stringFlag('--healthcheck-start-period'),
    healthcheckTimeout: stringFlag('--healthcheck-timeout'),
    historyComment: stringFlag('--history-comment'),
    hostname: stringFlag('--hostname'),
    label: stringArrayFlag('--label'),
    onbuild: stringArrayFlag('--onbuild'),
    os: stringFlag('--os'),
    ports: stringArrayFlag('--port'),
    shell: stringFlag('--shell'),
    stopSignal: stringFlag('--stop-signal'),
    user: stringFlag('--user'),
    volume: stringArrayFlag('--volume'),
    workingDir: stringFlag('--workingdir'),
  }
}
