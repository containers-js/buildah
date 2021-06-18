# Option Documentation

Below is a mapping to Buildah common options and their TSDoc documentation. They are used by `script/generate-types.js`.

## @addHost

Add a custom host-to-IP mapping by adding lines to `/etc/hosts`. The format is `hostname:ip`.

## @all_images

Show all images, including intermediate images from a build.

## @annotation

Add an image annotation (e.g. `annotation=value`) to the image metadata. Can be used multiple times.

**Note:** this information is not present in Docker image formats, so it is discarded when writing images in Docker formats.

## @arch

Set the ARCH of the image to be pulled to the provided value instead of using the architecture of the host.

Examples: `aarch64`, `arm`, `i686`, `ppc64le`, `s390x`, `x86_64`

## @authfile

Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json`. If `XDG_RUNTIME_DIR` is not set, the default is `/run/containers/$UID/auth.json`.
This file is created using using `buildah login`.

If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using docker login.

**Note:** You can also override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable.

## @blobCache

Assume image blobs in the specified directory will be available for pushing.

## @buildahCommand

Path to the `buildah` binary.

@default buildah

## @capAdd

Add the specified capability to the set of capabilities which will be granted to the specified command. Certain capabilities are granted by default; this option can be used to add more beyond the defaults, which may have been modified by `capAdd` and `capDrop` options used with the `from()` invocation which created the container.

## @capDrop

Add the specified capability from the set of capabilities which will be granted to the specified command. The `CAP_AUDIT_WRITE`, `CAP_CHOWN`, `CAP_DAC_OVERRIDE`, `CAP_FOWNER`, `CAP_FSETID`, `CAP_KILL`, `CAP_MKNOD`, `CAP_NET_BIND_SERVICE`, `CAP_SETFCAP`, `CAP_SETGID`, `CAP_SETPCAP`, `CAP_SETUID`, and `CAP_SYS_CHROOT` capabilities are granted by default; this option can be used to remove them from the defaults, which may have been modified by `capAdd` and `capDrop` options used with the buildah from invocation which created the container.

If a capability is specified to both the `capAdd` and `capDrop` options, it will be dropped.

## @certDir

Use certificates at specified path (`*.crt`, `*.cert`, `*.key`) to connect to the registry. The default certificates directory is `/etc/containers/certs.d`.

## @cgroupParent

Path to cgroups under which the cgroup for the container will be created. If the path is not absolute, the path is considered to be relative to the cgroups path of the init process. Cgroups will be created if they do not already exist.

## @cidfile

Write the container ID to the specified file.

## @cniConfigDir

Location of CNI configuration files which will dictate which plugins will be used to configure network interfaces and routing inside the running container, if the container will be run in its own network namespace, and networking is not disabled.

## @cniPluginPath

List of directories in which the CNI plugins which will be used for configuring network namespaces can be found.

## @cpuPeriod

Limit the container's CPU usage (CFS / Completely Fair Scheduler). This option tell the kernel to restrict the container's CPU usage to the period you specify.

## @cpuQuota

Limit the CPU CFS (Completely Fair Scheduler) quota

Limit the container's CPU usage. By default, containers run with the full CPU resource. This flag tell the kernel to restrict the container's CPU usage to the quota you specify.

## @cpuShares

CPU shares (relative weight)

By default, all containers get the same proportion of CPU cycles. This proportion can be modified by changing the container's CPU share weighting relative to the weighting of all other running containers.

To modify the proportion from the default of 1024, use the `cpuShares` option to set the weighting to 2 or higher.

The proportion will only apply when CPU-intensive processes are running. When tasks in one container are idle, other containers can use the left-over CPU time. The actual amount of CPU time will vary depending on the number of containers running on the system.

For example, consider three containers, one has a cpu-share of 1024 and two others have a cpu-share setting of 512. When processes in all three containers attempt to use 100% of CPU, the first container would receive 50% of the total CPU time. If you add a fourth container with a cpu-share of 1024, the first container only gets 33% of the CPU. The remaining containers receive 16.5%, 16.5% and 33% of the CPU.

On a multi-core system, the shares of CPU time are distributed over all CPU cores. Even if a container is limited to less than 100% of CPU time, it can use 100% of each individual CPU core.

For example, consider a system with more than three cores. If you start one container `{C0}` with `cpuShares: 512` running one process, and another container `{C1}` with `cpuShares: 1024` running two processes, this can result in the following division of CPU shares:

```
PID    container  CPU  CPU share
100    {C0}       0    100% of CPU0
101    {C1}       1    100% of CPU1
102    {C1}       2    100% of CPU2
```

## @cpusetCPUs

CPUs in which to allow execution (format: `0`, `0-3`, `0,1`)

## @cpusetMems

Memory nodes (MEMs) in which to allow execution (format: `0`, `0-3`, `0,1`). Only effective on NUMA systems.

If you have four memory nodes on your system `(0-3)`, use `cpusetMems: '0,1'` then processes in your container will only use memory from the first two memory nodes.

## @creds

The `[username[:password]]` to use to authenticate with the registry if required. If one or both values are not supplied, a command line prompt will appear and the value can be entered. The password is entered without echo.

## @disableCompression

Don't compress filesystem layers when building the image unless it is required by the location where the image is being written. This is the default setting, because image layers are compressed automatically when they are pushed to registries, and images being written to local storage would only need to be decompressed again to be stored. Compression can be forced in all cases by setting to `false`.

## @decryptionKey

The `key` or `key:passphrase` to be used for decryption of images. Key can point to keys and/or certificates. Decryption will be tried with all keys. If the key is protected by a passphrase, it is required to be passed in the argument and omitted otherwise.

## @devices

Add a host device or devices under a directory to the container. The format is `<device-on-host>[:<device-on-container>][:<permissions>]` (e.g. `device: '/dev/sdc:/dev/xvdc:rwm'`)

## @dnsServers

Set custom DNS servers.

This option can be used to override the DNS configuration passed to the container. Typically this is necessary when the host DNS configuration is invalid for the container (e.g., 127.0.0.1). When this is the case, setting `dns` is necessary for every run.

The special value `none` can be specified to disable creation of `/etc/resolv.conf` in the container by Buildah. The `/etc/resolv.conf` file in the image will be used without changes.

## @dnsOptions

Set custom DNS options.

## @dnsSearch

Set custom DNS search domains.

## @encryptionKeys

The encryption protocol and key material required for image encryption. Format `protocol:keyfile`.

Protocol can be JWE (RFC7516), PGP (RFC4880), and PKCS7 (RFC2315) and the key material required for image encryption.

Examples: `jwe:/path/to/key.pem`, `pgp:admin@example.com`, `pkcs7:/path/to/x509-file`

## @encryptLayers

Layer(s) to encrypt: 0-indexed layer indices with support for negative indexing (e.g. 0 is the first layer, -1 is the last layer). If not defined, will encrypt all layers if `encryptionKey` flag is specified.

## @format

Control the format for the built image's manifest and configuration data. Recognized formats include:

- `oci` (OCI image-spec v1.0, the default)
- `docker` (version 2, using schema format 2 for the manifest).

**Note:** You can also override the default format by setting the `BUILDAH_FORMAT` environment variable.

## @hostname

Set the hostname inside of the running container.

## @httpProxy

By default proxy environment variables are passed into the container if set for the Buildah process. This can be disabled by setting the `httpProxy` option to `false`. The environment variables passed in include `http_proxy`, `https_proxy`, `ftp_proxy`, `no_proxy`, and also the upper case versions of those.

@default true

## @iidfile

Write the image ID to the file.

## @ipc

Sets the configuration for the IPC namespaces for the container. The configured value can be:

- `""` (the empty string)
- `private` to indicate that a new IPC namespace should be created,
- `host` to indicate that the IPC namespace in which buildah itself is being run should be reused, or it can be the path to an IPC namespace which is already in use by another process

## @isolation

Controls what type of isolation is used for running the process. Recognized types include:

- `oci`, OCI-compatible runtime (default)
- `rootless`, OCI-compatible runtime invoked using a modified configuration, with `--no-new-keyring` added to its create invocation, with network and UTS namespaces disabled, and IPC, PID, and user namespaces enabled; the default for unprivileged users
- `chroot`, an internal wrapper that leans more toward chroot(1) than container technology

**Note:** You can also override the default isolation type by setting the BUILDAH_ISOLATION environment variable.

@default "oci"

## @manifest

Name of the manifest list to which the image will be added. Creates the manifest list if it does not exist. This option is useful for building multi architecture images.

## @memory

Memory limit (format: `<number>[<unit>]`, where unit = `b`, `k`, `m` or `g`).

Allows you to constrain the memory available to a container. If the host supports swap memory, then the `memory` setting can be larger than physical RAM. If a limit of 0 is specified or the option is omitted, the container's memory is not limited. The actual limit may be rounded up to a multiple of the operating system's page size (the value would be very large, that's millions of trillions).

## @memorySwap

A limit value equal to memory plus swap. Must be used with the `memory` option. The value of `memorySwap` should always be larger than the `memory` value. By default, the value of `memorySwap` will be set to double the value of `memory`.

The format is `<number>[<unit>]`. Unit can be `b` (bytes), `k` (kilobytes), `m` (megabytes), or `g` (gigabytes). If you don't specify a unit, `b` is used. Set to `-1` to enable unlimited swap.

## @mounts

Attach a filesystem mount to the container

Current supported mount TYPES are `bind`, and `tmpfs`.

```
type=bind,source=/path/on/host,destination=/path/in/container
type=tmpfs,tmpfs-size=512M,destination=/path/in/container
```

#### Common Options

- src, source: mount source spec for bind and volume. Mandatory for bind.
- dst, destination, target: mount destination spec.
- ro, read-only: true or false (default).

#### Options specific to `bind`

- bind-propagation: shared, slave, private, rshared, rslave, or rprivate(default). See also mount(2).
- bind-nonrecursive: do not setup a recursive bind mount. By default it is recursive.

#### Options specific to `tmpfs`

- tmpfs-size: Size of the tmpfs mount in bytes. Unlimited by default in Linux.
- tmpfs-mode: File mode of the tmpfs in octal. (e.g. 700 or 0700.) Defaults to 1777 in Linux.

## @name

A name for the working container

## @noPivot

Do not use pivot root to jail process inside rootfs. This should be used whenever the rootfs is on top of a ramdisk.

**Note:** You can make this option the default by setting the `BUILDAH_NOPIVOT` environment variable.

```shell
export BUILDAH_NOPIVOT=true
```

## @network

Sets the configuration for the network namespace for the container.

- `none`, no networking
- `host`, use the host network stack (**note:** the host mode gives the container full access to local system services such as D-bus and is therefore considered insecure)
- `ns:PATH`, path to a network namespace to join
- `private`, create a new namespace for the container (default)

@default private

## @omitTimestamp

Set created timestamp to epoch 0 to allow for deterministic builds

## @os

Set the OS of the image to be pulled to the provided value instead of using the current operating system of the host.

## @pid

Sets the configuration for the PID namespace for the container. The configured value can be:

- `""` (the empty string) or `private` to indicate that a new PID namespace should be created
- `host` to indicate that the PID namespace in which buildah itself is being run should be reused
- `path/to/pid/namespace` path to PID namespace which is already in use by another process

## @pull

When enabled, attempt to pull the latest image from the registries listed in `registries.conf` if a local image does not exist or the image is newer than the one in storage. Raise an error if the image is not in any listed registry and is not present locally.

When disabled, do not pull the image from the registry, use only the local version. Raise an error if the image is not present locally.

@default true

## @pullAlways

Pull the image from the first registry it is found in as listed in `registries.conf`. Raise an error if not found in the registries, even if the image is present locally.

## @pullNever

Do not pull the image from the registry, use only the local version. Raise an error if the image is not present locally.

## @referenceTime

Set the timestamp on the image to match the named `file`.

## @runtime

The path to an alternate OCI-compatible runtime. Default is `runc`, or `crun` when machine is configured to use cgroups V2.

**Note:** You can also override the default runtime by setting the `BUILDAH_RUNTIME` environment variable:

```shell
export BUILDAH_RUNTIME=/usr/bin/crun
```

## @runtimeFlag

Adds global flags for the container runtime. To list the supported flags, please consult the manpages of the selected container runtime.

**Note:** Do not pass the leading -- to the flag. To pass the runc flag --log-format json, the option given would be `'log-format=json'`.

## @securityOpt

Security Options

- `label=user:USER` Set the label user for the container
- `label=role:ROLE` Set the label role for the container
- `label=type:TYPE` Set the label type for the container
- `label=level:LEVEL` Set the label level for the container
- `label=disable` Turn off label confinement for the container
- `no-new-privileges` Not supported
- `seccomp=unconfined` Turn off seccomp confinement for the container
- `seccomp=profile.json` White listed syscalls seccomp JSON file to be used as a seccomp filter
- `apparmor=unconfined` Turn off apparmor confinement for the container
- `apparmor=your-profile` Set the apparmor confinement profile for the container

## @shmSize

Size of `/dev/shm`. The format is `<number>[<unit>]`. number must be greater than 0. Unit is optional and can be `b` (bytes), `k` (kilobytes), `m` (megabytes), or `g` (gigabytes). If you omit the unit, the system uses `b` (bytes). If you omit the size entirely, the system uses `64m`.

@default 64m

## @signBy

Sign the new image using the GPG key that matches the specified fingerprint.

## @signaturePolicy

Path to a signature policy file (not typically used)

## @squash

Squash all of the new image's layers (including those inherited from a base image) into a single new layer.

## @timestamp

Set the create timestamp to seconds since epoch to allow for deterministic builds (defaults to current time). By default, the created timestamp is changed and written into the image manifest with every commit, causing the image's sha256 hash to be different even if the sources are exactly the same otherwise. When `timestamp` is set, the created timestamp is always set to the time specified and therefore not changed, allowing the image's sha256 to remain the same. All files committed to the layers of the image will be created with the timestamp.

## @tlsVerify

Require HTTPS and verification of certificates when talking to container registries. TLS verification cannot be used when talking to an insecure registry.

@default true

## @tty

By default a pseudo-TTY is allocated only when buildah's standard input is attached to a pseudo-TTY. Setting the `tty` option to true will cause a pseudo-TTY to be allocated inside the container connecting the user's "terminal" with the stdin and stdout stream of the container. Setting the `tty` option to false will prevent the pseudo-TTY from being allocated.

## @ulimit

Specifies resource limits to apply to processes launched during `buildah run`. This option can be specified multiple times. Recognized resource types include:

- `core` maximum core dump size (ulimit -c)
- `cpu` maximum CPU time (ulimit -t)
- `data` maximum size of a process's data segment (ulimit -d)
- `fsize` maximum size of new files (ulimit -f)
- `locks` maximum number of file locks (ulimit -x)
- `memlock` maximum amount of locked memory (ulimit -l)
- `msgqueue` maximum amount of data in message queues (ulimit -q)
- `nice` niceness adjustment (nice -n, ulimit -e)
- `nofile` maximum number of open files (ulimit -n)
- `nofile` maximum number of open files (1048576); when run by root
- `nproc` maximum number of processes (ulimit -u)
- `nproc` maximum number of processes (1048576); when run by root
- `rss` maximum size of a process's (ulimit -m)
- `rtprio` maximum real-time scheduling priority (ulimit -r)
- `rttime` maximum amount of real-time execution between blocking syscalls
- `sigpending` maximum number of pending signals (ulimit -i)
- `stack` maximum stack size (ulimit -s)

## @user

Set the user to be used for running the command in the container. The user can be specified as a user name or UID, optionally followed by a group name or GID, separated by a colon (`:`). If names are used, the container should include entries for those names in its `/etc/passwd` and `/etc/group` files.

## @userns

Sets the configuration for user namespaces when the container is subsequently used for `buildah run`. The configured value can be:

- `""` (the empty string) or `container` to indicate that a new user namespace should be created
- `host` to indicate that the user namespace in which Buildah itself is being run should be reused
- `path/to/user/namespace` path to an user namespace which is already in use by another process.

## @userns-uid-map-user

Directly specifies a UID mapping which should be used to set ownership, at the filesystem level, on the container's contents. Commands run using `buildah run` will default to being run in their own user namespaces, configured using the UID and GID maps.

Entries in this map take the form of one or more triples of a starting in-container UID, a corresponding starting host-level UID, and the number of consecutive IDs which the map entry represents.

This option overrides the `remap-uids` setting in the options section of `/etc/containers/storage.conf`.

If this option is not specified, but a global `usernsUidMap` setting is supplied, settings from the global option will be used.

If none of `usernsUidMapUser`, `usernsGidMapGroup`, or `usernsUidMap` are specified, but `usernsGidMap` is specified, the UID map will be set to use the same numeric values as the GID map.

**NOTE:** When this option is specified by a rootless user, the specified mappings are relative to the rootless usernamespace in the container, rather than being relative to the host as it would be when run rootful.

## @usernsGidMapGroup

Directly specifies a GID mapping which should be used to set ownership, at the filesystem level, on the container's contents. Commands run using `buildah run` will default to being run in their own user namespaces, configured using the UID and GID maps.

Entries in this map take the form of one or more triples of a starting in-container GID, a corresponding starting host-level GID, and the number of consecutive IDs which the map entry represents.

This option overrides the `remap-gids` setting in the options section of `/etc/containers/storage.conf`.

If this option is not specified, but a global `usernsGidMap setting is supplied, settings from the global option will be used.

If none of `usernsUidMapUser`, `usernsGidMapGroup`, or `usernsGidMap` are specified, but `usernsUidMap` is specified, the GID map will be set to use the same numeric values as the UID map.

**NOTE:** When this option is specified by a rootless user, the specified mappings are relative to the rootless usernamespace in the container, rather than being relative to the host as it would be when run rootful.

## @usernsUidMapUser

Specifies that a UID mapping which should be used to set ownership, at the filesystem level, on the container's contents, can be found in entries in the `/etc/subuid` file which correspond to the specified user. Commands run using buildah run will default to being run in their own user namespaces, configured using the UID and GID maps. If `usernsGidMapGroup` is specified, but `usernsUidMapUser` is not specified, Buildah will assume that the specified group name is also a suitable user name to use as the default setting for this option.

## @usernsGidMapGroup

Specifies that a GID mapping which should be used to set ownership, at the filesystem level, on the container's contents, can be found in entries in the `/etc/subgid` file which correspond to the specified group. Commands run using buildah run will default to being run in their own user namespaces, configured using the UID and GID maps. If `usernsUidMapUser` is specified, but `usernsGidMapGroup` is not specified, Buildah will assume that the specified user name is also a suitable group name to use as the default setting for this option.

## @uts

Sets the configuration for the UTS namespace for the container. The configured value can be:

- `""` (the empty string) or `private` to indicate that a new UTS namespace should be created
- `host` to indicate that the UTS namespace in which buildah itself is being run should be reused
- `path/to/uts/namespace` path to a UTS namespace which is already in use by another process.

## @variant

Set the architecture variant of the image to be pulled.

## @volumes

Create a bind mount. Buildah bind mounts the volume `hostPath` on the host to the `containerPath` in the Buildah container.
