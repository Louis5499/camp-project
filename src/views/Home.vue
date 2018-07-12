<template>
  <div class="home">
    <!-- <img src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1 class="title">請輸入你的組別</h1>
    <el-select class="select" v-model="value" placeholder="組別" size="small">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input class="input" placeholder="請輸入代碼" v-model="passWd" size="small" @focus="errorHint = false"></el-input>
    <el-button type="primary" round class="finish" @click="submit">完成</el-button>
    <span v-if="errorHint" class="errorHint">代碼錯誤！</span>
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
      value: '',
      passWd: '',
      errorHint: false
    }
  },
  methods:{
    submit() {
      let correct = false;
      let teamNum = 0;
      switch(this.value) {
        case 'team1':
          teamNum = 1;
          if(this.passWd == 'qweasd') correct = true;
          break;
        case 'team2':
          teamNum = 2;
          if(this.passWd == 'uiojkl') correct = true;
          break;
        case 'team3':
          teamNum = 3;
          if(this.passWd == 'bnmghj') correct = true;
          break;
        case 'team4':
          teamNum = 4;
          if(this.passWd == 'rtyvbn') correct = true;
          break;
        case 'team5':
          teamNum = 5;
          if(this.passWd == 'rtyfgh') correct = true;
          break;
        case 'team6':
          teamNum = 6;
          if(this.passWd == 'dfghjk') correct = true;
          break;
        case 'team7':
          teamNum = 7;
          if(this.passWd == 'uiozxc') correct = true;
          break;
        case 'team8':
          teamNum = 8;
          if(this.passWd == 'qwecvb') correct = true;
          break;
      }
      if(correct) {
        this.$store.commit('setLoginTeam',teamNum);
        this.$router.push({name: 'main',query:{ teamId: teamNum }});
      }
      else {
        this.errorHint = true;
      }
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
  margin-top: 40%;
  color: white;
}
.select {
  margin-top: 10%;
}
.input {
  width: 192px;
  margin-top: 10%;
}
.finish {
  margin-top: 10%;
}
.errorHint {
  color: #fe5f55;
  font-weight: 500;
  margin-top: 5%;

  position: relative;
  left: 5px;
}
</style>

