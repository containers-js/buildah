import {booleanFlag, FlagsFor, numberFlag, stringArrayFlag, stringFlag} from './Command'

export interface LayerOptions {
  /**
   * Always remove intermediate containers after a build, even if the build fails (default false).
   */
  forceRemove?: boolean

  /**
   * Cache intermediate images during the build process (Default is false).
   *
   * Note: You can also override the default value of layers by setting the `BUILDAH_LAYERS` environment variable.
   *
   * ```shell
   * export BUILDAH_LAYERS=true
   * ```
   */
  layers?: boolean
}

export const layerFlags: FlagsFor<LayerOptions> = {
  forceRemove: booleanFlag('--force-rm'),
  layers: booleanFlag('--layers'),
}

export interface UserOptions {
  /**
   * Set the user to be used for running the command in the container. The user can be specified as a user name or UID, optionally followed by a group name or GID, separated by a colon (`:`). If names are used, the container should include entries for those names in its `/etc/passwd` and `/etc/group` files.
   */
  user?: string
}

export const userFlags: FlagsFor<UserOptions> = {
  user: stringFlag('user'),
}

export interface UserNSOptions {
  /**
   * Sets the configuration for user namespaces when handling RUN instructions. The configured value can be:
   * - `""` (the empty string) or `private` to indicate that a new user namespace should be created,
   * - `host` to indicate that the user namespace in which buildah itself is being run should be reused,
   * - `path/to/user/namespace` path to an user namespace which is already in use by another process
   */
  userNS?: string

  /**
   * Directly specifies a UID mapping which should be used to set ownership, at the filesystem level, on the working container's contents. Commands run when handling `RUN` instructions will default to being run in their own user namespaces, configured using the UID and GID maps.
   *
   * Entries in this map take the form of one or more colon-separated triples of a starting in-container UID, a corresponding starting host-level UID, and the number of consecutive IDs which the map entry represents.
   *
   * This option overrides the remap-uids setting in the options section of `/etc/containers/storage.conf`.
   *
   * If this option is not specified, but a global `userNSUIDMap` setting is supplied, settings from the global option will be used.
   *
   * If none of `userNSUIDMapUser`, `userNSGIDMapGroup`, or `userNSUIDMap` are specified, but `userNSGIDMap` is specified, the UID map will be set to use the same numeric values as the GID map.
   *
   * **NOTE:** When this option is specified by a rootless user, the specified mappings are relative to the rootless user namespace in the container, rather than being relative to the host as it would be when run rootful.
   */
  userNSUIDMap?: string[]

  /**
   * Directly specifies a GID mapping which should be used to set ownership, at the filesystem level, on the working container's contents. Commands run when handling `RUN` instructions will default to being run in their own user namespaces, configured using the UID and GID maps.
   *
   * Entries in this map take the form of one or more colon-separated triples of a starting in-container GID, a corresponding starting host-level GID, and the number of consecutive IDs which the map entry represents.
   *
   * This option overrides the `remap-gids` setting in the options section of `/etc/containers/storage.conf`.
   *
   * If this option is not specified, but a global `userNSGIDMap` setting is supplied, settings from the global option will be used.
   *
   * If none of `userNSUIDMapUser`, `userNSGIDMapGroup`, or `userNSGIDMap` are specified, but `userNSUIDMap` is specified, the GID map will be set to use the same numeric values as the UID map.
   *
   * **NOTE:** When this option is specified by a rootless user, the specified mappings are relative to the rootless user namespace in the container, rather than being relative to the host as it would be when run rootful.
   */
  userNSGIDMap?: string[]

  /**
   * Specifies that a UID mapping which should be used to set ownership, at the filesystem level, on the working container's contents, can be found in entries in the `/etc/subuid` file which correspond to the specified user. Commands run when handling `RUN` instructions will default to being run in their own user namespaces, configured using the UID and GID maps. If `userNSGIDMapGroup` is specified, but `userNSUIDMapUser` is not specified, buildah will assume that the specified group name is also a suitable user name to use as the default setting for this option.
   *
   * Users can specify the maps directly using the `userNSUIDMap` option.
   *
   * **NOTE:** When this option is specified by a rootless user, the specified mappings are relative to the rootless user namespace in the container, rather than being relative to the host as it would be when run rootful.
   */
  userNSUIDMapUser?: string

  /**
   * Specifies that a GID mapping which should be used to set ownership, at the filesystem level, on the working container's contents, can be found in entries in the `/etc/subgid` file which correspond to the specified group. Commands run when handling `RUN` instructions will default to being run in their own user namespaces, configured using the UID and GID maps. If `userNSUIDMapUser` is specified, but `userNSGIDMapGroup` is not specified, buildah will assume that the specified user name is also a suitable group name to use as the default setting for this option.
   *
   * Users can specify the maps directly using the `userNSGIDMap` option.
   *
   * **NOTE:** When this option is specified by a rootless user, the specified mappings are relative to the rootless user namespace in the container, rather than being relative to the host as it would be when run rootful.
   */
  userNSGIDMapGroup?: string
}

export const userNSFlags: FlagsFor<UserNSOptions> = {
  userNS: stringFlag('--userns'),
  userNSUIDMap: stringArrayFlag('--userns-uid-map'),
  userNSGIDMap: stringArrayFlag('--userns-gid-map'),
  userNSUIDMapUser: stringFlag('--userns-uid-map-user'),
  userNSGIDMapGroup: stringFlag('--userns-gid-map-group'),
}

export interface NamespaceOptions {
  /**
   * Sets the configuration for IPC namespaces when handling RUN instructions. The configured value can be:
   *
   * - `""` (the empty string) or `container` to indicate that a new IPC namespace should be created
   * - `host` to indicate that the IPC namespace in which buildah itself is being run should be reused
   * - `path/to/ipc/namespace` path to an IPC namespace which is already in use by another process
   */
  ipc?: string

  /**
   * Sets the configuration for network namespaces when handling `RUN` instructions.
   *
   * Valid mode values are:
   *
   * - `none` no networking
   * - `host` use the host network stack. Note: the host mode gives the container full access to local system services such as D-bus and is therefore considered insecure
   * - `ns:path` path to a network namespace to join
   * - `private` create a new namespace for the container (default)
   */
  network?: string

  /**
   * Location of CNI configuration files which will dictate which plugins will be used to configure network interfaces and routing for containers created for handling `RUN` instructions, if those containers will be run in their own network namespaces, and networking is not disabled.
   */
  cniConfigDir?: string

  /**
   * Colon-separated list (e.g. `directory:directory:...`) of directories in which the CNI plugins which will be used for configuring network namespaces can be found.
   */
  cniPlugInPath?: string

  /**
   * Sets the configuration for PID namespaces when handling RUN instructions. The configured value can be:
   *
   * - `""` (the empty string) or `private` to indicate that a new PID namespace should be created,
   * - `host` to indicate that the PID namespace in which buildah itself is being run should be reused
   * - `path/to/pid/namespace` path to a PID namespace which is already in use by another process
   */
  pid?: string

  /**
   * Sets the configuration for UTS namespaces when the handling `RUN` instructions. The configured value can be:
   *
   * - `""` (the empty string) or `container` to indicate that a new UTS namespace should be created
   * - `host` to indicate that the UTS namespace in which buildah itself is being run should be reused
   * - `path/to/uts/namespace` path to a UTS namespace which is already in use by another process
   */
  uts?: string
}

export const namespaceFlags: FlagsFor<NamespaceOptions> = {
  ipc: stringFlag('--ipc'),
  network: stringFlag('--network'),
  cniConfigDir: stringFlag('--cni-config-dir'),
  cniPlugInPath: stringFlag('--cni-plugin-path'),
  pid: stringFlag('--pid'),
  uts: stringFlag('--uts'),
}

export interface FromAndBudOptions extends UserNSOptions, NamespaceOptions {
  /**
   * Add a custom host-to-IP mapping (`host:ip`)
   *
   * Add a line to `/etc/hosts`. The format is `hostname:ip`.
   */
  addHost?: string[]

  /**
   * Set the ARCH of the image to be pulled to the provided value instead of using the architecture of the host. (Examples: aarch64, arm, i686, ppc64le, s390x, x86_64)
   */
  arch?: string
  blobCache?: string

  /**
   * When executing `RUN` instructions, run the command specified in the instruction with the specified capability added to its capability set. Certain capabilities are granted by default.
   */
  capAdd?: string[]

  /**
   * When executing `RUN` instructions, run the command specified in the instruction with the specified capability removed from its capability set. The CAP_AUDIT_WRITE, CAP_CHOWN, CAP_DAC_OVERRIDE, CAP_FOWNER, CAP_FSETID, CAP_KILL, CAP_MKNOD, CAP_NET_BIND_SERVICE, CAP_SETFCAP, CAP_SETGID, CAP_SETPCAP, CAP_SETUID, and CAP_SYS_CHROOT capabilities are granted by default; this option can be used to remove them.
   *
   * If a capability is specified to both the `capAdd` and `capDrop` options, it will be dropped.
   */
  capDrop?: string[]

  /**
   * Path to cgroups under which the cgroup for the container will be created. If the path is not absolute, the path is considered to be relative to the cgroups path of the init process. Cgroups will be created if they do not already exist.
   */
  cgroupParent?: string

  /**
   * Set the CPU period for the Completely Fair Scheduler (CFS), which is a duration in microseconds. Once the container's CPU quota is used up, it will not be scheduled to run until the current period ends. Defaults to 100000 microseconds.
   *
   * On some systems, changing the CPU limits may not be allowed for non-root users. For more details, see https://github.com/containers/podman/blob/master/troubleshooting.md#26-running-containers-with-cpu-limits-fails-with-a-permissions-error
   */
  cpuPeriod?: number

  /**
   * Limit the CPU CFS (Completely Fair Scheduler) quota
   *
   * Limit the container's CPU usage. By default, containers run with the full CPU resource. This flag tell the kernel to restrict the container's CPU usage to the quota you specify.
   *
   * On some systems, changing the CPU limits may not be allowed for non-root users. For more details, see https://github.com/containers/podman/blob/master/troubleshooting.md#26-running-containers-with-cpu-limits-fails-with-a-permissions-error
   */
  cpuQuota?: number

  /**
   * CPUs in which to allow execution (0-3, 0,1)
   */
  cpuSetCPUs?: string

  /**
   * Memory nodes (MEMs) in which to allow execution (0-3, 0,1). Only effective on NUMA systems.
   *
   * If you have four memory nodes on your system (0-3), use `cpuSetMems: '0,1'` then processes in your container will only use memory from the first two memory nodes.
   */
  cpuSetMems?: string

  /**
   * CPU shares (relative weight)
   *
   * By default, all containers get the same proportion of CPU cycles. This proportion can be modified by changing the container's CPU share weighting relative to the weighting of all other running containers.
   *
   * To modify the proportion from the default of 1024, use the `cpuShares` flag to set the weighting to 2 or higher.
   *
   * The proportion will only apply when CPU-intensive processes are running. When tasks in one container are idle, other containers can use the left-over CPU time. The actual amount of CPU time will vary depending on the number of containers running on the system.
   *
   * For example, consider three containers, one has a cpu-share of 1024 and two others have a cpu-share setting of 512. When processes in all three containers attempt to use 100% of CPU, the first container would receive 50% of the total CPU time. If you add a fourth container with a cpu-share of 1024, the first container only gets 33% of the CPU. The remaining containers receive 16.5%, 16.5% and 33% of the CPU.
   *
   * On a multi-core system, the shares of CPU time are distributed over all CPU cores. Even if a container is limited to less than 100% of CPU time, it can use 100% of each individual CPU core.
   *
   * For example, consider a system with more than three cores. If you start one container {C0} with -c=512 running one process, and another container {C1} with -c=1024 running two processes, this can result in the following division of CPU shares:
   *
   * ```text
   * PID    container  CPU  CPU share
   * 100    {C0}       0    100% of CPU0
   * 101    {C1}       1    100% of CPU1
   * 102    {C1}       2    100% of CPU2
   * ```
   */
  cpuShares?: number

  /**
   * The `[key[:passphrase]]` to be used for decryption of images. Key can point to keys and/or certificates. Decryption will be tried with all keys. If the key is protected by a passphrase, it is required to be passed in the argument and omitted otherwise.
   */
  decryptionKeys?: string[]

  /**
   * Add a host device to the container. Optional permissions parameter can be used to specify device permissions, it is combination of `r` for read, `w` for write, and `m` for `mknod(2)`.
   */
  devices?: string[]

  /**
   * Set custom DNS options
   */
  dnsOptions?: string[]

  /**
   * Set custom DNS search domains
   */
  dnsSearch?: string[]

  /**
   * Set custom DNS servers
   *
   * This option can be used to override the DNS configuration passed to the container. Typically this is necessary when the host DNS configuration is invalid for the container (e.g., 127.0.0.1). When this is the case the `dnsServers` flag is necessary for every run.
   *
   * The special value `none` can be specified to disable creation of `/etc/resolv.conf` in the container by Buildah. The `/etc/resolv.conf` file in the image will be used without changes.
   */
  dnsServers?: string[]

  /**
   * By default proxy environment variables are passed into the container if set for the buildah process. This can be disabled by setting the `httpProxy` option to `false`. The environment variables passed in include `http_proxy`, `https_proxy`, `ftp_proxy`, `no_proxy`, and also the upper case versions of those.
   */
  httpProxy?: boolean

  /**
   * Controls what type of isolation is used for running processes as part of `RUN` instructions. Recognized types include:
   *
   * - `oci` OCI-compatible runtime, the default
   * - `rootless` OCI-compatible runtime invoked using a modified configuration, with `--no-new-keyring` added to its create invocation, with network and UTS namespaces disabled, and IPC, PID, and user namespaces enabled; the default for unprivileged users
   * - `chroot` an internal wrapper that leans more toward chroot(1) than container technology
   *
   * **Note:** You can also override the default isolation type by setting the `BUILDAH_ISOLATION` environment variable.
   *
   * ```shell
   * export BUILDAH_ISOLATION=oci
   * ```
   */
  isolation?: string

  /**
   * Memory limit (format: `<number>[<unit>]`, where unit = b, k, m or g)
   *
   * Allows you to constrain the memory available to a container. If the host supports swap memory, then the `memory` setting can be larger than physical RAM. If a limit of 0 is specified (not setting `memory`), the container's memory is not limited. The actual limit may be rounded up to a multiple of the operating system's page size (the value would be very large, that's millions of trillions).
   */
  memory?: string

  /**
   * A limit value equal to memory plus swap. Must be used with the `memory` option. The swap LIMIT should always be larger than `memory` value. By default, the swap LIMIT will be set to double the value of `memory`.
   *
   * The format of LIMIT is `<number>[<unit>]`. Unit can be b (bytes), k (kilobytes), m (megabytes), or g (gigabytes). If you don't specify a unit, b is used. Set LIMIT to -1 to enable unlimited swap.
   */
  memorySwap?: string

  /**
   * Set the OS of the image to be pulled instead of using the current operating system of the host.
   */
  os?: string

  /**
   * Security Options
   *
   * - `apparmor=unconfined` - Turn off apparmor confinement for the container
   * - `apparmor=your-profile` - Set the apparmor confinement profile for the container
   * - `label=user:USER` - Set the label user for the container
   * - `label=role:ROLE` - Set the label role for the container
   * - `label=type:TYPE` - Set the label type for the container
   * - `label=level:LEVEL` - Set the label level for the container
   * - `label=disable` - Turn off label confinement for the container
   * - `no-new-privileges` - Not supported
   * - `seccomp=unconfined` - Turn off seccomp confinement for the container
   * - `seccomp=profile.json` - White listed syscalls seccomp Json file to be used as a seccomp filter
   */
  securityOpt?: string[]

  /**
   * Size of `/dev/shm`. The format is `<number><unit>`. number must be greater than 0. Unit is optional and can be b (bytes), k (kilobytes), m (megabytes), or g (gigabytes). If you omit the unit, the system uses bytes. If you omit the size entirely, the system uses 64m.
   */
  shmSize?: string

  /**
   * Specifies resource limits to apply to processes launched when processing RUN instructions. This option can be specified multiple times. Recognized resource types include:
   *
   * - `core`: maximum core dump size (ulimit -c)
   * - `cpu`: maximum CPU time (ulimit -t)
   * - `data`: maximum size of a process's data segment (ulimit -d)
   * - `fsize`: maximum size of new files (ulimit -f)
   * - `locks`: maximum number of file locks (ulimit -x)
   * - `memlock`: maximum amount of locked memory (ulimit -l)
   * - `msgqueue`: maximum amount of data in message queues (ulimit -q)
   * - `nice`: niceness adjustment (nice -n, ulimit -e)
   * - `nofile`: maximum number of open files (ulimit -n)
   * - `nofile`: maximum number of open files (1048576); when run by root
   * - `nproc`: maximum number of processes (ulimit -u)
   * - `nproc`: maximum number of processes (1048576); when run by root
   * - `rss`: maximum size of a process's (ulimit -m)
   * - `rtprio`: maximum real-time scheduling priority (ulimit -r)
   * - `rttime`: maximum amount of real-time execution between blocking syscalls
   * - `sigpending`: maximum number of pending signals (ulimit -i)
   * - `stack`: maximum stack size (ulimit -s)
   */
  ulimit?: string[]

  /**
   * Set the architecture variant of the image to be pulled.
   */
  variant?: string

  /**
   * Create a bind mount.
   */
  volumes?: string[]
}

export const fromAndBudFlags: FlagsFor<FromAndBudOptions> = {
  addHost: stringArrayFlag('--add-host'),
  blobCache: stringFlag('--blob-cache'),
  capAdd: stringArrayFlag('--cap-add'),
  capDrop: stringArrayFlag('--cap-drop'),
  cgroupParent: stringFlag('--cgroup-parent'),
  cpuPeriod: numberFlag('--cpu-period'),
  cpuQuota: numberFlag('--cpu-quota'),
  cpuShares: numberFlag('--cpu-shares'),
  cpuSetCPUs: stringFlag('--cpuset-cpus'),
  cpuSetMems: stringFlag('--cpuset-mems'),
  decryptionKeys: stringArrayFlag('--decryption-key'),
  devices: stringArrayFlag('--device'),
  dnsSearch: stringArrayFlag('--dns-search'),
  dnsServers: stringArrayFlag('--dns'),
  dnsOptions: stringArrayFlag('--dns-option'),
  httpProxy: booleanFlag('--http-proxy'),
  isolation: stringFlag('--isolation'),
  memory: stringFlag('--memory'),
  memorySwap: stringFlag('--memory-swap'),
  arch: stringFlag('--arch'),
  os: stringFlag('--os'),
  variant: stringFlag('--variant'),
  securityOpt: stringArrayFlag('--security-opt'),
  shmSize: stringFlag('--shm-size'),
  ulimit: stringArrayFlag('--ulimit'),
  volumes: stringArrayFlag('--volume'),

  ...userNSFlags,
  ...namespaceFlags,
}
