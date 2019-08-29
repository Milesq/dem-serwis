module.exports = {
    plugins: [
        require('cssnano'),
        require('colorguard'),
        require('stylelint'),
        require('postcss-preset-env')
    ],
    map: true
}

if(process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(require('autoprefixer'));
}
