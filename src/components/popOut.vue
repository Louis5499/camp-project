<template>
  <div class="darkWrapper">
    <div class="popOut">
      <span>{{announcement}}</span>
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
  height: 100px;
  background: #df8931;

  position: relative;
  top: -10%;

  font-size: 1.5em;
  font-weight: 500;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  color: #eae3e3;

  box-shadow: 5px 5px $background;

  animation: popOut ease .3s;
}
</style>
