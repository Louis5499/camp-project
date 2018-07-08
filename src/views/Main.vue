<template>
  <div class="mainWrapper">
    <div class="topWrapper">
      <div class="bitcoin">
        <span class="bitcoinTitle">{{teamMoney}}</span>
        <img class="bitcoin" src="../assets/pinecone.png" width="15" height="15">
      </div>
      <div class="teamInfo">
        <span>{{teamString}}</span>
      </div>
      <div class="cardInfo">
        <div class="atkWrapper">
          <img src="../assets/atk.png" width="15" height="15">
          <span>{{teamAtk}}</span>
        </div>
        <div class="spWrapper">
          <img src="../assets/sp.png" width="15" height="15">
          <span>{{teamSp}}</span>
        </div>
        <div class="defWrapper">
          <img src="../assets/def.png" width="15" height="15">
          <span>{{teamDef}}</span>
        </div>
      </div>
    </div>
    <div v-if="!isBattling" class="scoreBoard">
      <div class="boardTitle">
        <div class="titleRank">排名</div>
        <div class="titleTeam">組別</div>
        <div class="titleMoney">金錢</div>
      </div>
      <div :class="boardContentCalc(data)" v-for="(data,i) in teamsData" :key="i" >
        <div class="contentRank">{{data.curRank}}</div>
        <div class="contentTeam">{{data.team}}</div>
        <div class="contentMoney">{{data.money}}</div>
      </div>
    </div>
    <div v-if="isBattling" class="infoBar">
        <span>目前名次</span>
        <span class="infoRank">#{{teamRank}}</span>
    </div>
    <div v-if="isBattling && !isSubmit" class="battleWrapper" v-loading="loading">
      <div class="attackBar underBar">
        <img src="../assets/atk.png" width="15" height="15">
        <span>攻擊</span>
        <el-select class="select" v-model="value" placeholder="組別" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div @click="submit(0)" :class="submitClassCalc">送出</div>
      </div>
      <div class="selfPointBar underBar">
        <img src="../assets/sp.png" width="15" height="15">
        <span>加值</span>
        <div @click="submit(1)" :class="submitClassCalc">送出</div>
      </div>
      <div class="selfPointBar underBar">
        <img src="../assets/def.png" width="15" height="15">
        <span>防禦</span>
        <div @click="submit(2)" :class="submitClassCalc">送出</div>
      </div>
      <div class="announcement underBar">
        <span>{{announcement}}</span>
      </div>
    </div>
    <div v-if="isBattling && isSubmit" class="battleWrapper isSubmit">
      <span style="color: #f5c16c;">{{this.eventTranslate}}</span>
      <span>{{this.targetTranslate}}</span>
      <div @click="reChoose()" :class="isProcess?'reChoose buttonDisable':'reChoose'">重選</div>
    </div>
  </div>
</template>

<script>
import css from '../css/main.scss'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import firebase from 'firebase'

export default {
  data() {
    return {
      teamString: '',
      teamMoney: 0,
      teamAtk: 0,
      teamDef: 0,
      teamSp: 0,
      teamRank: 0,
      // isBattling: true,
      isSubmit: false,
      announcement: '',
      // Embeded Data
      options: [{
          value: '1',
          label: '第一組'
        }, {
          value: '2',
          label: '第二組'
        }, {
          value: '3',
          label: '第三組'
        }, {
          value: '4',
          label: '第四組'
        }, {
          value: '5',
          label: '第五組'
        }, {
          value: '6',
          label: '第六組'
        }, {
          value: '7',
          label: '第七組'
        }, {
          value: '8',
          label: '第八組'
        }],
      value: '',
      eventTypesCH: ['攻擊','加值','防禦'],
      eventTypes: ['Atk','Sp','Def'],
      teamCH: ['第一組','第二組','第三組','第四組','第五組','第六組','第七組','第八組'],
      loading: false
    }
  },
  computed: {
    teamsData() {
      let arr = this.$store.state.teams;
      arr.sort((a,b)=>{
        return a.curRank-b.curRank
      });
      return arr;
    },
    loginTeam() {
      return this.$store.state.loginTeam;
    },
    ...mapState([
      'changes'
    ]),
    eventTranslate() {
      
      let teamNum = this.loginTeam;
      let datum = this.changes[teamNum-1];
      console.log(datum);
      for(let i=0;i<this.eventTypes.length;i++) if(this.eventTypes[i] === datum.kindofCard) return this.eventTypesCH[i];
    },
    targetTranslate() {
      let teamNum = this.loginTeam;
      let datum = this.changes[teamNum-1];
      if(datum.kindofCard != 'Atk') return;
      return this.teamCH[datum.target-1];
    },
    ...mapGetters({
      isBattling: 'getIsBattling',
      isProcess: 'getIsProcess'
    }),
    submitClassCalc() {
      if(this.isProcess) return 'submit buttonDisable'
      else return 'submit'
    }
  },
  methods: {
    boardContentCalc(data) {
      if(data.team == this.loginTeam) return 'boardContent select';
      else return 'boardContent';
    },
    teamStringCalc() {
      let teamId = this.loginTeam;
      this.teamString = this.teamCH[teamId-1];
    },
    fetchData() {
      for(let data of this.$store.state.teams) {
        if(data.team == this.loginTeam) {
          this.teamMoney = data.money;
          this.teamAtk = data.atk;
          this.teamDef = data.def;
          this.teamSp = data.sp;
          this.teamRank = data.curRank;
        }
      }
    },
    submit(type) {
      // 0 -> Atk 1 -> Sp 2 -> Def
      // Empty
      this.announcement = ''; 
      // Collect var
      let target = Number(this.value);
      if(this.loading || this.isProcess) return;
      if(!target && type === 0) {
        this.announcement = '請選擇組別';
        return;
      }
      if(this.teamAtk <= 0 && type === 0) {
        this.announcement = '沒有足夠攻擊卡';
        return;
      }
      if(this.teamSp <= 0 && type === 1) {
        this.announcement = '沒有足夠加值卡';
        return;
      }
      if(this.teamDef <= 0 && type === 2) {
        this.announcement = '沒有足夠防禦卡';
        return;
      }


      let teamNum = this.loginTeam;
      let eventTypes = this.eventTypes;
      let event = eventTypes[type];
      let req = {
        kindofCard: event,
        target: (type===0?target:-1),
        team: teamNum
      };
      var vm = this;

      // Set data
      let setFunc = async () => {
        vm.loading = true;
        await firebase.database().ref(`changes/${teamNum-1}`).set(req);
        vm.loading = false;
        vm.isSubmit = true;
      }
      setFunc();

    },
    reChoose() {
      if(this.isProcess) return;
      else this.isSubmit = false;

    }
  },
  mounted() {
    if(!this.loginTeam) this.$router.push({name:'home'});
    this.teamStringCalc();
    this.fetchData();
  },
  watch: {
    teamsData() {
      this.fetchData();
    },
    isProcess() {
      if(this.isProcess == false) {
        this.isSubmit = false; 
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

