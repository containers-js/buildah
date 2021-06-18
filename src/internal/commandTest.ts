import {booleanFlag, Command, numberFlag, stringArrayFlag, stringFlag, TypeOf} from './commandFlags'
import {AddOptions} from './types'

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

  /**
   * This is a test `os`
   */
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
    /**
     * This is a test addHistory
     */
    addHistory: booleanFlag('--add-history'),
    authfile: stringFlag('--authfile'),
    // blobCache: stringFlag('--blob-cache'),
    certDir: stringFlag('--cert-dir'),
    chown: stringFlag('--chown'),
    chmod: stringFlag('--chmod'),
    creds: stringFlag('--creds'),
    from: stringFlag('--from'),
    // decryptionKeys: stringArrayFlag('--decryption-key'),
    ignoreFile: stringFlag('--ignorefile'),
    contextdir: stringFlag('--contextdir'),
    quiet: booleanFlag('--quiet'),
    tlsVerify: booleanFlag('--tls-verify'),
    removeSignatures: booleanFlag('--remove-signatures'),
    signaturePolicy: stringFlag('--signature-policy'),

    ...fromAndBudFlags,
  }
}

export const addCommand = new AddCommand()

export const args: AddOptions = {
  addHistory: true,
}

addCommand.exec('asdf', {os: ''})

type Args2 = TypeOf<typeof fromAndBudFlags>

export const args2: Args2 = {
  os: '',
}

args2.arch = 'asdf'

addCommand.exec('asdf', {
  addHistory: true,
})
