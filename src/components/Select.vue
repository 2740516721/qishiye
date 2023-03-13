<template>
<div>
  <div class="select">
    <i :class="icon" style="width: 13px;text-align: center;"></i>
    <div class="select-popper" ref="selectPopper">
      <ul>
        <li class="select-item" @click="change(item)" v-for="(item,index) in options" :key="index" >
          <i :class="item.icon" style="width: 15px;text-align: center;padding-right: 10px;"></i>
          <span>{{item.engineName}}</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "select",
  props:{
    icon:'',
    options:Array
  },
  data(){
  },
  methods:{
    change(val){
      this.$emit('change',val);
    }
  }
}
</script>

<style lang="scss" scoped>
.select{
  position: relative;
  .select-popper{
    position: absolute;
    top: 32px;
    left: -20px;
    background-color: #f6f5fa;
    z-index: 999;
    border-radius: 4px;
    height: 0;
    overflow: hidden;
    transition: all 0.5s;
    .select-item{
      transition: all 0.5s;
      cursor: pointer;
      border-radius: 2px;
      padding: 5px;
    }
    .select-item:hover{
      font-size: 14px;
      color: black;
      background-color: darkgrey;
      transform: scale(1.1);
    }
  }
}
</style>