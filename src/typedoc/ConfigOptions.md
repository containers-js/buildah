# ConfigOptions typedocs

These typedocs are specific to the `ConfigOptions` type and override any definitions in `_common.md`.

## @addHistory

Add an entry to the image's history which will note changes to the settings for `cmd`, `entrypoint`, `env`, `healthcheck`, `label`, `onbuild`, `port`, `shell`, `stopSignal`, `user`, `volume`, and `workingdir`. Defaults to `false`.

**Note:** You can also override the default value of --add-history by setting the BUILDAH_HISTORY environment variable.

```shell
export BUILDAH_HISTORY=true
```

@default false
