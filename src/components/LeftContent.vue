<template>
  <div class="left-content-container">
    <DisplayBox />
  </div>
</template>

<script setup>
import DisplayBox from './DisplayBox.vue'
</script>

<style scoped>
.left-content-container {
  width: 462px;
  height: 916px;
  background: url(@/assets/images/container.png) left top no-repeat;
  background-size: 100% 100%;
  margin-left: 32px;
  margin-top: 30px;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 18px;
}
</style>
