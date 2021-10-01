module.exports = {
    apps : [
        {
            name: "hub_api",
            script: "dist/main.js",
            instances: 1,
            watch: false
        }
    ]
}
