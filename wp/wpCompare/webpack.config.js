// // 多入口打包
// module.exports = [
//   {
//     entry: './src/index.js',
// 		mode:'none',
//     output: {
//       filename: 'a.js'
//     }
//   },
//   {
//     entry: './src/index.js',
// 		mode:'none',
//     output: {
//       filename: 'b.js'
//     }
//   }
// ]

const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// 1）定义不同的打包类型
const allModes = [
  'eval',
  'source-map',
  'eval-source-map',
  'cheap-source-map',
  'inline-source-map',
  'eval-cheap-source-map',
  'cheap-module-source-map',
  'inline-cheap-source-map',
  'eval-cheap-module-source-map',
  'inline-cheap-module-source-map',
  'hidden-source-map',
  'nosources-source-map'
]

// 2）循环不同 SourceMap 模式，生成多个打包入口
module.exports = allModes.map(item => {
  return {
    devtool: item,
    mode: 'none',
    entry: './src/index.js',
    output: {
      filename: `js/${item}.js`
    },
    module: {
      rules: [
        {
          test: /\.js$/,//文档这里的正则错了，导致报错/.js$/
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
				{
					test: /\.[tj]sx?$/i,
					exclude: [
					/(node_modules|bower_components)/
					],
					use: [
						/* config.module.rule('script').use('1') */
						{
							loader: 'babel-loader',
							options: {
								cacheDirectory: true
							}
						}
					]
				},
      ]
    },
    plugins: [
      // 3）输出到不同的页面
      new HtmlWebpackPlugin({
        filename: `${item}.html`
				// template:'./src/index.html'
      }),
			new CleanWebpackPlugin(),//每次打包前，自动将打包目录清空
    ]
  }
})
