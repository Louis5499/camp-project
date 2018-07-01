<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1 class="title">請輸入你的組別</h1>
    <el-select class="select" v-model="value" placeholder="Select" size="small">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input class="input" placeholder="請輸入代碼" v-model="input" size="small"></el-input>
    <el-button type="primary" round class="finish">完成</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      options: [{
          value: 'team1',
          label: '第一組'
        }, {
          value: 'team2',
          label: '第二組'
        }, {
          value: 'team3',
          label: '第三組'
        }, {
          value: 'team4',
          label: '第四組'
        }, {
          value: 'team5',
          label: '第五組'
        }, {
          value: 'team6',
          label: '第六組'
        }, {
          value: 'team7',
          label: '第七組'
        }, {
          value: 'team8',
          label: '第八組'
        }],
        value: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  // background-color: #f9fa9b;
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 1.5em;
  font-weight: 500;
  position: relative;
  top: 150px;
  color: #2d4059;
}
.select {
  position: relative;
  top: 180px;
}
.finish {
  position: relative;
  top: 250px;
}
.input {
  position: relative;
  top: 200px;
  width: 192px;
}
</style>

