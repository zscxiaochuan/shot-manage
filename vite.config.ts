import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
	base: './',
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	optimizeDeps: {
		include: ['schart.js']
	},
	resolve: {
		alias: {
			'@': '/src',
			'~': '/src/assets'
		}
	},
	// 开发服务器配置
	// server: {
	// 	// 指定服务器监听的IP地址，'0.0.0.0'表示监听所有网络接口，允许外部设备访问
	// 	host: '0.0.0.0',
	// 	// 指定开发服务器的端口号，默认是5173，这里设置为3000
	// 	port: 3000,
	// 	// 是否在启动开发服务器时自动打开浏览器，true表示自动打开
	// 	open: true,
	// 	// 是否启用CORS（跨域资源共享），true表示允许跨域请求
	// 	cors: true,
	// 	// 代理配置对象，用于将前端请求代理到后端服务器，解决开发环境跨域问题
	// 	proxy: {
	// 		// 代理所有以 /api 开头的请求到后端服务器
	// 		'/api': {
	// 			// 目标服务器地址，所有/api请求都会被转发到这里
	// 			target: 'http://localhost:8080',
	// 			// 是否改变请求头中的origin字段，true表示将origin改为target的origin，解决跨域问题
	// 			changeOrigin: true,
	// 			// 路径重写函数，将/api前缀去掉，例如：/api/users -> /users
	// 			rewrite: (path) => path.replace(/^\/api/, ''),
	// 			// 代理请求的超时时间，单位毫秒，10秒后如果后端没有响应则超时
	// 			timeout: 10000,
	// 		},
	// 		// 代理用户相关接口，所有/user开头的请求都会被代理
	// 		'/user': {
	// 			// 目标服务器地址
	// 			target: 'http://localhost:8080',
	// 			// 改变请求头中的origin，解决跨域问题
	// 			changeOrigin: true,
	// 			// 注意：这里没有rewrite，所以/user前缀会被保留
	// 			// 例如：/user/profile -> http://localhost:8080/user/profile
	// 		},
	// 		// 代理文件上传接口，专门处理文件上传请求
	// 		'/upload': {
	// 			// 目标服务器地址
	// 			target: 'http://localhost:8080',
	// 			// 改变请求头中的origin，解决跨域问题
	// 			changeOrigin: true,
	// 			// 自定义代理配置，用于处理特殊的代理需求
	// 			configure: (proxy, options) => {
	// 				// 监听代理请求事件，在请求发送前执行
	// 				proxy.on('proxyReq', (proxyReq, req, res) => {
	// 					// 设置文件上传的超时时间为30秒，因为文件上传通常需要更长时间
	// 					proxyReq.setTimeout(30000);
	// 				});
	// 			}
	// 		},
	// 		// 代理WebSocket连接，用于实时通信
	// 		'/ws': {
	// 			// WebSocket目标地址，注意协议是ws://而不是http://
	// 			target: 'ws://localhost:8080',
	// 			// 启用WebSocket代理，true表示支持WebSocket协议
	// 			ws: true,
	// 			// 改变请求头中的origin，解决跨域问题
	// 			changeOrigin: true,
	// 		}
	// 	}
	// },
	css: {
		preprocessorOptions: {
			less: {
				// 全局Less变量文件，每个Less文件都会自动引入这个文件
				additionalData: `@import "@/assets/css/variables.less";`,
				// 启用JavaScript表达式，允许在Less中使用JavaScript代码
				javascriptEnabled: true,
			}
		}
	},
	define: {
		// 定义全局常量，这里启用了Vue生产环境的水合不匹配详情
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
	},
});
