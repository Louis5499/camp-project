<template>
  <div class="about">
    <ScoreBoard></ScoreBoard>
    <transition name="fade">
      <popOut v-if="isPopOut"></popOut>
    </transition>
  </div>
</template>

<script>
import ScoreBoard from '@/components/ScoreBoard.vue';
import popOut from '@/components/popOut';
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      isPopOut: false
    }
  },
  components: {
    ScoreBoard,popOut
  },
  computed: {
    ...mapGetters({
      getAnnouncement: 'getAnnouncement'
    }),
  },
  watch: {
    getAnnouncement() {
      console.log("in");
      this.isPopOut = true;
      setTimeout(()=>{
        this.isPopOut = false;
      },3000);
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  position: relative;

  height: 100vh;
  width: 100vw;

  overflow: hidden;
}
</style>


