import execa from 'execa'
import * as flags from './commandBuilder'
import {
  CommitOptions,
  ConfigOptions,
  Container,
  FromOptions,
  GlobalOptions,
  Image,
  ListContainersOptions,
  ListImagesOptions,
} from './types'

export class Buildah {
  command: string
  globalOptions: string[] = []

  constructor(options: GlobalOptions = {}) {
    this.command = options.buildahCommand ?? 'buildah'
  }

  async commit(container: string, options: CommitOptions = {}) {
    const args: string[] = []
    if (options.authfile) args.push('--authfile', options.authfile)
    if (options.blobCache) args.push('--blob-cache', options.blobCache)
    if (options.certDir) args.push('--cert-dir', options.certDir)
    if (options.creds) args.push('--creds', options.creds)
    if (options.disableCompression) args.push('--disable-compression')
    if (options.encryptionKeys) args.push(...options.encryptionKeys.flatMap((i) => ['--encryption-key', i]))
    if (options.encryptLayers) args.push(...options.encryptLayers.flatMap((i) => ['--encrypt-layer', i.toString()]))
    if (options.format) args.push('--format', options.format)
    if (options.iidfile) args.push('--iidfile', options.iidfile)
    if (options.manifest) args.push('--manifest', options.manifest)
    if (options.omitTimestamp) args.push('--omit-timestamp')
    if (options.quiet) args.push('--quiet')
    if (options.referenceTime) args.push('--reference-time', options.referenceTime)
    if (options.rm) args.push('--rm')
    if (options.signaturePolicy) args.push('--signature-policy', options.signaturePolicy)
    if (options.signBy) args.push('--sign-by', options.signBy)
    if (options.squash) args.push('--squash')
    if (options.timestamp != null) args.push('--timestamp', options.timestamp.toString())
    if (options.tlsVerify) args.push('--tls-verify')

    const cmd = await execa(this.command, ['commit', ...args, container, ...(options.image ? [options.image] : [])])
    return cmd.stdout
  }

  async config(container: string, options: ConfigOptions = {}) {
    const args = [
      flags.booleanFlag('--add-history', options.addHistory),
      flags.stringArrayFlag('--annotation', options.annotation),
      flags.stringFlag('--arch', options.arch),
      flags.stringFlag('--author', options.author),
      flags.stringFlag('--cmd', options.cmd),
      flags.stringFlag('--comment', options.comment),
      flags.stringFlag('--created-by', options.createdBy),
      flags.stringFlag('--domainname', options.domainName),
      flags.stringFlag('--entrypoint', options.entrypoint),
      flags.stringArrayFlag('--env', options.env),
      flags.stringFlag('--healthcheck', options.healthcheck),
      flags.stringFlag('--healthcheck-interval', options.healthcheckInterval),
      flags.numberFlag('--healthcheck-retries', options.healthcheckRetries),
      flags.stringFlag('--healthcheck-start-period', options.healthcheckStartPeriod),
      flags.stringFlag('--healthcheck-timeout', options.healthcheckTimeout),
      flags.stringFlag('--history-comment', options.historyComment),
      flags.stringFlag('--hostname', options.hostname),
      flags.stringArrayFlag('--label', options.label),
      flags.stringArrayFlag('--onbuild', options.onbuild),
      flags.stringFlag('--os', options.os),
      flags.stringArrayFlag('--port', options.ports),
      flags.stringFlag('--shell', options.shell),
      flags.stringFlag('--stop-signal', options.stopSignal),
      flags.stringFlag('--user', options.user),
      flags.stringArrayFlag('--volume', options.volume),
      flags.stringFlag('--workingdir', options.workingDir),
    ].flat()

    await execa(this.command, ['config', ...args, container])
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
    const args: string[] = []

    if (options.authfile) args.push('authfile', options.authfile)
    if (options.certDir) args.push('cert-dir', options.certDir)
    if (options.cidfile) args.push('cidfile', options.cidfile)
    if (options.creds) args.push('creds', options.creds)
    if (options.format) args.push('format', options.format)
    if (options.name) args.push('name', options.name)
    if (options.pull) args.push('pull')
    if (options.pullAlways) args.push('pull-always')
    if (options.pullNever) args.push('pull-never')
    if (options.quiet) args.push('quiet')
    if (options.signaturePolicy) args.push('signature-policy', options.signaturePolicy)
    if (options.tlsVerify) args.push('tls-verify')

    // BudAndFromOptions
    if (options.addHost) args.push(...options.addHost.flatMap((i) => ['--add-host', i]))
    if (options.blobCache) args.push('--blob-cache', options.blobCache)
    if (options.capAdd) args.push(...options.capAdd.flatMap((i) => ['--cap-add', i]))
    if (options.capDrop) args.push(...options.capDrop.flatMap((i) => ['--cap-drop', i]))
    if (options.cgroupParent) args.push('--cgroup-parent', options.cgroupParent)
    if (options.cpuPeriod != null) args.push('--cpu-period', options.cpuPeriod.toString())
    if (options.cpuQuota != null) args.push('--cpu-quota', options.cpuQuota.toString())
    if (options.cpuShares != null) args.push('--cpu-shares', options.cpuShares.toString())
    if (options.cpusetCPUs) args.push('--cpuset-cpus', options.cpusetCPUs)
    if (options.cpusetMems) args.push('--cpuset-mems', options.cpusetMems)
    if (options.decryptionKeys) args.push(...options.decryptionKeys.flatMap((i) => ['--decryption-key', i]))
    if (options.devices) args.push(...options.devices.flatMap((i) => ['--device', i]))
    if (options.dnsSearch) args.push(...options.dnsSearch.flatMap((i) => ['--dns-search', i]))
    if (options.dnsServers) args.push(...options.dnsServers.flatMap((i) => ['--dns', i]))
    if (options.dnsOptions) args.push(...options.dnsOptions.flatMap((i) => ['--dns-option', i]))
    if (options.httpProxy) args.push('--http-proxy')
    if (options.isolation) args.push('--isolation', options.isolation)
    if (options.memory) args.push('--memory', options.memory)
    if (options.memorySwap) args.push('--memory-swap', options.memorySwap)
    if (options.arch) args.push('--arch', options.arch)
    if (options.os) args.push('--os', options.os)
    if (options.variant) args.push('--variant', options.variant)
    if (options.securityOpt) args.push(...options.securityOpt.flatMap((i) => ['--security-opt', i]))
    if (options.shmSize) args.push('--shm-size', options.shmSize)
    if (options.ulimit) args.push(...options.ulimit.flatMap((i) => ['--ulimit', i]))
    if (options.volumes) args.push(...options.volumes.flatMap((i) => ['--volume', i]))

    const cmd = await execa(this.command, ['from', ...args, image])
    return cmd.stdout
  }

  /**
   * Lists containers which appear to be Buildah working containers, their names and IDs, and the names and IDs of the images from which they were initialized.
   *
   * @param options Options to filter the listed containers
   * @returns A list of Buildah containers
   */
  async listContainers(options: ListContainersOptions = {}): Promise<Container[]> {
    const args: string[] = []

    if (options.all) args.push('--all')
    if (options.filter) args.push('--filter', options.filter)

    const cmd = await execa(this.command, ['containers', ...args])
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
    const args: string[] = []

    if (options.all) args.push('--all')
    if (options.filter) args.push('--filter', options.filter)

    const cmd = await execa(this.command, ['images', '--no-trunc', ...args])
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
}

export const buildah = new Buildah()
