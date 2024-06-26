const path = require('path');

module.exports = {
    entry: {
        background: './src/background.js',
        content: './src/content.js'
    },  // 入口文件
    output: {
        filename: '[name].js',  // 输出的文件名
        path: path.resolve(__dirname, 'dist'),  // 输出的目录
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,  // 匹配 JavaScript 和 JSX 文件
                exclude: /node_modules/,  // 排除 node_modules 目录
                use: {
                    loader: 'babel-loader',  // 使用 Babel Loader
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],  // 使用 Babel 预设
                    },
                },
            },
            {
                test: /\.css$/,  // 匹配 CSS 文件
                use: ['style-loader', 'css-loader'],  // 使用 CSS Loader 和 Style Loader
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,  // 匹配图片文件
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',  // 输出的文件名
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],  // 自动解析这些扩展名
    },
};