var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')


const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

    context: __dirname,
    // context: `${__dirname}/asserts/js`,

    entry: './assets/js/index', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs

    output: {
        path: path.resolve('./assets/bundles/'),
        filename: NODE_ENV === 'development' ? '[name].js' : '[name]-[hash].js',

    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.NoEmitOnErrorsPlugin(),
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader',
                query:
                    {
                        presets: ['react']
                    }
            }, // to transform JSX into JS
        ],
    },

    resolve: {
        modules: ['node_modules', 'bower_components'],
        extensions: ['.js', '.jsx']
    },

    watch: true
};

if (NODE_ENV !== 'development') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
            }
        })
    )
}
