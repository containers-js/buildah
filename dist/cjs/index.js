'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var execa = require('execa');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var execa__default = /*#__PURE__*/_interopDefaultLegacy(execa);

class Command {
    /**
     * @param binary Path to the `buildah` binary, defaults to `buildah` (find Buildah via `PATH`)
     */
    constructor(binary = 'buildah') {
        /** this is the exec */
        this.exec = async (file, options, ...args) => {
            return await execa__default['default'](file, [this.name, ...this.args(options), ...args]);
        };
        this.binary = binary;
    }
    args(options) {
        return Object.entries(this.flags).flatMap(([key, flag]) => {
            return flag.args(options[key]);
        });
    }
}
function booleanFlag(name, required) {
    return {
        type: 'boolean',
        name,
        required,
        args: (v) => (name && v ? [name] : []),
    };
}
function numberFlag(name, required) {
    return {
        type: 'number',
        name,
        required,
        args: (v) => (name && v != null ? [name, v.toString()] : []),
    };
}
function numberArrayFlag(name, required) {
    return {
        type: 'number[]',
        name,
        required,
        args: (v) => (name && v ? v.flatMap((i) => [name, i.toString()]) : []),
    };
}
function stringFlag(name, required) {
    return {
        type: 'string',
        name,
        required,
        args: (v) => (name && v ? [name, v] : []),
    };
}
function stringArrayFlag(name, required) {
    return {
        type: 'string[]',
        name,
        required,
        args: (v) => (name && v ? v.flatMap((i) => [name, i]) : []),
    };
}
function virtualFlag(required) {
    return {
        type: 'any',
        name: false,
        required,
        args: () => [],
    };
}

class AddCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'add';
        this.flags = {
            destination: virtualFlag(),
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
        };
    }
}

const layerFlags = {
    forceRemove: booleanFlag('--force-rm'),
    layers: booleanFlag('--layers'),
};
const userFlags = {
    user: stringFlag('user'),
};
const userNSFlags = {
    userNS: stringFlag('--userns'),
    userNSUIDMap: stringArrayFlag('--userns-uid-map'),
    userNSGIDMap: stringArrayFlag('--userns-gid-map'),
    userNSUIDMapUser: stringFlag('--userns-uid-map-user'),
    userNSGIDMapGroup: stringFlag('--userns-gid-map-group'),
};
const namespaceFlags = {
    ipc: stringFlag('--ipc'),
    network: stringFlag('--network'),
    cniConfigDir: stringFlag('--cni-config-dir'),
    cniPlugInPath: stringFlag('--cni-plugin-path'),
    pid: stringFlag('--pid'),
    uts: stringFlag('--uts'),
};
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
    os: stringFlag('--os'),
    variant: stringFlag('--variant'),
    securityOpt: stringArrayFlag('--security-opt'),
    shmSize: stringFlag('--shm-size'),
    ulimit: stringArrayFlag('--ulimit'),
    volumes: stringArrayFlag('--volume'),
    ...userNSFlags,
    ...namespaceFlags,
};

class BudCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'bud';
        this.flags = {
            // arch: stringFlag('--arch'),
            annotation: stringFlag('--annotation'),
            authfile: stringFlag('--authfile'),
            buildArg: stringFlag('--build-arg'),
            cacheFrom: stringFlag('--cache-from'),
            certDir: stringFlag('--cert-dir'),
            compress: booleanFlag('--compress'),
            creds: stringFlag('--creds'),
            disableCompression: booleanFlag('--disable-compression'),
            disableContentTrust: booleanFlag('--disable-content-trust'),
            from: stringFlag('--from'),
            ignoreFile: stringFlag('--ignorefile'),
            file: stringArrayFlag('--file'),
            format: stringFlag('--format'),
            iidfile: stringFlag('--iidfile'),
            jobs: numberFlag('--jobs'),
            label: stringFlag('--label'),
            logfile: stringFlag('--logfile'),
            loglevel: numberFlag('--loglevel'),
            logRusage: booleanFlag('--log-rusage'),
            manifest: stringFlag('--manifest'),
            noCache: booleanFlag('--no-cache'),
            // os: stringFlag('--os'),
            platform: stringFlag('--platform'),
            pull: booleanFlag('--pull'),
            pullAlways: booleanFlag('--pull-always'),
            pullNever: booleanFlag('--pull-never'),
            quiet: booleanFlag('--quiet'),
            rm: booleanFlag('--rm'),
            runtimeFlags: stringArrayFlag('--runtime-flag'),
            secrets: stringFlag('--secret'),
            signBy: stringFlag('--sign-by'),
            signaturePolicy: stringFlag('--signature-policy'),
            squash: booleanFlag('--squash'),
            stdin: booleanFlag('--stdin'),
            tag: stringFlag('--tag'),
            target: stringFlag('--target'),
            timestamp: numberFlag('--timestamp'),
            tlsVerify: booleanFlag('--tls-verify'),
            // variant: stringFlag('--variant'),
            ...layerFlags,
            ...fromAndBudFlags,
        };
    }
}

class CommitCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'commit';
        this.flags = {
            image: stringFlag(false),
            authfile: stringFlag('--authfile'),
            blobCache: stringFlag('--blob-cache'),
            encryptionKeys: stringArrayFlag('--encryption-key'),
            encryptLayers: numberArrayFlag('--encrypt-layer'),
            certDir: stringFlag('--cert-dir'),
            creds: stringFlag('--creds'),
            disableCompression: booleanFlag('--disable-compression'),
            format: stringFlag('--format'),
            manifest: stringFlag('--manifest'),
            iidfile: stringFlag('--iidfile'),
            omitTimestamp: booleanFlag('--omit-timestamp'),
            timestamp: numberFlag('--timestamp'),
            quiet: booleanFlag('--quiet'),
            referenceTime: stringFlag('--reference-time'),
            signBy: stringFlag('--sign-by'),
            rm: booleanFlag('--rm'),
            signaturePolicy: stringFlag('--signature-policy'),
            squash: booleanFlag('--squash'),
            tlsVerify: booleanFlag('--tls-verify'),
        };
    }
}

class ConfigCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'config';
        this.flags = {
            addHistory: booleanFlag('--add-history'),
            annotation: stringArrayFlag('--annotation'),
            arch: stringFlag('--arch'),
            author: stringFlag('--author'),
            cmd: stringFlag('--cmd'),
            comment: stringFlag('--comment'),
            createdBy: stringFlag('--created-by'),
            domainName: stringFlag('--domainname'),
            entrypoint: stringFlag('--entrypoint'),
            env: stringArrayFlag('--env'),
            healthcheck: stringFlag('--healthcheck'),
            healthcheckInterval: stringFlag('--healthcheck-interval'),
            healthcheckRetries: numberFlag('--healthcheck-retries'),
            healthcheckStartPeriod: stringFlag('--healthcheck-start-period'),
            healthcheckTimeout: stringFlag('--healthcheck-timeout'),
            historyComment: stringFlag('--history-comment'),
            hostname: stringFlag('--hostname'),
            label: stringArrayFlag('--label'),
            onbuild: stringArrayFlag('--onbuild'),
            os: stringFlag('--os'),
            ports: stringArrayFlag('--port'),
            shell: stringFlag('--shell'),
            stopSignal: stringFlag('--stop-signal'),
            user: stringFlag('--user'),
            volume: stringArrayFlag('--volume'),
            workingDir: stringFlag('--workingdir'),
        };
    }
}

class ContainersCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'containers';
        this.flags = {
            all: booleanFlag('--all'),
            filter: stringFlag('--filter'),
        };
    }
}

class CopyCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'copy';
        this.flags = {
            destination: virtualFlag(),
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
        };
    }
}

class FromCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'from';
        this.flags = {
            authfile: stringFlag('--authfile'),
            certDir: stringFlag('--cert-dir'),
            cidfile: stringFlag('--cidfile'),
            creds: stringFlag('--creds'),
            format: stringFlag('--format'),
            name: stringFlag('--name'),
            pull: booleanFlag('--pull'),
            pullAlways: booleanFlag('--pull-always'),
            pullNever: booleanFlag('--pull-never'),
            quiet: booleanFlag('--quiet'),
            signaturePolicy: stringFlag('--signature-policy'),
            tlsVerify: booleanFlag('--tls-verify'),
            ...fromAndBudFlags,
        };
    }
}

class ImagesCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'images';
        this.flags = {
            all: booleanFlag('--all'),
            filter: stringFlag('--filter'),
            noTruncate: booleanFlag('--no-trunc'),
        };
    }
}

class MountCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'mount';
        this.flags = {};
    }
}

class PullCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'pull';
        this.flags = {
            allTags: booleanFlag('--all-tags'),
            authfile: stringFlag('--authfile'),
            blobCache: stringFlag('--blob-cache'),
            certDir: stringFlag('--cert-dir'),
            creds: stringFlag('--creds'),
            pullPolicy: stringFlag('--policy'),
            removeSignatures: booleanFlag('--remove-signatures'),
            signaturePolicy: stringFlag('--signature-policy'),
            decryptionKeys: stringArrayFlag('--decryption-key'),
            quiet: booleanFlag('--quiet'),
            os: stringFlag('--os'),
            arch: stringFlag('--arch'),
            variant: stringFlag('--variant'),
            tlsVerify: booleanFlag('--tls-verify'),
        };
    }
}

class PushCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'push';
        this.flags = {
            destination: virtualFlag(),
            all: booleanFlag('--all'),
            authfile: stringFlag('--authfile'),
            blobCache: stringFlag('--blob-cache'),
            certDir: stringFlag('--cert-dir'),
            creds: stringFlag('--creds'),
            digestfile: stringFlag('--digestfile'),
            disableCompression: booleanFlag('--disable-compression'),
            format: stringFlag('--format'),
            quiet: booleanFlag('--quiet'),
            rm: booleanFlag('--rm'),
            removeSignatures: booleanFlag('--remove-signatures'),
            signBy: stringFlag('--sign-by'),
            signaturePolicy: stringFlag('--signature-policy'),
            encryptionKeys: stringArrayFlag('--encryption-key'),
            encryptLayers: numberArrayFlag('--encrypt-layer'),
            tlsVerify: booleanFlag('--tls-verify'),
        };
    }
}

class RenameCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'rename';
        this.flags = {};
    }
}

class RmCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'rm';
        this.flags = {};
    }
}

class RmiCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'rmi';
        this.flags = {};
    }
}

class RunCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'run';
        this.flags = {
            addHistory: booleanFlag('--add-history'),
            capAdd: stringArrayFlag('--cap-add'),
            capDrop: stringArrayFlag('--cap-drop'),
            env: stringArrayFlag('--env'),
            hostname: stringFlag('--hostname'),
            isolation: stringFlag('--isolation'),
            runtime: stringFlag('--runtime'),
            runtimeFlag: stringArrayFlag('--runtime-flag'),
            noPivot: booleanFlag('--no-pivot'),
            tty: booleanFlag('--terminal'),
            volumes: stringArrayFlag('--volume'),
            mounts: stringArrayFlag('--mount'),
            workingdir: stringFlag('--workingdir'),
            ...userFlags,
            ...namespaceFlags,
        };
    }
}

class TagCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'tag';
        this.flags = {};
    }
}

class UnmountCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'unmount';
        this.flags = {};
    }
}

class UnshareCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'unshare';
        this.flags = {
            mounts: stringArrayFlag('--mount'),
        };
    }
}

class VersionCommand extends Command {
    constructor() {
        super(...arguments);
        this.name = 'version';
        this.flags = {};
    }
}

const addCommand = new AddCommand();
const budCommand = new BudCommand();
const commitCommand = new CommitCommand();
const configCommand = new ConfigCommand();
const containersCommand = new ContainersCommand();
const copyCommand = new CopyCommand();
const fromCommand = new FromCommand();
const imagesCommand = new ImagesCommand();
const mountCommand = new MountCommand();
const pullCommand = new PullCommand();
const pushCommand = new PushCommand();
const renameCommand = new RenameCommand();
const rmCommand = new RmCommand();
const rmiCommand = new RmiCommand();
const runCommand = new RunCommand();
const tagCommand = new TagCommand();
const unmountCommand = new UnmountCommand();
const unshareCommand = new UnshareCommand();
class Buildah {
    constructor(options = {}) {
        this.globalOptions = [];
        this.command = options.buildahCommand ?? 'buildah';
    }
    /**
     * Adds the contents of a file, URL, or a directory to a container's working directory or a specified location in the container. If a local source file appears to be an archive, its contents are extracted and added instead of the archive file itself. If a local directory is specified as a source, its contents are copied to the destination.
     *
     * @param container Container ID
     * @param src One or more sources to copy into the container
     * @param options Add options
     */
    async add(container, src, options = {}) {
        const params = Array.isArray(src) ? src : [src];
        if (options.destination)
            params.push(options.destination);
        await addCommand.exec(this.command, options, container, ...params);
    }
    /**
     * Builds an image using instructions from one or more Containerfiles or Dockerfiles and a specified build context directory. A Containerfile uses the same syntax as a Dockerfile internally. For this document, a file referred to as a Containerfile can be a file named either 'Containerfile' or 'Dockerfile'.
     *
     * The build context directory can be specified as the http(s) URL of an archive, git repository or Containerfile.
     *
     * If no context directory is specified, then Buildah will assume the current working directory as build context, which should contain a Containerfile.
     *
     * Containerfiles ending with a ".in" suffix will be preprocessed via cpp(1). This can be useful to decompose Containerfiles into several reusable parts that can be used via CPP's `#include` directive. Notice, a Containerfile.in file can still be used by other tools when manually preprocessing them via `cpp -E`. Any comments (lines beginning with `#`) in included Containerfile(s) that are not preprocess commands, will be printed as warnings during builds.
     *
     * When the URL is an archive, the contents of the URL is downloaded to a temporary location and extracted before execution.
     *
     * When the URL is a Containerfile, the file is downloaded to a temporary location.
     *
     * When a Git repository is set as the URL, the repository is cloned locally and then set as the context.
  
     * @param context Build context
     * @param options Build options
     */
    async bud(context, options = {}) {
        return await budCommand.exec(this.command, options, context);
    }
    /**
     * Create an image from a working container.
     *
     * Writes a new image using the specified container's read-write layer and if it is based on an image, the layers of that image. If image does not begin with a registry name component, `localhost` will be added to the name. If image is not provided, the image will have no name. When an image has no name, the buildah images command will display `<none>` in the `REPOSITORY` and `TAG` columns.
     *
     * @param container ID of the working container
     * @param options Commit options
     * @returns The image ID of the image that was created
     */
    async commit(container, options = {}) {
        const params = [container];
        if (options.image)
            params.push(options.image);
        const cmd = await commitCommand.exec(this.command, options, ...params);
        return cmd.stdout;
    }
    /**
     * Update image configuration settings.
     *
     * Updates one or more of the settings kept for a container.
     *
     * @param container Container name or ID
     * @param options Configuration settings to update
     */
    async config(container, options = {}) {
        await configCommand.exec(this.command, options, container);
    }
    /**
     * Copies the contents of a file, URL, or a directory to a container's working directory or a specified location in the container. If a local directory is specified as a source, its contents are copied to the destination.
     *
     * @param container Container ID
     * @param src One or more sources to copy into the container
     * @param options Copy options
     */
    async copy(container, src, options = {}) {
        const params = Array.isArray(src) ? src : [src];
        if (options.destination)
            params.push(options.destination);
        await copyCommand.exec(this.command, options, container, ...params);
    }
    /**
     * Creates a working container based upon the specified image name. If the supplied image name is "scratch" a new empty container is created. Image names use a `transport:details` format.
     *
     * Multiple transports are supported:
     *
     * - `docker://docker-reference` (Default) An image in a registry implementing the "Docker Registry HTTP API V2". By default, uses the authorization state in $XDG\_RUNTIME\_DIR/containers/auth.json, which is set using (buildah login). If XDG_RUNTIME_DIR is not set, the default is /run/containers/$UID/auth.json. If the authorization state is not found there, $HOME/.docker/config.json is checked, which is set using (docker login). If docker-reference does not include a registry name, localhost will be consulted first, followed by any registries named in the registries configuration.
     * - `dir:path` An existing local directory path containing the manifest, layer tarballs, and signatures in individual files. This is a non-standardized format, primarily useful for debugging or noninvasive image inspection.
     * - `docker-archive:path` An image is retrieved as a docker load formatted file.
     * - `docker-daemon:docker-reference` An image docker-reference stored in the docker daemon's internal storage. docker-reference must include either a tag or a digest. Alternatively, when reading images, the format can also be docker-daemon:algo:digest (an image ID).
     * - `oci:path:tag` An image tag in a directory compliant with "Open Container Image Layout Specification" at path.
     * - `oci-archive:path:tag` An image tag in a directory compliant with "Open Container Image Layout Specification" at path.
     *
     * Buildah resolves the path to the registry to pull from by using the /etc/containers/registries.conf file, containers-registries.conf(5). If the buildah from command fails with an "image not known" error, first verify that the registries.conf file is installed and configured appropriately.
     *
     * @param image Base image
     * @param options From options
     * @returns The container ID of the container that was created
     */
    async from(image, options = {}) {
        const cmd = await fromCommand.exec(this.command, options, image);
        return cmd.stdout;
    }
    /**
     * Lists containers which appear to be Buildah working containers, their names and IDs, and the names and IDs of the images from which they were initialized.
     *
     * @param options Options to filter the listed containers
     * @returns A list of Buildah containers
     */
    async listContainers(options = {}) {
        const cmd = await containersCommand.exec(this.command, options);
        if (cmd.stdout.trim() === 'null')
            return [];
        return JSON.parse(cmd.stdout);
    }
    /**
     * Lists locally stored images, their names, sizes, created date and their IDs. The created date is displayed in the time locale of the local machine.
     *
     * @param options Options to filter the listed images
     * @returns A list of images in local storage
     */
    async listImages(options = {}) {
        const cmd = await imagesCommand.exec(this.command, options, '--no-trunc');
        if (cmd.stdout.trim() === 'null')
            return [];
        return JSON.parse(cmd.stdout);
    }
    /**
     * List all of the currently mounted containers.
     */
    async listMounts() {
        const cmd = await mountCommand.exec(this.command, {});
        return cmd.stdout
            .trim()
            .split('\n')
            .map((line) => {
            const matches = /^(.+) (.+)$/.exec(line);
            if (!matches)
                throw new Error(`Unknown mount line: ${line}`);
            return { container: matches[1], mountPoint: matches[2] };
        });
    }
    /**
     * Mounts the specified container's root file system in a location which can be accessed from the host, and returns its location.
     *
     * When running in rootless mode, mount runs in a different namespace so that the mounted volume might not be accessible from the host when using a driver different than `vfs`. To be able to access the file system mounted, you might need to create the mount namespace separately as part of `buildah unshare`. In the environment created with `buildah unshare` you can then use buildah mount and have access to the mounted file system.
     *
     * @param container One or more container IDs to mount
     * @returns List of container IDs and mount points
     */
    async mount(container) {
        const params = Array.isArray(container) ? container : [container];
        const cmd = await mountCommand.exec(this.command, {}, ...params);
        return cmd.stdout
            .trim()
            .split('\n')
            .map((line) => {
            const matches = /^(.+) (.+)$/.exec(line);
            if (!matches)
                throw new Error(`Unknown mount line: ${line}`);
            return { container: matches[1], mountPoint: matches[2] };
        });
    }
    /**
     * Removes all local images from the system that do not have a tag and do not have a child image pointing to them.
     */
    async pruneImages() {
        await rmiCommand.exec(this.command, {}, '--prune');
    }
    /**
     * Pulls an image based upon the specified image name. Image names use a `transport:details` format.
     *
     * Multiple transports are supported:
     *
     * - `docker://docker-reference` (Default) An image in a registry implementing the "Docker Registry HTTP API V2". By default, uses the authorization state in $XDG\_RUNTIME\_DIR/containers/auth.json, which is set using (buildah login). If XDG_RUNTIME_DIR is not set, the default is /run/containers/$UID/auth.json. If the authorization state is not found there, $HOME/.docker/config.json is checked, which is set using (docker login). If docker-reference does not include a registry name, localhost will be consulted first, followed by any registries named in the registries configuration.
     * - `dir:path` An existing local directory path containing the manifest, layer tarballs, and signatures in individual files. This is a non-standardized format, primarily useful for debugging or noninvasive image inspection.
     * - `docker-archive:path` An image is retrieved as a docker load formatted file.
     * - `docker-daemon:docker-reference` An image docker-reference stored in the docker daemon's internal storage. docker-reference must include either a tag or a digest. Alternatively, when reading images, the format can also be docker-daemon:algo:digest (an image ID).
     * - `oci:path:tag` An image tag in a directory compliant with "Open Container Image Layout Specification" at path.
     * - `oci-archive:path:tag` An image tag in a directory compliant with "Open Container Image Layout Specification" at path.
     *
     * Buildah resolves the path to the registry to pull from by using the /etc/containers/registries.conf file, containers-registries.conf(5). If the buildah from command fails with an "image not known" error, first verify that the registries.conf file is installed and configured appropriately.
     *
     * @param image Image name to pull
     * @param options Pull options
     * @returns The image ID of the image that was pulled
     */
    async pull(image, options = {}) {
        const cmd = await pullCommand.exec(this.command, options, image);
        return cmd.stdout;
    }
    /**
     * Pushes an image from local storage to a specified destination, decompressing and recompessing layers as needed. By default, the source image ID is used as the destination, but this can be changed via the `destination` option.
     *
     * @param image Image ID to push
     * @param options Push options
     */
    async push(image, options = {}) {
        const params = options.destination ? [image, options.destination] : [image];
        await pushCommand.exec(this.command, options, ...params);
    }
    /**
     * Removes one or more working containers, unmounting them if necessary.
     *
     * @param container one or more container IDs to remove
     */
    async removeContainer(container) {
        const params = Array.isArray(container) ? container : [container];
        await rmCommand.exec(this.command, {}, ...params);
    }
    /**
     * Removes all working containers, unmounting them if necessary
     */
    async removeAllContainers() {
        await rmCommand.exec(this.command, {}, '--all');
    }
    /**
     * Removes one or more locally stored images, along with any of their dangling (untagged) parent images.
     *
     * **Note:** If the image was pushed to a directory path using the 'dir:' transport the rmi command can not remove the image. Instead standard file system commands should be used. If imageID is a name, but does not include a registry name, buildah will attempt to find and remove an image named using the registry name localhost, if no such image is found, it will search for the intended image by attempting to expand the given name using the names of registries provided in the system's registries configuration file, registries.conf.
     *
     * @param image One or more images to remove
     * @param options Remove options
     */
    async removeImage(image, options = {}) {
        const params = Array.isArray(image) ? image : [image];
        await rmiCommand.exec(this.command, options, ...params);
    }
    /**
     * Removes all locally stored images, along with any of their dangling (untagged) parent images.
     */
    async removeAllImages(options = {}) {
        await rmiCommand.exec(this.command, options, '--all');
    }
    /**
     * Rename a local container.
     *
     * @param currentName Current container name
     * @param newName New container name
     */
    async renameContainer(currentName, newName) {
        await renameCommand.exec(this.command, {}, currentName, newName);
    }
    /**
     * Run a command inside of the container.
     *
     * Launches a container and runs the specified command in that container using the container's root filesystem as a root filesystem, using configuration settings inherited from the container's image or as specified using previous calls to the buildah config command. To execute buildah run within an interactive shell, specify the `tty` option.
     *
     * @param container Container name or ID
     * @param command Command and optional arguments to execute inside the container
     * @param options Run options
     */
    async run(container, command, options = {}) {
        const params = Array.isArray(command) ? command : [command];
        await runCommand.exec(this.command, options, container, '--', ...params);
    }
    /**
     * Adds additional names to locally-stored images.
     *
     * @param image Local image name
     * @param tag One or more tags to add to the image
     */
    async tag(image, tag) {
        const tags = Array.isArray(tag) ? tag : [tag];
        await tagCommand.exec(this.command, {}, image, ...tags);
    }
    /**
     * Unmount the root file system on one or more working containers.
     *
     * @param container One or more container IDs to unmount
     */
    async unmount(container) {
        const params = Array.isArray(container) ? container : [container];
        await unmountCommand.exec(this.command, {}, ...params);
    }
    /**
     * Unmounts all currently mounted containers.
     */
    async unmountAll() {
        await unmountCommand.exec(this.command, {}, '--all');
    }
    /**
     * Run a command inside of a modified user namespace.
     *
     * Launches a process (by default, `$SHELL`) in a new user namespace. The user namespace is configured so that the invoking user's UID and primary GID appear to be UID 0 and GID 0, respectively. Any ranges which match that user and group in `/etc/subuid` and `/etc/subgid` are also mapped in as themselves with the help of the newuidmap(1) and newgidmap(1) helpers.
     *
     * buildah unshare is useful for troubleshooting unprivileged operations and for manually clearing storage and other data related to images and containers.
     *
     * It is also useful if you want to use the `buildah mount` command. If an unprivileged users wants to mount and work with a container, then they need to execute buildah unshare. Executing buildah mount fails for unprivileged users unless the user is running inside a buildah unshare session.
     *
     * @param options Unshare options
     */
    async unshare(options = {}) {
        await unshareCommand.exec(this.command, options);
    }
}

exports.AddCommand = AddCommand;
exports.BudCommand = BudCommand;
exports.Buildah = Buildah;
exports.Command = Command;
exports.CommitCommand = CommitCommand;
exports.ConfigCommand = ConfigCommand;
exports.ContainersCommand = ContainersCommand;
exports.CopyCommand = CopyCommand;
exports.FromCommand = FromCommand;
exports.ImagesCommand = ImagesCommand;
exports.MountCommand = MountCommand;
exports.PullCommand = PullCommand;
exports.PushCommand = PushCommand;
exports.RenameCommand = RenameCommand;
exports.RmCommand = RmCommand;
exports.RmiCommand = RmiCommand;
exports.RunCommand = RunCommand;
exports.TagCommand = TagCommand;
exports.UnmountCommand = UnmountCommand;
exports.UnshareCommand = UnshareCommand;
exports.VersionCommand = VersionCommand;
exports.booleanFlag = booleanFlag;
exports.fromAndBudFlags = fromAndBudFlags;
exports.layerFlags = layerFlags;
exports.namespaceFlags = namespaceFlags;
exports.numberArrayFlag = numberArrayFlag;
exports.numberFlag = numberFlag;
exports.stringArrayFlag = stringArrayFlag;
exports.stringFlag = stringFlag;
exports.userFlags = userFlags;
exports.userNSFlags = userNSFlags;
exports.virtualFlag = virtualFlag;
//# sourceMappingURL=index.js.map
