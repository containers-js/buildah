import {booleanFlag, Command, stringArrayFlag, stringFlag} from './Command'

export interface AddOptions {
  /**
   * Add an entry to the history which will note the digest of the added content. Defaults to false.
   *
   * Note: You can also override the default value of --add-history by setting the BUILDAH_HISTORY environment variable.
   *
   * ```shell
   * export BUILDAH_HISTORY=true
   * ```
   */
  addHistory?: boolean

  /**
   * TODO
   */
  authfile?: string

  /**
   * TODO
   */
  blobCache?: string

  /**
   * TODO
   */
  certDir?: string

  /**
   * Sets the access permissions of the destination content. Accepts the numerical format.
   */
  chmod?: string

  /**
   * Sets the user and group ownership of the destination content.
   *
   * @example 'owner:group'
   */
  chown?: string

  /**
   * Build context directory. Specifying a context directory causes Buildah to chroot into that context directory. This means copying files pointed at by symbolic links outside of the chroot will fail.
   */
  contextdir?: string

  /**
   * TODO
   */
  creds?: string

  /**
   * TODO
   */
  decryptionKeys?: string[]

  /**
   * Use the root directory of the specified working container or image as the root directory when resolving absolute source paths and the path of the context directory. If an image needs to be pulled, options recognized by `buildah pull` can be used.
   */
  from?: string

  /**
   * Path to an alternative `.containerignore` (`.dockerignore`) file. Requires `contextdir` be specified.
   */
  ignoreFile?: string

  /**
   * Refrain from printing a digest of the added content.
   */
  quiet?: boolean

  /**
   * TODO
   */
  removeSignatures?: boolean

  /**
   * TODO
   */
  signaturePolicy?: string

  /**
   * TODO
   */
  tlsVerify?: boolean
}

export class AddCommand extends Command<AddOptions> {
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
