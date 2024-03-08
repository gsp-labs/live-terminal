const webpack = require("webpack");
const copyWebpackPlugin = require('copy-webpack-plugin')

const build = process.env.CLIENT_ENV === 'development';

let mainConfig  = {
    entry: {
        'client': './src/client/index.ts',
    },
    output: {
        path: __dirname + '/dist/public',
        filename: '[name].js',
    },
    mode: build ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /node_modules.+xterm.+\.map$/,
                use: ['ignore-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
      new copyWebpackPlugin({
        patterns: [
          {from: './src/client/static', },
        ]}),
    ],
};

if (build) {
    mainConfig.devtool = 'inline-source-map';
}

module.exports = mainConfig;
