export interface GlobalOptions {
  /**
   * Path to the `buildah` binary.
   *
   * @default buildah
   */
  buildahCommand?: string
}

export interface CommitOptions {
  /**
   * New image name to commit.
   */
  image?: string

  /**
   * Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json`. If `XDG_RUNTIME_DIR` is not set, the default is `/run/containers/$UID/auth.json`.
   * This file is created using using `buildah login`.
   *
   * If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using docker login.
   *
   * **Note:** You can also override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable.
   */
  authfile?: string

  /**
   * Assume image blobs in the specified directory will be available for pushing.
   */
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
   * Don't compress filesystem layers when building the image unless it is required by the location where the image is being written. This is the default setting, because image layers are compressed automatically when they are pushed to registries, and images being written to local storage would only need to be decompressed again to be stored. Compression can be forced in all cases by setting to `false`.
   */
  disableCompression?: boolean

  /**
   * The encryption protocol and key material required for image encryption. Format `protocol:keyfile`.
   *
   * Protocol can be JWE (RFC7516), PGP (RFC4880), and PKCS7 (RFC2315) and the key material required for image encryption.
   *
   * Examples: `jwe:/path/to/key.pem`, `pgp:admin@example.com`, `pkcs7:/path/to/x509-file`
   */
  encryptionKeys?: string[]

  /**
   * Layer(s) to encrypt: 0-indexed layer indices with support for negative indexing (e.g. 0 is the first layer, -1 is the last layer). If not defined, will encrypt all layers if `encryptionKey` flag is specified.
   */
  encryptLayers?: number[]

  /**
   * Control the format for the built image's manifest and configuration data. Recognized formats include:
   *
   * - `oci` (OCI image-spec v1.0, the default)
   * - `docker` (version 2, using schema format 2 for the manifest).
   *
   * **Note:** You can also override the default format by setting the `BUILDAH_FORMAT` environment variable.
   */
  format?: string

  /**
   * Write the image ID to the file.
   */
  iidfile?: string

  /**
   * Name of the manifest list to which the image will be added. Creates the manifest list if it does not exist. This option is useful for building multi architecture images.
   */
  manifest?: string

  /**
   * Set created timestamp to epoch 0 to allow for deterministic builds
   */
  omitTimestamp?: boolean

  /**
   * When writing the output image, suppress progress output.
   */
  quiet?: boolean

  /**
   * Set the timestamp on the image to match the named `file`.
   */
  referenceTime?: string

  /**
   * Remove the working container and its contents after creating the image. Default leaves the container and its content in place.
   */
  rm?: boolean

  /**
   * Path to a signature policy file (not typically used)
   */
  signaturePolicy?: string

  /**
   * Sign the new image using the GPG key that matches the specified fingerprint.
   */
  signBy?: string

  /**
   * Squash all of the new image's layers (including those inherited from a base image) into a single new layer.
   */
  squash?: boolean

  /**
   * Set the create timestamp to seconds since epoch to allow for deterministic builds (defaults to current time). By default, the created timestamp is changed and written into the image manifest with every commit, causing the image's sha256 hash to be different even if the sources are exactly the same otherwise. When `timestamp` is set, the created timestamp is always set to the time specified and therefore not changed, allowing the image's sha256 to remain the same. All files committed to the layers of the image will be created with the timestamp.
   */
  timestamp?: number

  /**
   * Require HTTPS and verification of certificates when talking to container registries. TLS verification cannot be used when talking to an insecure registry.
   *
   * @default true
   */
  tlsVerify?: boolean
}

export interface ConfigOptions {
  /**
   * Add an entry to the image's history which will note changes to the settings for `cmd`, `entrypoint`, `env`, `healthcheck`, `label`, `onbuild`, `port`, `shell`, `stopSignal`, `user`, `volume`, and `workingdir`. Defaults to `false`.
   *
   * **Note:** You can also override the default value of --add-history by setting the BUILDAH_HISTORY environment variable.
   *
   * ```shell
   * export BUILDAH_HISTORY=true
   * ```
   *
   * @default false
   */
  addHistory?: boolean

  /**
   * Add an image annotation (e.g. `annotation=value`) to the image metadata. Can be used multiple times.
   *
   * **Note:** this information is not present in Docker image formats, so it is discarded when writing images in Docker formats.
   */
  annotation?: string[]

  /**
   * Set the ARCH of the image to be pulled to the provided value instead of using the architecture of the host.
   *
   * Examples: `aarch64`, `arm`, `i686`, `ppc64le`, `s390x`, `x86_64`
   */
  arch?: string

  /**
   *
   */
  author?: string

  /**
   *
   */
  cmd?: string

  /**
   *
   */
  comment?: string

  /**
   *
   */
  createdBy?: string

  /**
   *
   */
  domainName?: string

  /**
   *
   */
  entrypoint?: string

  /**
   *
   */
  env?: string[]

  /**
   *
   */
  healthcheck?: string

  /**
   *
   */
  healthcheckInterval?: string

  /**
   *
   */
  healthcheckRetries?: number

  /**
   *
   */
  healthcheckStartPeriod?: string

  /**
   *
   */
  healthcheckTimeout?: string

  /**
   *
   */
  historyComment?: string

  /**
   * Set the hostname inside of the running container.
   */
  hostname?: string

  /**
   *
   */
  label?: string[]

  /**
   *
   */
  onbuild?: string[]

  /**
   * Set the OS of the image to be pulled to the provided value instead of using the current operating system of the host.
   */
  os?: string

  /**
   *
   */
  ports?: string[]

  /**
   *
   */
  shell?: string

  /**
   *
   */
  stopSignal?: string

  /**
   * Set the user to be used for running the command in the container. The user can be specified as a user name or UID, optionally followed by a group name or GID, separated by a colon (`:`). If names are used, the container should include entries for those names in its `/etc/passwd` and `/etc/group` files.
   */
  user?: string

  /**
   *
   */
  volume?: string[]

  /**
   *
   */
  workingDir?: string
}

export interface FromOptions {
  /**
   * Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json`. If `XDG_RUNTIME_DIR` is not set, the default is `/run/containers/$UID/auth.json`.
   * This file is created using using `buildah login`.
   *
   * If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using docker login.
   *
   * **Note:** You can also override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable.
   */
  authfile?: string

  /**
   * Use certificates at specified path (`*.crt`, `*.cert`, `*.key`) to connect to the registry. The default certificates directory is `/etc/containers/certs.d`.
   */
  certDir?: string

  /**
   * Write the container ID to the specified file.
   */
  cidfile?: string

  /**
   * The `[username[:password]]` to use to authenticate with the registry if required. If one or both values are not supplied, a command line prompt will appear and the value can be entered. The password is entered without echo.
   */
  creds?: string

  /**
   * Control the format for the built image's manifest and configuration data. Recognized formats include:
   *
   * - `oci` (OCI image-spec v1.0, the default)
   * - `docker` (version 2, using schema format 2 for the manifest).
   *
   * **Note:** You can also override the default format by setting the `BUILDAH_FORMAT` environment variable.
   */
  format?: 'oci' | 'docker'

  /**
   * A name for the working container
   */
  name?: string

  /**
   * When enabled, attempt to pull the latest image from the registries listed in `registries.conf` if a local image does not exist or the image is newer than the one in storage. Raise an error if the image is not in any listed registry and is not present locally.
   *
   * When disabled, do not pull the image from the registry, use only the local version. Raise an error if the image is not present locally.
   *
   * @default true
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
   * If an image needs to be pulled from the registry, suppress progress output.
   */
  quiet?: boolean

  /**
   * Path to a signature policy file (not typically used)
   */
  signaturePolicy?: string

  /**
   * Require HTTPS and verification of certificates when talking to container registries. TLS verification cannot be used when talking to an insecure registry.
   *
   * @default true
   */
  tlsVerify?: boolean

  /**
   * Add a custom host-to-IP mapping by adding lines to `/etc/hosts`. The format is `hostname:ip`.
   */
  addHost?: string[]

  /**
   * Assume image blobs in the specified directory will be available for pushing.
   */
  blobCache?: string

  /**
   * Add the specified capability to the set of capabilities which will be granted to the specified command. Certain capabilities are granted by default; this option can be used to add more beyond the defaults, which may have been modified by `capAdd` and `capDrop` options used with the `from()` invocation which created the container.
   */
  capAdd?: string[]

  /**
   * Add the specified capability from the set of capabilities which will be granted to the specified command. The `CAP_AUDIT_WRITE`, `CAP_CHOWN`, `CAP_DAC_OVERRIDE`, `CAP_FOWNER`, `CAP_FSETID`, `CAP_KILL`, `CAP_MKNOD`, `CAP_NET_BIND_SERVICE`, `CAP_SETFCAP`, `CAP_SETGID`, `CAP_SETPCAP`, `CAP_SETUID`, and `CAP_SYS_CHROOT` capabilities are granted by default; this option can be used to remove them from the defaults, which may have been modified by `capAdd` and `capDrop` options used with the buildah from invocation which created the container.
   *
   * If a capability is specified to both the `capAdd` and `capDrop` options, it will be dropped.
   */
  capDrop?: string[]

  /**
   * Path to cgroups under which the cgroup for the container will be created. If the path is not absolute, the path is considered to be relative to the cgroups path of the init process. Cgroups will be created if they do not already exist.
   */
  cgroupParent?: string

  /**
   * Limit the container's CPU usage (CFS / Completely Fair Scheduler). This option tell the kernel to restrict the container's CPU usage to the period you specify.
   */
  cpuPeriod?: number

  /**
   * Limit the CPU CFS (Completely Fair Scheduler) quota
   *
   * Limit the container's CPU usage. By default, containers run with the full CPU resource. This flag tell the kernel to restrict the container's CPU usage to the quota you specify.
   */
  cpuQuota?: number

  /**
   * CPU shares (relative weight)
   *
   * By default, all containers get the same proportion of CPU cycles. This proportion can be modified by changing the container's CPU share weighting relative to the weighting of all other running containers.
   *
   * To modify the proportion from the default of 1024, use the `cpuShares` option to set the weighting to 2 or higher.
   *
   * The proportion will only apply when CPU-intensive processes are running. When tasks in one container are idle, other containers can use the left-over CPU time. The actual amount of CPU time will vary depending on the number of containers running on the system.
   *
   * For example, consider three containers, one has a cpu-share of 1024 and two others have a cpu-share setting of 512. When processes in all three containers attempt to use 100% of CPU, the first container would receive 50% of the total CPU time. If you add a fourth container with a cpu-share of 1024, the first container only gets 33% of the CPU. The remaining containers receive 16.5%, 16.5% and 33% of the CPU.
   *
   * On a multi-core system, the shares of CPU time are distributed over all CPU cores. Even if a container is limited to less than 100% of CPU time, it can use 100% of each individual CPU core.
   *
   * For example, consider a system with more than three cores. If you start one container `{C0}` with `cpuShares: 512` running one process, and another container `{C1}` with `cpuShares: 1024` running two processes, this can result in the following division of CPU shares:
   *
   * ```
   * PID    container  CPU  CPU share
   * 100    {C0}       0    100% of CPU0
   * 101    {C1}       1    100% of CPU1
   * 102    {C1}       2    100% of CPU2
   * ```
   */
  cpuShares?: number

  /**
   * CPUs in which to allow execution (format: `0`, `0-3`, `0,1`)
   */
  cpusetCPUs?: string

  /**
   * Memory nodes (MEMs) in which to allow execution (format: `0`, `0-3`, `0,1`). Only effective on NUMA systems.
   *
   * If you have four memory nodes on your system `(0-3)`, use `cpusetMems: '0,1'` then processes in your container will only use memory from the first two memory nodes.
   */
  cpusetMems?: string

  /**
   *
   */
  decryptionKeys?: string[]

  /**
   * Add a host device or devices under a directory to the container. The format is `<device-on-host>[:<device-on-container>][:<permissions>]` (e.g. `device: '/dev/sdc:/dev/xvdc:rwm'`)
   */
  devices?: string[]

  /**
   * Set custom DNS search domains.
   */
  dnsSearch?: string[]

  /**
   * Set custom DNS servers.
   *
   * This option can be used to override the DNS configuration passed to the container. Typically this is necessary when the host DNS configuration is invalid for the container (e.g., 127.0.0.1). When this is the case, setting `dns` is necessary for every run.
   *
   * The special value `none` can be specified to disable creation of `/etc/resolv.conf` in the container by Buildah. The `/etc/resolv.conf` file in the image will be used without changes.
   */
  dnsServers?: string[]

  /**
   * Set custom DNS options.
   */
  dnsOptions?: string[]

  /**
   * By default proxy environment variables are passed into the container if set for the Buildah process. This can be disabled by setting the `httpProxy` option to `false`. The environment variables passed in include `http_proxy`, `https_proxy`, `ftp_proxy`, `no_proxy`, and also the upper case versions of those.
   *
   * @default true
   */
  httpProxy?: boolean

  /**
   * Controls what type of isolation is used for running the process. Recognized types include:
   *
   * - `oci`, OCI-compatible runtime (default)
   * - `rootless`, OCI-compatible runtime invoked using a modified configuration, with `--no-new-keyring` added to its create invocation, with network and UTS namespaces disabled, and IPC, PID, and user namespaces enabled; the default for unprivileged users
   * - `chroot`, an internal wrapper that leans more toward chroot(1) than container technology
   *
   * **Note:** You can also override the default isolation type by setting the BUILDAH_ISOLATION environment variable.
   *
   * @default "oci"
   */
  isolation?: string

  /**
   * Memory limit (format: `<number>[<unit>]`, where unit = `b`, `k`, `m` or `g`).
   *
   * Allows you to constrain the memory available to a container. If the host supports swap memory, then the `memory` setting can be larger than physical RAM. If a limit of 0 is specified or the option is omitted, the container's memory is not limited. The actual limit may be rounded up to a multiple of the operating system's page size (the value would be very large, that's millions of trillions).
   */
  memory?: string

  /**
   * A limit value equal to memory plus swap. Must be used with the `memory` option. The value of `memorySwap` should always be larger than the `memory` value. By default, the value of `memorySwap` will be set to double the value of `memory`.
   *
   * The format is `<number>[<unit>]`. Unit can be `b` (bytes), `k` (kilobytes), `m` (megabytes), or `g` (gigabytes). If you don't specify a unit, `b` is used. Set to `-1` to enable unlimited swap.
   */
  memorySwap?: string

  /**
   * Set the ARCH of the image to be pulled to the provided value instead of using the architecture of the host.
   *
   * Examples: `aarch64`, `arm`, `i686`, `ppc64le`, `s390x`, `x86_64`
   */
  arch?: string

  /**
   * Set the OS of the image to be pulled to the provided value instead of using the current operating system of the host.
   */
  os?: string

  /**
   * Set the architecture variant of the image to be pulled.
   */
  variant?: string

  /**
   * Security Options
   *
   * - `label=user:USER` Set the label user for the container
   * - `label=role:ROLE` Set the label role for the container
   * - `label=type:TYPE` Set the label type for the container
   * - `label=level:LEVEL` Set the label level for the container
   * - `label=disable` Turn off label confinement for the container
   * - `no-new-privileges` Not supported
   * - `seccomp=unconfined` Turn off seccomp confinement for the container
   * - `seccomp=profile.json` White listed syscalls seccomp JSON file to be used as a seccomp filter
   * - `apparmor=unconfined` Turn off apparmor confinement for the container
   * - `apparmor=your-profile` Set the apparmor confinement profile for the container
   */
  securityOpt?: string[]

  /**
   * Size of `/dev/shm`. The format is `<number>[<unit>]`. number must be greater than 0. Unit is optional and can be `b` (bytes), `k` (kilobytes), `m` (megabytes), or `g` (gigabytes). If you omit the unit, the system uses `b` (bytes). If you omit the size entirely, the system uses `64m`.
   *
   * @default 64m
   */
  shmSize?: string

  /**
   * Specifies resource limits to apply to processes launched during `buildah run`. This option can be specified multiple times. Recognized resource types include:
   *
   * - `core` maximum core dump size (ulimit -c)
   * - `cpu` maximum CPU time (ulimit -t)
   * - `data` maximum size of a process's data segment (ulimit -d)
   * - `fsize` maximum size of new files (ulimit -f)
   * - `locks` maximum number of file locks (ulimit -x)
   * - `memlock` maximum amount of locked memory (ulimit -l)
   * - `msgqueue` maximum amount of data in message queues (ulimit -q)
   * - `nice` niceness adjustment (nice -n, ulimit -e)
   * - `nofile` maximum number of open files (ulimit -n)
   * - `nofile` maximum number of open files (1048576); when run by root
   * - `nproc` maximum number of processes (ulimit -u)
   * - `nproc` maximum number of processes (1048576); when run by root
   * - `rss` maximum size of a process's (ulimit -m)
   * - `rtprio` maximum real-time scheduling priority (ulimit -r)
   * - `rttime` maximum amount of real-time execution between blocking syscalls
   * - `sigpending` maximum number of pending signals (ulimit -i)
   * - `stack` maximum stack size (ulimit -s)
   */
  ulimit?: string[]

  /**
   * Create a bind mount. Buildah bind mounts the volume `hostPath` on the host to the `containerPath` in the Buildah container.
   */
  volumes?: string[]
}

export interface ListContainersOptions {
  /**
   * TODO
   */
  all?: boolean

  /**
   * TODO
   */
  filter?: string
}

export interface ListImagesOptions {
  /**
   * TODO
   */
  all?: boolean

  /**
   * TODO
   */
  filter?: string
}

export interface RunOptions {
  /**
   * Add an entry to the history which will note what command is being invoked.
   *
   * **Note:** You can also override the default value by setting the BUILDAH_HISTORY environment variable (`"true"` or `"false"`).
   *
   * @default false
   */
  addHistory?: boolean

  /**
   * Add the specified capability to the set of capabilities which will be granted to the specified command. Certain capabilities are granted by default; this option can be used to add more beyond the defaults, which may have been modified by `capAdd` and `capDrop` options used with the `from()` invocation which created the container.
   */
  capAdd?: string[]

  /**
   * Add the specified capability from the set of capabilities which will be granted to the specified command. The `CAP_AUDIT_WRITE`, `CAP_CHOWN`, `CAP_DAC_OVERRIDE`, `CAP_FOWNER`, `CAP_FSETID`, `CAP_KILL`, `CAP_MKNOD`, `CAP_NET_BIND_SERVICE`, `CAP_SETFCAP`, `CAP_SETGID`, `CAP_SETPCAP`, `CAP_SETUID`, and `CAP_SYS_CHROOT` capabilities are granted by default; this option can be used to remove them from the defaults, which may have been modified by `capAdd` and `capDrop` options used with the buildah from invocation which created the container.
   *
   * If a capability is specified to both the `capAdd` and `capDrop` options, it will be dropped.
   */
  capDrop?: string[]

  /**
   * Set the hostname inside of the running container.
   */
  hostname?: string

  /**
   * Controls what type of isolation is used for running the process. Recognized types include:
   *
   * - `oci`, OCI-compatible runtime (default)
   * - `rootless`, OCI-compatible runtime invoked using a modified configuration, with `--no-new-keyring` added to its create invocation, with network and UTS namespaces disabled, and IPC, PID, and user namespaces enabled; the default for unprivileged users
   * - `chroot`, an internal wrapper that leans more toward chroot(1) than container technology
   *
   * **Note:** You can also override the default isolation type by setting the BUILDAH_ISOLATION environment variable.
   *
   * @default "oci"
   */
  isolation?: string

  /**
   * The path to an alternate OCI-compatible runtime. Default is `runc`, or `crun` when machine is configured to use cgroups V2.
   *
   * **Note:** You can also override the default runtime by setting the `BUILDAH_RUNTIME` environment variable:
   *
   * ```shell
   * export BUILDAH_RUNTIME=/usr/bin/crun
   * ```
   */
  runtime?: string

  /**
   * Adds global flags for the container runtime. To list the supported flags, please consult the manpages of the selected container runtime.
   *
   * **Note:** Do not pass the leading -- to the flag. To pass the runc flag --log-format json, the option given would be `'log-format=json'`.
   */
  runtimeFlag?: string[]

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
   * By default a pseudo-TTY is allocated only when buildah's standard input is attached to a pseudo-TTY. Setting the `tty` option to true will cause a pseudo-TTY to be allocated inside the container connecting the user's "terminal" with the stdin and stdout stream of the container. Setting the `tty` option to false will prevent the pseudo-TTY from being allocated.
   */
  tty?: boolean

  /**
   * Create a bind mount. Buildah bind mounts the volume `hostPath` on the host to the `containerPath` in the Buildah container.
   */
  volumes?: Volume[]

  /**
   * Attach a filesystem mount to the container
   *
   * Current supported mount TYPES are `bind`, and `tmpfs`.
   *
   * ```
   * type=bind,source=/path/on/host,destination=/path/in/container
   * type=tmpfs,tmpfs-size=512M,destination=/path/in/container
   * ```
   *
   * #### Common Options
   *
   * - src, source: mount source spec for bind and volume. Mandatory for bind.
   * - dst, destination, target: mount destination spec.
   * - ro, read-only: true or false (default).
   *
   * #### Options specific to `bind`
   *
   * - bind-propagation: shared, slave, private, rshared, rslave, or rprivate(default). See also mount(2).
   * - bind-nonrecursive: do not setup a recursive bind mount. By default it is recursive.
   *
   * #### Options specific to `tmpfs`
   *
   * - tmpfs-size: Size of the tmpfs mount in bytes. Unlimited by default in Linux.
   * - tmpfs-mode: File mode of the tmpfs in octal. (e.g. 700 or 0700.) Defaults to 1777 in Linux.
   */
  mounts?: string[]

  /**
   * Sets the configuration for the IPC namespaces for the container. The configured value can be:
   *
   * - `""` (the empty string)
   * - `private` to indicate that a new IPC namespace should be created,
   * - `host` to indicate that the IPC namespace in which buildah itself is being run should be reused, or it can be the path to an IPC namespace which is already in use by another process
   */
  ipc?: string
}

export interface Container {
  /**
   * TODO
   */
  id: string

  /**
   * TODO
   */
  builder: boolean

  /**
   * TODO
   */
  imageid: string

  /**
   * TODO
   */
  imagename: string

  /**
   * TODO
   */
  containername: string
}

export interface Image {
  /**
   * TODO
   */
  id: string

  /**
   * TODO
   */
  names: string[]

  /**
   * TODO
   */
  digest: string

  /**
   * TODO
   */
  createdat: string

  /**
   * TODO
   */
  createdatraw: string

  /**
   * TODO
   */
  size: string

  /**
   * TODO
   */
  readonly: boolean

  /**
   * TODO
   */
  history: string[]
}

export interface Volume {
  /**
   * An absolute path to the bind mount location on the **host**.
   */
  hostPath: string

  /**
   * An absolute path to the bind mount location in the **container**.
   */
  containerPath: string

  /**
   * If `true`, mount the volume in read-only mode.
   *
   * @default false
   */
  readOnly?: boolean

  /**
   * If `true`, Buildah will use the correct host UID and GID based on the UID and GID within the container, to change the owner and group of the source volume.
   *
   * By default, Buildah does not change the owner and group of source volume directories mounted into containers. If a container is created in a new user namespace, the UID and GID in the container may correspond to another UID and GID on the host.
   *
   * @default false
   */
  chown?: boolean

  /**
   * Labeling systems like SELinux require that proper labels are placed on volume content mounted into a container. Without a label, the security system might prevent the processes running inside the container from using the content. By default, Buildah does not change the labels set by the OS.
   *
   * Valid options are:
   *
   * - `none` - do not relabel the volume (default)
   * - `shared` - two containers share the volume content, Buildah will label the content with a shared content label, shared volume labels allow all containers to read/write content
   * - `private` - label the content with a private unshared label, only the current container can use a private volume
   *
   * @default 'none'
   */
  relabel?: 'none' | 'shared' | 'private'

  /**
   * By default bind mounted volumes are `private`. That means any mounts done inside container will not be visible on the host and vice versa. This behavior can be changed by specifying a volume mount propagation property.
   *
   * When the mount propagation policy is set to `shared`, any mounts completed inside the container on that volume will be visible to both the host and container.
   *
   * When the mount propagation policy is set to `slave`, one way mount propagation is enabled and any mounts completed on the host for that volume will be visible only inside of the container.
   *
   * The propagation property can be specified only for bind mounted volumes and not for internal volumes or named volumes. For mount propagation to work on the source mount point (the mount point where source dir is mounted on) it has to have the right propagation properties. For shared volumes, the source mount point has to be shared. And for `slave` volumes, the source mount has to be either `shared` or `slave`.
   *
   * Use `df <source-dir>` to determine the source mount and then use `findmnt -o TARGET,PROPAGATION <source-mount-dir>` to determine propagation properties of source mount, if `findmnt` utility is not available, the source mount point can be determined by looking at the mount entry in `/proc/self/mountinfo`. Look at optional fields and see if any propagation properties are specified. `shared:X` means the mount is shared, `master:X` means the mount is `slave` and if nothing is there that means the mount is `private`.
   *
   * To change propagation properties of a mount point use the mount command. For example, to bind mount the source directory `/foo` do `mount --bind /foo /foo` and `mount --make-private --make-shared /foo`. This will convert `/foo` into a `shared` mount point. The propagation properties of the source mount can be changed directly. For instance if `/` is the source mount for `/foo`, then use `mount --make-shared /` to convert `/` into a shared mount.
   */
  mountPropagation?: 'private' | 'shared' | 'slave'
}
