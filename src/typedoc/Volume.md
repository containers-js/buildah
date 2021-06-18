# Volume typedocs

These typedocs are specific to the `Volume` type and override any definitions in `_common.md`.

## @hostPath

An absolute path to the bind mount location on the **host**.

## @containerPath

An absolute path to the bind mount location in the **container**.

## @readOnly

If `true`, mount the volume in read-only mode.

@default false

## @chown

If `true`, Buildah will use the correct host UID and GID based on the UID and GID within the container, to change the owner and group of the source volume.

By default, Buildah does not change the owner and group of source volume directories mounted into containers. If a container is created in a new user namespace, the UID and GID in the container may correspond to another UID and GID on the host.

@default false

## @relabel

Labeling systems like SELinux require that proper labels are placed on volume content mounted into a container. Without a label, the security system might prevent the processes running inside the container from using the content. By default, Buildah does not change the labels set by the OS.

Valid options are:

- `none` - do not relabel the volume (default)
- `shared` - two containers share the volume content, Buildah will label the content with a shared content label, shared volume labels allow all containers to read/write content
- `private` - label the content with a private unshared label, only the current container can use a private volume

@default 'none'

## @mountPropagation

By default bind mounted volumes are `private`. That means any mounts done inside container will not be visible on the host and vice versa. This behavior can be changed by specifying a volume mount propagation property.

When the mount propagation policy is set to `shared`, any mounts completed inside the container on that volume will be visible to both the host and container.

When the mount propagation policy is set to `slave`, one way mount propagation is enabled and any mounts completed on the host for that volume will be visible only inside of the container.

The propagation property can be specified only for bind mounted volumes and not for internal volumes or named volumes. For mount propagation to work on the source mount point (the mount point where source dir is mounted on) it has to have the right propagation properties. For shared volumes, the source mount point has to be shared. And for `slave` volumes, the source mount has to be either `shared` or `slave`.

Use `df <source-dir>` to determine the source mount and then use `findmnt -o TARGET,PROPAGATION <source-mount-dir>` to determine propagation properties of source mount, if `findmnt` utility is not available, the source mount point can be determined by looking at the mount entry in `/proc/self/mountinfo`. Look at optional fields and see if any propagation properties are specified. `shared:X` means the mount is shared, `master:X` means the mount is `slave` and if nothing is there that means the mount is `private`.

To change propagation properties of a mount point use the mount command. For example, to bind mount the source directory `/foo` do `mount --bind /foo /foo` and `mount --make-private --make-shared /foo`. This will convert `/foo` into a `shared` mount point. The propagation properties of the source mount can be changed directly. For instance if `/` is the source mount for `/foo`, then use `mount --make-shared /` to convert `/` into a shared mount.
