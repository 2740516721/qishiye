<template>
    <div class="index">
      <div class="current-time">
        {{currentTime}}
      </div>
        <el-form class="search-form" :action="nowSearchEngines.action" target="_blank">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model="searchVal" :name="nowSearchEngines.name" class="input-with-select">
              <Select :options="searchEngines" @change="selectChange" :icon="nowSearchEngines.icon" slot="prepend"></Select>
              <el-button slot="append" icon="el-icon-search" native-type="submit"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      <div class="website-shortcuts">
        <ul>
          <li v-for="(item,index) in websiteShortcuts" :key="index">
            <a :href="item.url" target="_blank" style="display: block;text-align: center;">
              <div class="web-cut">
                <i class="setting fa-solid fa-xmark" @click.prevent="remove(index)"></i>
<!--                <i :class="item.icon" style="font-size: 2vw;" ></i>-->
                <img :src="item.icon" style="width: 2vw;">
              </div>
              <p style="padding-top: 5px;">{{item.name}}</p>
            </a>
          </li>
          <li>
            <div class="add-website-shortcuts" v-popover:popover>
            </div>
          </li>
        </ul>
        <el-popover
            v-model="visible"
            :visible-arrow="false"
            ref="popover"
            placement="top"
            title="添加网站捷径"
            trigger="click"
            width="200"
            style="position: relative;"
        >
          <el-form :model="websiteShortcutInformationForm" :rules="formRules" status-icon size="mini">
            <el-form-item prop="url">
              <el-input type="url" v-model="websiteShortcutInformationForm.url" autocomplete="off" placeholder="网址"></el-input>
            </el-form-item>
            <el-form-item prop="name">
              <el-input type="text" v-model="websiteShortcutInformationForm.name" autocomplete="off" placeholder="标题-留空即自动获取"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="submitForm" style="width: 100%;">添加</el-button>
            </el-form-item>
          </el-form>
          <i class="close fa-solid fa-xmark" style="position: absolute;top: 11px;right: 13px;font-size: 1vw;" @click.prevent="visible=false"></i>
        </el-popover>
      </div>
    </div>
</template>

<script>
import Select from "@/components/Select.vue";
import {searchEngines} from "../utils/searchEngines";
import {getWebIcon,getLocalTime} from "@/utils";
export default {
    data() {
        return {
          visible:false,
          searchVal:'',
          currentTime:'',
          searchEngines:searchEngines,
          websiteShortcuts:[],
          nowSearchEngines:{
            action:'https://www.baidu.com/s',
            name:'wd',
            icon:'iconfont icon-baidu',
            engineName:'百度'
          },
          websiteShortcutInformationForm:{
            url:'',
            name:''
          },
          formRules:{
            url:[
              {required: true, message: '请输入网站url', trigger: 'blur'}
            ],
            name:[
              {required: true, message: '请输入网站昵称', trigger: 'blur'}
            ]
          }
        }
    },
  components:{
    Select
  },
  mounted() {
      // 获取当前时间
      this.currentTime = getLocalTime.presentTime();
      this.getCurrentTime();
      // 若已有缓存，读取缓存中的数据
      if(localStorage.getItem('NOWSEARCHENGINES')){
        this.nowSearchEngines = JSON.parse(localStorage.getItem('NOWSEARCHENGINES'));
      };
      if(localStorage.getItem('WEBSITESHORTCUTS')){
        this.websiteShortcuts = JSON.parse(localStorage.getItem('WEBSITESHORTCUTS'));
      };
  },
  methods: {
      selectChange(val){
        // 选择搜索引擎
        let selectEngine = {
          action:val.action,
          name:val.name,
          engineName:val.engineName,
          icon:val.icon
        };
        if(!localStorage.getItem('NOWSEARCHENGINES')){
          localStorage.setItem('NOWSEARCHENGINES',JSON.stringify(selectEngine));
          this.nowSearchEngines = selectEngine;
        }else{
          localStorage.setItem('NOWSEARCHENGINES',JSON.stringify(selectEngine));
          this.nowSearchEngines = selectEngine;
        };
      },
      remove(index){
        // 删除网站快捷
        let websiteShortcuts = JSON.parse(localStorage.getItem('WEBSITESHORTCUTS'));
        websiteShortcuts.splice(index,1);
        localStorage.setItem('WEBSITESHORTCUTS',JSON.stringify(websiteShortcuts));
        this.websiteShortcuts = websiteShortcuts;
      },
      submitForm(){
        if(!this.websiteShortcutInformationForm.url||!this.websiteShortcutInformationForm.name){
          return;
        };
        // 添加网站快捷
        this.visible = false;
        // icon图标
        // let icon = getWebIcon(this.websiteShortcutInformationForm.url);
        let websiteShortcut = {
          name:this.websiteShortcutInformationForm.name,
          url:this.websiteShortcutInformationForm.url,
          icon: getWebIcon(this.websiteShortcutInformationForm.url)
        };
        if(!localStorage.getItem('WEBSITESHORTCUTS')){
          localStorage.setItem('WEBSITESHORTCUTS',JSON.stringify([websiteShortcut]));
          this.websiteShortcuts.push(websiteShortcut);
        }else{
          let websiteShortcuts = JSON.parse(localStorage.getItem('WEBSITESHORTCUTS'));
          websiteShortcuts.push(websiteShortcut);
          localStorage.setItem('WEBSITESHORTCUTS',JSON.stringify(websiteShortcuts));
          this.websiteShortcuts = websiteShortcuts;
        };
        // 清空网站快捷
        this.websiteShortcutInformationForm = {
          url:'',
          name:''
        };
      },
    getCurrentTime(){
        this.timer = setInterval(()=>{
          this.currentTime = getLocalTime.presentTime();
        },1000);
    }
    },
  destroyed() {
      clearInterval(this.timer);
  }
}
</script>

<style lang="scss" scoped>
.index{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("@/assets/image/background/36b192189bdf45a4ba254a1ac79b9793.jpg");
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: cover;
  .current-time{
    width: 14vw;
    padding: 1vw;
    margin: 6% auto 10px;
    text-align: center;
    font-size: 3vw;
    border-radius: 0.4vw;
    transition: background-color 0.5s;
  }
  .current-time:hover{
    background-color: #f6f5fa;
    cursor: pointer;
  }
  .search-form{
    margin: 10px auto 100px;
    width: 42vw;
  }
  .website-shortcuts{
    width: 72vw;
    //background-color: #f5fafa;
    background-color: rgba(245, 250, 250, 0.8);
    padding: 1vw;
    margin: 0 auto;
    border-radius: 3px;
    //毛玻璃效果
    backdrop-filter: blur(10px);
    ul{
      display: flex;
      justify-content: flex-start;
      flex-wrap:wrap;
      li{
        width: 10vw;
        margin:1vw;
        .web-cut{
          width: 6vw;
          height:6vw;
          border-radius: 5px;
          background-color: rgba(169, 169, 169, 0.30);
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          position: relative;
          transition: background-color 0.5s;
          .setting{
            display: none;
            position: absolute;
            top: 0.6vw;
            right: 0.8vw;
            border-radius: 10px;
            font-size: 0.5vw;
          }
          .setting:hover{
            color: #ff253a;
          }
        }
        .add-website-shortcuts{
          width: 6vw;
          height:6vw;
          border-radius: 5px;
          background-color: rgba(169, 169, 169, 0.27);
          margin: 0 auto;
          position: relative;
          transition: background-color 0.5s;
        }
        .add-website-shortcuts::before{
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -1.5vw;
          margin-left: -0.1vw;
          width: 0.2vw;
          height: 3vw;
          background-color: darkgrey;
          border-radius: 5px;
        }
        .add-website-shortcuts::after{
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -0.1vw;
          margin-left: -1.5vw;
          width: 3vw;
          height: 0.2vw;
          background-color: darkgrey;
          border-radius: 5px;
        }
        .add-website-shortcuts:hover{
          background-color: #f6f5fa;
        }
      }
      li:hover .web-cut{
        background-color: #f6f5fa;
      }
      li:hover .setting{
        display: block;
      }
    }
  }
}
.close:hover{
  color: #ff253a;
}
</style>
<style>
.el-input-group__append:hover,.el-input-group__prepend:hover{
  background-color: #f6f5fa;
}

.el-input-group__prepend:hover .select-popper{
  padding: 10px;
  height: auto;
}
</style>