import {booleanFlag, FlagsFor, numberFlag, stringArrayFlag, stringFlag} from './Command'

export interface LayerOptions {
  forceRemove?: boolean
  layers?: boolean
}

export const layerFlags: FlagsFor<LayerOptions> = {
  forceRemove: booleanFlag('--force-rm'),
  layers: booleanFlag('--layers'),
}

export interface UserOptions {
  user?: string
}

export const userFlags: FlagsFor<UserOptions> = {
  user: stringFlag('user'),
}

export interface UserNSOptions {
  userNS?: string
  userNSUIDMap?: string[]
  userNSGIDMap?: string[]
  userNSUIDMapUser?: string
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
  ipc?: string
  network?: string
  cniConfigDir?: string
  cniPlugInPath?: string
  pid?: string
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
  addHost?: string[]
  blobCache?: string
  capAdd?: string[]
  capDrop?: string[]
  cgroupParent?: string
  cpuPeriod?: number
  cpuQuota?: number
  cpuShares?: number
  cpuSetCPUs?: string
  cpuSetMems?: string
  decryptionKeys?: string[]
  devices?: string[]
  dnsSearch?: string[]
  dnsServers?: string[]
  dnsOptions?: string[]
  httpProxy?: boolean
  isolation?: string
  memory?: string
  memorySwap?: string
  arch?: string
  os?: string
  variant?: string
  securityOpt?: string[]
  shmSize?: string
  ulimit?: string[]
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
