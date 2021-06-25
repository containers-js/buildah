import {booleanFlag, Command, stringArrayFlag, stringFlag} from './Command'
import {namespaceFlags, NamespaceOptions, userFlags, UserOptions} from './commonFlags'

export interface RunOptions extends UserOptions, NamespaceOptions {
  /**
   * Add an entry to the history which will note what command is being invoked. Defaults to false.
   *
   * **Note:** You can also override the default value of `addHistory` by setting the `BUILDAH_HISTORY` environment variable.
   *
   * ```shell
   * export BUILDAH_HISTORY=true
   * ```
   */
  addHistory?: boolean

  /**
   * Add the specified capability to the set of capabilities which will be granted to the specified command. Certain capabilities are granted by default; this option can be used to add more beyond the defaults, which may have been modified by `capAdd` and `capDrop` options used with the buildah from invocation which created the container.
   */
  capAdd?: string[]

  /**
   * Add the specified capability from the set of capabilities which will be granted to the specified command. The CAP_AUDIT_WRITE, CAP_CHOWN, CAP_DAC_OVERRIDE, CAP_FOWNER, CAP_FSETID, CAP_KILL, CAP_MKNOD, CAP_NET_BIND_SERVICE, CAP_SETFCAP, CAP_SETGID, CAP_SETPCAP, CAP_SETUID, and CAP_SYS_CHROOT capabilities are granted by default; this option can be used to remove them from the defaults, which may have been modified by `capAdd` and `capDrop` options used with the buildah from invocation which created the container.
   */
  capDrop?: string[]

  /**
   * Temporarily add a value (e.g. `env=value`) to the environment for the running process. Unlike `buildah config --env`, the environment will not persist to later calls to `buildah run` or to the built image. Can be used multiple times.
   */
  env?: string[]

  /**
   * Set the hostname inside of the running container.
   */
  hostname?: string

  /**
   * Controls what type of isolation is used for running the process. Recognized types include:
   *
   * - `oci` OCI-compatible runtime (default)
   * - `rootless` OCI-compatible runtime invoked using a modified configuration, with --no-new-keyring added to its create invocation, with network and UTS namespaces disabled, and IPC, PID, and user namespaces enabled; the default for unprivileged users)
   * - `chroot` an internal wrapper that leans more toward chroot(1) than container technology
   *
   * **Note:** You can also override the default isolation type by setting the `BUILDAH_ISOLATION` environment variable.
   *
   * ```shell
   * export BUILDAH_ISOLATION=oci
   * ```
   *
   * @default 'oci'
   */
  isolation?: string

  /**
   * Attach a filesystem mount to the container
   *
   * Current supported mount TYPES are `bind` and `tmpfs`
   */
  mounts?: string[]

  /**
   * Do not use pivot root to jail process inside rootfs. This should be used whenever the rootfs is on top of a ramdisk.
   *
   * **Note:** You can make this option the default by setting the `BUILDAH_NOPIVOT` environment variable.
   *
   * ```shell
   * export BUILDAH_NOPIVOT=true
   * ```
   */
  noPivot?: boolean

  /**
   * The path to an alternate OCI-compatible runtime. Default is `runc`, or `crun` when machine is configured to use cgroups V2.
   *
   * **Note:** You can also override the default runtime by setting the `BUILDAH_RUNTIME` environment variable.
   *
   * ```shell
   * export BUILDAH_RUNTIME=/usr/bin/crun
   * ```
   */
  runtime?: string

  /**
   * Adds global flags for the container runtime. To list the supported flags, please consult the manpages of the selected container runtime.
   *
   * **Note:** Do not pass the leading `--` to the flag. To pass the runc flag `--log-format json` to `buildah bud`, the option given would be `runtimeFlags: ['log-format=json']`.
   */
  runtimeFlag?: string[]

  /**
   * By default a pseudo-TTY is allocated only when buildah's standard input is attached to a pseudo-TTY. Setting the `tty` option to true will cause a pseudo-TTY to be allocated inside the container connecting the user's "terminal" with the stdin and stdout stream of the container. Setting the `tty` option to false will prevent the pseudo-TTY from being allocated.
   */
  tty?: boolean

  /**
   * Create a bind mount
   */
  volumes?: string[]

  /**
   * Temporarily set the working directory for the running process. Unlike `buildah config --workingdir`, the workingdir will not persist to later calls to `buildah run` or the built image.
   */
  workingdir?: string
}

export class RunCommand extends Command<RunOptions> {
  name = 'run'
  flags = {
    addHistory: booleanFlag('--add-history'),
    capAdd: stringArrayFlag('--cap-add'),
    capDrop: stringArrayFlag('--cap-drop'),
    env: stringArrayFlag('--env'),
    hostname: stringFlag('--hostname'),
    isolation: stringFlag('--isolation'),
    runtime: stringFlag('--runtime'),
    runtimeFlag: stringArrayFlag('--runtime-flag'),
    noPivot: booleanFlag('--no-pivot'),
    tty: booleanFlag('--terminal'),
    volumes: stringArrayFlag('--volume'),
    mounts: stringArrayFlag('--mount'),
    workingdir: stringFlag('--workingdir'),

    ...userFlags,
    ...namespaceFlags,
  }
}
