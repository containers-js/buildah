import {Command} from './Command'

export interface RemoveImageOptions {
  /**
   * This option will cause Buildah to remove all containers that are using the image before removing the image from the system.
   */
  force?: boolean
}

export class RmiCommand extends Command<{}> {
  name = 'rmi'
  flags = {}
}
