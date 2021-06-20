import {AddCommand, AddOptions} from './commands/AddCommand'
import {BudCommand, BudOptions} from './commands/BudCommand'
import {CommitCommand, CommitOptions} from './commands/CommitCommand'
import {ConfigCommand, ConfigOptions} from './commands/ConfigCommand'
import {ContainersCommand, ListContainersOptions} from './commands/ContainersCommand'
import {CopyCommand, CopyOptions} from './commands/CopyCommand'
import {FromCommand, FromOptions} from './commands/FromCommand'
import {ImagesCommand, ListImagesOptions} from './commands/ImagesCommand'
import {RmCommand} from './commands/RmCommand'
import {TagCommand} from './commands/TagCommand'
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
const rmCommand = new RmCommand()
const tagCommand = new TagCommand()
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

  async bud(_: string, options: BudOptions) {
    return await budCommand.exec(this.command, options)
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
   * Creates a new working container, either from scratch or using a specified image as a starting point.
   *
   * #### Dependencies
   *
   * Buildah resolves the path to the registry to pull from by using the /etc/containers/registries.conf file, containers-registries.conf(5). If the buildah from command fails with an "image not known" error, first verify that the registries.conf file is installed and configured appropriately.
   *
   * #### Parameters
   *
   * @param image
   * Creates a working container based upon the specified image name. If the supplied image name is "scratch" a new empty container is created. Image names use a `transport:details` format.
   *
   * Multiple transports are supported:
   *
   * - `docker://docker-reference` (Default) An image in a registry implementing the "Docker Registry HTTP API V2". By default, uses the authorization state in $XDG\_RUNTIME\_DIR/containers/auth.json, which is set using (buildah login). If XDG_RUNTIME_DIR is not set, the default is /run/containers/$UID/auth.json. If the authorization state is not found there, $HOME/.docker/config.json is checked, which is set using (docker login). If docker-reference does not include a registry name, localhost will be consulted first, followed by any registries named in the registries configuration.
   *
   * - `dir:path` An existing local directory path containing the manifest, layer tarballs, and signatures in individual files. This is a non-standardized format, primarily useful for debugging or noninvasive image inspection.
   *
   * - `docker-archive:path` An image is retrieved as a docker load formatted file.
   *
   * - `docker-daemon:docker-reference` An image docker-reference stored in the docker daemon's internal storage. docker-reference must include either a tag or a digest. Alternatively, when reading images, the format can also be docker-daemon:algo:digest (an image ID).
   *
   * - `oci:path:tag` An image tag in a directory compliant with "Open Container Image Layout Specification" at path.
   *
   * - `oci-archive:path:tag` An image tag in a directory compliant with "Open Container Image Layout Specification" at path.
   *
   * @param options Options for the `from` command
   *
   * #### Returns
   *
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
