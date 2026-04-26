module.exports = {
    apps: [
        {
            name: "portal",
            port: 8033,
            script: "./.output/server/index.mjs",
            instance: "max",
            exec_mode: "cluster",
        },
    ],
};
