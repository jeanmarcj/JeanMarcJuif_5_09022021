const path = require('path');

module.exports = {
    mode: 'development',
    watch: true,
    entry: './assets/js/app.js',
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
    },
    devtool: "eval",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    }
}