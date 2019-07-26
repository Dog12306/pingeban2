import axios from 'axios'
import {
	MessageBox,
	Message
} from 'element-ui'
import store from '@/store'
import {
	getToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
	baseURL: '/api', // url = base url + request url
	timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
	config => {
		for (let i in config.data) {
			if (config.data[i] === "" || config.data[i] === undefined || config.data[i] === "undefined" || config.data[i] ===
				null || config.data[i] === "null") {
				delete config.data[i];
			}
		}
		if (!config.data) {
			config.data = {
				sign: getToken(),
			}
		}
		config.data.webPlatform = 'PC';
		console.log(store);
		
		return config
	},
	error => {
		return Promise.reject(error)
	}
)             

// response interceptor
service.interceptors.response.use(
	response => {
		const data = response.data;
		switch (data.code) {
			case 200: //数据接收成功并进行预订操作
				return data.data;
				break;
			case 201: //数据接收成功并msg弹窗弹出后台返回的msg
				Message({
					message: data.msg,
					type: 'warning',
					duration: 2000
				})
				return data.data;
				break;
			case 202: //数据接收成功并alert弹窗弹出后台返回的msg
				Message({
					message: data.msg,
					type: 'warning',
					showClose: true,
					duration: 0
				})
				return data.data;
				break;
			case 100: //跳转到登录页 不做任何提示
				store.dispatch('user/resetToken').then(() => {
					location.reload()
				})
				return Promise.reject(new Error(data.msg || '请求失败,未登录'))
				break;
			case 101: //跳转到登录页 msg弹窗弹出后台返回的msg
				Message({
					message: data.msg,
					type: 'warning',
					duration: 2000
				})
				store.dispatch('user/resetToken').then(() => {
					location.reload()
				})
				return Promise.reject(new Error(data.msg || '请求失败,未登录'))
				break;
			case 102: //跳转到登录页 alert弹窗弹出后台返回的msg
				Message({
					message: data.msg,
					type: 'warning',
					showClose: true,
					duration: 0
				})
				store.dispatch('user/resetToken').then(() => {
					location.reload()
				})
				reject("请求失败,未登录");
				return Promise.reject(new Error(data.msg || '请求失败,未登录'))
				break;
			case 103: //不跳转到登录页无任何提示
				return Promise.reject(new Error(data.msg || '请求失败,未登录'))
				reject("请求失败,未登录");
				break;
			case 600: //操作失败不进行任何操作并且不提示
				return Promise.reject(new Error(data.msg || 'Error'))
				break;
			case 601: //操作失败msg弹窗弹出后台返回的msg
				Message({
					message: data.msg,
					type: 'warning',
					duration: 2000
				})
				return Promise.reject(new Error(data.msg || 'Error'))
				break;
			case 602: //操作失败alert弹窗弹出后台返回的alert
				Message({
					message: data.msg,
					type: 'warning',
					showClose: true,
					duration: 0
				})
				return Promise.reject(new Error(data.msg || 'Error'))
				break;
			default:
				return Promise.reject(new Error(data.msg || 'Error'))
				break;
		}
	},
	error => {
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	}
)

export default service