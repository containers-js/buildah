interface GlobalOptions {
  buildahCommand?: string
}

export class Buildah {
  command: string
  globalOptions: string[] = []

  constructor(options: GlobalOptions = {}) {
    this.command = options.buildahCommand ?? 'buildah'
  }
}
