<template>
  <div class="darkWrapper">
    <div v-if="announcement.type == 'Atk-inform'" class="popOut Atk-inform">
      <img src="../assets/sword.png" width="40" height="40" style="margin-bottom: 20px;">
      <span>{{announcement.message}}</span>
    </div>
    <div v-if="announcement.type == 'Atk-success'" class="popOut Atk-success">
      <img src="../assets/sword.png" width="40" height="40" style="margin-bottom: 20px;">
      <span>{{announcement.message}}</span>
    </div>
    <div v-if="announcement.type == 'Atk-fail'" class="popOut Atk-fail">
      <img src="../assets/defence.png" width="40" height="40" style="margin-bottom: 20px;">
      <span>{{announcement.message}}</span>
    </div>
    <div v-if="announcement.type == 'Sp-success'" class="popOut Sp-success">
      <img src="../assets/pinecone.png" width="40" height="40" style="margin-bottom: 20px;">
      <span>{{announcement.message}}</span>
    </div>
    <div v-if="announcement.type == 'Natural-event'" class="popOut Natural-event">
      <span>天然災害</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      announcement: 'getAnnouncement'
    }),
    
  }
}
</script>

<style lang="scss" scoped>
$background: #1c1c1c;

@keyframes fade-out {
  0% {
    background: rgba($background,0);
  }
  100% {
    background: rgba($background,.4);
  }
}

@keyframes popOut {
  0% {
    transform: scale(.85);
  }
  100% {
    transform: scale(1);
  }
}

.darkWrapper {
  width: 100vw;
  height: 100vh;
  background: rgba($background,.4);

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  animation: fade-out ease .3s;
}
.popOut {
  width: 70%;
  height: 300px;
  

  position: relative;
  top: -10%;

  font-size: 3em;
  font-weight: 500;

  color: #eae3e3;

  box-shadow: 5px 5px $background;
  box-sizing: border-box;

  animation: popOut ease .3s;
}
.popOut span {
  display: block;
}
.Atk-inform {
  // background: #f76262;
  background: url("../assets/atk-inform-bg.png");
  background-size: cover;
  background-position: center center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.Atk-success {
  // background: #fe5f55;

  background: url("../assets/atk-success-bg.png");
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.Atk-fail {
  // background: #4e709d;

  background: url("../assets/atk-fail-bg.png");
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.Sp-success {
  // background: #aa530e;

  background: url("../assets/sp-success-bg.png");
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.Natural-event {
  // background: #aa530e;

  background: url("../assets/natural-event-bg.png");
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  
  padding-top: 40px;
  & span {
    display: block;
    font-size: 3em;
    width: 2.5em;
    margin-right: 65px;
    color: white;
  }
}
</style>
