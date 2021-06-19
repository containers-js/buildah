import {booleanFlag, Command, stringFlag} from './Command'

export interface ListImagesOptions {
  /**
   * Show all images, including intermediate images from a build.
   */
  all?: boolean

  /**
   * Filter output based on conditions provided.
   */
  filter?: string

  /**
   * Do not truncate output.
   */
  noTruncate?: boolean
}

export class ImagesCommand extends Command<ListImagesOptions> {
  name = 'images'
  flags = {
    all: booleanFlag('--all'),
    filter: stringFlag('--filter'),
    noTruncate: booleanFlag('--no-trunc'),
  }
}
