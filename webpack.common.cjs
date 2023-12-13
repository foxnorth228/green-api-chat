const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.s[a|c]ss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.react.svg$/,
                issuer: /\.(js|ts)x?$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.m?js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@contexts': path.resolve(__dirname, 'src/contexts'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@routes': path.resolve(__dirname, 'src/routes'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@store': path.resolve(__dirname, 'src/store'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.draft.html'
          }),
          new CopyPlugin({
            patterns: [
              { from: './src/assets', to: '' }, // <- your path to favicon
            ],
          }),
    ],
}