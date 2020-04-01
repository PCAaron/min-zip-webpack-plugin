# min-zip-webpack-plugin
Webpack plugin to zip up emitted files.     

## How to use? 

### Installation
```javascript
npm i min-zip-webpack-plugin -D
```

### Usage

webpack.config.js
```javascript
const MinZipWebpackPlugin = require('min-zip-webpack-plugin')

module.exports = {
    plugins: [
        new MinZipWebpackPlugin({
            filename: 'xxx' // filename is necessary
        })
    ]
}
```


## LICENSE

[LICENSE](https://github.com/PCAaron/min-zip-webpack-plugin/blob/master/LICENSE)
