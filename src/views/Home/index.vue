<template>
  <div class="container">
    <Header />
    <div style="height: 993px; position: relative">
      <MainContent @on-change="changeHandler" />
      <div style="position: absolute; display: flex; top: 0; left: 0">
        <Transition name="slide-fade">
          <LeftContent :id="id" v-show="isShow" />
        </Transition>
      </div>
      <div style="position: absolute; display: flex; top: 0; right: 0">
        <Transition name="slide-fade">
          <RightContent :id="id" v-show="isShow" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import Header from '@/components/Header.vue'
import LeftContent from '@/components/LeftContent.vue'
import RightContent from '@/components/RightContent.vue'
import MainContent from '@/components/MainContent.vue'

const isShow = ref(false)
const id = ref('')

const changeHandler = params => {
  const { show, name } = params

  console.log('------------params------------', params)

  isShow.value = show
  id.value = name
}
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

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
