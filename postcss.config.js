module.exports = {
    plugins: [
        require('cssnano'),
        require('colorguard'),
        require('stylelint'),
        require('postcss-preset-env')
    ],
    map: false
}

if(process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(require('autoprefixer'));
}
