import {AddCommand, AddOptions} from './commands/AddCommand'
import {BudCommand, BudOptions} from './commands/BudCommand'
import {CommitCommand, CommitOptions} from './commands/CommitCommand'
import {ConfigCommand, ConfigOptions} from './commands/ConfigCommand'
import {ContainersCommand, ListContainersOptions} from './commands/ContainersCommand'
import {CopyCommand, CopyOptions} from './commands/CopyCommand'
import {FromCommand, FromOptions} from './commands/FromCommand'
import {ImagesCommand, ListImagesOptions} from './commands/ImagesCommand'
import {MountCommand} from './commands/MountCommand'
import {PullCommand, PullOptions} from './commands/PullCommand'
import {PushCommand, PushOptions} from './commands/PushCommand'
import {RenameCommand} from './commands/RenameCommand'
import {RmCommand} from './commands/RmCommand'
import {RemoveImageOptions, RmiCommand} from './commands/RmiCommand'
import {TagCommand} from './commands/TagCommand'
import {UnmountCommand} from './commands/UnmountCommand'
import {UnshareCommand, UnshareOptions} from './commands/UnshareCommand'
import {Container, GlobalOptions, Image} from './types'

const addCommand = new AddCommand()
const budCommand = new BudCommand()
const commitCommand = new CommitCommand()
const configCommand = new ConfigCommand()
const containersCommand = new ContainersCommand()
const copyCommand = new CopyCommand()
const fromCommand = new FromCommand()
const imagesCommand = new ImagesCommand()
const mountCommand = new MountCommand()
const pullCommand = new PullCommand()
const pushCommand = new PushCommand()
const renameCommand = new RenameCommand()
const rmCommand = new RmCommand()
const rmiCommand = new RmiCommand()
const tagCommand = new TagCommand()
const unmountCommand = new UnmountCommand()
const unshareCommand = new UnshareCommand()

export class Buildah {
  command: string
  globalOptions: string[] = []

  constructor(options: GlobalOptions = {}) {
    this.command = options.buildahCommand ?? 'buildah'
  }

  /**
   * Adds the contents of a file, URL, or a directory to a container's working directory or a specified location in the container. If a local source file appears to be an archive, its contents are extracted and added instead of the archive file itself. If a local directory is specified as a source, its contents are copied to the destination.
   *
   * @param container Container ID
   * @param src One or more sources to copy into the container
   * @param options Add options
   */
  async add(container: string, src: string | string[], options: AddOptions = {}) {
    const params = Array.isArray(src) ? src : [src]
    if (options.destination) params.push(options.destination)
    await addCommand.exec(this.command, options, container, ...params)
  }

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
  async bud(context: string, options: BudOptions = {}) {
    return await budCommand.exec(this.command, options, context)
  }

  /**
   * Create an image from a working container.
   *
   * Writes a new image using the specified container's read-write layer and if it is based on an image, the layers of that image. If image does not begin with a registry name component, `localhost` will be added to the name. If image is not provided, the image will have no name. When an image has no name, the buildah images command will display `<none>` in the `REPOSITORY` and `TAG` columns.
   *
   * @param container ID of the working container
   * @param options Commit options
   * @returns The image ID of the image that was created
   */
  async commit(container: string, options: CommitOptions = {}) {
    const params = [container]
    if (options.image) params.push(options.image)
    const cmd = await commitCommand.exec(this.command, options, ...params)
    return cmd.stdout
  }

  /**
   * Update image configuration settings.
   *
   * Updates one or more of the settings kept for a container.
   *
   * @param container Container name or ID
   * @param options Configuration settings to update
   */
  async config(container: string, options: ConfigOptions = {}) {
    await configCommand.exec(this.command, options, container)
  }

  /**
   * Copies the contents of a file, URL, or a directory to a container's working directory or a specified location in the container. If a local directory is specified as a source, its contents are copied to the destination.
   *
   * @param container Container ID
   * @param src One or more sources to copy into the container
   * @param options Copy options
   */
  async copy(container: string, src: string | string[], options: CopyOptions = {}) {
    const params = Array.isArray(src) ? src : [src]
    if (options.destination) params.push(options.destination)
    await copyCommand.exec(this.command, options, container, ...params)
  }

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
  async from(image: string, options: FromOptions = {}): Promise<string> {
    const cmd = await fromCommand.exec(this.command, options, image)
    return cmd.stdout
  }

  /**
   * Lists containers which appear to be Buildah working containers, their names and IDs, and the names and IDs of the images from which they were initialized.
   *
   * @param options Options to filter the listed containers
   * @returns A list of Buildah containers
   */
  async listContainers(options: ListContainersOptions = {}): Promise<Container[]> {
    const cmd = await containersCommand.exec(this.command, options)
    if (cmd.stdout.trim() === 'null') return []
    return JSON.parse(cmd.stdout)
  }

  /**
   * Lists locally stored images, their names, sizes, created date and their IDs. The created date is displayed in the time locale of the local machine.
   *
   * @param options Options to filter the listed images
   * @returns A list of images in local storage
   */
  async listImages(options: ListImagesOptions = {}): Promise<Image[]> {
    const cmd = await imagesCommand.exec(this.command, options, '--no-trunc')
    if (cmd.stdout.trim() === 'null') return []
    return JSON.parse(cmd.stdout)
  }

  /**
   * List all of the currently mounted containers.
   */
  async listMounts() {
    const cmd = await mountCommand.exec(this.command, {})
    return cmd.stdout
      .trim()
      .split('\n')
      .map((line) => {
        const matches = /^(.+) (.+)$/.exec(line)
        if (!matches) throw new Error(`Unknown mount line: ${line}`)
        return {container: matches[1], mountPoint: matches[2]}
      })
  }

  /**
   * Mounts the specified container's root file system in a location which can be accessed from the host, and returns its location.
   *
   * When running in rootless mode, mount runs in a different namespace so that the mounted volume might not be accessible from the host when using a driver different than `vfs`. To be able to access the file system mounted, you might need to create the mount namespace separately as part of `buildah unshare`. In the environment created with `buildah unshare` you can then use buildah mount and have access to the mounted file system.
   *
   * @param container One or more container IDs to mount
   * @returns List of container IDs and mount points
   */
  async mount(container: string | string[]) {
    const params = Array.isArray(container) ? container : [container]
    const cmd = await mountCommand.exec(this.command, {}, ...params)
    return cmd.stdout
      .trim()
      .split('\n')
      .map((line) => {
        const matches = /^(.+) (.+)$/.exec(line)
        if (!matches) throw new Error(`Unknown mount line: ${line}`)
        return {container: matches[1], mountPoint: matches[2]}
      })
  }

  /**
   * Removes all local images from the system that do not have a tag and do not have a child image pointing to them.
   */
  async pruneImages() {
    await rmiCommand.exec(this.command, {}, '--prune')
  }

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
  async pull(image: string, options: PullOptions = {}) {
    const cmd = await pullCommand.exec(this.command, options, image)
    return cmd.stdout
  }

  /**
   * Pushes an image from local storage to a specified destination, decompressing and recompessing layers as needed. By default, the source image ID is used as the destination, but this can be changed via the `destination` option.
   *
   * @param image Image ID to push
   * @param options Push options
   */
  async push(image: string, options: PushOptions = {}) {
    const params = options.destination ? [image, options.destination] : [image]
    await pushCommand.exec(this.command, options, ...params)
  }

  /**
   * Removes one or more working containers, unmounting them if necessary.
   *
   * @param container one or more container IDs to remove
   */
  async removeContainer(container: string | string[]) {
    const params = Array.isArray(container) ? container : [container]
    await rmCommand.exec(this.command, {}, ...params)
  }

  /**
   * Removes all working containers, unmounting them if necessary
   */
  async removeAllContainers() {
    await rmCommand.exec(this.command, {}, '--all')
  }

  /**
   * Removes one or more locally stored images, along with any of their dangling (untagged) parent images.
   *
   * **Note:** If the image was pushed to a directory path using the 'dir:' transport the rmi command can not remove the image. Instead standard file system commands should be used. If imageID is a name, but does not include a registry name, buildah will attempt to find and remove an image named using the registry name localhost, if no such image is found, it will search for the intended image by attempting to expand the given name using the names of registries provided in the system's registries configuration file, registries.conf.
   *
   * @param image One or more images to remove
   * @param options Remove options
   */
  async removeImage(image: string | string[], options: RemoveImageOptions = {}) {
    const params = Array.isArray(image) ? image : [image]
    await rmiCommand.exec(this.command, options, ...params)
  }

  /**
   * Removes all locally stored images, along with any of their dangling (untagged) parent images.
   */
  async removeAllImages(options: RemoveImageOptions = {}) {
    await rmiCommand.exec(this.command, options, '--all')
  }

  /**
   * Rename a local container.
   *
   * @param currentName Current container name
   * @param newName New container name
   */
  async renameContainer(currentName: string, newName: string) {
    await renameCommand.exec(this.command, {}, currentName, newName)
  }

  /**
   * Adds additional names to locally-stored images.
   *
   * @param image Local image name
   * @param tag One or more tags to add to the image
   */
  async tag(image: string, tag: string | string[]) {
    const tags = Array.isArray(tag) ? tag : [tag]
    await tagCommand.exec(this.command, {}, image, ...tags)
  }

  /**
   * Unmount the root file system on one or more working containers.
   *
   * @param container One or more container IDs to unmount
   */
  async unmount(container: string | string[]) {
    const params = Array.isArray(container) ? container : [container]
    await unmountCommand.exec(this.command, {}, ...params)
  }

  /**
   * Unmounts all currently mounted containers.
   */
  async unmountAll() {
    await unmountCommand.exec(this.command, {}, '--all')
  }

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
  async unshare(options: UnshareOptions = {}) {
    await unshareCommand.exec(this.command, options)
  }
}

export const buildah = new Buildah()
