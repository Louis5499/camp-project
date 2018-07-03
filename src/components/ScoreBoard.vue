<template>
  <div class="boardWrapper">
    <div class="titleBar">
      <div v-for="(data,i) in labels" class="title" :key="i">{{data}}</div>
    </div>
    <transition-group name="list" tag="div" class="contentWrapper">
      <div v-for="(data,i) in teamsData" :key="i" :class="teamDataCalc(data)" :style="topCalc(data,i)">
        <div>{{data.curRank}}</div>
        <div>{{data.team}}</div>
        <div>{{data.money}}</div>
        <div>{{data.usedCardNum}}</div>
        <div>{{data.atkTimes}}</div>
        <div>{{data.defTimes}}</div>
        <div>{{data.spTimes}}</div>
        <div>{{data.lastRank}}</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labels:['名次','組別','金錢','卡牌使用次數','攻擊','防禦','加錢','上次名次'],
      types:['curRank','team','money','usedCardNum','atkTimes','defTimes','spTimes','lastRank'],
      rankStack:[0,0,0,0,0,0,0,0]
    }
  },
  computed: {
    teamsData() {
      let arr = this.$store.state.teams;
      return arr;
    },
  },
  methods: {
    topCalc(data,index) {
      let curRank = data.curRank;
      console.log(this.rankStack);
      if(this.rankStack[curRank-1] == 1) curRank++;
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
