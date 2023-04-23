<template>
  <!-- <colors-pick v-model="colors1" cp-swat /> 
<br><br><br><br><br><br><br><br><br><br>  
  <colors-pick v-model="colors2" cp-type="swate" :cp-swat-active-index="8"/>
  {{ colors2 }} -->

  <!--   v-model="colors1" cp-evs="change"-->
  <!-- <colors-pick v-model:input="colors2"/>
  {{ colors2}} -->

  <colors-pick v-model="colors1" cp-type="gradc" cp-evs="change" grad-res-data="gradinfo" />
  <br><br><br><br><br><br><br><br><br><br> <br><br><br> <br><br><br> <br><br><br>
  {{ colors1 }}

  <!-- input change -->
</template>

<script setup>
import { ref } from 'vue'
import ColorsPick from '@/components/ColorsPick.vue'

const colors1 = ref()
const colors2 = ref()
const colors3 = ref()
const colors4 = ref()
const colors5 = ref()
const colors6 = ref()
const colors7 = ref()
const colors8 = ref()
const colors9 = ref()
const colors10 = ref()
const colors11 = ref()
const colors12 = ref()
const colors13 = ref()
const colors14 = ref({
  colorInfo: ""
})

const colors15 = ref()
const colors16 = ref()
const colors17 = ref()
const colors18 = ref()

const a = v => console.log(v);
</script>

<style scoped>
.demo {
  display: flex;
  justify-content: start;
  gap: 20px;
  flex-wrap: wrap;
}

.demo>div {
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;
  flex-direction: column;
}
</style> 