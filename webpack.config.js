const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: './src/index.ts',
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'www'),
    },
    plugins: [
        new Dotenv()
    ]
};