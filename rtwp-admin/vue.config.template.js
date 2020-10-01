module.exports = {
    devServer: {
        port: 4200,
        proxy: {
            '/rtwp-api': {
                target: '${EXPRESS_URL}',
                secure: false,
                pathRewrite: {
                    '^/rtwp-api': ''
                }
            }
        }
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}