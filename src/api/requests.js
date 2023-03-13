// 该文件的作用是对axios接口进行二次封装，若有其他接口，也可创建axios实例
import axios from 'axios'

//创建axios实例（获取天气）
const weather = axios.create({
    baseURL:'http://wthrcdn.etouch.cn/',
    timeout:5000
})

//设置请求拦截
weather.interceptors.request.use((config)=>{
    // 在发送之前做些什么
    return config;
},(err)=>{
    // 请求错误做什么
    return Promise.reject(err)
})

// 设置响应拦截器
weather.interceptors.response.use((res)=>{
    // 对响应数据做些什么
    return res;
},(err)=>{
    return Promise.reject(err)
})


// 创建登陆注册axios实例
const userLogin = axios.create({
    baseURL:'',         //设置基础路径
    timeout:3000
})

userLogin.interceptors.request.use((config)=>{
    return config;
},(err)=>{
    return Promise.reject(err)
})

userLogin.interceptors.response.use((res)=>{
    return res;
},(err)=>{
    return Promise.reject(err)
})


export default weather;userLogin