/**
 * Config for test environment is pretty different from dev and prod, so we don't use common config as base.
 *
 * Karma watches the test entry points, so we don't need to define entry point here.
 */
const webpack = require('webpack');
module.exports = {
    /**
     * Inline source maps, generated by TypeScript compiler, will be used for code coverage.
     */
    devtool: 'source-map',

    verbose: true,

    resolve: {
        extensions: ['', '.ts', '.js', '.scss', '.html'],
        modulesDirectories: ['node_modules']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader', 'angular2-template-loader']
            },
            /**
             * These loaders are used in other environments as well, see `webpack.config.common.js`.
             */
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.html$/, loader: 'raw-loader'},
            {test: /\.scss$/, loaders: ['raw-loader', 'sass-loader']}
        ],
        postLoaders: [
            /**
             * Instruments source files for subsequent code coverage.
             * See https://github.com/deepsweet/istanbul-instrumenter-loader
             */
            {
                test: /\.ts$/,
                loader: 'istanbul-instrumenter-loader?embedSource=true&noAutoWrap=true',
                exclude: [
                    'node_modules',
                    /\.(e2e|spec)\.ts$/,
                    /src\/[^\/]*\.ts$/
                ]
            }
        ]
    },

    /**
     * Enable inline source maps for code coverage report.
     */
    ts: {
        configFileName: 'tsconfig.test.json'
    }
};
