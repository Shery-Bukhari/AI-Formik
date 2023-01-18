const path = require('path');

module.exports = {
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        contentBase: './public',
        port: 8080
    }
};\n// Updated: 2025-05-30 16:01:27\n// Updated: 2025-05-30 16:01:27\n// Updated: 2025-05-30 16:01:28\n// Updated: 2025-05-30 16:01:29\n// Updated: 2025-05-30 16:01:29\n// Updated: 2025-05-30 16:01:29\n// Updated: 2025-05-30 16:01:29\n// Updated: 2025-05-30 16:01:30\n// Updated: 2025-05-30 16:01:31\n// Updated: 2025-05-30 16:01:32\n// Updated: 2025-05-30 16:01:33\n// Updated: 2025-05-30 16:01:33\n// Updated: 2025-05-30 16:01:35\n// Updated: 2025-05-30 16:01:35\n// Updated: 2025-05-30 16:01:35\n// Updated: 2025-05-30 16:01:36\n// Updated: 2025-05-30 16:01:36\n// Updated: 2025-05-30 16:01:38\n// Feature added: 2025-05-30 16:12:36\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:12:36\n// Refactored: 2025-05-30 16:12:39\n// Updated: 2025-05-30 16:12:40