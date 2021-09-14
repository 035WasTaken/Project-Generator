module.exports = {
    mode: 'development',
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.?(\.d\.)ts$|/, use: 'ts-loader' },
            { test: /\.sass$/, use: 'sass-loader' }
        ]
    }
}