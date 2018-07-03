<template>
  <div class="mainWrapper">
    <div class="topWrapper">
      <div class="moneyWrapper">
        <div class="moneyTop">
          <img class="bitcoin" src="../assets/bitcoin.png" width="20" height="20">
          <span class="bitcoinTitle">Bitcoin</span>
        </div>
        <span class="bitcoinAmount">2300</span>
      </div>
      <div class="cardWrapper">
        <div class="atkWrap">
          <span class="cardNum">7</span>
        </div>
        <div class="defWrap">
          <span class="cardNum">3</span>
        </div>
        <div class="spWrap">
          <span class="cardNum">6</span>
        </div>
      </div>
    </div>
    <div class="scoreBoard">
        <div class="boardTitle">
          <div class="titleRank">排名</div>
          <div class="titleTeam">組別</div>
          <div class="titleMoney">金錢</div>
        </div>
        <div class="boardContent" v-for="(data,i) in teamsData" :key="i">
          <div class="contentRank">{{data.curRank}}</div>
          <div class="contentTeam">{{data.team}}</div>
          <div class="contentMoney">{{data.money}}</div>
        </div>
      </div>
  </div>
</template>

<script>
import css from '../css/main.scss'
import { mapState } from 'vuex'
export default {
  computed: {
    teamsData() {
      return this.$store.state.teams;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

