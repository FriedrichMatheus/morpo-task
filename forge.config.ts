import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import type { ForgeConfig } from "@electron-forge/shared-types";

const config: ForgeConfig = {
    packagerConfig: {
        asar: true,
        icon: "/assets/icon.png",
        osxSign: {},
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            platforms: ["win32"],
            config: {
                authors: "Electron contributors",
            },
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: ["darwin"],
            config: {},
        },
        {
            name: "@electron-forge/maker-deb",
            platforms: ["linux"],
            config: {},
        },
    ],
    plugins: [
        {
            name: "@electron-forge/plugin-vite",
            config: {
                // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
                // If you are familiar with Vite configuration, it will look really familiar.
                build: [
                    {
                        // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
                        entry: "src/back/main.ts",
                        config: "vite.main.config.mjs",
                        target: "main",
                    },
                    {
                        entry: "src/ui/preload.ts",
                        config: "vite.preload.config.mjs",
                        target: "preload",
                    },
                ],
                renderer: [
                    {
                        name: "main_window",
                        config: "vite.renderer.config.mjs",
                    },
                ],
            },
        },
        // Fuses are used to enable/disable various Electron functionality
        // at package time, before code signing the application
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true,
        }),
    ],
};

export default config;
