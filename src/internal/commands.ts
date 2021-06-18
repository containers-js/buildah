import {booleanFlag, Command, numberArrayFlag, numberFlag, stringArrayFlag, stringFlag} from './commandFlags'

const layerFlags = {
  forceRm: booleanFlag('--force-rm'),
  layers: booleanFlag('--layers'),
}

const userFlags = {
  user: stringFlag('user'),
}

const userNSFlags = {
  userNS: stringFlag('--userns'),
  userNSUIDMap: stringArrayFlag('--userns-uid-map'),
  userNSGIDMap: stringArrayFlag('--userns-gid-map'),
  userNSUIDMapUser: stringFlag('--userns-uid-map-user'),
  userNSGIDMapGroup: stringFlag('--userns-gid-map-group'),
}

const namespaceFlags = {
  ipc: stringFlag('--ipc'),
  network: stringFlag('--network'),
  cniConfigDir: stringFlag('--cni-config-dir'),
  cniPlugInPath: stringFlag('--cni-plugin-path'),
  pid: stringFlag('--pid'),
  uts: stringFlag('--uts'),
}

const fromAndBudFlags = {
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

class AddCommand extends Command {
  name = 'add'
  flags = {
    addHistory: booleanFlag('--add-history'),
    authfile: stringFlag('--authfile'),
    blobCache: stringFlag('--blob-cache'),
    certDir: stringFlag('--cert-dir'),
    chown: stringFlag('--chown'),
    chmod: stringFlag('--chmod'),
    creds: stringFlag('--creds'),
    from: stringFlag('--from'),
    decryptionKeys: stringArrayFlag('--decryption-key'),
    ignoreFile: stringFlag('--ignorefile'),
    contextdir: stringFlag('--contextdir'),
    quiet: booleanFlag('--quiet'),
    tlsVerify: booleanFlag('--tls-verify'),
    removeSignatures: booleanFlag('--remove-signatures'),
    signaturePolicy: stringFlag('--signature-policy'),
  }
}

export const addCommand = new AddCommand()

class BudCommand extends Command {
  name = 'bud'
  flags = {
    // arch: stringFlag('--arch'),
    annotation: stringFlag('--annotation'),
    authfile: stringFlag('--authfile'),
    buildArg: stringFlag('--build-arg'),
    cacheFrom: stringFlag('--cache-from'),
    certDir: stringFlag('--cert-dir'),
    compress: booleanFlag('--compress'),
    creds: stringFlag('--creds'),
    disableCompression: booleanFlag('--disable-compression'),
    disableContentTrust: booleanFlag('--disable-content-trust'),
    from: stringFlag('--from'),
    ignoreFile: stringFlag('--ignorefile'),
    file: stringArrayFlag('--file'),
    format: stringFlag('--format'),
    iidfile: stringFlag('--iidfile'),
    jobs: numberFlag('--jobs'),
    label: stringFlag('--label'),
    logfile: stringFlag('--logfile'),
    loglevel: numberFlag('--loglevel'),
    logRusage: booleanFlag('--log-rusage'),
    manifest: stringFlag('--manifest'),
    noCache: booleanFlag('--no-cache'),
    // os: stringFlag('--os'),
    platform: stringFlag('--platform'),
    pull: booleanFlag('--pull'),
    pullAlways: booleanFlag('--pull-always'),
    pullNever: booleanFlag('--pull-never'),
    quiet: booleanFlag('--quiet'),
    rm: booleanFlag('--rm'),
    runtimeFlags: stringArrayFlag('--runtime-flag'),
    secrets: stringFlag('--secret'),
    signBy: stringFlag('--sign-by'),
    signaturePolicy: stringFlag('--signature-policy'),
    squash: booleanFlag('--squash'),
    stdin: booleanFlag('--stdin'),
    tag: stringFlag('--tag'),
    target: stringFlag('--target'),
    timestamp: numberFlag('--timestamp'),
    tlsVerify: booleanFlag('--tls-verify'),
    // variant: stringFlag('--variant'),

    ...layerFlags,
    ...fromAndBudFlags,
  }
}

export const budCommand = new BudCommand()

class CommitCommand extends Command {
  name = 'commit'
  flags = {
    image: stringFlag(false),

    authfile: stringFlag('--authfile'),
    blobCache: stringFlag('--blob-cache'),
    encryptionKeys: stringArrayFlag('--encryption-key'),
    encryptLayers: numberArrayFlag('--encrypt-layer'),
    certDir: stringFlag('--cert-dir'),
    creds: stringFlag('--creds'),
    disableCompression: booleanFlag('--disable-compression'),
    format: stringFlag('--format'),
    manifest: stringFlag('--manifest'),
    iidfile: stringFlag('--iidfile'),
    omitTimestamp: booleanFlag('--omit-timestamp'),
    timestamp: numberFlag('--timestamp'),
    quiet: booleanFlag('--quiet'),
    referenceTime: stringFlag('--reference-time'),
    signBy: stringFlag('--sign-by'),
    rm: booleanFlag('--rm'),
    signaturePolicy: stringFlag('--signature-policy'),
    squash: booleanFlag('--squash'),
    tlsVerify: booleanFlag('--tls-verify'),
  }
}

export const commitCommand = new CommitCommand()

class ConfigCommand extends Command {
  name = 'config'
  flags = {
    addHistory: booleanFlag('--add-history'),
    annotation: stringArrayFlag('--annotation'),
    arch: stringFlag('--arch'),
    author: stringFlag('--author'),
    cmd: stringFlag('--cmd'),
    comment: stringFlag('--comment'),
    createdBy: stringFlag('--created-by'),
    domainName: stringFlag('--domainname'),
    entrypoint: stringFlag('--entrypoint'),
    env: stringArrayFlag('--env'),
    healthcheck: stringFlag('--healthcheck'),
    healthcheckInterval: stringFlag('--healthcheck-interval'),
    healthcheckRetries: numberFlag('--healthcheck-retries'),
    healthcheckStartPeriod: stringFlag('--healthcheck-start-period'),
    healthcheckTimeout: stringFlag('--healthcheck-timeout'),
    historyComment: stringFlag('--history-comment'),
    hostname: stringFlag('--hostname'),
    label: stringArrayFlag('--label'),
    onbuild: stringArrayFlag('--onbuild'),
    os: stringFlag('--os'),
    ports: stringArrayFlag('--port'),
    shell: stringFlag('--shell'),
    stopSignal: stringFlag('--stop-signal'),
    user: stringFlag('--user'),
    volume: stringArrayFlag('--volume'),
    workingDir: stringFlag('--workingdir'),
  }
}

export const configCommand = new ConfigCommand()

class CopyCommand extends Command {
  name = 'copy'
  flags = {
    addHistory: booleanFlag('--add-history'),
    authfile: stringFlag('--authfile'),
    blobCache: stringFlag('--blob-cache'),
    certDir: stringFlag('--cert-dir'),
    chown: stringFlag('--chown'),
    chmod: stringFlag('--chmod'),
    creds: stringFlag('--creds'),
    from: stringFlag('--from'),
    decryptionKeys: stringArrayFlag('--decryption-key'),
    ignoreFile: stringFlag('--ignorefile'),
    contextdir: stringFlag('--contextdir'),
    quiet: booleanFlag('--quiet'),
    tlsVerify: booleanFlag('--tls-verify'),
    removeSignatures: booleanFlag('--remove-signatures'),
    signaturePolicy: stringFlag('--signature-policy'),
  }
}

export const copyCommand = new CopyCommand()

class FromCommand extends Command {
  name = 'from'
  flags = {
    authfile: stringFlag('--authfile'),
    certDir: stringFlag('--cert-dir'),
    cidfile: stringFlag('--cidfile'),
    creds: stringFlag('--creds'),
    format: stringFlag('--format'),
    name: stringFlag('--name'),
    pull: booleanFlag('--pull'),
    pullAlways: booleanFlag('--pull-always'),
    pullNever: booleanFlag('--pull-never'),
    quiet: booleanFlag('--quiet'),
    signaturePolicy: stringFlag('--signature-policy'),
    tlsVerify: booleanFlag('--tls-verify'),

    ...fromAndBudFlags,
  }
}

export const fromCommand = new FromCommand()

class ListContainers extends Command {
  name = 'containers'
  typeName = 'ListContainersOptions'
  flags = {
    all: booleanFlag('--all'),
    filter: stringFlag('--filter'),
  }
}

export const listContainers = new ListContainers()

class ListImages extends Command {
  name = 'images'
  typeName = 'ListImagesOptions'
  flags = {
    all: booleanFlag('--all'),
    filter: stringFlag('--filter'),
    noTruncate: booleanFlag('--no-trunc'),
  }
}

export const listImages = new ListImages()

class Pull extends Command {
  name = 'pull'
  flags = {
    allTags: booleanFlag('--all-tags'),
    authfile: stringFlag('--authfile'),
    blobCache: stringFlag('--blob-cache'),
    certDir: stringFlag('--cert-dir'),
    creds: stringFlag('--creds'),
    pullPolicy: stringFlag('--policy'),
    removeSignatures: booleanFlag('--remove-signatures'),
    signaturePolicy: stringFlag('--signature-policy'),
    decryptionKeys: stringArrayFlag('--decryption-key'),
    quiet: booleanFlag('--quiet'),
    os: stringFlag('--os'),
    arch: stringFlag('--arch'),
    variant: stringFlag('--variant'),
    tlsVerify: booleanFlag('--tls-verify'),
  }
}

export const pull = new Pull()

class Push extends Command {
  name = 'push'
  flags = {
    all: booleanFlag('--all'),
    authfile: stringFlag('--authfile'),
    blobCache: stringFlag('--blob-cache'),
    certDir: stringFlag('--cert-dir'),
    creds: stringFlag('--creds'),
    digestfile: stringFlag('--digestfile'),
    disableCompression: booleanFlag('--disable-compression'),
    format: stringFlag('--format'),
    quiet: booleanFlag('--quiet'),
    rm: booleanFlag('--rm'),
    removeSignatures: booleanFlag('--remove-signatures'),
    signBy: stringFlag('--sign-by'),
    signaturePolicy: stringFlag('--signature-policy'),
    encryptionKeys: stringArrayFlag('--encryption-key'),
    encryptLayers: numberArrayFlag('--encrypt-layer'),
    tlsVerify: booleanFlag('--tls-verify'),
  }
}

export const push = new Push()

class Run extends Command {
  name = 'run'
  flags = {
    addHistory: booleanFlag('--add-history'),
    capAdd: stringArrayFlag('--cap-add'),
    capDrop: stringArrayFlag('--cap-drop'),
    hostname: stringFlag('--hostname'),
    isolation: stringFlag('--isolation'),
    runtime: stringFlag('--runtime'),
    runtimeFlag: stringArrayFlag('--runtime-flag'),
    noPivot: booleanFlag('--no-pivot'),
    terminal: booleanFlag('--terminal'),
    volumes: stringArrayFlag('--volume'),
    mounts: stringArrayFlag('--mount'),

    ...userFlags,
    ...namespaceFlags,
  }
}

export const run = new Run()

class Unshare extends Command {
  name = 'unshare'
  flags = {
    mounts: stringArrayFlag('--mount'),
  }
}

export const unshare = new Unshare()

/*







































*/
