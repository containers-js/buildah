import * as execa from 'execa';

interface AddOptions {
    /**
     * If supplied, add to specified destination rather than the container's working directory
     */
    destination?: string;
    /**
     * Add an entry to the history which will note the digest of the added content. Defaults to false.
     *
     * Note: You can also override the default value of --add-history by setting the BUILDAH_HISTORY environment variable.
     *
     * ```shell
     * export BUILDAH_HISTORY=true
     * ```
     */
    addHistory?: boolean;
    /**
     * TODO
     */
    authfile?: string;
    /**
     * TODO
     */
    blobCache?: string;
    /**
     * TODO
     */
    certDir?: string;
    /**
     * Sets the access permissions of the destination content. Accepts the numerical format.
     */
    chmod?: string;
    /**
     * Sets the user and group ownership of the destination content.
     *
     * @example 'owner:group'
     */
    chown?: string;
    /**
     * Build context directory. Specifying a context directory causes Buildah to chroot into that context directory. This means copying files pointed at by symbolic links outside of the chroot will fail.
     */
    contextdir?: string;
    /**
     * TODO
     */
    creds?: string;
    /**
     * TODO
     */
    decryptionKeys?: string[];
    /**
     * Use the root directory of the specified working container or image as the root directory when resolving absolute source paths and the path of the context directory. If an image needs to be pulled, options recognized by `buildah pull` can be used.
     */
    from?: string;
    /**
     * Path to an alternative `.containerignore` (`.dockerignore`) file. Requires `contextdir` be specified.
     */
    ignoreFile?: string;
    /**
     * Refrain from printing a digest of the added content.
     */
    quiet?: boolean;
    /**
     * TODO
     */
    removeSignatures?: boolean;
    /**
     * TODO
     */
    signaturePolicy?: string;
    /**
     * TODO
     */
    tlsVerify?: boolean;
}

interface LayerOptions {
    /**
     * Always remove intermediate containers after a build, even if the build fails (default false).
     */
    forceRemove?: boolean;
    /**
     * Cache intermediate images during the build process (Default is false).
     *
     * Note: You can also override the default value of layers by setting the `BUILDAH_LAYERS` environment variable.
     *
     * ```shell
     * export BUILDAH_LAYERS=true
     * ```
     */
    layers?: boolean;
}
interface UserNSOptions {
    /**
     * Sets the configuration for user namespaces when handling RUN instructions. The configured value can be:
     * - `""` (the empty string) or `private` to indicate that a new user namespace should be created,
     * - `host` to indicate that the user namespace in which buildah itself is being run should be reused,
     * - `path/to/user/namespace` path to an user namespace which is already in use by another process
     */
    userNS?: string;
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
    userNSUIDMap?: string[];
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
    userNSGIDMap?: string[];
    /**
     * Specifies that a UID mapping which should be used to set ownership, at the filesystem level, on the working container's contents, can be found in entries in the `/etc/subuid` file which correspond to the specified user. Commands run when handling `RUN` instructions will default to being run in their own user namespaces, configured using the UID and GID maps. If `userNSGIDMapGroup` is specified, but `userNSUIDMapUser` is not specified, buildah will assume that the specified group name is also a suitable user name to use as the default setting for this option.
     *
     * Users can specify the maps directly using the `userNSUIDMap` option.
     *
     * **NOTE:** When this option is specified by a rootless user, the specified mappings are relative to the rootless user namespace in the container, rather than being relative to the host as it would be when run rootful.
     */
    userNSUIDMapUser?: string;
    /**
     * Specifies that a GID mapping which should be used to set ownership, at the filesystem level, on the working container's contents, can be found in entries in the `/etc/subgid` file which correspond to the specified group. Commands run when handling `RUN` instructions will default to being run in their own user namespaces, configured using the UID and GID maps. If `userNSUIDMapUser` is specified, but `userNSGIDMapGroup` is not specified, buildah will assume that the specified user name is also a suitable group name to use as the default setting for this option.
     *
     * Users can specify the maps directly using the `userNSGIDMap` option.
     *
     * **NOTE:** When this option is specified by a rootless user, the specified mappings are relative to the rootless user namespace in the container, rather than being relative to the host as it would be when run rootful.
     */
    userNSGIDMapGroup?: string;
}
interface NamespaceOptions {
    /**
     * Sets the configuration for IPC namespaces when handling RUN instructions. The configured value can be:
     *
     * - `""` (the empty string) or `container` to indicate that a new IPC namespace should be created
     * - `host` to indicate that the IPC namespace in which buildah itself is being run should be reused
     * - `path/to/ipc/namespace` path to an IPC namespace which is already in use by another process
     */
    ipc?: string;
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
    network?: string;
    /**
     * Location of CNI configuration files which will dictate which plugins will be used to configure network interfaces and routing for containers created for handling `RUN` instructions, if those containers will be run in their own network namespaces, and networking is not disabled.
     */
    cniConfigDir?: string;
    /**
     * Colon-separated list (e.g. `directory:directory:...`) of directories in which the CNI plugins which will be used for configuring network namespaces can be found.
     */
    cniPlugInPath?: string;
    /**
     * Sets the configuration for PID namespaces when handling RUN instructions. The configured value can be:
     *
     * - `""` (the empty string) or `private` to indicate that a new PID namespace should be created,
     * - `host` to indicate that the PID namespace in which buildah itself is being run should be reused
     * - `path/to/pid/namespace` path to a PID namespace which is already in use by another process
     */
    pid?: string;
    /**
     * Sets the configuration for UTS namespaces when the handling `RUN` instructions. The configured value can be:
     *
     * - `""` (the empty string) or `container` to indicate that a new UTS namespace should be created
     * - `host` to indicate that the UTS namespace in which buildah itself is being run should be reused
     * - `path/to/uts/namespace` path to a UTS namespace which is already in use by another process
     */
    uts?: string;
}
interface FromAndBudOptions extends UserNSOptions, NamespaceOptions {
    /**
     * Add a custom host-to-IP mapping (`host:ip`)
     *
     * Add a line to `/etc/hosts`. The format is `hostname:ip`.
     */
    addHost?: string[];
    /**
     * Set the ARCH of the image to be pulled to the provided value instead of using the architecture of the host. (Examples: aarch64, arm, i686, ppc64le, s390x, x86_64)
     */
    arch?: string;
    blobCache?: string;
    /**
     * When executing `RUN` instructions, run the command specified in the instruction with the specified capability added to its capability set. Certain capabilities are granted by default.
     */
    capAdd?: string[];
    /**
     * When executing `RUN` instructions, run the command specified in the instruction with the specified capability removed from its capability set. The CAP_AUDIT_WRITE, CAP_CHOWN, CAP_DAC_OVERRIDE, CAP_FOWNER, CAP_FSETID, CAP_KILL, CAP_MKNOD, CAP_NET_BIND_SERVICE, CAP_SETFCAP, CAP_SETGID, CAP_SETPCAP, CAP_SETUID, and CAP_SYS_CHROOT capabilities are granted by default; this option can be used to remove them.
     *
     * If a capability is specified to both the `capAdd` and `capDrop` options, it will be dropped.
     */
    capDrop?: string[];
    /**
     * Path to cgroups under which the cgroup for the container will be created. If the path is not absolute, the path is considered to be relative to the cgroups path of the init process. Cgroups will be created if they do not already exist.
     */
    cgroupParent?: string;
    /**
     * Set the CPU period for the Completely Fair Scheduler (CFS), which is a duration in microseconds. Once the container's CPU quota is used up, it will not be scheduled to run until the current period ends. Defaults to 100000 microseconds.
     *
     * On some systems, changing the CPU limits may not be allowed for non-root users. For more details, see https://github.com/containers/podman/blob/master/troubleshooting.md#26-running-containers-with-cpu-limits-fails-with-a-permissions-error
     */
    cpuPeriod?: number;
    /**
     * Limit the CPU CFS (Completely Fair Scheduler) quota
     *
     * Limit the container's CPU usage. By default, containers run with the full CPU resource. This flag tell the kernel to restrict the container's CPU usage to the quota you specify.
     *
     * On some systems, changing the CPU limits may not be allowed for non-root users. For more details, see https://github.com/containers/podman/blob/master/troubleshooting.md#26-running-containers-with-cpu-limits-fails-with-a-permissions-error
     */
    cpuQuota?: number;
    /**
     * CPUs in which to allow execution (0-3, 0,1)
     */
    cpuSetCPUs?: string;
    /**
     * Memory nodes (MEMs) in which to allow execution (0-3, 0,1). Only effective on NUMA systems.
     *
     * If you have four memory nodes on your system (0-3), use `cpuSetMems: '0,1'` then processes in your container will only use memory from the first two memory nodes.
     */
    cpuSetMems?: string;
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
    cpuShares?: number;
    /**
     * The `[key[:passphrase]]` to be used for decryption of images. Key can point to keys and/or certificates. Decryption will be tried with all keys. If the key is protected by a passphrase, it is required to be passed in the argument and omitted otherwise.
     */
    decryptionKeys?: string[];
    /**
     * Add a host device to the container. Optional permissions parameter can be used to specify device permissions, it is combination of `r` for read, `w` for write, and `m` for `mknod(2)`.
     */
    devices?: string[];
    /**
     * Set custom DNS options
     */
    dnsOptions?: string[];
    /**
     * Set custom DNS search domains
     */
    dnsSearch?: string[];
    /**
     * Set custom DNS servers
     *
     * This option can be used to override the DNS configuration passed to the container. Typically this is necessary when the host DNS configuration is invalid for the container (e.g., 127.0.0.1). When this is the case the `dnsServers` flag is necessary for every run.
     *
     * The special value `none` can be specified to disable creation of `/etc/resolv.conf` in the container by Buildah. The `/etc/resolv.conf` file in the image will be used without changes.
     */
    dnsServers?: string[];
    /**
     * By default proxy environment variables are passed into the container if set for the buildah process. This can be disabled by setting the `httpProxy` option to `false`. The environment variables passed in include `http_proxy`, `https_proxy`, `ftp_proxy`, `no_proxy`, and also the upper case versions of those.
     */
    httpProxy?: boolean;
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
    isolation?: string;
    /**
     * Memory limit (format: `<number>[<unit>]`, where unit = b, k, m or g)
     *
     * Allows you to constrain the memory available to a container. If the host supports swap memory, then the `memory` setting can be larger than physical RAM. If a limit of 0 is specified (not setting `memory`), the container's memory is not limited. The actual limit may be rounded up to a multiple of the operating system's page size (the value would be very large, that's millions of trillions).
     */
    memory?: string;
    /**
     * A limit value equal to memory plus swap. Must be used with the `memory` option. The swap LIMIT should always be larger than `memory` value. By default, the swap LIMIT will be set to double the value of `memory`.
     *
     * The format of LIMIT is `<number>[<unit>]`. Unit can be b (bytes), k (kilobytes), m (megabytes), or g (gigabytes). If you don't specify a unit, b is used. Set LIMIT to -1 to enable unlimited swap.
     */
    memorySwap?: string;
    /**
     * Set the OS of the image to be pulled instead of using the current operating system of the host.
     */
    os?: string;
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
    securityOpt?: string[];
    /**
     * Size of `/dev/shm`. The format is `<number><unit>`. number must be greater than 0. Unit is optional and can be b (bytes), k (kilobytes), m (megabytes), or g (gigabytes). If you omit the unit, the system uses bytes. If you omit the size entirely, the system uses 64m.
     */
    shmSize?: string;
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
    ulimit?: string[];
    /**
     * Set the architecture variant of the image to be pulled.
     */
    variant?: string;
    /**
     * Create a bind mount.
     */
    volumes?: string[];
}

interface BudOptions extends LayerOptions, FromAndBudOptions {
    /**
     * Add an image annotation (e.g. `annotation=value`) to the image metadata. Can be used multiple times.
     *
     * **Note:** this information is not present in Docker image formats, so it is discarded when writing images in Docker formats.
     */
    annotation?: string;
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
    authfile?: string;
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
    buildArg?: string;
    /**
     * Images to utilise as potential cache sources. Buildah does not currently support --cache-from so this is a NOOP.
     */
    cacheFrom?: string;
    /**
     * Use certificates at specified path (`*.crt`, `*.cert`, `*.key`) to connect to the registry. The default certificates directory is `/etc/containers/certs.d`.
     */
    certDir?: string;
    /**
     * This option is added to be aligned with other containers CLIs. Buildah doesn't send a copy of the context directory to a daemon or a remote server. Thus, compressing the data before sending it is irrelevant to Buildah.
     */
    compress?: boolean;
    /**
     * The `[username[:password]]` to use to authenticate with the registry if required. If one or both values are not supplied, a command line prompt will appear and the value can be entered. The password is entered without echo.
     */
    creds?: string;
    /**
     * Don't compress filesystem layers when building the image unless it is required by the location where the image is being written. This is the default setting, because image layers are compressed automatically when they are pushed to registries, and images being written to local storage would only need to be decompressed again to be stored.
     *
     * Compression can be forced in all cases by specifying `disableCompression: false`.
     */
    disableCompression?: boolean;
    /**
     * This is a Docker specific option to disable image verification to a Docker registry and is not supported by Buildah. This flag is a NOOP and provided solely for scripting compatibility.
     */
    disableContentTrust?: boolean;
    /**
     * Specifies a Containerfile which contains instructions for building the image, either a local file or an http or https URL. If more than one Containerfile is specified, FROM instructions will only be accepted from the first specified file.
     *
     * If a local file is specified as the Containerfile and it does not exist, the context directory will be prepended to the local file value.
     *
     * If you specify `-f -`, the Containerfile contents will be read from stdin.
     */
    file?: string[];
    /**
     * Control the format for the built image's manifest and configuration data. Recognized formats include `oci` (OCI image-spec v1.0, the default) and `docker` (version 2, using schema format 2 for the manifest).
     *
     * **Note:** You can also override the default format by setting the `BUILDAH_FORMAT` environment variable.
     *
     * ```shell
     * export BUILDAH_FORMAT=docker
     * ```
     */
    format?: string;
    /**
     * Overrides the first `FROM` instruction within the Containerfile. If there are multiple `FROM` instructions in a Containerfile, only the first is changed.
     */
    from?: string;
    /**
     * Path to an alternative `.containerignore` (`.dockerignore`) file.
     */
    ignoreFile?: string;
    /**
     * Write the image ID to the file.
     */
    iidfile?: string;
    /**
     * Run up to N concurrent stages in parallel. If the number of jobs is greater than 1, stdin will be read from `/dev/null`. If 0 is specified, then there is no limit in the number of jobs that run in parallel.
     */
    jobs?: number;
    /**
     * Add an image label (e.g. `label=value`) to the image metadata. Can be used multiple times.
     *
     * Users can set a special `LABEL io.containers.capabilities=CAP1,CAP2,CAP3` in a Containerfile that specified the list of Linux capabilities required for the container to run properly. This label specified in a container image tells container engines, like Podman, to run the container with just these capabilities. The container engine launches the container with just the specified capabilities, as long as this list of capabilities is a subset of the default list.
     *
     * If the specified capabilities are not in the default set, container engines should print an error message and will run the container with the default capabilities.
     */
    label?: string;
    /**
     * Log output which would be sent to standard output and standard error to the specified file instead of to standard output and standard error.
     */
    logfile?: string;
    loglevel?: number;
    logRusage?: boolean;
    /**
     * Name of the manifest list to which the image will be added. Creates the manifest list if it does not exist. This option is useful for building multi architecture images.
     */
    manifest?: string;
    noCache?: boolean;
    /**
     * Set the OS/ARCH of the image to the provided value instead of using the current operating system and architecture of the host (for example `linux/arm`). If `platform` is set, then the values of the `arch` and `os` options will be overridden.
     */
    platform?: string;
    /**
     * When the flag is enabled, attempt to pull the latest image from the registries listed in `registries.conf` if a local image does not exist or the image is newer than the one in storage. Raise an error if the image is not in any listed registry and is not present locally.
     *
     * If the flag is disabled (with `pull: false`), do not pull the image from the registry, unless there is no local image. Raise an error if the image is not in any registry and is not present locally.
     */
    pull?: boolean;
    /**
     * Pull the image from the first registry it is found in as listed in `registries.conf`. Raise an error if not found in the registries, even if the image is present locally.
     */
    pullAlways?: boolean;
    /**
     * Do not pull the image from the registry, use only the local version. Raise an error if the image is not present locally.
     */
    pullNever?: boolean;
    /**
     * Suppress output messages which indicate which instruction is being processed, and of progress when pulling images from a registry, and when writing the output image.
     */
    quiet?: boolean;
    /**
     * Remove intermediate containers after a successful build (default true).
     */
    rm?: boolean;
    /**
     * Adds global flags for the container runtime. To list the supported flags, please consult the manpages of the selected container runtime.
     *
     * **Note:** Do not pass the leading `--` to the flag. To pass the runc flag `--log-format json` to `buildah bud`, the option given would be `runtimeFlags: ['log-format=json']`.
     */
    runtimeFlags?: string[];
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
    secrets?: string;
    signaturePolicy?: string;
    /**
     * Sign the built image using the GPG key that matches the specified fingerprint.
     */
    signBy?: string;
    /**
     * Squash all of the image's new layers into a single new layer; any preexisting layers are not squashed.
     */
    squash?: boolean;
    /**
     * Pass stdin into the RUN containers. Sometime commands being RUN within a Containerfile want to request information from the user. For example apt asking for a confirmation for install. Use `stdin` to be able to interact from the terminal during the build.
     */
    stdin?: boolean;
    /**
     * Specifies the name which will be assigned to the resulting image if the build process completes successfully. If imageName does not include a registry name, the registry name localhost will be prepended to the image name.
     */
    tag?: string;
    /**
     * Set the target build stage to build. When building a Containerfile with multiple build stages, `target` can be used to specify an intermediate build stage by name as the final stage for the resulting image. Commands after the target stage will be skipped.
     */
    target?: string;
    /**
     * Set the create timestamp to seconds since epoch to allow for deterministic builds (defaults to current time). By default, the created timestamp is changed and written into the image manifest with every commit, causing the image's sha256 hash to be different even if the sources are exactly the same otherwise. When `timestamp` is set, the created timestamp is always set to the time specified and therefore not changed, allowing the image's sha256 to remain the same. All files committed to the layers of the image will be created with the timestamp.
     */
    timestamp?: number;
    /**
     * Require HTTPS and verification of certificates when talking to container registries (defaults to true). TLS verification cannot be used when talking to an insecure registry.
     */
    tlsVerify?: boolean;
}

interface CommitOptions {
    /**
     * Name of the new image to create. If image does not begin with a registry name component, `localhost` will be added to the name.
     */
    image?: string;
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
    authfile?: string;
    blobCache?: string;
    /**
     * The `[protocol:keyfile]` specifies the encryption protocol, which can be JWE (RFC7516), PGP (RFC4880), and PKCS7 (RFC2315) and the key material required for image encryption. For instance, `jwe:/path/to/key.pem` or `pgp:admin@example.com` or `pkcs7:/path/to/x509-file`.
     */
    encryptionKeys?: string[];
    /**
     * Layer(s) to encrypt: 0-indexed layer indices with support for negative indexing (e.g. 0 is the first layer, -1 is the last layer). If not defined, will encrypt all layers if encryption-key flag is specified.
     */
    encryptLayers?: number[];
    /**
     * Use certificates at specified path (`*.crt`, `*.cert`, `*.key`) to connect to the registry. The default certificates directory is `/etc/containers/certs.d`.
     */
    certDir?: string;
    /**
     * The `[username[:password]]` to use to authenticate with the registry if required. If one or both values are not supplied, a command line prompt will appear and the value can be entered. The password is entered without echo.
     */
    creds?: string;
    /**
     * The `[username[:password]]` to use to authenticate with the registry if required. If one or both values are not supplied, a command line prompt will appear and the value can be entered. The password is entered without echo.
     */
    disableCompression?: boolean;
    /**
     * Control the format for the built image's manifest and configuration data. Recognized formats include `oci` (OCI image-spec v1.0, the default) and `docker` (version 2, using schema format 2 for the manifest).
     *
     * **Note:** You can also override the default format by setting the `BUILDAH_FORMAT` environment variable.
     *
     * ```shell
     * export BUILDAH_FORMAT=docker
     * ```
     */
    format?: string;
    /**
     * Name of the manifest list to which the image will be added. Creates the manifest list if it does not exist. This option is useful for building multi architecture images.
     */
    manifest?: string;
    /**
     * Write the image ID to the file.
     */
    iidfile?: string;
    omitTimestamp?: boolean;
    /**
     * Set the create timestamp to seconds since epoch to allow for deterministic builds (defaults to current time). By default, the created timestamp is changed and written into the image manifest with every commit, causing the image's sha256 hash to be different even if the sources are exactly the same otherwise. When `timestamp` is set, the created timestamp is always set to the time specified and therefore not changed, allowing the image's sha256 to remain the same. All files committed to the layers of the image will be created with the timestamp.
     */
    timestamp?: number;
    /**
     * When writing the output image, suppress progress output.
     */
    quiet?: boolean;
    referenceTime?: string;
    signBy?: string;
    /**
     * Remove the working container and its contents after creating the image. Default leaves the container and its content in place.
     */
    rm?: boolean;
    signaturePolicy?: string;
    /**
     * Squash all of the new image's layers (including those inherited from a base image) into a single new layer.
     */
    squash?: boolean;
    /**
     * Require HTTPS and verification of certificates when talking to container registries (defaults to true). TLS verification cannot be used when talking to an insecure registry.
     */
    tlsVerify?: boolean;
}

interface ConfigOptions {
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
    addHistory?: boolean;
    /**
     * Add an image annotation (e.g. `annotation=annotation`) to the image manifest of any images which will be built using the specified container. Can be used multiple times. If annotation has a trailing `-`, then the annotation is removed from the config. If the annotation is set to `"-"` then all annotations are removed from the config.
     */
    annotation?: string[];
    /**
     * Set the target architecture for any images which will be built using the specified container. By default, if the container was based on an image, that image's target architecture is kept, otherwise the host's architecture is recorded.
     */
    arch?: string;
    /**
     * Set contact information for the author for any images which will be built using the specified container.
     */
    author?: string;
    /**
     * Set the default command to run for containers based on any images which will be built using the specified container. When used in combination with an entry point, this specifies the default parameters for the entry point.
     */
    cmd?: string;
    /**
     * Set the image-level comment for any images which will be built using the specified container.
     *
     * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
     */
    comment?: string;
    /**
     * Set the description of how the topmost layer was created for any images which will be created using the specified container.
     */
    createdBy?: string;
    /**
     * Set the `domainName` to set when running containers based on any images built using the specified container.
     *
     * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
     */
    domainName?: string;
    /**
     * Set the entry point for containers based on any images which will be built using the specified container. buildah supports two formats for entrypoint. It can be specified as a simple string, or as a array of commands.
     *
     * **Note:** When the entrypoint is specified as a string, container runtimes will ignore the cmd value of the container image. However if you use the array form, then the cmd will be appended onto the end of the entrypoint cmd and be executed together.
     */
    entrypoint?: string;
    /**
     * Add a value (e.g. `env=value`) to the environment for containers based on any images which will be built using the specified container. Can be used multiple times. If env has a trailing `-`, then the env is removed from the config. If the env is set to `"-"` then all environment variables are removed from the config.
     */
    env?: string[];
    /**
     * Specify a command which should be run to check if a container is running correctly.
     *
     * Values can be `NONE`, `CMD ...` (run the specified command directly), or `CMD-SHELL ...` (run the specified command using the system's shell), or the empty value (remove a previously-set value and related settings).
     *
     * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
     */
    healthcheck?: string;
    /**
     * Specify how often the command specified using the `healthcheck` option should be run.
     *
     * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
     */
    healthcheckInterval?: string;
    /**
     * Specify how many times the command specified using the `healthcheck` option can fail before the container is considered to be unhealthy.
     *
     * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
     */
    healthcheckRetries?: number;
    /**
     * Specify how much time can elapse after a container has started before a failure to run the command specified using the `healthcheck` option should be treated as an indication that the container is failing. During this time period, failures will be attributed to the container not yet having fully started, and will not be counted as errors. After the command succeeds, or the time period has elapsed, failures will be counted as errors.
     *
     * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
     */
    healthcheckStartPeriod?: string;
    /**
     * Specify how long to wait after starting the command specified using the `healthcheck` option to wait for the command to return its exit status. If the command has not returned within this time, it should be considered to have failed.
     *
     * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
     */
    healthcheckTimeout?: string;
    /**
     * Sets a comment on the topmost layer in any images which will be created using the specified container.
     */
    historyComment?: string;
    /**
     * Set the hostname to set when running containers based on any images built using the specified container.
     *
     * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
     */
    hostname?: string;
    /**
     * Add an image label (e.g. `label=value`) to the image configuration of any images which will be built using the specified container. Can be used multiple times. If label has a trailing `-`, then the label is removed from the config. If the label is set to `"-"` then all labels are removed from the config.
     */
    label?: string[];
    /**
     * Add an `ONBUILD` command to the image. `ONBUILD` commands are automatically run when images are built based on the image you are creating.
     *
     * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
     */
    onbuild?: string[];
    /**
     * Set the target operating system for any images which will be built using the specified container. By default, if the container was based on an image, its OS is kept, otherwise the host's OS's name is recorded.
     */
    os?: string;
    /**
     * Add a port to expose when running containers based on any images which will be built using the specified container. Can be used multiple times. If port has a trailing `-`, and is already set, then the port is removed from the config. If the port is set to `"-"` then all exposed ports settings are removed from the config.
     */
    ports?: string[];
    /**
     * Set the default shell to run inside of the container image. The shell instruction allows the default shell used for the shell form of commands to be overridden. The default shell for Linux containers is `/bin/sh -c`.
     *
     * **Note:** this setting is not present in the OCIv1 image format, so it is discarded when writing images using OCIv1 formats.
     */
    shell?: string;
    /**
     * Set default stop signal for container. This signal will be sent when container is stopped, default is SIGINT.
     */
    stopSignal?: string;
    /**
     * Set the default user to be used when running containers based on this image. The user can be specified as a user name or UID, optionally followed by a group name or GID, separated by a colon (`:`). If names are used, the container should include entries for those names in its `/etc/passwd` and `/etc/group` files.
     */
    user?: string;
    /**
     * Add a location in the directory tree which should be marked as a volume in any images which will be built using the specified container. Can be used multiple times. If volume has a trailing `-`, and is already set, then the volume is removed from the config. If the volume is set to `"-"` then all volumes are removed from the config.
     */
    volume?: string[];
    /**
     * Set the initial working directory for containers based on images which will be built using the specified container.
     */
    workingDir?: string;
}

interface ListContainersOptions {
    /**
     * List information about all containers, including those which were not created by and are not being used by Buildah. Containers created by Buildah are denoted with an `*` in the `BUILDER` column.
     */
    all?: boolean;
    /**
     * Filter output based on conditions provided. Valid filters are listed below:
     *
     * - `id` - container's ID
     * - `name` - container's name
     * - `ancestor` - image or descendant used to create container
     */
    filter?: string;
}

interface CopyOptions {
    /**
     * If supplied, add to specified destination rather than the container's working directory
     */
    destination?: string;
    /**
     * Add an entry to the history which will note the digest of the added content. Defaults to false.
     *
     * **Note:** You can also override the default value of `addHistory` by setting the `BUILDAH_HISTORY` environment variable.
     *
     * ```shell
     * export BUILDAH_HISTORY=true
     * ```
     */
    addHistory?: boolean;
    authfile?: string;
    blobCache?: string;
    certDir?: string;
    /**
     * Sets the access permissions of the destination content. Accepts the numerical format.
     */
    chmod?: string;
    /**
     * Sets the user and group ownership of the destination content.
     */
    chown?: string;
    /**
     * Build context directory. Specifying a context directory causes Buildah to chroot into a the context directory. This means copying files pointed at by symbolic links outside of the chroot will fail.
     */
    contextdir?: string;
    creds?: string;
    decryptionKeys?: string[];
    /**
     * Use the root directory of the specified working container or image as the root directory when resolving absolute source paths and the path of the context directory. If an image needs to be pulled, options recognized by `buildah pull` can be used.
     */
    from?: string;
    /**
     * Path to an alternative `.containerignore` (`.dockerignore`) file. Requires `contextdir` be specified.
     */
    ignoreFile?: string;
    /**
     * Refrain from printing a digest of the copied content.
     */
    quiet?: boolean;
    removeSignatures?: boolean;
    signaturePolicy?: string;
    tlsVerify?: boolean;
}

interface FromOptions {
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
    authfile?: string;
    /**
     * Use certificates at specified path (`*.crt`, `*.cert`, `*.key`) to connect to the registry. The default certificates directory is `/etc/containers/certs.d`.
     */
    certDir?: string;
    /**
     * Write the container ID to the file.
     */
    cidfile?: string;
    /**
     * The `[username[:password]]` to use to authenticate with the registry if required. If one or both values are not supplied, a command line prompt will appear and the value can be entered. The password is entered without echo.
     */
    creds?: string;
    /**
     * Control the format for the built image's manifest and configuration data. Recognized formats include `oci` (OCI image-spec v1.0, the default) and `docker` (version 2, using schema format 2 for the manifest).
     *
     * **Note:** You can also override the default format by setting the `BUILDAH_FORMAT` environment variable.
     *
     * ```shell
     * export BUILDAH_FORMAT=docker
     * ```
     */
    format?: string;
    /**
     * A name for the working container
     */
    name?: string;
    /**
     * When the flag is enabled, attempt to pull the latest image from the registries listed in registries.conf if a local image does not exist or the image is newer than the one in storage. Raise an error if the image is not in any listed registry and is not present locally.
     *
     * If the flag is disabled (with `pull: false`), do not pull the image from the registry, use only the local version. Raise an error if the image is not present locally.
     */
    pull?: boolean;
    /**
     * Pull the image from the first registry it is found in as listed in registries.conf. Raise an error if not found in the registries, even if the image is present locally.
     */
    pullAlways?: boolean;
    /**
     * Do not pull the image from the registry, use only the local version. Raise an error if the image is not present locally.
     */
    pullNever?: boolean;
    /**
     * If an image needs to be pulled from the registry, suppress progress output.
     */
    quiet?: boolean;
    signaturePolicy?: string;
    /**
     * Require HTTPS and verification of certificates when talking to container registries (defaults to true). TLS verification cannot be used when talking to an insecure registry.
     */
    tlsVerify?: boolean;
}

interface ListImagesOptions {
    /**
     * Show all images, including intermediate images from a build.
     */
    all?: boolean;
    /**
     * Filter output based on conditions provided.
     */
    filter?: string;
    /**
     * Do not truncate output.
     */
    noTruncate?: boolean;
}

interface PullOptions {
    /**
     * All tagged images in the repository will be pulled.
     */
    allTags?: boolean;
    /**
     * Set the ARCH of the image to be pulled to the provided value instead of using the architecture of the host. (Examples: aarch64, arm, i686, ppc64le, s390x, x86_64)
     */
    arch?: string;
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
    authfile?: string;
    blobCache?: string;
    /**
     * Use certificates at specified path (`*.crt`, `*.cert`, `*.key`) to connect to the registry. The default certificates directory is `/etc/containers/certs.d`.
     */
    certDir?: string;
    /**
     * The `[username[:password]]` to use to authenticate with the registry if required. If one or both values are not supplied, a command line prompt will appear and the value can be entered. The password is entered without echo.
     */
    creds?: string;
    /**
     * The `[key[:passphrase]]` to be used for decryption of images. Key can point to keys and/or certificates. Decryption will be tried with all keys. If the key is protected by a passphrase, it is required to be passed in the argument and omitted otherwise.
     */
    decryptionKeys?: string[];
    /**
     * Set the OS of the image to be pulled to the provided value instead of using the current operating system of the host.
     */
    os?: string;
    /**
     * Pull image policy. The default is `missing`.
     *
     * * `missing` attempt to pull the latest image from the registries listed in registries.conf if a local image does not exist. Raise an error if the image is not in any listed registry and is not present locally.
     * * `always` Pull the image from the first registry it is found in as listed in registries.conf. Raise an error if not found in the registries, even if the image is present locally.
     * * `never` do not pull the image from the registry, use only the local version. Raise an error if the image is not present locally.
     *
     * @default 'missing'
     */
    pullPolicy?: string;
    /**
     * If an image needs to be pulled from the registry, suppress progress output.
     */
    quiet?: boolean;
    /**
     * Don't copy signatures when pulling images.
     */
    removeSignatures?: boolean;
    signaturePolicy?: string;
    /**
     * Require HTTPS and verification of certificates when talking to container registries (defaults to true). TLS verification cannot be used when talking to an insecure registry.
     */
    tlsVerify?: boolean;
    /**
     * Set the architecture variant of the image to be pulled.
     */
    variant?: string;
}

interface PushOptions {
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
    destination?: string;
    /**
     * If specified image is a manifest list or image index, push the images in addition to the list or index itself.
     */
    all?: boolean;
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
    authfile?: string;
    blobCache?: string;
    /**
     * Use certificates at specified path (`*.crt`, `*.cert`, `*.key`) to connect to the registry. The default certificates directory is `/etc/containers/certs.d`.
     */
    certDir?: string;
    /**
     * The `[username[:password]]` to use to authenticate with the registry if required. If one or both values are not supplied, a command line prompt will appear and the value can be entered. The password is entered without echo.
     */
    creds?: string;
    /**
     * After copying the image, write the digest of the resulting image to the file.
     */
    digestfile?: string;
    /**
     * Don't compress copies of filesystem layers which will be pushed.
     */
    disableCompression?: boolean;
    /**
     * The `[protocol:keyfile]` specifies the encryption protocol, which can be JWE (RFC7516), PGP (RFC4880), and PKCS7 (RFC2315) and the key material required for image encryption. For instance, `jwe:/path/to/key.pem` or `pgp:admin@example.com` or `pkcs7:/path/to/x509-file`.
     */
    encryptionKeys?: string[];
    /**
     * Layer(s) to encrypt: 0-indexed layer indices with support for negative indexing (e.g. 0 is the first layer, -1 is the last layer). If not defined, will encrypt all layers if encryption-key flag is specified.
     */
    encryptLayers?: number[];
    /**
     * Manifest Type (oci, v2s2, or v2s1) to use when pushing an image. (default is manifest type of the source image, with fallbacks)
     */
    format?: string;
    /**
     * When writing the output image, suppress progress output.
     */
    quiet?: boolean;
    /**
     * Don't copy signatures when pushing images.
     */
    removeSignatures?: boolean;
    /**
     * When pushing a the manifest list or image index, delete them from local storage if pushing succeeds.
     */
    rm?: boolean;
    signaturePolicy?: string;
    /**
     * Sign the pushed image using the GPG key that matches the specified fingerprint.
     */
    signBy?: string;
    /**
     * Require HTTPS and verification of certificates when talking to container registries (defaults to true). TLS verification cannot be used when talking to an insecure registry.
     */
    tlsVerify?: boolean;
}

interface RemoveImageOptions {
    /**
     * This option will cause Buildah to remove all containers that are using the image before removing the image from the system.
     */
    force?: boolean;
}

interface UnshareOptions {
    /**
     * Mount the containerNameOrID container while running command, and set the environment variable VARIABLE to the path of the mountpoint. If VARIABLE is not specified, it defaults to containerNameOrID, which may not be a valid name for an environment variable.
     */
    mounts?: string[];
}

interface GlobalOptions {
    /**
     * Path to the `buildah` binary.
     *
     * @default buildah
     */
    buildahCommand?: string;
}
interface Container {
    /**
     * TODO
     */
    id: string;
    /**
     * TODO
     */
    builder: boolean;
    /**
     * TODO
     */
    imageid: string;
    /**
     * TODO
     */
    imagename: string;
    /**
     * TODO
     */
    containername: string;
}
interface Image {
    /**
     * TODO
     */
    id: string;
    /**
     * TODO
     */
    names: string[];
    /**
     * TODO
     */
    digest: string;
    /**
     * TODO
     */
    createdat: string;
    /**
     * TODO
     */
    createdatraw: string;
    /**
     * TODO
     */
    size: string;
    /**
     * TODO
     */
    readonly: boolean;
    /**
     * TODO
     */
    history: string[];
}

declare class Buildah {
    command: string;
    globalOptions: string[];
    constructor(options?: GlobalOptions);
    /**
     * Adds the contents of a file, URL, or a directory to a container's working directory or a specified location in the container. If a local source file appears to be an archive, its contents are extracted and added instead of the archive file itself. If a local directory is specified as a source, its contents are copied to the destination.
     *
     * @param container Container ID
     * @param src One or more sources to copy into the container
     * @param options Add options
     */
    add(container: string, src: string | string[], options?: AddOptions): Promise<void>;
    /**
     * Builds an image using instructions from one or more Containerfiles or Dockerfiles and a specified build context directory. A Containerfile uses the same syntax as a Dockerfile internally. For this document, a file referred to as a Containerfile can be a file named either 'Containerfile' or 'Dockerfile'.
     *
     * The build context directory can be specified as the http(s) URL of an archive, git repository or Containerfile.
     *
     * If no context directory is specified, then Buildah will assume the current working directory as build context, which should contain a Containerfile.
     *
     * Containerfiles ending with a ".in" suffix will be preprocessed via cpp(1). This can be useful to decompose Containerfiles into several reusable parts that can be used via CPP's `#include` directive. Notice, a Containerfile.in file can still be used by other tools when manually preprocessing them via `cpp -E`. Any comments (lines beginning with `#`) in included Containerfile(s) that are not preprocess commands, will be printed as warnings during builds.
     *
     * When the URL is an archive, the contents of the URL is downloaded to a temporary location and extracted before execution.
     *
     * When the URL is a Containerfile, the file is downloaded to a temporary location.
     *
     * When a Git repository is set as the URL, the repository is cloned locally and then set as the context.
  
     * @param context Build context
     * @param options Build options
     */
    bud(context: string, options?: BudOptions): Promise<execa.ExecaReturnValue<string>>;
    /**
     * Create an image from a working container.
     *
     * Writes a new image using the specified container's read-write layer and if it is based on an image, the layers of that image. If image does not begin with a registry name component, `localhost` will be added to the name. If image is not provided, the image will have no name. When an image has no name, the buildah images command will display `<none>` in the `REPOSITORY` and `TAG` columns.
     *
     * @param container ID of the working container
     * @param options Commit options
     * @returns The image ID of the image that was created
     */
    commit(container: string, options?: CommitOptions): Promise<string>;
    /**
     * Update image configuration settings.
     *
     * Updates one or more of the settings kept for a container.
     *
     * @param container Container name or ID
     * @param options Configuration settings to update
     */
    config(container: string, options?: ConfigOptions): Promise<void>;
    /**
     * Copies the contents of a file, URL, or a directory to a container's working directory or a specified location in the container. If a local directory is specified as a source, its contents are copied to the destination.
     *
     * @param container Container ID
     * @param src One or more sources to copy into the container
     * @param options Copy options
     */
    copy(container: string, src: string | string[], options?: CopyOptions): Promise<void>;
    /**
     * Creates a working container based upon the specified image name. If the supplied image name is "scratch" a new empty container is created. Image names use a `transport:details` format.
     *
     * Multiple transports are supported:
     *
     * - `docker://docker-reference` (Default) An image in a registry implementing the "Docker Registry HTTP API V2". By default, uses the authorization state in $XDG\_RUNTIME\_DIR/containers/auth.json, which is set using (buildah login). If XDG_RUNTIME_DIR is not set, the default is /run/containers/$UID/auth.json. If the authorization state is not found there, $HOME/.docker/config.json is checked, which is set using (docker login). If docker-reference does not include a registry name, localhost will be consulted first, followed by any registries named in the registries configuration.
     * - `dir:path` An existing local directory path containing the manifest, layer tarballs, and signatures in individual files. This is a non-standardized format, primarily useful for debugging or noninvasive image inspection.
     * - `docker-archive:path` An image is retrieved as a docker load formatted file.
     * - `docker-daemon:docker-reference` An image docker-reference stored in the docker daemon's internal storage. docker-reference must include either a tag or a digest. Alternatively, when reading images, the format can also be docker-daemon:algo:digest (an image ID).
     * - `oci:path:tag` An image tag in a directory compliant with "Open Container Image Layout Specification" at path.
     * - `oci-archive:path:tag` An image tag in a directory compliant with "Open Container Image Layout Specification" at path.
     *
     * Buildah resolves the path to the registry to pull from by using the /etc/containers/registries.conf file, containers-registries.conf(5). If the buildah from command fails with an "image not known" error, first verify that the registries.conf file is installed and configured appropriately.
     *
     * @param image Base image
     * @param options From options
     * @returns The container ID of the container that was created
     */
    from(image: string, options?: FromOptions): Promise<string>;
    /**
     * Lists containers which appear to be Buildah working containers, their names and IDs, and the names and IDs of the images from which they were initialized.
     *
     * @param options Options to filter the listed containers
     * @returns A list of Buildah containers
     */
    listContainers(options?: ListContainersOptions): Promise<Container[]>;
    /**
     * Lists locally stored images, their names, sizes, created date and their IDs. The created date is displayed in the time locale of the local machine.
     *
     * @param options Options to filter the listed images
     * @returns A list of images in local storage
     */
    listImages(options?: ListImagesOptions): Promise<Image[]>;
    /**
     * List all of the currently mounted containers.
     */
    listMounts(): Promise<{
        container: string;
        mountPoint: string;
    }[]>;
    /**
     * Mounts the specified container's root file system in a location which can be accessed from the host, and returns its location.
     *
     * When running in rootless mode, mount runs in a different namespace so that the mounted volume might not be accessible from the host when using a driver different than `vfs`. To be able to access the file system mounted, you might need to create the mount namespace separately as part of `buildah unshare`. In the environment created with `buildah unshare` you can then use buildah mount and have access to the mounted file system.
     *
     * @param container One or more container IDs to mount
     * @returns List of container IDs and mount points
     */
    mount(container: string | string[]): Promise<{
        container: string;
        mountPoint: string;
    }[]>;
    /**
     * Removes all local images from the system that do not have a tag and do not have a child image pointing to them.
     */
    pruneImages(): Promise<void>;
    /**
     * Pulls an image based upon the specified image name. Image names use a `transport:details` format.
     *
     * Multiple transports are supported:
     *
     * - `docker://docker-reference` (Default) An image in a registry implementing the "Docker Registry HTTP API V2". By default, uses the authorization state in $XDG\_RUNTIME\_DIR/containers/auth.json, which is set using (buildah login). If XDG_RUNTIME_DIR is not set, the default is /run/containers/$UID/auth.json. If the authorization state is not found there, $HOME/.docker/config.json is checked, which is set using (docker login). If docker-reference does not include a registry name, localhost will be consulted first, followed by any registries named in the registries configuration.
     * - `dir:path` An existing local directory path containing the manifest, layer tarballs, and signatures in individual files. This is a non-standardized format, primarily useful for debugging or noninvasive image inspection.
     * - `docker-archive:path` An image is retrieved as a docker load formatted file.
     * - `docker-daemon:docker-reference` An image docker-reference stored in the docker daemon's internal storage. docker-reference must include either a tag or a digest. Alternatively, when reading images, the format can also be docker-daemon:algo:digest (an image ID).
     * - `oci:path:tag` An image tag in a directory compliant with "Open Container Image Layout Specification" at path.
     * - `oci-archive:path:tag` An image tag in a directory compliant with "Open Container Image Layout Specification" at path.
     *
     * Buildah resolves the path to the registry to pull from by using the /etc/containers/registries.conf file, containers-registries.conf(5). If the buildah from command fails with an "image not known" error, first verify that the registries.conf file is installed and configured appropriately.
     *
     * @param image Image name to pull
     * @param options Pull options
     * @returns The image ID of the image that was pulled
     */
    pull(image: string, options?: PullOptions): Promise<string>;
    /**
     * Pushes an image from local storage to a specified destination, decompressing and recompessing layers as needed. By default, the source image ID is used as the destination, but this can be changed via the `destination` option.
     *
     * @param image Image ID to push
     * @param options Push options
     */
    push(image: string, options?: PushOptions): Promise<void>;
    /**
     * Removes one or more working containers, unmounting them if necessary.
     *
     * @param container one or more container IDs to remove
     */
    removeContainer(container: string | string[]): Promise<void>;
    /**
     * Removes all working containers, unmounting them if necessary
     */
    removeAllContainers(): Promise<void>;
    /**
     * Removes one or more locally stored images, along with any of their dangling (untagged) parent images.
     *
     * **Note:** If the image was pushed to a directory path using the 'dir:' transport the rmi command can not remove the image. Instead standard file system commands should be used. If imageID is a name, but does not include a registry name, buildah will attempt to find and remove an image named using the registry name localhost, if no such image is found, it will search for the intended image by attempting to expand the given name using the names of registries provided in the system's registries configuration file, registries.conf.
     *
     * @param image One or more images to remove
     * @param options Remove options
     */
    removeImage(image: string | string[], options?: RemoveImageOptions): Promise<void>;
    /**
     * Removes all locally stored images, along with any of their dangling (untagged) parent images.
     */
    removeAllImages(options?: RemoveImageOptions): Promise<void>;
    /**
     * Rename a local container.
     *
     * @param currentName Current container name
     * @param newName New container name
     */
    renameContainer(currentName: string, newName: string): Promise<void>;
    /**
     * Adds additional names to locally-stored images.
     *
     * @param image Local image name
     * @param tag One or more tags to add to the image
     */
    tag(image: string, tag: string | string[]): Promise<void>;
    /**
     * Unmount the root file system on one or more working containers.
     *
     * @param container One or more container IDs to unmount
     */
    unmount(container: string | string[]): Promise<void>;
    /**
     * Unmounts all currently mounted containers.
     */
    unmountAll(): Promise<void>;
    /**
     * Run a command inside of a modified user namespace.
     *
     * Launches a process (by default, `$SHELL`) in a new user namespace. The user namespace is configured so that the invoking user's UID and primary GID appear to be UID 0 and GID 0, respectively. Any ranges which match that user and group in `/etc/subuid` and `/etc/subgid` are also mapped in as themselves with the help of the newuidmap(1) and newgidmap(1) helpers.
     *
     * buildah unshare is useful for troubleshooting unprivileged operations and for manually clearing storage and other data related to images and containers.
     *
     * It is also useful if you want to use the `buildah mount` command. If an unprivileged users wants to mount and work with a container, then they need to execute buildah unshare. Executing buildah mount fails for unprivileged users unless the user is running inside a buildah unshare session.
     *
     * @param options Unshare options
     */
    unshare(options?: UnshareOptions): Promise<void>;
}
declare const buildah: Buildah;

export { Buildah, buildah };
