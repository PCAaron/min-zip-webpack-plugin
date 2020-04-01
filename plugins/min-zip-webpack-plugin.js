const path = require('path')
const JSZip = require('jszip')
const { RawSource } = require('webpack-sources')
const zip = new JSZip()

class MinZipWebpackPlugin{
    constructor(options){
        this.options = options || {}
    }
    apply(compiler){
        if(!this.options.filename) {
            throw new Error('filename is necessary!')
        }

        compiler.hooks.emit.tapAsync('MinZipWebpackPlugin', (compilation,callback)=>{
            // zip.folder,创建目录名称
            const folder = zip.folder(this.options.filename);
            // 遍历compilation.assets对象
            for(let filename in compilation.assets){
                // 获取source
                const source = compilation.assets[filename].source()
                // 将source添加到folder中
                folder.file(filename, source)
            }
            // 将内容生成zip
            zip.generateAsync({
                type: 'nodebuffer'
            }).then((content)=>{
                // 获取output（绝对路径）
                const outputPath = path.join(
                    compilation.options.output.path,
                    this.options.filename + '.zip'
                )
                const outputRelativePath = path.relative(
                    compilation.options.output.path,
                    outputPath
                )
                // 将内容挂载到compilation.assets上，并将buffer转换为source
                compilation.assets[outputRelativePath] = new RawSource(content)
                callback()
            })
        })
    }
}

module.exports = MinZipWebpackPlugin
