<template>
  <div class="mainWrapper">
    <div class="topWrapper">
      <div class="bitcoin">
        <span class="bitcoinTitle">{{teamMoney}}</span>
        <img class="bitcoin" src="../assets/bitcoin.png" width="15" height="15">
      </div>
      <div class="teamInfo">
        <span>{{teamString}}</span>
      </div>
      <div class="cardInfo">
        <div class="atkWrapper">
          <img src="../assets/atk.png" width="15" height="15">
          <span>{{teamAtk}}</span>
        </div>
        <div class="defWrapper">
          <img src="../assets/def.png" width="15" height="15">
          <span>{{teamDef}}</span>
        </div>
        <div class="spWrapper">
          <img src="../assets/sp.png" width="15" height="15">
          <span>{{teamSp}}</span>
        </div>
      </div>
    </div>
    <div class="scoreBoard">
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
  </div>
</template>

<script>
import css from '../css/main.scss'

export default {
  data() {
    return {
      teamString: '',
      teamMoney: 0,
      teamAtk: 0,
      teamDef: 0,
      teamSp: 0
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
    }
  },
  methods: {
    boardContentCalc(data) {
      if(data.team == this.loginTeam) return 'boardContent select';
      else return 'boardContent';
    },
    teamStringCalc() {
      let teamId = this.loginTeam;
      switch(teamId) {
        case 1:
          this.teamString =  '第一組';
          break;
        case 2:
          this.teamString =  '第二組';
          break;
        case 3:
          this.teamString =  '第三組';
          break;
        case 4:
          this.teamString =  '第四組';
          break;
        case 5:
          this.teamString =  '第五組';
          break;
        case 6:
          this.teamString =  '第六組';
          break;
        case 7:
          this.teamString =  '第七組';
          break;
        case 8:
          this.teamString =  '第八組';
          break;
      }
    },
    fetchData() {
      for(let data of this.$store.state.teams) {
        if(data.team == this.loginTeam) {
          this.teamMoney = data.money;
          this.teamAtk = data.atk;
          this.teamDef = data.def;
          this.teamSp = data.sp;
        }
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

