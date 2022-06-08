<template>
  <div class="display-box-title">
    <span style="color: #54ebfd; font-size: 20px">当前柜子:</span>
    <span style="margin-left: 14px; color: #fff; font-size: 28px; font-weight: bold">
      {{ displayName }}
    </span>
  </div>
  <div style="display: flex; flex-wrap: wrap; justify-content: space-between">
    <div
      style="width: 120px; height: 60px; text-align: center; margin: 12px 0"
      v-for="(item, index) in displayList"
      :key="index"
    >
      <div
        style="height: 30px; line-height: 20px; color: rgba(255, 255, 255, 0.8); font-size: 14px"
      >
        {{ item.name }}
      </div>
      <div style="height: 40px; color: #7ce8fa; font-size: 28px; font-weight: bold">
        {{ item.value || '-' }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  displayList: {
    type: Array,
    default: () => [],
  },
  displayName: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.display-box-title {
  height: 50px;
  line-height: 50px;
}
</style>
