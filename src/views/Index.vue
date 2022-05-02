<template>
  <div class="index">
     <!-- 天气 -->
            <div class="minbox" ref="weather">
                <!-- 时间 -->
               <div id="boxTime" class="boxTime">
                   <img :src="imgSrc" alt="">
                   <h1 class="oneTime">{{hours}}:{{minute}}</h1>
                   <p class="oneDate">{{oneDate}}</p>
               </div>
               <!-- 搜索框 -->
               <div class="searchBox">
                    <form action="http://www.baidu.com/baidu" class="searchBox1">
                             <!-- 这条语句要有 -->
                             <input name="word" type="hidden" value=baidu>
                             <!-- 最关键的是name的属性值设为word，百度搜索框才可生效 -->
                             <input type="text" target="_blank"  name="word" placeholder="请输入搜索内容......" ref="search">
                             <i class="el-icon-search"  name="word"></i>
                    </form> 
               </div>
               <!-- 天气详情 -->
               <div class="weather" >
                   <ul>
                       <li><h2>{{city}}</h2></li>
                       <li>{{weatherType}}</li>
                       <li>{{high}}</li>
                       <li>{{low}}</li>
                       <li>{{fengxiang}}</li>
                   </ul>
               </div>
               <!-- 天气贴语 -->
               <div class="weather2">
                   <ul>
                       <li> <h2>防范注意：</h2></li>
                       <li> {{ganmao}}</li>
                   </ul>
               </div>
            </div>
            <!-- 链接 -->
            <!-- <div class="link">
                <div class="linkBox" v-for="item in links" :key="item.id">
                    <a v-bind:href="item.link">
                        <img v-bind:src="item.imgsrc" alt="" width="100%">
                    </a>
                </div>
            </div> -->
  </div>
</template>

<script>
export default {
    name:'index',
    data(){
        return{
        hours:'',
        minute:'',
        oneDate:'',
        boxTime:'',
        city:'',
        high:'',
        low:'',
        fengxiang:'',
        ganmao:'',
        weatherType:'',
        imgSrc:''
        // links:[
        //     {id:'1',link:'https://www.csdn.net/',imgsrc:'./image/linkimg/csdn.png'},
        //     {id:'2',link:'https://www.baidu.com/',imgsrc:'./image/linkimg/baidu.jpg'},
        //     {id:'3',link:'https://element.eleme.cn/#/zh-CN/',imgsrc:'./image/linkimg/elementui.png'},
        //     {id:'4',link:'https://cn.vuejs.org/index.html',imgsrc:'./image/linkimg/vue.jpg'},
        //     {id:'5',link:'https://dev.dcloud.net.cn/mui/',imgsrc:'./image/linkimg/mui.jpg'},
        //     {id:'6',link:'https://uniapp.dcloud.io/',imgsrc:'./image/linkimg/uni-app.jpg'},
        //     {id:'7',link:'https://www.w3school.com.cn/cssref/css_selectors.asp',imgsrc:'./image/linkimg/uni-app.jpg'},
        // ]
        }
    },
    mounted(){
       /*  setInterval(this.onTime,10);
        setInterval(this.onDate,10); */
        // this.pdTime();
    },
    created(){
        setInterval(this.onTime,1000);
        setInterval(this.onDate,1000);
        // setInterval(this.pdTime,1000);
        this.getWeather();
    },
    methods:{
        // 时间
        onTime() {
            var times=new Date();
            var hours=times.getHours();
            var minute=times.getMinutes();
            return this.hours=hours,this.minute=minute<10?'0'+minute:minute;
        },
        // 日期
        onDate(){
            var dates=new Date();
            var year=dates.getFullYear();
            var month=dates.getMonth();
            var day=dates.getDate();
            var week=dates.getDay();
            var weeks=['日','一','二','三','四','五','六'];
            return this.oneDate=year+'/'+(month+1)+'/'+day+' '+'星期'+weeks[week];
        },
        // 判断白天黑夜
        pdTime(){
            var pdTime=new Date();
            var hours=pdTime.getHours();
            if(hours>=6 && hours<17){
               this.this.imgSrc = require('../assets/image/03sun.png');
                console.log('现在是白天');
            }else{
                this.this.imgSrc = require('../assets/image/003月亮.png');
                console.log('现在是晚上');
            }

        },
        // 天气
        getWeather() {
            // 请求天气数据
            this.$axios.get('http://wthrcdn.etouch.cn/weather_mini?city=崇左').then(res=>{
            var weathers = res.data.data.forecast[0];
            this.city = res.data.data.city;
            this.date = weathers.date;
            this.high = weathers.high;
            this.low = weathers.low;
            this.fengxiang = weathers.fengxiang;
            this.ganmao = res.data.data.ganmao;
            this.weatherType =  weathers.type;
          /*   console.log(res.data);
            if(this.weatherType == '晴'){
                this.$refs.weather.style.backgroundImage = "url(./assets/image/weather/qing.jpg)";
            }else if(this.weatherType == '多云' || this.weatherType == '阴' || this.weatherType == '霾'){
                this.$refs.weather.style.backgroundImage = "url(./assets/image/weather/ying1.jpg)";
            }else if(this.weatherType == '雨'){
                this.$refs.weather.style.backgroundImage = "url(./assets/image/weather/yu.jpg)"
            } */
}).catch(reject=>{
    console.log(reject);
})
}
    }

}
</script>

<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: consolas;
}

.minbox{
    width: 690px;
    height: 382px;
    border-radius: 30px;
    margin: 0 auto;
    margin-top: 40px;
    overflow: hidden;
   /* position: relative; */
   background-color: #a3aaba;
}
.boxTime{
     background-color: aqua;
    border: 2px solid greenyellow;
    margin: 0 auto;
    margin-top: 20px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    color: rgba(109, 107, 107, 0.63);
   text-align: center;
   /* vertical-align: middle; */
}
.boxTime h1{
    padding-top: 70px;
    /* padding: 0 50px; */
}

/* 搜索框 */
.searchBox{
    display: flex; 
    justify-content: center;
    align-items: center;
    position: relative;
    top: 9%;
}
.searchBox1{
   width: 65px;
   height: 50px;
   position: relative;
   margin: 0 auto;
   display: flex; 
   justify-content: center;
   align-items: center;
   transition: 0.5s;
}
.searchBox1:hover{
    width: 400px;
}
.searchBox1::before{
    content:'' ;
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(#fff,#fff,#e3e3e3);
    z-index: 1;
    filter: blur(1px);

}
.searchBox1::after{
    content:'' ;
    position: absolute;
    top: 0;
    right: -1px;
    width: 10px;
    height: 100%;
    background: #9d9d9d;
    z-index: 1;
    filter: blur(1px);

}
.searchBox1 input{
    width: 100%;
    height: 100%;
    border: none;
    padding: 10px 25px;
    outline: none;
    font-size: 1.1em;
    color: #555;
    background: linear-gradient(#dbdae1,#a3aaba);
    box-shadow: 5px 5px 5px rgba(0,0,0,0.1),
    15px 15px 15px rgba(0, 0, 0, 0.1),
    20px 20px 15px rgba(0, 0, 0, 0.1),
    30px 30px 15px rgba(0, 0, 0, 0.1),
    inset 1px 1px 2px #fff;
}
.searchBox1 input::placeholder,.searchBox1 input{
    color: transparent;
}
.searchBox1:hover input::placeholder,.searchBox1:hover input{
    color: #555;
}
i{
    position: absolute;
    right: 20px;
    color: #555;
    font-size: 1.5em;
    cursor: pointer;
}
/* 天气 */
.weather{
    width: 120px;
    height: 250px;
    /* relative相对于父盒子位移*/
    position: relative;
    /* z-index  需要定位才能生效 */
    /* z-index  不起作用的几种情形
         1、当前设置 z-index 元素的父元素position:relative/absolute 
         2、当前设置 z-index 元素为浮动元素*/
    z-index: 999;
    bottom: 73.5%;
    left: 8%;
    color: white;
}
ul{
    /* 去除序列列表前面的点 */
    list-style: none;
}
ul li{
    margin-top: 10px;
}
.weather2{
    width: 120px;
    position: relative;
    z-index: 9999;
    bottom: 141.5%;
    right: -76%;
    color: white;
    text-align: left;
}
/* 快捷网址 */
.link{
    width: 690px;
    margin: 0 auto;
    margin-top: 5px;
    display: flex;
    /* flex items 之间的距离相等，与main start、main end两端对齐 */
    justify-content: center;
    /* 如果一行排不下，则排到下一行 */
    flex-wrap: wrap;
}
/* 选择父元素为 .link 的所有元素 */
.link>.linkBox{
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-left: 10px;
    display: flex;
    /* 水平方向排列 */
    justify-content: center;
    /* 垂直方向排列 */
    align-items: center;
}
.link>.linkBox:hover{
    background-color: #9d9d9d;
}
.linkBox>a>img{
    width: 60px;
    border-radius: 20%;
}
body{
    background-image: url(../assets/image/background/2.jpg);
    background-repeat: no-repeat;
    background-size: cover;
}
</style>