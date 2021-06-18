export interface AddOptions {
  /**
   * TODO
   */
  addHistory?: boolean | undefined

  /**
   * TODO
   */
  authfile?: string | undefined

  /**
   * TODO
   */
  blobCache?: string | undefined

  /**
   * TODO
   */
  certDir?: string | undefined

  /**
   * TODO
   */
  chown?: string | undefined

  /**
   * TODO
   */
  chmod?: string | undefined

  /**
   * TODO
   */
  creds?: string | undefined

  /**
   * TODO
   */
  from?: string | undefined

  /**
   * TODO
   */
  decryptionKeys?: string[] | undefined

  /**
   * TODO
   */
  ignoreFile?: string | undefined

  /**
   * TODO
   */
  contextdir?: string | undefined

  /**
   * TODO
   */
  quiet?: boolean | undefined

  /**
   * TODO
   */
  tlsVerify?: boolean | undefined

  /**
   * TODO
   */
  removeSignatures?: boolean | undefined

  /**
   * TODO
   */
  signaturePolicy?: string | undefined
}

export interface BudOptions {
  /**
   * TODO
   */
  annotation?: string | undefined

  /**
   * TODO
   */
  authfile?: string | undefined

  /**
   * TODO
   */
  buildArg?: string | undefined

  /**
   * TODO
   */
  cacheFrom?: string | undefined

  /**
   * TODO
   */
  certDir?: string | undefined

  /**
   * TODO
   */
  compress?: boolean | undefined

  /**
   * TODO
   */
  creds?: string | undefined

  /**
   * TODO
   */
  disableCompression?: boolean | undefined

  /**
   * TODO
   */
  disableContentTrust?: boolean | undefined

  /**
   * TODO
   */
  from?: string | undefined

  /**
   * TODO
   */
  ignoreFile?: string | undefined

  /**
   * TODO
   */
  file?: string[] | undefined

  /**
   * TODO
   */
  format?: string | undefined

  /**
   * TODO
   */
  iidfile?: string | undefined

  /**
   * TODO
   */
  jobs?: number | undefined

  /**
   * TODO
   */
  label?: string | undefined

  /**
   * TODO
   */
  logfile?: string | undefined

  /**
   * TODO
   */
  loglevel?: number | undefined

  /**
   * TODO
   */
  logRusage?: boolean | undefined

  /**
   * TODO
   */
  manifest?: string | undefined

  /**
   * TODO
   */
  noCache?: boolean | undefined

  /**
   * TODO
   */
  platform?: string | undefined

  /**
   * TODO
   */
  pull?: boolean | undefined

  /**
   * TODO
   */
  pullAlways?: boolean | undefined

  /**
   * TODO
   */
  pullNever?: boolean | undefined

  /**
   * TODO
   */
  quiet?: boolean | undefined

  /**
   * TODO
   */
  rm?: boolean | undefined

  /**
   * TODO
   */
  runtimeFlags?: string[] | undefined

  /**
   * TODO
   */
  secrets?: string | undefined

  /**
   * TODO
   */
  signBy?: string | undefined

  /**
   * TODO
   */
  signaturePolicy?: string | undefined

  /**
   * TODO
   */
  squash?: boolean | undefined

  /**
   * TODO
   */
  stdin?: boolean | undefined

  /**
   * TODO
   */
  tag?: string | undefined

  /**
   * TODO
   */
  target?: string | undefined

  /**
   * TODO
   */
  timestamp?: number | undefined

  /**
   * TODO
   */
  tlsVerify?: boolean | undefined

  /**
   * TODO
   */
  forceRm?: boolean | undefined

  /**
   * TODO
   */
  layers?: boolean | undefined

  /**
   * TODO
   */
  addHost?: string[] | undefined

  /**
   * TODO
   */
  blobCache?: string | undefined

  /**
   * TODO
   */
  capAdd?: string[] | undefined

  /**
   * TODO
   */
  capDrop?: string[] | undefined

  /**
   * TODO
   */
  cgroupParent?: string | undefined

  /**
   * TODO
   */
  cpuPeriod?: number | undefined

  /**
   * TODO
   */
  cpuQuota?: number | undefined

  /**
   * TODO
   */
  cpuShares?: number | undefined

  /**
   * TODO
   */
  cpuSetCPUs?: string | undefined

  /**
   * TODO
   */
  cpuSetMems?: string | undefined

  /**
   * TODO
   */
  decryptionKeys?: string[] | undefined

  /**
   * TODO
   */
  devices?: string[] | undefined

  /**
   * TODO
   */
  dnsSearch?: string[] | undefined

  /**
   * TODO
   */
  dnsServers?: string[] | undefined

  /**
   * TODO
   */
  dnsOptions?: string[] | undefined

  /**
   * TODO
   */
  httpProxy?: boolean | undefined

  /**
   * TODO
   */
  isolation?: string | undefined

  /**
   * TODO
   */
  memory?: string | undefined

  /**
   * TODO
   */
  memorySwap?: string | undefined

  /**
   * TODO
   */
  arch?: string | undefined

  /**
   * TODO
   */
  os?: string | undefined

  /**
   * TODO
   */
  variant?: string | undefined

  /**
   * TODO
   */
  securityOpt?: string[] | undefined

  /**
   * TODO
   */
  shmSize?: string | undefined

  /**
   * TODO
   */
  ulimit?: string[] | undefined

  /**
   * TODO
   */
  volumes?: string[] | undefined

  /**
   * TODO
   */
  userNS?: string | undefined

  /**
   * TODO
   */
  userNSUIDMap?: string[] | undefined

  /**
   * TODO
   */
  userNSGIDMap?: string[] | undefined

  /**
   * TODO
   */
  userNSUIDMapUser?: string | undefined

  /**
   * TODO
   */
  userNSGIDMapGroup?: string | undefined

  /**
   * TODO
   */
  ipc?: string | undefined

  /**
   * TODO
   */
  network?: string | undefined

  /**
   * TODO
   */
  cniConfigDir?: string | undefined

  /**
   * TODO
   */
  cniPlugInPath?: string | undefined

  /**
   * TODO
   */
  pid?: string | undefined

  /**
   * TODO
   */
  uts?: string | undefined
}

export interface CommitOptions {
  /**
   * New image name to commit.
   */
  image?: string | undefined

  /**
   * Path of the authentication file. Default is `${XDG_RUNTIME_DIR}/containers/auth.json`. If `XDG_RUNTIME_DIR` is not set, the default is `/run/containers/$UID/auth.json`.
   * This file is created using using `buildah login`.
   *
   * If the authorization state is not found there, `$HOME/.docker/config.json` is checked, which is set using docker login.
   *
   * **Note:** You can also override the default path of the authentication file by setting the `REGISTRY_AUTH_FILE` environment variable.
   */
  authfile?: string | undefined

  /**
   * TODO
   */
  blobCache?: string | undefined

  /**
   * TODO
   */
  encryptionKeys?: string[] | undefined

  /**
   * TODO
   */
  encryptLayers?: number[] | undefined

  /**
   * TODO
   */
  certDir?: string | undefined

  /**
   * TODO
   */
  creds?: string | undefined

  /**
   * TODO
   */
  disableCompression?: boolean | undefined

  /**
   * TODO
   */
  format?: string | undefined

  /**
   * TODO
   */
  manifest?: string | undefined

  /**
   * TODO
   */
  iidfile?: string | undefined

  /**
   * TODO
   */
  omitTimestamp?: boolean | undefined

  /**
   * TODO
   */
  timestamp?: number | undefined

  /**
   * When writing the output image, suppress progress output.
   */
  quiet?: boolean | undefined

  /**
   * TODO
   */
  referenceTime?: string | undefined

  /**
   * TODO
   */
  signBy?: string | undefined

  /**
   * Remove the working container and its contents after creating the image. Default leaves the container and its content in place.
   */
  rm?: boolean | undefined

  /**
   * TODO
   */
  signaturePolicy?: string | undefined

  /**
   * TODO
   */
  squash?: boolean | undefined

  /**
   * TODO
   */
  tlsVerify?: boolean | undefined
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
  addHistory?: boolean | undefined

  /**
   * TODO
   */
  annotation?: string[] | undefined

  /**
   * TODO
   */
  arch?: string | undefined

  /**
   * TODO
   */
  author?: string | undefined

  /**
   * TODO
   */
  cmd?: string | undefined

  /**
   * TODO
   */
  comment?: string | undefined

  /**
   * TODO
   */
  createdBy?: string | undefined

  /**
   * TODO
   */
  domainName?: string | undefined

  /**
   * TODO
   */
  entrypoint?: string | undefined

  /**
   * TODO
   */
  env?: string[] | undefined

  /**
   * TODO
   */
  healthcheck?: string | undefined

  /**
   * TODO
   */
  healthcheckInterval?: string | undefined

  /**
   * TODO
   */
  healthcheckRetries?: number | undefined

  /**
   * TODO
   */
  healthcheckStartPeriod?: string | undefined

  /**
   * TODO
   */
  healthcheckTimeout?: string | undefined

  /**
   * TODO
   */
  historyComment?: string | undefined

  /**
   * TODO
   */
  hostname?: string | undefined

  /**
   * TODO
   */
  label?: string[] | undefined

  /**
   * TODO
   */
  onbuild?: string[] | undefined

  /**
   * TODO
   */
  os?: string | undefined

  /**
   * TODO
   */
  ports?: string[] | undefined

  /**
   * TODO
   */
  shell?: string | undefined

  /**
   * TODO
   */
  stopSignal?: string | undefined

  /**
   * TODO
   */
  user?: string | undefined

  /**
   * TODO
   */
  volume?: string[] | undefined

  /**
   * TODO
   */
  workingDir?: string | undefined
}

export interface CopyOptions {
  /**
   * TODO
   */
  addHistory?: boolean | undefined

  /**
   * TODO
   */
  authfile?: string | undefined

  /**
   * TODO
   */
  blobCache?: string | undefined

  /**
   * TODO
   */
  certDir?: string | undefined

  /**
   * TODO
   */
  chown?: string | undefined

  /**
   * TODO
   */
  chmod?: string | undefined

  /**
   * TODO
   */
  creds?: string | undefined

  /**
   * TODO
   */
  from?: string | undefined

  /**
   * TODO
   */
  decryptionKeys?: string[] | undefined

  /**
   * TODO
   */
  ignoreFile?: string | undefined

  /**
   * TODO
   */
  contextdir?: string | undefined

  /**
   * TODO
   */
  quiet?: boolean | undefined

  /**
   * TODO
   */
  tlsVerify?: boolean | undefined

  /**
   * TODO
   */
  removeSignatures?: boolean | undefined

  /**
   * TODO
   */
  signaturePolicy?: string | undefined
}

export interface FromOptions {
  /**
   * TODO
   */
  authfile?: string | undefined

  /**
   * TODO
   */
  certDir?: string | undefined

  /**
   * TODO
   */
  cidfile?: string | undefined

  /**
   * TODO
   */
  creds?: string | undefined

  /**
   * TODO
   */
  format?: string | undefined

  /**
   * TODO
   */
  name?: string | undefined

  /**
   * TODO
   */
  pull?: boolean | undefined

  /**
   * TODO
   */
  pullAlways?: boolean | undefined

  /**
   * TODO
   */
  pullNever?: boolean | undefined

  /**
   * If an image needs to be pulled from the registry, suppress progress output.
   */
  quiet?: boolean | undefined

  /**
   * TODO
   */
  signaturePolicy?: string | undefined

  /**
   * TODO
   */
  tlsVerify?: boolean | undefined

  /**
   * TODO
   */
  addHost?: string[] | undefined

  /**
   * TODO
   */
  blobCache?: string | undefined

  /**
   * TODO
   */
  capAdd?: string[] | undefined

  /**
   * TODO
   */
  capDrop?: string[] | undefined

  /**
   * TODO
   */
  cgroupParent?: string | undefined

  /**
   * TODO
   */
  cpuPeriod?: number | undefined

  /**
   * TODO
   */
  cpuQuota?: number | undefined

  /**
   * TODO
   */
  cpuShares?: number | undefined

  /**
   * TODO
   */
  cpuSetCPUs?: string | undefined

  /**
   * TODO
   */
  cpuSetMems?: string | undefined

  /**
   * TODO
   */
  decryptionKeys?: string[] | undefined

  /**
   * TODO
   */
  devices?: string[] | undefined

  /**
   * TODO
   */
  dnsSearch?: string[] | undefined

  /**
   * TODO
   */
  dnsServers?: string[] | undefined

  /**
   * TODO
   */
  dnsOptions?: string[] | undefined

  /**
   * TODO
   */
  httpProxy?: boolean | undefined

  /**
   * TODO
   */
  isolation?: string | undefined

  /**
   * TODO
   */
  memory?: string | undefined

  /**
   * TODO
   */
  memorySwap?: string | undefined

  /**
   * TODO
   */
  arch?: string | undefined

  /**
   * TODO
   */
  os?: string | undefined

  /**
   * TODO
   */
  variant?: string | undefined

  /**
   * TODO
   */
  securityOpt?: string[] | undefined

  /**
   * TODO
   */
  shmSize?: string | undefined

  /**
   * TODO
   */
  ulimit?: string[] | undefined

  /**
   * TODO
   */
  volumes?: string[] | undefined

  /**
   * TODO
   */
  userNS?: string | undefined

  /**
   * TODO
   */
  userNSUIDMap?: string[] | undefined

  /**
   * TODO
   */
  userNSGIDMap?: string[] | undefined

  /**
   * TODO
   */
  userNSUIDMapUser?: string | undefined

  /**
   * TODO
   */
  userNSGIDMapGroup?: string | undefined

  /**
   * TODO
   */
  ipc?: string | undefined

  /**
   * TODO
   */
  network?: string | undefined

  /**
   * TODO
   */
  cniConfigDir?: string | undefined

  /**
   * TODO
   */
  cniPlugInPath?: string | undefined

  /**
   * TODO
   */
  pid?: string | undefined

  /**
   * TODO
   */
  uts?: string | undefined
}

export interface ListContainersOptions {
  /**
   * TODO
   */
  all?: boolean | undefined

  /**
   * TODO
   */
  filter?: string | undefined
}

export interface ListImagesOptions {
  /**
   * TODO
   */
  all?: boolean | undefined

  /**
   * TODO
   */
  filter?: string | undefined

  /**
   * TODO
   */
  noTruncate?: boolean | undefined
}

export interface PullOptions {
  /**
   * TODO
   */
  allTags?: boolean | undefined

  /**
   * TODO
   */
  authfile?: string | undefined

  /**
   * TODO
   */
  blobCache?: string | undefined

  /**
   * TODO
   */
  certDir?: string | undefined

  /**
   * TODO
   */
  creds?: string | undefined

  /**
   * TODO
   */
  pullPolicy?: string | undefined

  /**
   * TODO
   */
  removeSignatures?: boolean | undefined

  /**
   * TODO
   */
  signaturePolicy?: string | undefined

  /**
   * TODO
   */
  decryptionKeys?: string[] | undefined

  /**
   * TODO
   */
  quiet?: boolean | undefined

  /**
   * TODO
   */
  os?: string | undefined

  /**
   * TODO
   */
  arch?: string | undefined

  /**
   * TODO
   */
  variant?: string | undefined

  /**
   * TODO
   */
  tlsVerify?: boolean | undefined
}

export interface PushOptions {
  /**
   * TODO
   */
  all?: boolean | undefined

  /**
   * TODO
   */
  authfile?: string | undefined

  /**
   * TODO
   */
  blobCache?: string | undefined

  /**
   * TODO
   */
  certDir?: string | undefined

  /**
   * TODO
   */
  creds?: string | undefined

  /**
   * TODO
   */
  digestfile?: string | undefined

  /**
   * TODO
   */
  disableCompression?: boolean | undefined

  /**
   * TODO
   */
  format?: string | undefined

  /**
   * TODO
   */
  quiet?: boolean | undefined

  /**
   * TODO
   */
  rm?: boolean | undefined

  /**
   * TODO
   */
  removeSignatures?: boolean | undefined

  /**
   * TODO
   */
  signBy?: string | undefined

  /**
   * TODO
   */
  signaturePolicy?: string | undefined

  /**
   * TODO
   */
  encryptionKeys?: string[] | undefined

  /**
   * TODO
   */
  encryptLayers?: number[] | undefined

  /**
   * TODO
   */
  tlsVerify?: boolean | undefined
}

export interface RunOptions {
  /**
   * Add an entry to the history which will note what command is being invoked.
   *
   * **Note:** You can also override the default value by setting the BUILDAH_HISTORY environment variable (`"true"` or `"false"`).
   *
   * @default false
   */
  addHistory?: boolean | undefined

  /**
   * TODO
   */
  capAdd?: string[] | undefined

  /**
   * TODO
   */
  capDrop?: string[] | undefined

  /**
   * TODO
   */
  hostname?: string | undefined

  /**
   * TODO
   */
  isolation?: string | undefined

  /**
   * TODO
   */
  runtime?: string | undefined

  /**
   * TODO
   */
  runtimeFlag?: string[] | undefined

  /**
   * TODO
   */
  noPivot?: boolean | undefined

  /**
   * TODO
   */
  terminal?: boolean | undefined

  /**
   * TODO
   */
  volumes?: string[] | undefined

  /**
   * TODO
   */
  mounts?: string[] | undefined

  /**
   * TODO
   */
  user?: string | undefined

  /**
   * TODO
   */
  ipc?: string | undefined

  /**
   * TODO
   */
  network?: string | undefined

  /**
   * TODO
   */
  cniConfigDir?: string | undefined

  /**
   * TODO
   */
  cniPlugInPath?: string | undefined

  /**
   * TODO
   */
  pid?: string | undefined

  /**
   * TODO
   */
  uts?: string | undefined
}

export interface UnshareOptions {
  /**
   * TODO
   */
  mounts?: string[] | undefined
}

