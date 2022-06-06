<template>
  <div class="container">
    <Header />
    <div style="height: 993px">
      <MainContent />
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import LeftContent from '@/components/LeftContent.vue'
import RightContent from '@/components/RightContent.vue'
import MainContent from '../../components/MainContent.vue'
</script>

<style scoped>
.container {
  padding: 0;
  margin: 0;
  width: 1920px;
  height: 1080px;
  background: url(@/assets/images/background.png) 100% 100% no-repeat;
  position: relative;
}
</style>
