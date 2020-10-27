// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';
//path引入
const { resolve } = require('path');
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
	productionSourceMap: false,
	outputDir: 'BugWorkOrderSystem',
	pages: {
		index: {
			// page 的入口
			entry: 'src/main.js',
			// 模板来源
			template: 'public/index.html',
			// 在 [outputDir]/index.html 的输出
			filename: 'index.html',
			title: 'BUG工单修复系统'
		}
	},
	devServer: {
		host: '0.0.0.0',
		https: false,
		hot: true,
		open: true,
		overlay: {
			warnings: true,
			errors: true
		}
	},
	configureWebpack: config => {
		// 生产环境相关配置
		if (isProduction) {
			// ============gzip压缩 start============
			const productionGzipExtensions = ['html', 'js', 'css']
			config.plugins.push(
				new CompressionWebpackPlugin({
					filename: '[path].gz[query]',
					algorithm: 'gzip',
					test: new RegExp(
						'\\.(' + productionGzipExtensions.join('|') + ')$'
					),
					threshold: 10240, // 只有大小大于该值的资源会被处理 10240
					minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
					deleteOriginalAssets: false // 删除原文件
				})
			)
			// ============gzip压缩 end============
		}
	},
	chainWebpack: config => {
		// ============保存格式化 start============
		config.module
			.rule('eslint')
			.use('eslint-loader')
			.loader('eslint-loader')
			.tap(options => {
				options.fix = true;
				return options;
			});
		// ============保存格式化 end============

		// ============配置文件路径 start============
		config.resolve.alias
			.set('@', resolve('src'))
			.set('images', resolve('src/assets/images'))
			.set('css', resolve('src/assets/css'))
			.set('js', resolve('src/assets/js'))
			.set('views', resolve('src/views'))
			.set('components', resolve('src/components'));
		// ============配置文件路径 end============
	}
};
