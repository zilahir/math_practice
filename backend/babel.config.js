module.exports = function() {
    const presets = ["@babel/preset-env"]
    const plugins = [
        ["babel-plugin-add-import-extension"]
    ]

    return {
        presets,
        plugins
    }
}
