// 当前模块，为了集中管理接口。当接口较多时（接口路径统一的情况下，即基础路径相同），可以引入二次封装后的文件，在此写上接口，只需对外暴露接口函数即可。
import weather from './requests';
import userLogin from './requests'


export function getWeather(city){
    return weather({
        url:`weather_mini?city=${city}`,
        method:'get',
        city
    })
}

// 注册接口
export function setUser(userInfo){
    return userLogin({
        url:''
    })
}