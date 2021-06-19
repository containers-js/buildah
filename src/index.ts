import execa from 'execa'
import {AddCommand, AddOptions} from './commands/AddCommand'
import {BudCommand, BudOptions} from './commands/BudCommand'
import {CommitCommand, CommitOptions} from './commands/CommitCommand'
import {ConfigCommand, ConfigOptions} from './commands/ConfigCommand'
import {ContainersCommand, ListContainersOptions} from './commands/ContainersCommand'
import {CopyCommand, CopyOptions} from './commands/CopyCommand'
import {FromCommand, FromOptions} from './commands/FromCommand'
import {ImagesCommand, ListImagesOptions} from './commands/ImagesCommand'
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
const unshareCommand = new UnshareCommand()

export class Buildah {
  command: string
  globalOptions: string[] = []

  constructor(options: GlobalOptions = {}) {
    this.command = options.buildahCommand ?? 'buildah'
  }

  async add(container: string, src: string, dest: string, options: AddOptions = {}) {
    await addCommand.exec(this.command, options, container, src, dest)
  }

  async bud(_: string, options: BudOptions) {
    return await budCommand.exec(this.command, options)
  }

  /**
   * Create an image from a working container.
   *
   * @param container ID of the working container
   * @param options Commit options
   * @returns The image ID of the image that was created
   */
  async commit(container: string, options: CommitOptions = {}) {
    const args = ['commit', ...commitCommand.args(options), container, ...(options.image ? [options.image] : [])]
    const cmd = await execa(this.command, args)
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
    await execa(this.command, ['config', ...configCommand.args(options), container])
  }

  async copy(container: string, src: string, dest: string, options: CopyOptions = {}) {
    await copyCommand.exec(this.command, options, container, src, dest)
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
   * @param containers one or more container IDs to remove
   */
  async rm(container: string, ...additional: string[]) {
    await execa(this.command, ['rm', container, ...additional])
  }

  /**
   * Removes all working containers, unmounting them if necessary
   */
  async rmAll() {
    await execa(this.command, ['rm', '--all'])
  }

  /**
   * Adds additional names to locally-stored images.
   *
   * @param image Local image name
   * @param tag Tag to add to the image
   * @param additionalTags Optional additional tags to add to the image
   */
  async tag(image: string, tag: string, ...additionalTags: string[]) {
    await execa(this.command, ['tag', image, tag, ...additionalTags])
  }

  async unshare(options: UnshareOptions = {}) {
    await unshareCommand.exec(this.command, options)
  }
}

export const buildah = new Buildah()
