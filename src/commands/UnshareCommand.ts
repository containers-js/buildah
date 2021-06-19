import {Command, stringArrayFlag} from './Command'

export interface UnshareOptions {
  /**
   * Mount the containerNameOrID container while running command, and set the environment variable VARIABLE to the path of the mountpoint. If VARIABLE is not specified, it defaults to containerNameOrID, which may not be a valid name for an environment variable.
   */
  mounts?: string[]
}

export class UnshareCommand extends Command<UnshareOptions> {
  name = 'unshare'
  flags = {
    mounts: stringArrayFlag('--mount'),
  }
}
