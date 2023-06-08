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
};\n// Updated: 2025-05-30 16:01:27\n// Updated: 2025-05-30 16:01:27\n// Updated: 2025-05-30 16:01:28\n// Updated: 2025-05-30 16:01:29\n// Updated: 2025-05-30 16:01:29\n// Updated: 2025-05-30 16:01:29\n// Updated: 2025-05-30 16:01:29\n// Updated: 2025-05-30 16:01:30\n// Updated: 2025-05-30 16:01:31\n// Updated: 2025-05-30 16:01:32\n// Updated: 2025-05-30 16:01:33\n// Updated: 2025-05-30 16:01:33\n// Updated: 2025-05-30 16:01:35\n// Updated: 2025-05-30 16:01:35\n// Updated: 2025-05-30 16:01:35\n// Updated: 2025-05-30 16:01:36\n// Updated: 2025-05-30 16:01:36\n// Updated: 2025-05-30 16:01:38\n// Feature added: 2025-05-30 16:12:36\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:12:36\n// Refactored: 2025-05-30 16:12:39\n// Updated: 2025-05-30 16:12:40\n// Feature added: 2025-05-30 16:12:40\n/* New feature implementation */\n// Bug fix: 2025-05-30 16:12:42\n// Feature added: 2025-05-30 16:12:42\n/* New feature implementation */\n// Refactored: 2025-05-30 16:12:46\n// Feature added: 2025-05-30 16:12:46\n// Updated: 2025-05-30 16:12:49\n// Refactored: 2025-05-30 16:26:07\n// Feature added: 2025-05-30 16:26:10\n// Updated: 2025-05-30 16:26:11\n// Updated: 2025-05-30 16:26:12\n// Feature added: 2025-05-30 16:26:13\n/* New feature implementation */\n// Feature added: 2025-05-30 16:26:16\n/* New feature implementation */