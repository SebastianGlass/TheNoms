const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app/main.ts',
    output: {
        filename: './js/main.js',
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['*', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
            { test: /\.js$/, loader: 'source-map-loader' },
        ],
    },
    watch: true,
    plugins: [
        new CopyPlugin([{ from: 'src/assets' }]),
        new webpack.LoaderOptionsPlugin({
            debug: true,
        }),
    ],
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 12345,
    },
    mode: 'development',
    // Other options...
};
