const path = require('path');

module.exports = {
    mode:'development',
    devtool:false,
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            "plugins": [[
                                path.resolve('./plugins/babel-plugin-import.js')
                                , {
                                "libraryDirectory": "",
                                "libraryName": "lodash"
                              }]]
                        }
                    }
                ]
            }
        ]
    },
    plugins:[//webpack插件

    ]
}