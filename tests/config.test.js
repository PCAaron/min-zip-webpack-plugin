const webpack = require('webpack')
const path = require('path')
const MinZipWebpackPlugin = require('../index')

function webpackConfig(options){
    return new Promise((resolve,reject) => {
        webpack({
            mode: 'development',
            entry: path.join(__dirname, 'src/index.js'),
            output: {
                path: path.join(__dirname, 'dist'),
                filename: 'bundle.js'
            },
            plugins: [
                new MinZipWebpackPlugin(options)
            ]
        },(err,stats)=>{
            if(err){
                reject(err)
            }
            console.log('Compiler success...')
            resolve(stats.toString())
        })
    })
}

describe('min-zip-webpack-plugin 测试用例', () => {
    it('生成test.zip包', async () => {
        await webpackConfig({filename: 'test'})
    })
})