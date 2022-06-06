<template>
  <div class="header-container">
    <div class="header-left">
      <span class="digit">2020</span>
      <span style="margin: 0 8px">年</span>
      <span class="digit">9</span>
      <span style="margin: 0 8px">月</span>
      <span class="digit">6</span>
      <span style="margin: 0 8px">日</span>

      <span style="margin-left: 32px">星期</span>
      <span class="digit">二</span>

      <span class="digit" style="margin-left: 32px; font-size: 20px">12:00:00</span>
    </div>
    <div class="header-cneter">中驰能源管理平台</div>
    <div class="header-right">
      <span style="margin-right: 10px; color: rgba(255, 255, 255, 0.8)">晴</span>
      <span style="color: #7ce8fa">20-23℃</span>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.header-container {
  width: 100%;
  height: 87px;
  background: rgba(9, 21, 45, 1) url(@/assets/images/header.png) left top no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
}

.header-left {
  width: 40%;
  height: 100%;
  padding-top: 8px;
  padding-left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
}

.digit {
  color: #7ce8fa;
  font-family: Leslie;
}

.header-cneter {
  height: 100%;
  width: 20%;
  line-height: 87px;
  text-align: center;
  font-size: 36px;
  font-family: FZShangKuS-R-GB;
  font-weight: bold;
  color: #7ce8fa;
}

.header-right {
  height: 100%;
  width: 40%;
  padding-top: 8px;
  padding-right: 20px;
  text-align: right;
}
</style>
