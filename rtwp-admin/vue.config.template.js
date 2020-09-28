module.exports = {
    devServer: {
        port: 4200,
        proxy: {
            '/btwp-api': {
                target: '${EXPRESS_URL}',
                secure: false,
                pathRewrite: {
                    '^/btwp-api': ''
                }
            }
        }
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}