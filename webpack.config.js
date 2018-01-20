var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')


const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

    // context: __dirname,
    context: `${__dirname}/assets/js`,


    // entry: './app',
    entry: {
        main: './index',
        testRedux: './testRedux',
    },
    output: {
        path: path.resolve('./assets/bundles/'),
        filename: NODE_ENV === 'development' ? '[name].js' : '[name]-[hash].js',

    },

    devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : false,


    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.NoEmitOnErrorsPlugin(),
    ],

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader',
                query:
                    {
                        presets: ['react']
                    }
            }, // to transform JSX into JS

            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },

            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
            },

            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                loader: 'url-loader?limit=4096&name=[path][name].[ext]',
            },
        ],
    },

    resolve: {
        modules: ['node_modules', 'bower_components'],
        extensions: ['.js', '.jsx']
    },

    watch: NODE_ENV === 'development'
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
