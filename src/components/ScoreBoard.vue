<template>
  <div class="boardWrapper">
    <div class="titleBar">
      <div v-for="(data,i) in labels" class="title" :key="i">{{data}}</div>
    </div>
    <transition-group name="list" tag="div" class="contentWrapper">
      <div v-for="(data,i) in teamsDisplayData" :key="i" :class="teamDataCalc(data)" :style="topCalc(data,i)">
        <div>{{`#${data.curRank}`}}</div>
        <div>{{data.team}}</div>
        <div>{{data.money}}</div>
        <div>{{data.usedCardNum}}</div>
        <div>{{data.atkTimes}}</div>
        <div>{{data.defTimes}}</div>
        <div>{{data.spTimes}}</div>
        <div>{{data.lastRank}}</div>
      </div>
    </transition-group>
    <div v-if="isChangedTeam" class="changeSuccess"></div>
  </div>
</template>

<script>
import { setTimeout } from 'timers'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      labels:['名次','組別','松果','卡牌使用次數','攻擊','防禦','加松果','上次名次'],
      types:['curRank','team','money','usedCardNum','atkTimes','defTimes','spTimes','lastRank'],
      rankStack:[0,0,0,0,0,0,0,0],
      teamsQueue: [],
      teamsDisplayData: [],
      isChangedTeam: false
    }
  },
  computed: {
    ...mapGetters({
      getTeams: 'getTeams'
    })
  },
  methods: {
    topCalc(data,index) {
      let curRank = data.curRank;
      if(this.rankStack[curRank-1] >= 1) {
        curRank = curRank + this.rankStack[curRank-1];
        this.rankStack[curRank-1]++;
        console.log(curRank,this.rankStack[curRank-1]);
      }
      else this.rankStack[curRank-1] = 1;
      if(index == 7) for(let i in this.rankStack) this.rankStack[i] = 0;
      return {"top":(curRank-1)*50+"px"}
    },
    teamDataCalc(data) {
      if(data.curRank > data.lastRank) return 'teamData increase';
      else if(data.curRank < data.lastRank) return 'teamData decrease';
      return 'teamData';
    }
  },
  watch: {
    getTeams() {
      this.isChangedTeam = false;
      this.teamsQueue = this.getTeams;
      console.log("inGetTeams"+this.teamsQueue);
      setTimeout(()=>{
        this.teamsDisplayData = this.teamsQueue
        setTimeout(()=>{this.isChangedTeam = true;},1000);
      },3000);
    }
  }
}
</script>

<style lang="scss">
$white: #eae3e3;
$background:#1a2c5b;
$increase: #4bbb8b;
$decrease: #f85f73;

@keyframes turnGreen {
    0% {background: transparent}
    30% {background: $decrease}
    80% {background: $decrease}
    100% {background: transparent}
}

@keyframes turnRed {
    0% {background: transparent}
    30% {background: $increase}
    80% {background: $increase}
    100% {background: transparent}
}

@keyframes fadeOut {
  0% {border: 2px solid transparent;}
  50% {border: 2px solid #17bebb;}
  100% {border: 2px solid transparent;}
}

%smallDiv {
  width: calc(100% / 8);
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.boardWrapper {
  display: flex;
  flex-direction: column;
  color: $white;
  font-weight: 500;

  width: 80%;

  margin-top: 10%;

  position: relative;
}

.titleBar {
  display: flex;
  flex-direction: row;

  height: 50px;
  // border-bottom: 1px solid rgba($white,.2);

  margin-bottom: 20px;
}
.titleBar div {
  @extend %smallDiv;
}
.contentWrapper {
  width: 100%;
  height: calc(100% - 50px);

  position: relative;

  // display: flex;
  // flex-direction: column;
}
.teamData {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgba($white,.2);

  position: absolute;
  display: flex;
  flex-direction: row;

  transition: all ease 1s;

  &.increase {
    animation: turnRed 1s;
  }

  &.decrease {
    animation: turnGreen 1s;
  }

}

.changeSuccess {
  position: absolute;
  left: 0;
  width: 100%;
  height: 500px;

  transform: scale(1.1);

  animation: fadeOut 1s ease;
}

.teamData div {
  @extend %smallDiv;
}


.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

</style>
