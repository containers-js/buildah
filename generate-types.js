const fs = require('fs')
const globby = require('globby')
const path = require('path')
const prettier = require('prettier')

const sources = globby.sync('src/typedoc/*.md')

const docs = Object.fromEntries(
  sources.map((source) => [
    path.basename(source, '.md'),
    fs.readFileSync(source, {encoding: 'utf8'}) + '\n\n## @END_OF_FILE',
  ]),
)

function getDefinition(key, doc) {
  const regexp = new RegExp(`^## @${key}\\n(.+?)\\n## @`, 'ms')
  const matches = regexp.exec(doc)
  return matches ? matches[1].trim() : null
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
    {def: 'image?: string', doc: 'image'},
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
    {def: 'quiet?: boolean', doc: 'quiet'},
    {def: 'referenceTime?: string', doc: 'referenceTime'},
    {def: 'rm?: boolean', doc: 'rm'},
    {def: 'signaturePolicy?: string', doc: 'signaturePolicy'},
    {def: 'signBy?: string', doc: 'signBy'},
    {def: 'squash?: boolean', doc: 'squash'},
    {def: 'timestamp?: number', doc: 'timestamp'},
    {def: 'tlsVerify?: boolean', doc: 'tlsVerify'},
  ],

  ConfigOptions: [
    {def: 'addHistory?: boolean', doc: 'addHistory'},
    {def: 'annotation?: string[]', doc: 'annotation'},
    {def: 'arch?: string', doc: 'arch'},
    {def: 'author?: string', doc: 'author'},
    {def: 'cmd?: string', doc: 'cmd'},
    {def: 'comment?: string', doc: 'comment'},
    {def: 'createdBy?: string', doc: 'createdBy'},
    {def: 'domainName?: string', doc: 'domainName'},
    {def: 'entrypoint?: string', doc: 'entrypoint'},
    {def: 'env?: string[]', doc: 'env'},
    {def: 'healthcheck?: string', doc: 'healthcheck'},
    {def: 'healthcheckInterval?: string', doc: 'healthcheckInterval'},
    {def: 'healthcheckRetries?: number', doc: 'healthcheckRetries'},
    {def: 'healthcheckStartPeriod?: string', doc: 'healthcheckStartPeriod'},
    {def: 'healthcheckTimeout?: string', doc: 'healthcheckTimeout'},
    {def: 'historyComment?: string', doc: 'historyComment'},
    {def: 'hostname?: string', doc: 'hostname'},
    {def: 'label?: string[]', doc: 'label'},
    {def: 'onbuild?: string[]', doc: 'onbuild'},
    {def: 'os?: string', doc: 'os'},
    {def: 'ports?: string[]', doc: 'ports'},
    {def: 'shell?: string', doc: 'shell'},
    {def: 'stopSignal?: string', doc: 'stopSignal'},
    {def: 'user?: string', doc: 'user'},
    {def: 'volume?: string[]', doc: 'volume'},
    {def: 'workingDir?: string', doc: 'workingDir'},
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
    {def: 'quiet?: boolean', doc: 'quiet'},
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
    {def: 'all?: boolean', doc: 'all'},
    {def: 'filter?: string', doc: 'filter'},
  ],

  ListImagesOptions: [
    {def: 'all?: boolean', doc: 'all'},
    {def: 'filter?: string', doc: 'filter'},
  ],

  RunOptions: [
    {def: 'addHistory?: boolean', doc: 'addHistory'},
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
    {def: 'id: string', doc: 'id'},
    {def: 'builder: boolean', doc: 'builder'},
    {def: 'imageid: string', doc: 'imageid'},
    {def: 'imagename: string', doc: 'imagename'},
    {def: 'containername: string', doc: 'containername'},
  ],

  Image: [
    {def: 'id: string', doc: 'id'},
    {def: 'names: string[]', doc: 'names'},
    {def: 'digest: string', doc: 'digest'},
    {def: 'createdat: string', doc: 'createdat'},
    {def: 'createdatraw: string', doc: 'createdatraw'},
    {def: 'size: string', doc: 'size'},
    {def: 'readonly: boolean', doc: 'readonly'},
    {def: 'history: string[]', doc: 'history'},
  ],

  Volume: [
    {def: 'hostPath: string', doc: 'hostPath'},
    {def: 'containerPath: string', doc: 'containerPath'},
    {def: 'readOnly?: boolean', doc: 'readOnly'},
    {def: 'chown?: boolean', doc: 'chown'},
    {def: "relabel?: 'none' | 'shared' | 'private'", doc: 'relabel'},
    {def: "mountPropagation?: 'private' | 'shared' | 'slave'", doc: 'mountPropagation'},
  ],
}

const lines = []

for (const type of Object.keys(types)) {
  lines.push(`export interface ${type} {`)
  for (const prop of types[type]) {
    const doc = (docs[type] ? getDefinition(prop.doc, docs[type]) : null) ?? getDefinition(prop.doc, docs._common) ?? ''

    lines.push(formatAsDoc(doc))
    lines.push(prop.def)
    lines.push('')
  }
  lines.push('}', '')
}

const formatted = prettier.format(lines.join('\n'), {...require('./.prettierrc.js'), parser: 'typescript'})
console.log(formatted)
