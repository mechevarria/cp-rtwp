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
                target: 'http://jsonplaceholder.typicode.com',
                secure: false,
                pathRewrite: {
                    '^/btwp-api': '${EXPRESS_URL}'
                }
            }
        }
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}