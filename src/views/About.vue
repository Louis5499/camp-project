<template>
  <div class="about">
    <ScoreBoard></ScoreBoard>
  </div>
</template>

<script>
import ScoreBoard from '@/components/ScoreBoard.vue';

export default {
  components: {
    ScoreBoard
  }
}
</script>

<style lang="scss" scoped>
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


