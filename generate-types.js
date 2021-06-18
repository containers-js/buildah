const fs = require('fs')
const prettier = require('prettier')

const docs = fs.readFileSync('src/optionDocs.md', {encoding: 'utf8'})

function getDefinition(key) {
  const regexp = new RegExp(`^# @${key}\\n(.+?)\\n# @`, 'ms')
  const matches = regexp.exec(docs)
  return matches ? matches[1].trim() : ''
}

function formatAsDoc(doc) {
  const lines = doc
    .split(`\n`)
    .map((l) => ` * ${l}`)
    .join('\n')
  return `/**\n${lines}\n */`
}

const types = {
  GlobalOptions: [{def: 'buildahCommand?: string', doc: 'buildahCommand'}],

  CommitOptions: [
    {def: 'image?: string', doc: 'commit_image'},
    {def: 'authfile?: string', doc: 'authfile'},
    {def: 'blobCache?: string', doc: 'blobCache'},
    {def: 'certDir?: string', doc: 'certDir'},
    {def: 'creds?: string', doc: 'creds'},
    {def: 'disableCompression?: boolean', doc: 'disableCompression'},
    {def: 'encryptionKeys?: string[]', doc: 'encryptionKeys'},
    {def: 'encryptLayers?: number[]', doc: 'encryptLayers'},
    {def: 'format?: string', doc: 'format'},
    {def: 'iidfile?: string', doc: 'iidfile'},
    {def: 'manifest?: string', doc: 'manifest'},
    {def: 'omitTimestamp?: boolean', doc: 'omitTimestamp'},
    {def: 'quiet?: boolean', doc: 'quiet_commit'},
    {def: 'referenceTime?: string', doc: 'referenceTime'},
    {def: 'rm?: boolean', doc: 'rm_commit'},
    {def: 'signaturePolicy?: string', doc: 'signaturePolicy'},
    {def: 'signBy?: string', doc: 'signBy'},
    {def: 'squash?: boolean', doc: 'squash'},
    {def: 'timestamp?: number', doc: 'timestamp'},
    {def: 'tlsVerify?: boolean', doc: 'tlsVerify'},
  ],

  ConfigOptions: [
    {def: 'addHistory?: boolean', doc: 'addHistory'}, //, "add-history",
    {def: 'annotation?: string[]', doc: 'annotation'}, //, "annotation", "a
    {def: 'arch?: string', doc: 'arch'}, //, "arch", "",
    {def: 'author?: string', doc: 'author'}, //, "author", "",
    {def: 'cmd?: string', doc: 'cmd'}, //, "cmd", "",
    {def: 'comment?: string', doc: 'comment'}, //, "comment", "",
    {def: 'createdBy?: string', doc: 'createdBy'}, //, "created-by",
    {def: 'domainName?: string', doc: 'domainName'}, //, "domainname", "",
    {def: 'entrypoint?: string', doc: 'entrypoint'}, //, "entrypoint", "",
    {def: 'env?: string[]', doc: 'env'}, //, "env", "e
    {def: 'healthcheck?: string', doc: 'healthcheck'}, //, "healthcheck", "",
    {def: 'healthcheckInterval?: string', doc: 'healthcheckInterval'}, //, "healthcheck-interval",
    {def: 'healthcheckRetries?: number', doc: 'healthcheckRetries'}, //, "healthcheck-retries",
    {def: 'healthcheckStartPeriod?: string', doc: 'healthcheckStartPeriod'}, //, "healthcheck-start-period
    {def: 'healthcheckTimeout?: string', doc: 'healthcheckTimeout'}, //, "healthcheck-timeout",
    {def: 'historyComment?: string', doc: 'historyComment'}, //, "history-comment",
    {def: 'hostname?: string', doc: 'hostname'}, //, "hostname", "",
    {def: 'label?: string[]', doc: 'label'}, //, "label", "l
    {def: 'onbuild?: string[]', doc: 'onbuild'}, //, "onbuild", []
    {def: 'os?: string', doc: 'os'}, //, "os", "",
    {def: 'ports?: string[]', doc: 'ports'}, //, "port", "p
    {def: 'shell?: string', doc: 'shell'}, //, "shell", "",
    {def: 'stopSignal?: string', doc: 'stopSignal'}, //, "stop-signal",
    {def: 'user?: string', doc: 'user'}, //, "user", "u
    {def: 'volume?: string[]', doc: 'volume'}, //, "volume", "v
    {def: 'workingDir?: string', doc: 'workingDir'}, //, "workingdir", "",
  ],

  FromOptions: [
    {def: 'authfile?: string', doc: 'authfile'},
    {def: 'certDir?: string', doc: 'certDir'},
    {def: 'cidfile?: string', doc: 'cidfile'},
    {def: 'creds?: string', doc: 'creds'},
    {def: "format?: 'oci' | 'docker'", doc: 'format'},
    {def: 'name?: string', doc: 'name'},
    {def: 'pull?: boolean', doc: 'pull'},
    {def: 'pullAlways?: boolean', doc: 'pullAlways'},
    {def: 'pullNever?: boolean', doc: 'pullNever'},
    {def: 'quiet?: boolean', doc: 'quiet_pull'},
    {def: 'signaturePolicy?: string', doc: 'signaturePolicy'},
    {def: 'tlsVerify?: boolean', doc: 'tlsVerify'},

    {def: 'addHost?: string[]', doc: 'addHost'},
    {def: 'blobCache?: string', doc: 'blobCache'},
    {def: 'capAdd?: string[]', doc: 'capAdd'},
    {def: 'capDrop?: string[]', doc: 'capDrop'},
    {def: 'cgroupParent?: string', doc: 'cgroupParent'},
    {def: 'cpuPeriod?: number', doc: 'cpuPeriod'},
    {def: 'cpuQuota?: number', doc: 'cpuQuota'},
    {def: 'cpuShares?: number', doc: 'cpuShares'},
    {def: 'cpusetCPUs?: string', doc: 'cpusetCPUs'},
    {def: 'cpusetMems?: string', doc: 'cpusetMems'},
    {def: 'decryptionKeys?: string[]', doc: 'decryptionKeys'},
    {def: 'devices?: string[]', doc: 'devices'},
    {def: 'dnsSearch?: string[]', doc: 'dnsSearch'},
    {def: 'dnsServers?: string[]', doc: 'dnsServers'},
    {def: 'dnsOptions?: string[]', doc: 'dnsOptions'},
    {def: 'httpProxy?: boolean', doc: 'httpProxy'},
    {def: 'isolation?: string', doc: 'isolation'},
    {def: 'memory?: string', doc: 'memory'},
    {def: 'memorySwap?: string', doc: 'memorySwap'},
    {def: 'arch?: string', doc: 'arch'},
    {def: 'os?: string', doc: 'os'},
    {def: 'variant?: string', doc: 'variant'},
    {def: 'securityOpt?: string[]', doc: 'securityOpt'},
    {def: 'shmSize?: string', doc: 'shmSize'},
    {def: 'ulimit?: string[]', doc: 'ulimit'},
    {def: 'volumes?: string[]', doc: 'volumes'},
  ],

  ListContainersOptions: [
    {def: 'all?: boolean', doc: 'containers_all'},
    {def: 'filter?: string', doc: 'containers_filter'},
  ],

  ListImagesOptions: [
    {def: 'all?: boolean', doc: 'images_all'},
    {def: 'filter?: string', doc: 'images_filter'},
  ],

  RunOptions: [
    {def: 'addHistory?: boolean', doc: 'addHistory_run'},
    {def: 'capAdd?: string[]', doc: 'capAdd'},
    {def: 'capDrop?: string[]', doc: 'capDrop'},
    {def: 'hostname?: string', doc: 'hostname'},
    {def: 'isolation?: string', doc: 'isolation'},
    {def: 'runtime?: string', doc: 'runtime'},
    {def: 'runtimeFlag?: string[]', doc: 'runtimeFlag'},
    {def: 'noPivot?: boolean', doc: 'noPivot'},
    {def: 'tty?: boolean', doc: 'tty'},
    {def: 'volumes?: Volume[]', doc: 'volumes'},
    {def: 'mounts?: string[]', doc: 'mounts'},

    {def: 'ipc?: string', doc: 'ipc'},
  ],

  Container: [
    {def: 'id: string', doc: 'container_id'},
    {def: 'builder: boolean', doc: 'container_builder'},
    {def: 'imageid: string', doc: 'container_imageid'},
    {def: 'imagename: string', doc: 'container_imagename'},
    {def: 'containername: string', doc: 'container_containername'},
  ],

  Image: [
    {def: 'id: string', doc: 'image_id'},
    {def: 'names: string[]', doc: 'image_names'},
    {def: 'digest: string', doc: 'image_digest'},
    {def: 'createdat: string', doc: 'image_createdat'},
    {def: 'createdatraw: string', doc: 'image_createdatraw'},
    {def: 'size: string', doc: 'image_size'},
    {def: 'readonly: boolean', doc: 'image_readonly'},
    {def: 'history: string[]', doc: 'image_history'},
  ],

  Volume: [
    {def: 'hostPath: string', doc: 'volume_hostPath'},
    {def: 'containerPath: string', doc: 'volume_containerPath'},
    {def: 'readOnly?: boolean', doc: 'volume_readOnly'},
    {def: 'chown?: boolean', doc: 'volume_chown'},
    {def: "relabel?: 'none' | 'shared' | 'private'", doc: 'volume_relabel'},
    {def: "mountPropagation?: 'private' | 'shared' | 'slave'", doc: 'volume_mountPropagation'},
  ],
}

const lines = []

for (const type of Object.keys(types)) {
  lines.push(`export interface ${type} {`)
  for (const prop of types[type]) {
    lines.push(formatAsDoc(getDefinition(prop.doc)))
    lines.push(prop.def)
    lines.push('')
  }
  lines.push('}', '')
}

const formatted = prettier.format(lines.join('\n'), {...require('./.prettierrc.js'), parser: 'typescript'})
console.log(formatted)
