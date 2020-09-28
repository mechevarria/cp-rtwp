module.exports = {
    devServer: {
        port: 4200,
        proxy: {
            '/btwp-api': {
                target: 'https://rtwp-api.cfapps.us10.hana.ondemand.com/',
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