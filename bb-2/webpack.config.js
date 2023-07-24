const path = require('path');

module.exports = {
    entry: './scripts/content.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'content.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
};
