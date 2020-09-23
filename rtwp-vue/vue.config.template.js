module.exports = {
    devServer: {
        port: 4200,
        proxy: {
            '/jsonplaceholder': {
                target: 'http://jsonplaceholder.typicode.com',
                secure: false,
                pathRewrite: {
                    '^/jsonplaceholder': ''
                }
            },
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