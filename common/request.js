export default {
	// 全局配置
	common: {
		baseUrl: "http://ceshi.dishait.cn",
		header: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		data: {},
		method: 'GET',
		dataType: 'json'
	},
	request(options = {}) {
		let common = this.common;
		options.url = common.baseUrl + options.url;
		options.header = options.header || common.header;
		options.data = options.data || common.data;
		options.method = options.method || common.method;
		options.dataType = options.dataType || common.dataType;
		return new Promise((res, rej) => {
			uni.request({
				...options,
				success(result) {
					let {statusCode, data} = result;
					if (options.native) return res(result);
					if (statusCode !== 200) {
						if (options.toast !== false) {
							uni.showToast({
								title: data.msg || '服务端失败',
								icon: 'none'
							});
						}
						return rej(data)
					}
					res(data)
				},
				fail({errMsg}) {
					uni.showToast({
						title: errMsg || '请求失败',
						icon: 'none'
					});
					return rej()
				}
			});
		})
	},
	// get请求
	get(url, data = {}, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return this.request(options)
	},
	// post请求
	post(url, data = {}, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'POST';
		return this.request(options)
	},
	// delete请求
	del(url, data = {}, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'DELETE';
		return this.request(options)
	}
}
