<template>
  <div class="demo">
    <!-- 纯色板 -->
    <div>
      <colors-pick width="30" :swate-colors="['#8B00FF', { color: '#000000', disabled: true }, {
        color: '#00FF00', disabled:
          false
      }, { color: '#00FFFF', disabled: false }]" cp-type='swate' square :copy="false" cp-swat-active="love" cp-swat
        v-model="colors1" />
      <p> {{ colors1 }}</p>
    </div>

    <div>
      <colors-pick cp-swat-active="yes" :cp-swat-active-index='1' cp-type='swate' v-model="colors2" />
      <p> {{ colors2 }}</p>
    </div>

    <div>
      <colors-pick cp-swat-active="circle" round cp-type='swate' v-model="colors3" />
      <p> {{ colors3 }}</p>
    </div>

    <div>
      <colors-pick cp-swat-active="love" :cp-swat-active-index='5' cp-swat-size="30px" round cp-type='swate'
        v-model="colors4" />
      <p> {{ colors4 }}</p>
    </div>

    <div>
      <colors-pick cp-swat-active="goly" :cp-swat-active-index='6' round cp-type='swate' v-model="colors5" />
      <p>{{ colors5 }}</p>
    </div>


    <div>
      <colors-pick cp-swat-active="border" :cp-swat-active-index='3' square cp-type='swate' v-model="colors6" />
      <p>{{ colors6 }}</p>
    </div>

    <div>
      <colors-pick cp-swat-active="border" :cp-swat-active-index='1' round cp-type='swate' v-model="colors7" />
      <p>{{ colors7 }}</p>
    </div>

    <div>
      <colors-pick cp-swat-active="square"
        :swate-colors="[{ color: '#FFFF00', disabled: true }, '#8B00FF', { color: '#00FF00', disabled: false }, { color: '#00FFFF', disabled: false }]"
        :cp-swat-active-index='3' round cp-type='swate' v-model="colors8" />
      <p>{{ colors8 }}</p>
    </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efbc581ae1951ad9468c60dbcaa4ecbe9fe8a7c5

    <!-- 单色 -->
    <div>
      <colors-pick color="#00FFFF" :cp-swat-colors="['#00FFFF', '#FFFF00', '#0000FF', '#00FF00', '#8B00FF']"
        cp-evs="change" round cp-swat-active="love" cp-swat v-model="colors16" />
<<<<<<< HEAD
=======
=======
  
    <!-- 单色 -->
    <div>
      <colors-pick :cp-swat-colors="['#00FFFF', '#FFFF00', '#0000FF', '#00FF00', '#8B00FF']" cp-evs="change" round
        cp-swat-active="love" cp-swat v-model="colors16" />
>>>>>>> ae2b66c8a7b183f04e960c92d6dc390bfb3c1a60
>>>>>>> efbc581ae1951ad9468c60dbcaa4ecbe9fe8a7c5
      <p> {{ colors16 }}</p>
    </div>

    <div>
<<<<<<< HEAD
      <colors-pick :cp-swat-colors="['#eeeeee', '#dddddd', '#000000']" color="#000000" :cp-swat-active-index='2' round
=======
<<<<<<< HEAD
      <colors-pick :cp-swat-colors="['#eeeeee', '#dddddd', '#000000']" color="#000000" :cp-swat-active-index='2' round
=======
      <colors-pick :cp-swat-colors="['#eeeeee', '#dddddd', '#000000']" :cp-swat-active-index='2' round
>>>>>>> ae2b66c8a7b183f04e960c92d6dc390bfb3c1a60
>>>>>>> efbc581ae1951ad9468c60dbcaa4ecbe9fe8a7c5
        cp-swat-active="square" cp-swat v-model="colors17" />
      <p>{{ colors17 }}</p>
    </div>

    <div>
<<<<<<< HEAD
      <colors-pick color="#0000FF" :cp-swat-colors="['#00FFFF', '#FFFF00', '#0000FF', '#00FF00', '#8B00FF']" :copy="false"
        round cp-border="0" cp-swat-active="love" cp-swat v-model="colors18" />
=======
<<<<<<< HEAD
      <colors-pick color="#0000FF" :cp-swat-colors="['#00FFFF', '#FFFF00', '#0000FF', '#00FF00', '#8B00FF']" :copy="false"
        round cp-border="0" cp-swat-active="love" cp-swat v-model="colors18" />
=======
      <colors-pick :cp-swat-colors="['#00FFFF', '#FFFF00', '#0000FF', '#00FF00', '#8B00FF']" :copy="false" round
        cp-border="0" cp-swat-active="love" cp-swat v-model="colors18" />
>>>>>>> ae2b66c8a7b183f04e960c92d6dc390bfb3c1a60
>>>>>>> efbc581ae1951ad9468c60dbcaa4ecbe9fe8a7c5
      <p> {{ colors18 }}</p>
    </div>

    <!-- 渐变 -->
    <div>
      <colors-pick height="150" round width="150" :copy="true" grad-res-data="gradinfo" :grad-color-rotate="45"
        :color="['#FF0000', '#00FFFF']" cp-type='gradc' v-model="colors15" :grad-icon-size="20" />
      <p>{{ colors15 }}</p>
    </div>

    <div>
      <colors-pick height="120" grad-res-data="gradinfo" :grad-dash-size="60" round width="120" :copy="false"
        :grad-color-rotate="0" cp-type='gradc' v-model="colors10" :grad-icon-size="20" />
      <!-- <p>{{ colors10 }}</p> -->
    </div>

    <div>
      <colors-pick height="120" grad-res-data="gradinfo" round width="120" :grad-dash-size="50" :grad-dash-line-height="7"
        :grad-color-rotate="0" :color="['#00FF00', '#0000FF']" cp-type='gradc' v-model="colors11" :grad-icon-size="20" />
      <!-- <p>{{ colors11 }}</p> -->
    </div>


    <div>
      <colors-pick height="100" square width="100" :grad-dash-size="45" grad-res-data="bgcss" grad-dash-active-color="red"
        grad-dash-color="#fff" :grad-dash-line-height="7" :grad-color-rotate="45" :color="['#00FF00', '#00FFFF']"
        cp-type='gradc' v-model="colors12" :grad-icon-size="20" />
      <!-- <p> {{ colors12 }} </p> -->
    </div>

    <div>
      <colors-pick height="100" square width="200" :grad-color-rotate="90" grad-res-data="gradarr" :grad-dash-size="45"
        :grad-dash-line-height="6" :color="['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF']"
        cp-type='gradc' v-model="colors13" :grad-icon-size="20" />
      <p>{{ colors13 }}</p>
    </div>


    <div>
      <colors-pick height="100" round width="100" :copy="false" :grad-color-rotate="45" grad-res-data="txtcss"
        grad-dash-active-color="red" cp-type='gradc' v-model="colors14" :grad-icon-size="20" />
      <!-- <p> {{ colors14 }}</p> -->
    </div>

  </div>
</template>


<script setup>
import { ref } from 'vue'
// 引入
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

<<<<<<< HEAD
const change = v => console.log(v);
=======
<<<<<<< HEAD
const change = v => console.log(v);
=======
const a = v => console.log(v);
>>>>>>> ae2b66c8a7b183f04e960c92d6dc390bfb3c1a60
>>>>>>> efbc581ae1951ad9468c60dbcaa4ecbe9fe8a7c5
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