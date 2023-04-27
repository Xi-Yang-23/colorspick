<template>
  <!-- 单色模式 -->
  <div class="colors-pick flex" v-if="cpType === 'onec'">

    <!-- 颜色值与复制按钮-->
    <div class="flex">
      <input :style="{ 'width': widthAndHeight.w, 'height': widthAndHeight.h }" :disabled="!props.disabled"
        class="set-color  cue-po" type="color" @change="inputEvs" @input="inputEvs" :value="onecActiveColor">

      <div class="copy color-box active cue-po" @click="startCopy" v-if="props.copy">
        <div>{{ onecActiveColor }}</div>
        <slot name="copy">
          <svg t="1681639555524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="6780" width="200" height="200">
            <path d="M896 896V128H320V0h704v896h-128zM768 192h64v832H0V192h768zM128 896h576V320H128v576z" fill="#4C89FB"
              p-id="6781"></path>
          </svg>
        </slot>
      </div>
    </div>

    <!-- 单色色板 -->
    <div v-if="props.cpType === 'gradc' ? false : props.cpSwat" class="cp-swatches"
      :style="{ 'width': props.cpSwatWidth, 'gap': props.cpSwatGap }">

      <div @click="swatClick(item, index)" :class="onecActiveColorIndex === index ? swatches.swtActive : ''"
        v-for="(item, index) in props.cpSwatColors"
        :style="{ 'background': item, 'width': props.cpSwatSize, 'height': props.cpSwatSize, 'border-radius': radius }"
        :key="index" class="cue-po hover active"></div>
    </div>
  </div>

  <!-- 渐变模式 -->
  <div v-else-if="cpType === 'gradc'" class="cp-gradc">
    <!-- 展示线性渐变样式 -->
    <div class="show-demo" :style="resColorTxt">
      <!-- 复制按钮 -->
      <div v-if="props.copy" @click="startCopy">
        <!-- 渐变色复制按钮插槽 -->
        <slot name="copy">
          <svg t="1681639555524" class="icon icon-defalut hover  active cue-po cp-gradc-copy" viewBox="0 0 1024 1024"
            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6780" width="200" height="200">
            <path d="M896 896V128H320V0h704v896h-128zM768 192h64v832H0V192h768zM128 896h576V320H128v576z" fill="#4C89FB"
              p-id="6781"></path>
          </svg>
        </slot>
      </div>

      <!-- 旋转度数 -->
      <div class="rotate-view" :class="rotateConfig.showOrHide">
        <div class="line-box">
          <div :style="{
              'transform': 'rotate(' + (i + 1) * 4 + 'deg)', 'background-color': rotateConfig.rotateDeg > i * 4 ? props.gradDashActiveColor : props.gradDashColor
            }" v-for="(, i) in 90" :key="i"></div>
        </div>
        <span class="rotate-val">{{ rotateConfig.rotateDeg }}°</span>
      </div>
    </div>

    <!-- 颜色设置  -->
    <div class="cp-color-bar flex" v-show="!showColorBar">
      <!-- 滑动条 -->
      <div class="cp-color-set flex">
        <!-- 调整颜色位置-->
        <div v-for="( , listIndex) in colorList" :key="listIndex" :class="colorList[listIndex].zindexUp"
          :style="{ 'left': colorList[listIndex].x + 'px' }" @mouseover="gradcp.mouseout(listIndex)"
          @mousedown="gradcp.down(listIndex, $event)" @mouseenter="gradcp.mouseover(listIndex)"
          @touchstart="gradcp.down(listIndex, $event)">

          <input :disabled="props.disabled === false ? true : colorList[listIndex].disabled" type="color"
            :value="colorList[listIndex].color" @input="gradColorInput(listIndex, $event)">

          <!--  hide 隐藏  | show显示  -->
          <span :class="colorList[listIndex].tiptoggle" class="color-tip-value">{{ colorList[listIndex].pos }}%</span>
        </div>
      </div>

      <!-- 旋转 + 关闭 -->
      <div class="rotate-close-set flex">
        <input @input="rotate" :value="rotateConfig.rotateDeg" :style="{ width: props.gradRangeWidth - 30 + 'px' }"
          type="range" min="0" max="360" step='1'>

        <!-- 关闭设置 -->
        <div @click="gradToogleShowCOlor" :style="{
            'width': props.gradIconSize + 'px', 'height': props.gradIconSize + 'px'
          }">
          <slot name="grad-close-setting">
            <svg t="1681721662679" class="icon icon-defalut active hover cue-po" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="17550" width="200" height="200">
              <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#F55300" p-id="17551"></path>
              <path
                d="M258.56 358.912l434.432 434.432a51.2 51.2 0 0 0 72.3968-72.3968L330.9568 286.5152A51.2 51.2 0 1 0 258.56 358.912z"
                fill="#F9F9F9" p-id="17552"></path>
              <path
                d="M258.56 712.192l434.432-434.432a51.2 51.2 0 0 1 72.448 72.3968l-434.4832 434.432A51.2 51.2 0 1 1 258.56 712.192z"
                fill="#F9F9F9" p-id="17553"></path>
            </svg>
          </slot>
        </div>

      </div>
    </div>

    <!-- 颜色选项 -->
    <div class="set-color-bar flex" v-show="showColorBar">
      <input v-for="(, index) in colorList" :key="index" :disabled="!props.disabled" class="gradc-select hover cue-po"
        type="color" :value="colorList[index].color" @input="gradColorInput(index, $event)">

      <!-- 设置 -->
      <div @click="gradToogleShowCOlor" :style="{
          'width': props.gradIconSize + 'px', 'height': props.gradIconSize + 'px'
<<<<<<< HEAD
        }" class="active hover cue-po">
        <slot name="grad-setting">
          <svg t="1681701231439" class="icon icon-defalut" viewBox="0 0 1024 1024" version="1.1"
=======
<<<<<<< HEAD
        }" class="active hover cue-po">
        <slot name="grad-setting">
          <svg t="1681701231439" class="icon icon-defalut" viewBox="0 0 1024 1024" version="1.1"
=======
        }">
        <slot name="grad-setting">
          <svg t="1681701231439" class="icon icon-defalut active hover cue-po" viewBox="0 0 1024 1024" version="1.1"
>>>>>>> 7672e946abb9e2c758abc818868742b751a36db8
>>>>>>> 9ca63ab23bb3ab666e0eb5b2f608687108ec8eb7
            xmlns="http://www.w3.org/2000/svg" p-id="9826" width="200" height="200">
            <path
              d="M627.2 972.8c19.456 19.456 51.2 25.6 76.8 12.8 45.056-19.456 83.456-38.4 121.856-70.656 19.456-19.456 32.256-44.544 25.6-76.8-6.656-38.4 0-83.456 19.456-121.856s57.344-64 96.256-76.8c25.6-6.656 44.544-32.256 51.2-57.344 6.656-45.056 6.656-96.256 0-140.8-6.656-25.6-25.6-51.2-51.2-57.856-38.4-12.8-76.8-38.4-96.256-76.8s-25.6-83.456-19.456-121.856c6.656-25.6-6.656-57.856-25.6-76.8-38.4-31.744-76.8-51.2-121.856-70.656-25.6-12.8-57.344-6.656-76.8 12.8C563.2 109.056 460.8 109.056 396.8 51.2c-19.456-19.456-51.2-25.6-76.8-12.8-44.544 18.944-83.456 38.4-121.856 70.656-25.6 19.456-32.256 45.056-25.6 76.8C192 268.8 140.8 358.4 57.856 384c-32.256 6.656-51.2 32.256-51.2 57.856C0 467.456 0 486.4 0 512s0 45.056 6.656 70.656c0 25.6 19.456 51.2 51.2 57.344 38.4 12.8 76.8 38.4 96.256 76.8s25.6 83.456 18.944 121.856c-6.656 25.6 6.656 57.344 25.6 76.8 38.4 32.256 76.8 51.2 121.856 70.656 25.6 12.8 57.856 6.656 76.8-12.8 63.488-64.512 165.888-64.512 229.888-0.512z"
              fill="#919BF2" p-id="9827"></path>
            <path d="M512 512m-147.456 0a147.456 147.456 0 1 0 294.912 0 147.456 147.456 0 1 0-294.912 0Z" fill="#FFFFFF"
              p-id="9828"></path>
          </svg>
        </slot>
      </div>


      <!-- 删除 -->
      <div :style="{
          'width': props.gradIconSize + 'px', 'height': props.gradIconSize + 'px'
<<<<<<< HEAD
        }" @click="gradRemove" :class="colorList.length > 2 ? 'active hover cue-po' : 'disabled'">
        <slot name="grad-del">
          <svg t="1681701036913" class="icon active icon-defalut" viewBox="0 0 1024 1024" version="1.1"
=======
<<<<<<< HEAD
        }" @click="gradRemove" :class="colorList.length > 2 ? 'cue-po hover active' : 'disabled'">
        <slot name="grad-del">
          <svg t="1681701036913" class="icon icon-defalut" viewBox="0 0 1024 1024" version="1.1"
=======
        }" @click="gradRemove" :class="colorList.length > 2 ? '' : 'disabled'">
        <slot name="grad-del">
          <svg t="1681701036913" class="icon active icon-defalut hover cue-po" viewBox="0 0 1024 1024" version="1.1"
>>>>>>> 7672e946abb9e2c758abc818868742b751a36db8
>>>>>>> 9ca63ab23bb3ab666e0eb5b2f608687108ec8eb7
            xmlns="http://www.w3.org/2000/svg" p-id="6896" width="200" height="200">
            <path
              d="M512 0a89.043478 89.043478 0 0 1 89.043478 89.043478v44.521739H422.956522V89.043478a89.043478 89.043478 0 0 1 89.043478-89.043478zM155.826087 178.086957v756.869565a89.043478 89.043478 0 0 0 89.043478 89.043478h534.26087a89.043478 89.043478 0 0 0 89.043478-89.043478V178.086957z m222.608696 623.304347a44.521739 44.521739 0 0 1-89.043479 0V311.652174a44.521739 44.521739 0 0 1 89.043479 0z m178.086956 0a44.521739 44.521739 0 0 1-89.043478 0V311.652174a44.521739 44.521739 0 0 1 89.043478 0z m178.086957 0a44.521739 44.521739 0 0 1-89.043479 0V311.652174a44.521739 44.521739 0 0 1 89.043479 0z"
              fill="#F55E55" p-id="6897"></path>
            <path
              d="M66.782609 89.043478m44.521739 0l801.391304 0q44.521739 0 44.521739 44.521739l0 0q0 44.521739-44.521739 44.52174l-801.391304 0q-44.521739 0-44.521739-44.52174l0 0q0-44.521739 44.521739-44.521739Z"
              fill="#F9BBB8" p-id="6898"></path>
          </svg>
        </slot>
      </div>

      <!-- 增加 -->
      <div :style="{
          'width': props.gradIconSize + 'px', 'height': props.gradIconSize + 'px'
<<<<<<< HEAD
        }" @click="gradAdd" :class="colorList.length < gradColorNum ? 'active hover cue-po' : 'disabled'">
        <slot name="grad-add">
          <svg t="1681700429214" class="icon icon-defalut" viewBox="0 0 1024 1024" version="1.1"
=======
<<<<<<< HEAD
        }" @click="gradAdd" :class="colorList.length < gradColorNum ? 'cue-po hover active' : 'disabled'">
        <slot name="grad-add">
          <svg t="1681700429214" class="icon icon-defalut" viewBox="0 0 1024 1024" version="1.1"
=======
        }" @click="gradAdd" :class="colorList.length < gradColorNum ? '' : 'disabled'">
        <slot name="grad-add">
          <svg t="1681700429214" class="icon icon-defalut active hover cue-po" viewBox="0 0 1024 1024" version="1.1"
>>>>>>> 7672e946abb9e2c758abc818868742b751a36db8
>>>>>>> 9ca63ab23bb3ab666e0eb5b2f608687108ec8eb7
            xmlns="http://www.w3.org/2000/svg" p-id="4388" width="200" height="200">
            <path
              d="M512 42.666667C253.866667 42.666667 42.666667 253.866667 42.666667 512s211.2 469.333333 469.333333 469.333333 469.333333-211.2 469.333333-469.333333S770.133333 42.666667 512 42.666667z m213.333333 512h-170.666666v170.666666c0 23.466667-19.2 42.666667-42.666667 42.666667s-42.666667-19.2-42.666667-42.666667v-170.666666h-170.666666c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666667h170.666666v-170.666666c0-23.466667 19.2-42.666667 42.666667-42.666667s42.666667 19.2 42.666667 42.666667v170.666666h170.666666c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666667z"
              fill="#80B8F8" p-id="4389"></path>
          </svg>
        </slot>
      </div>
    </div>
  </div>

  <!-- 纯色板模式 -->
  <div class="cp-swatches" v-else :style="{ 'width': props.cpSwatWidth, 'gap': props.cpSwatGap }">
    <div @click="swatClick(item, index)"
      :class="[onecActiveColorIndex === index ? swatches.swtActive : '', item.disabled === true ? 'hover' : 'swat-disabled']"
      v-for="( item, index ) in  colorList "
      :style="{ 'background': item.color, 'width': props.cpSwatSize, 'height': props.cpSwatSize, 'border-radius': radius }"
      :key="index" class="cue-po active"></div>
  </div>

  <!-- 复制提示 -->
  <div v-if="props.copy" :style="{ 'z-index': props.zIndex }" :class="isCopy">
    <slot name="copy-tip">
      <div class="copy-success flex">
        <span>复制成功</span>
        <svg t="1681647941254" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="8621" width="200" height="200">
          <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#67EBB2" opacity=".15" p-id="8622">
          </path>
          <path
            d="M512 814.545455a302.545455 302.545455 0 0 1-213.934545-516.48 302.545455 302.545455 0 1 1 427.86909 427.86909A300.555636 300.555636 0 0 1 512 814.545455z m-124.148364-328.052364a36.072727 36.072727 0 0 0-25.6 61.486545l92.997819 93.730909a29.917091 29.917091 0 0 0 42.46109 0l165.853091-166.74909a29.928727 29.928727 0 0 0-40.226909-44.218182l-127.418182 104.808727a29.905455 29.905455 0 0 1-38.597818-0.488727l-45.905454-39.761455a36.002909 36.002909 0 0 0-23.563637-8.808727z"
            fill="#20D76D" p-id="8623"></path>
        </svg>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'ColorsPick'
} 
</script>

<script setup>
import { computed, ref, reactive, onMounted, watch, useAttrs } from 'vue'
import copy from '@/utils/copy'
import ramColor from '@/utils/ramColor'
import Gradc from '@/utils/gradc'

const emit = defineEmits(['update:modelValue'])


const props = defineProps(
  {
    cpEvs: {
      type: String,
      default: 'input'
    },

    gradResData: {
      default: 'all',
      type: String,
    },

    cpSwatSize: {
      default: '30px',
      type: String,
    },

    cpSwatActive: {
      default: 'love',
      type: String,
    },

    cpSwatGap: {
      default: '5px',
      type: String,
    },

    cpSwatWidth: {
      default: '150px',
      type: String,
    },

    cpSwat: {
      default: false,
      type: Boolean,
    },

    // 纯色板
    swateColors: {
      default: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF'],
      type: [Array, String, Object],
    },


    cpSwatColors: {
      default: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#8B00FF'],
      type: Array,
    },
    gradColorNum: {
      default: 99,
      type: Number,
    },
    zIndex: {
      default: 1,
      type: Number,
    },
    cpSwatActiveIndex: {
      default: 0,
      type: Number,
    },

    gradColorRotate: {
      default: 90,
      type: Number,
    },

    gradDashColor: {
      default: 'rgba(0,0,0,.4)',
      type: String,
    },

    gradDashActiveColor: {
      default: '#fff',
      type: String,
    },

    gradDashSize: {
      default: 70,
      type: Number,
    },
    gradDashLineHeight: {
      default: 10,
      type: Number,
    },

    gradRangeColor: {
      default: '#cbcbcb',
      type: String,
    },

    gradIconSize: {
      default: 15,
      type: Number,
    },

    cpBorder: {
      default: '2px #f4f4f4',
      type: String,
    },

    gradRangeWidth: {
      default: 200,
      type: Number,
    },
    gradRangeHeight: {
      default: '2px',
      type: String,
    },

    height: {
      default: '200px',
      type: [String, Number],
    },
    width: {
      default: '200px',
      type: [String, Number],
    },
    modelValue: {
      type: [String, Array, Object],
      default: '#05b9e6'
    },
    cpType: {
      default: 'onec',
      type: String,
      validator(value) {
        return ['onec', 'gradc', 'swate'].includes(value)
      }
    },

    copy: {
      default: true,
      type: Boolean,
    },

    color: {
      type: [String, Array],
      default: '#05b9e6'
    },

    round: {
      type: Boolean,
      default: false,
    },

    toastTime: {
      type: Number,
      default: 1000,
    },


    disabled: {
      type: Boolean,
      default: true,
    },

    square: {
      type: Boolean,
      default: false,
    },

  })

let gradcp, time = null;


// 事件类型  
const inputEvs = ev => {
  const getEv = ev.type
  const colorVal = ev.target.value

  if (props.cpEvs === 'change' && getEv === 'change') {
    onecActiveColor.value = colorVal
    emit('update:modelValue', onecActiveColor.value)
  } else if (props.cpEvs === 'input' && getEv === 'input') {
    onecActiveColor.value = colorVal
    emit('update:modelValue', onecActiveColor.value)
  }

  onecActiveColorIndex.value = compOneColorActiveIndex.value
}

// 计算颜色激活的下标
const compOneColorActiveIndex = computed(() => onecActiveColorIndex.value = props.cpSwatColors.findIndex(itemColor => itemColor.toLocaleLowerCase() === onecActiveColor.value.toLocaleLowerCase()))


onMounted(() => {
  if (props.cpType === 'gradc') {
    // 渐变色监听
    gradcp = new Gradc(colorList.value, props.gradRangeWidth, props.gradIconSize)
    watch(colorList, getGradColor, { deep: true })
  }
})

/* 渐变数组 
* ① @colorList Array 颜色数组
    Object{}
      @color String 颜色
      @pos Number  位置 
      ② 纯色板数组
color:颜色
disabled:是否可选
*/
const colorList = ref([])

// 颜色文本
const resColorTxt = computed(() => {
  let colorInfo = ''
  colorList.value.forEach((colorItem, i) => {
    i === colorList.value.length - 1 ? colorInfo += colorItem.color + ' ' + colorItem.pos + '% ' : colorInfo += colorItem.color + ' ' + colorItem.pos + '% ,'
  });

  const resColor = {
    'background-image': '-webkit-linear-gradient(' + rotateConfig.rotateDeg + 'deg,' + colorInfo + ')',
    'background-image': '-moz-linear-gradient(' + rotateConfig.rotateDeg + 'deg,' + colorInfo + ')',
    'background-image': '-o-linear-gradient(' + rotateConfig.rotateDeg + 'deg,' + colorInfo + ')',
    'background-image': 'linear-gradient(' + rotateConfig.rotateDeg + 'deg,' + colorInfo + ')',
    'width': widthAndHeight.value.w,
    'height': widthAndHeight.value.h
  }

  return resColor
})

// 旋转配置
const rotateConfig = reactive({
  rotateDeg: Number(props.gradColorRotate),// 旋转角度 默认90
  showOrHide: 'hide'
})

// 旋转滑块input事件函数
const rotate = e => {
  clearTimeout(time)

  rotateConfig.rotateDeg = Number(e.target.value)
  rotateConfig.showOrHide = 'show'

  getGradColor()

  time = setTimeout(() => {
    rotateConfig.showOrHide = 'hide'
  }, 1000);
}

/**
 * 渐变模式取值 并发给父级
 */
const getGradColor = () => {
  let cssInfoTxt = '',
    colorArr = []

  const rotateDeg = rotateConfig.rotateDeg + 'deg'

  colorList.value.forEach((colorItem, i) => {
    const color = colorItem.color
    const pos = colorItem.pos

    colorArr.push({
      color,
      pos
    })

    if (colorList.value.length - 1 === i) {
      cssInfoTxt += color + ' ' + pos + '% '
    } else {
      cssInfoTxt += color + ' ' + pos + '%' + ', '
    }
  })

  cssInfoTxt = rotateDeg + ', ' + cssInfoTxt

  if (props.gradResData === 'gradinfo') {
    copyTxt.value = cssInfoTxt
  } else if (props.gradResData === 'gradarr') {
    copyTxt.value = colorArr
  } else if (props.gradResData === 'bgcss') {
    copyTxt.value = `
    background-image: -webkit-linear-gradient(${cssInfoTxt});
    background-image: -moz-linear-gradient(${cssInfoTxt});
    background-image: -o-linear-gradient(${cssInfoTxt});
    background-image: linear-gradient(${cssInfoTxt}); 
    `
  } else if (props.gradResData === 'txtcss') {
    copyTxt.value = `
    background-image: -webkit-linear-gradient(${cssInfoTxt});
    background-image: -moz-linear-gradient(${cssInfoTxt});
    background-image: -o-linear-gradient(${cssInfoTxt});
    background-image: linear-gradient(${cssInfoTxt}); 
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -o-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    `
  } else {
    copyTxt.value = {
      rotateDeg,
      colorArr,
      colorInfo: cssInfoTxt,
      bgcss: `
    background-image: -webkit-linear-gradient(${cssInfoTxt});
    background-image: -moz-linear-gradient(${cssInfoTxt});
    background-image: -o-linear-gradient(${cssInfoTxt});
    background-image: linear-gradient(${cssInfoTxt}); 
    `,
      txtcss: `
    background-image: -webkit-linear-gradient(${cssInfoTxt});
    background-image: -moz-linear-gradient(${cssInfoTxt});
    background-image: -o-linear-gradient(${cssInfoTxt});
    background-image: linear-gradient(${cssInfoTxt}); 
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -o-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    `,
      css: `
.cp-color { 
/* 背景渐变 */
 background-image: -webkit-linear-gradient(${cssInfoTxt});
 background-image: -moz-linear-gradient(${cssInfoTxt});
 background-image: -o-linear-gradient(${cssInfoTxt});
 background-image: linear-gradient(${cssInfoTxt}); 

/* 文字渐变 */
/* background-image: -webkit-linear-gradient(${cssInfoTxt});
 background-image: -moz-linear-gradient(${cssInfoTxt});
 background-image: -o-linear-gradient(${cssInfoTxt});
 background-image: linear-gradient(${cssInfoTxt}); 
 -webkit-background-clip: text;
 -moz-background-clip: text;
 -o-background-clip: text;
 background-clip: text;
 -webkit-text-fill-color: transparent;*/
}
`
    }
  }

  emit('update:modelValue', copyTxt.value)
}

// 显示颜色栏
const showColorBar = ref(true)

// 渐变input方法
const gradColorInput = (colorIndex, event) => {
  const color = event.target.value
  colorList.value[colorIndex].color = color
}

// 渐变色操作
const gradAdd = () => {
  const colorLen = colorList.value.length;

  if (colorLen >= gradColorNum.value) return;

  const colorIndexLen = colorLen - 1;
  const lastColorPos = colorList.value[colorIndexLen].pos

  let defaultColor = {
    color: ramColor(),
    pos: 100
  }

  // 若只有2颜色 
  if (colorLen === 2) {
    colorList.value[1].pos = 50
    defaultColor.pos = 100
  } else {
    const lastTwoColorPos = colorList.value[colorLen - 2].pos//倒数第二个颜色的位置
    const rounPos = Math.round((lastColorPos - lastTwoColorPos) / 2)//最后颜色的位置
    const lastTwoPos_ = rounPos + lastTwoColorPos

    colorList.value[colorIndexLen].pos = lastTwoPos_ >= 100 ? 100 : lastTwoPos_
  }

  defaultColor.tiptoggle = 'hide'
  colorList.value.push(defaultColor)


  // 更新位置
  gradcp.updataPos([colorLen - 1, colorLen])
}
const gradRemove = () => {
  const isMin = colorList.value.length > 2

  if (isMin === true) {
    colorList.value.pop()
    return true
  }

  return false
}

const gradToogleShowCOlor = () => showColorBar.value = !showColorBar.value

const copyTxt = ref();
const copySuccess = ref();

// 复制操作
const startCopy = () => {
  let copyState = null

  if (props.cpType === 'onec') {
    copyState = copy(onecActiveColor.value)
  } else {
    if (copyTxt.value === undefined) {
      getGradColor()
    }

    if (typeof copyTxt.value === 'object') {
      copyState = copy(JSON.stringify(copyTxt.value))
    } else {
      copyState = copy(copyTxt.value)
    }

  }


  if (copyState === true) {
    copySuccess.value = true;

    let showTime = 1000

    // toast时间真实性
    if (/^\d+$/.test(props.toastTime) === true) {
      showTime = props.toastTime
    }

    setTimeout(() => {
      copySuccess.value = false;
    }, showTime);
  }
}

// 长度单位正则
const patch = /^\d+(px|%|vw|vh|rem|em|pt|pc|in|Q|mm|cm|ex|cap|ch|c|lh|rlh|vi|vb|vmin|vmax)$/
// 数字正则
const num = /(?=.*\d)^\d+$/

// 仪表盘
const dashInfo = computed(() => {
  const dashSize = props.gradDashSize + 'px'// 仪表盘大小
  const gradLineDashHeight = props.gradDashLineHeight + 'px'// 仪表盘数目长度  
  const hNum = Number(props.height.match(/\d+/g))//取颜色盘高度 
  const dashTop = (hNum - Number(props.gradDashSize) * 2) / 2 + 'px'//仪表盘距离顶部位置

  return {
    dashSize,
    gradLineDashHeight,
    dashTop
  }
})

//渐变颜色数量
const gradColorNum = computed(() => /(?=.*\d)^([1-9][0-9]|[2-9]{1})$/.test(props.gradColorNum) ? props.gradColorNum : 99)

const isCopy = computed(() => copySuccess.value === true ? 'show' : 'hide')

const cpType = computed(() => {
  if (/^(onec|gradc|swate)$/.test(props.cpType)) {
    return props.cpType
  }
  return 'onec'
})

// 单色
const onecActiveColor = ref()
const onecActiveColorIndex = ref(0)

// 色板
const swatches = computed(() => {
  let swtActive = props.cpSwatActive

  switch (swtActive) {
    case 'border':
      swtActive = 'active-border'
      break;

    case 'yes':
      swtActive = 'active-yes'
      break;

    case 'love':
      swtActive = 'active-love'
      break;

    case 'goly':
      swtActive = 'active-goly'
      break;

    case 'square':
      swtActive = 'active-square'
      break;

    case 'circle':
      swtActive = 'active-circle'
      break;

    default:
      swtActive = 'active-love'
      break;
  }

  return {
    swtActive
  }
})

// 色板点击
const swatClick = (color, activeIndex) => {
  if (cpType.value === 'swate') {
    if (color.disabled === true) {
      onecActiveColor.value = color.color
      onecActiveColorIndex.value = activeIndex
    }

  } else if (cpType.value === 'onec') {
    onecActiveColor.value = color
    onecActiveColorIndex.value = activeIndex
  }
  emit('update:modelValue', onecActiveColor.value)
}

// 颜色初始化
const gradColorInit = [
  {
    color: '#6284FF',
    pos: 0,
  },
  {
    color: '#FF0000',
    pos: 100,
  }
]

/**
 * 初始化
 */
//   单色
if (cpType.value === 'onec') {
  if (props.cpSwat === true) {
    onecActiveColor.value = props.cpSwatColors[props.cpSwatActiveIndex]
    onecActiveColorIndex.value = props.cpSwatActiveIndex
  } else {
    onecActiveColor.value = props.color
  }
  // 单色首次加载  
  emit('update:modelValue', onecActiveColor.value)

  // 渐变色
} else if (cpType.value === 'gradc') {
  // 判断props.color是否为数组
  const colorIsArr = Array.isArray(props.color)

  if (colorIsArr) {
    // props.color都是颜色数组
    const isColor = !props.color.some(colorItem => /^#[a-f\d]{6}$/ig.test(colorItem) === false);

    if (isColor && props.color.length > 1) {
      let colorArr = [], propsColorArr = [];


      // 超过规定数量
      const colorChao = props.color.length > props.gradColorNum

      colorChao === true ? propsColorArr = props.color.slice(0, props.gradColorNum) : propsColorArr = props.color

      const colorIndexLen = propsColorArr.length - 1

      let colorItemLen = 100 / colorIndexLen

      propsColorArr.forEach((colorItem, index) => {
        if (index === 0) {
          colorArr.push({
            pos: 0,
            color: colorItem
          })
        } else if (index === colorIndexLen) {
          colorArr.push({
            pos: 100,
            color: colorItem
          })
        } else {
          let biLi = Math.round(index * colorItemLen);

          colorArr.push({
            pos: biLi > 100 ? 100 : biLi,
            color: colorItem
          })
        }
      })
      colorList.value = colorArr
    } else {
      colorList.value = gradColorInit
    }

  } else {
    colorList.value = gradColorInit
  }

  // 渐变首次加载返回的颜色
  getGradColor()

} else {
  // 纯色板
  const disbledColor = []

  props.swateColors.forEach(itemColor => {
    if (itemColor instanceof Object) {
      const disabled = itemColor.disabled

      // 颜色可选
      if (disabled === true) {
        colorList.value.push(itemColor)
      } else {
        // 颜色不可选
        disbledColor.unshift(itemColor)
      }

    } else {
      // 字符串
      colorList.value.push({
        disabled: true,
        color: itemColor
      })
    }

  })
  colorList.value = colorList.value.concat(disbledColor)

  onecActiveColorIndex.value = props.cpSwatActiveIndex
  onecActiveColor.value = colorList.value[onecActiveColorIndex.value] && colorList.value[onecActiveColorIndex.value].color

  // 纯色板首次加载返回的颜色
  emit('update:modelValue', onecActiveColor.value)
}

// 宽高鉴定
const widthAndHeight = computed(() => {
  const strW = patch.test(props.width)
  const strH = patch.test(props.height)

  const numW = num.test(props.width)
  const numH = num.test(props.height)

  let w = 0, h = 0;



  if (numW === true) {
    w = props.width + 'px'
  } else if (strW === true) {
    if (props.cpType === 'onec' && props.width === '200px') {
      w = '30px'
    } else {
      w = props.width
    }
  }

  if (numH === true) {
    h = props.height + 'px'
  } else if (strH === true) {
    if (props.cpType === 'onec' && props.height === '200px') {
      h = '30px'
    } else {
      h = props.height
    }
  }

  return {
    w, h
  }
})

const radius = computed(() => {
  if (props.square === false && props.round === false) {
    return '3px'
  } else if (props.square === true) {
    return '0'
  } else {
    return '50%'
  }
}) 
</script>
 
<style scoped>
/* 
 
<style scoped> /*  
色板
width 
gap

激活类型
circle
square
goly
love
yes
border
 */
.cp-swatches {
  display: flex;
  flex-wrap: wrap;
}

.cp-swatches>div {
  box-sizing: border-box;
  position: relative;
}



.cp-swatches .active-border::after {
  position: absolute;
  content: '';
  border: solid 2px #fff;
  width: 77%;
  height: 77%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: inherit;
}


.cp-swatches .active-yes::after {
  position: absolute;
  background-color: #f5f5f5;
  content: '';
  width: 10%;
  height: 30%;
  top: 60%;
  left: 50%;
  transform-origin: 0 100%;
  transform: translate(-50%, -50%) rotate(-55deg);
  border-radius: 5px 5px 0 0;
}

.cp-swatches .active-yes::before {
  position: absolute;
  background-color: #f5f5f5;
  content: '';
  width: 10%;
  height: 50%;
  top: 40%;
  left: 45%;
  transform-origin: 0 100%;
  transform: translate(-50%, -50%) rotate(35deg);
  border-radius: 5px 5px 0 0;
}


.cp-swatches .active-circle::after {
  position: absolute;
  background-color: #f5f5f5;
  content: '';
  width: 35%;
  height: 35%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.cp-swatches .active-square::after {
  position: absolute;
  background-color: #f5f5f5;
  content: '';
  width: 30%;
  height: 30%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cp-swatches .active-goly::after {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid #f5f5f5;
  top: calc(50% - 1px);
  left: 50%;
  transform: translate(-50%, -50%);
}


.cp-swatches .active-love:before,
.cp-swatches .active-love:after {
  position: absolute;
  content: "";
  left: 50%;
  top: -5%;
  width: 50%;
  height: 80%;
  background: #f5f5f5;
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 50px 50px 0 0;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg) scale(.5);
  -webkit-transform-origin: 0 100%;
  -moz-transform-origin: 0 100%;
  -ms-transform-origin: 0 100%;
  -o-transform-origin: 0 100%;
  transform-origin: 0 100%;
}

.cp-swatches .active-love:after {
  left: 0;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg) scale(.5);
  -webkit-transform-origin: 100% 100%;
  -moz-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  -o-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}



.line-box {
  width: 100%;
  height: 100%;
  position: absolute;
}

.rotate-val {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  z-index: 1;
  font-size: 1.5em;
}

.line-box>div {
  transform-origin: center v-bind('dashInfo.dashSize');
  position: absolute;
  width: 1px;
  left: 50%;
  top: v-bind('dashInfo.dashTop');
  height: v-bind('dashInfo.gradLineDashHeight');
}

.rotate-view {
  position: relative;
  width: 100%;
  height: 100%;
}

.icon-defalut {
  width: 100%;
  height: 100%;
}

.color-tip-value {
  background-color: rgb(15, 187, 255);
  position: absolute;
  left: calc(50% - 6px);
  top: calc(-100% + -6px);
  font-size: .9em;
  color: white;
  padding: 0 2px;
  border-radius: 2px;
}

.z-index-up {
  z-index: 9;
}

.color-tip-value::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-color: rgb(15, 187, 255) transparent transparent transparent;
  border-width: 4px;
  border-style: solid;
  left: 2px;
  top: 100%;
}

.set-color-bar {
  justify-content: start;
  gap: 3px;
  width: auto;
}

.cue-po {
  cursor: pointer;
}


/* 移动颜色小球 */
.cp-color-set>div {
  cursor: e-resize;
  position: absolute;
  width: v-bind('props.gradIconSize + "px"');
  height: v-bind('props.gradIconSize + "px"');
}

/* 滑动条高度 */
.cp-color-set {
  height: v-bind('props.gradRangeHeight');
  width: v-bind('props.gradRangeWidth + "px"');
  background-color: v-bind('props.gradRangeColor');
  border-radius: 2px;
  align-items: center;
  justify-content: center;
}

.cp-color-bar {
  position: relative;
  justify-content: start;
  row-gap: 1.2em;
  flex-direction: column;
}

.scroll-color {
  justify-content: start;
  align-content: end;
}

.cp-gradc-copy {
  width: v-bind('props.gradIconSize + "px"');
  height: v-bind('props.gradIconSize + "px"');
  position: absolute;
  z-index: 1;
  top: 5px;
  right: 5px;
}


.cp-color-set input {
  cursor: e-resize;
  border: none;
  outline: none;
  border-radius: 50%;
  width: v-bind('props.gradIconSize + "px"');
  height: v-bind('props.gradIconSize + "px"');
  position: absolute;
}



.cp-gradc input[type=color] {
  border: solid v-bind('props.cpBorder');
}


.tip-txt {
  color: #686868;
  font-size: 10px;
}


.flex {
  display: flex;
}


.show-demo {
  margin-bottom: 1em;
  position: relative;
  border-radius: v-bind('radius');
}

.gradc-select {
  /* 渐变颜色选择大小 */
  width: v-bind('props.gradIconSize + "px"');
  height: v-bind('props.gradIconSize + "px"');
  border: none;
  outline: none;
  border-radius: 50%;
  position: relative;
}

.hover:hover {
  animation: .25s barhover ease-in forwards;
}

@keyframes barhover {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(.8);
  }

  100% {
    transform: scale(1.2);
  }
}

.cp-gradc ::-webkit-color-swatch-wrapper {
  background-color: transparent;
  border-radius: 50%;
}

.cp-gradc ::-webkit-color-swatch {
  border: none;
  width: 100%;
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 50%;
}


.rotate-close-set input {
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
}



.rotate-close-set input::-webkit-slider-runnable-track {
  height: 4px;
  background: #eee;
}

.rotate-close-set input::-webkit-slider-container {
  height: 20px;
  overflow: hidden;
}

.rotate-close-set input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #f44336;
  border: 1px solid transparent;
  margin-top: -8px;
  border-image: linear-gradient(#f44336, #f44336) 0 fill / 8 20 8 0 / 0px 0px 0 2000px;
}

.rotate-close-set {
  justify-content: start;
  align-items: center;
  gap: 8px;
}


.copy-success {
  z-index: 1;
  background-color: rgba(0, 0, 0, .75);
  color: white;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 40px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  letter-spacing: .1em;
  gap: 10px;
  transition: ease-in .5s;
}

.copy-success svg {
  height: 100%;
  width: 25px;
  height: 25px;
}

.show {
  overflow: visible;
}

.hide {
  visibility: hidden;
}

.color-box {
  display: flex;
  gap: 3px;
}

.set-color {
  border: none;
  outline: none;
  border-radius: v-bind('radius');
  width: 100%;
  height: 100%;
}



.colors-pick {
  justify-content: start;
  flex-direction: column;
  gap: 5px;
}

.colors-pick input {
  position: relative;
  border: solid v-bind('props.cpBorder');
  border-radius: v-bind('radius');
}

.colors-pick input::-webkit-color-swatch-wrapper {
  background-color: transparent;
  border: none;
}


/* 单色宽高 */
.colors-pick input::-webkit-color-swatch {
  border: none;
  position: absolute;
  border-radius: v-bind('radius');
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.copy {
  width: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.copy:hover {
  color: v-bind('onecActiveColor');
}

.copy svg {
  width: 10px;
  height: 10px;
}

.active:active {
  opacity: .5;
}




.disabled,
.colors-pick input[disabled],
.swat-disabled {
  cursor: no-drop !important;
  opacity: .35;
}


.swat-disabled::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  transform: translate(-50%, -50%) rotate(-45deg);
  top: 50%;
  left: 50%;
  background-color: rgb(255, 0, 0);
}

.swat-disabled::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  left: -1px;
  top: -1px;
  border: solid 1px rgb(255, 0, 0);
  border-radius: inherit;
}

<<<<<<< HEAD

/* 移动颜色小球 */
=======
<<<<<<< HEAD
/* 移动颜色小球 */
=======
/* .disabled::after {
=======
 .cp-swatches {
   display: flex;
   flex-wrap: wrap;
 }

 .cp-swatches>div {
   box-sizing: border-box;
   position: relative;
 }



 .cp-swatches .active-border::after {
   position: absolute;
   content: '';
   border: solid 2px #fff;
   width: 77%;
   height: 77%;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
   border-radius: inherit;
 }


 .cp-swatches .active-yes::after {
   position: absolute;
   background-color: #f5f5f5;
   content: '';
   width: 10%;
   height: 30%;
   top: 60%;
   left: 50%;
   transform-origin: 0 100%;
   transform: translate(-50%, -50%) rotate(-55deg);
   border-radius: 5px 5px 0 0;
 }

 .cp-swatches .active-yes::before {
   position: absolute;
   background-color: #f5f5f5;
   content: '';
   width: 10%;
   height: 50%;
   top: 40%;
   left: 45%;
   transform-origin: 0 100%;
   transform: translate(-50%, -50%) rotate(35deg);
   border-radius: 5px 5px 0 0;
 }


 .cp-swatches .active-circle::after {
   position: absolute;
   background-color: #f5f5f5;
   content: '';
   width: 35%;
   height: 35%;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   border-radius: 50%;
 }

 .cp-swatches .active-square::after {
   position: absolute;
   background-color: #f5f5f5;
   content: '';
   width: 30%;
   height: 30%;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
 }

 .cp-swatches .active-goly::after {
   position: absolute;
   content: '';
   width: 0;
   height: 0;
   border-left: 5px solid transparent;
   border-right: 5px solid transparent;
   border-bottom: 10px solid #f5f5f5;
   top: calc(50% - 1px);
   left: 50%;
   transform: translate(-50%, -50%);
 }


 .cp-swatches .active-love:before,
 .cp-swatches .active-love:after {
   position: absolute;
   content: "";
   left: 50%;
   top: -5%;
   width: 50%;
   height: 80%;
   background: #f5f5f5;
   -moz-border-radius: 50px 50px 0 0;
   border-radius: 50px 50px 0 0;
   -webkit-transform: rotate(-45deg);
   -moz-transform: rotate(-45deg);
   -ms-transform: rotate(-45deg);
   -o-transform: rotate(-45deg);
   transform: rotate(-45deg) scale(.5);
   -webkit-transform-origin: 0 100%;
   -moz-transform-origin: 0 100%;
   -ms-transform-origin: 0 100%;
   -o-transform-origin: 0 100%;
   transform-origin: 0 100%;
 }

 .cp-swatches .active-love:after {
   left: 0;
   -webkit-transform: rotate(45deg);
   -moz-transform: rotate(45deg);
   -ms-transform: rotate(45deg);
   -o-transform: rotate(45deg);
   transform: rotate(45deg) scale(.5);
   -webkit-transform-origin: 100% 100%;
   -moz-transform-origin: 100% 100%;
   -ms-transform-origin: 100% 100%;
   -o-transform-origin: 100% 100%;
   transform-origin: 100% 100%;
 }



 .line-box {
   width: 100%;
   height: 100%;
   position: absolute;
 }

 .rotate-val {
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
   color: white;
   z-index: 1;
   font-size: 1.5em;
 }

 .line-box>div {
   transform-origin: center v-bind('dashInfo.dashSize');
   position: absolute;
   width: 1px;
   left: 50%;
   top: v-bind('dashInfo.dashTop');
   height: v-bind('dashInfo.gradLineDashHeight');
 }

 .rotate-view {
   position: relative;
   width: 100%;
   height: 100%;
 }

 .icon-defalut {
   width: 100%;
   height: 100%;
 }

 .color-tip-value {
   background-color: rgb(15, 187, 255);
   position: absolute;
   left: calc(50% - 6px);
   top: calc(-100% + -6px);
   font-size: .9em;
   color: white;
   padding: 0 2px;
   border-radius: 2px;
 }

 .z-index-up {
   z-index: 9;
 }

 .color-tip-value::after {
   content: '';
   position: absolute;
   width: 0;
   height: 0;
   border-color: rgb(15, 187, 255) transparent transparent transparent;
   border-width: 4px;
   border-style: solid;
   left: 2px;
   top: 100%;
 }

 .set-color-bar {
   justify-content: start;
   gap: 3px;
   width: auto;
 }

 .cue-po {
   cursor: pointer;
 }


 /* 移动颜色小球 */
>>>>>>> 7672e946abb9e2c758abc818868742b751a36db8
>>>>>>> 9ca63ab23bb3ab666e0eb5b2f608687108ec8eb7
.cp-color-set>div {
  cursor: e-resize;
  position: absolute;
  width: v-bind('props.gradIconSize + "px"');
  height: v-bind('props.gradIconSize + "px"');
}

/* 滑动条高度 */
.cp-color-set {
  height: v-bind('props.gradRangeHeight');
  width: v-bind('props.gradRangeWidth + "px"');
  background-color: v-bind('props.gradRangeColor');
  border-radius: 2px;
  align-items: center;
  justify-content: center;
}

.cp-color-bar {
  position: relative;
  justify-content: start;
  row-gap: 1.2em;
  flex-direction: column;
}

.scroll-color {
  justify-content: start;
  align-content: end;
}

.cp-gradc-copy {
  width: v-bind('props.gradIconSize + "px"');
  height: v-bind('props.gradIconSize + "px"');
  position: absolute;
  z-index: 1;
  top: 5px;
  right: 5px;
}


.cp-color-set input {
  cursor: e-resize;
  border: none;
  outline: none;
  border-radius: 50%;
  width: v-bind('props.gradIconSize + "px"');
  height: v-bind('props.gradIconSize + "px"');
  position: absolute;
}



.cp-gradc input[type=color] {
  border: solid v-bind('props.cpBorder');
}


.tip-txt {
  color: #686868;
  font-size: 10px;
}


.flex {
  display: flex;
}


.show-demo {
  margin-bottom: 1em;
  position: relative;
  border-radius: v-bind('radius');
}

.gradc-select {
  /* 渐变颜色选择大小 */
  width: v-bind('props.gradIconSize + "px"');
  height: v-bind('props.gradIconSize + "px"');
  border: none;
  outline: none;
  border-radius: 50%;
  position: relative;
}

.hover:hover {
  animation: .25s barhover ease-in forwards;
}

@keyframes barhover {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(.8);
  }

  100% {
    transform: scale(1.2);
  }
}

.cp-gradc ::-webkit-color-swatch-wrapper {
  background-color: transparent;
  border-radius: 50%;
}

.cp-gradc ::-webkit-color-swatch {
  border: none;
  width: 100%;
  position: absolute;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 50%;
}


.rotate-close-set input {
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
}



.rotate-close-set input::-webkit-slider-runnable-track {
  height: 4px;
  background: #eee;
}

.rotate-close-set input::-webkit-slider-container {
  height: 20px;
  overflow: hidden;
}

.rotate-close-set input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #f44336;
  border: 1px solid transparent;
  margin-top: -8px;
  border-image: linear-gradient(#f44336, #f44336) 0 fill / 8 20 8 0 / 0px 0px 0 2000px;
}

.rotate-close-set {
  justify-content: start;
  align-items: center;
  gap: 8px;
}


.copy-success {
  z-index: 1;
  background-color: rgba(0, 0, 0, .75);
  color: white;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 40px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  letter-spacing: .1em;
  gap: 10px;
  transition: ease-in .5s;
}

.copy-success svg {
  height: 100%;
  width: 25px;
  height: 25px;
}

.show {
  overflow: visible;
}

.hide {
  visibility: hidden;
}

.color-box {
  display: flex;
  gap: 3px;
}

.set-color {
  border: none;
  outline: none;
  border-radius: v-bind('radius');
  width: 100%;
  height: 100%;
}



.colors-pick {
  justify-content: start;
  flex-direction: column;
  gap: 5px;
}

.colors-pick input {
  position: relative;
  border: solid v-bind('props.cpBorder');
  border-radius: v-bind('radius');
}

.colors-pick input::-webkit-color-swatch-wrapper {
  background-color: transparent;
  border: none;
}


/* 单色宽高 */
.colors-pick input::-webkit-color-swatch {
  border: none;
  position: absolute;
  border-radius: v-bind('radius');
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.copy {
  width: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.copy:hover {
  color: v-bind('onecActiveColor');
}

.copy svg {
  width: 10px;
  height: 10px;
}

.active:active {
  opacity: .5;
}




.disabled,
.colors-pick input[disabled],
.swat-disabled {
  cursor: no-drop !important;
  opacity: .35;
}


.swat-disabled::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  transform: translate(-50%, -50%) rotate(-45deg);
  top: 50%;
  left: 50%;
  background-color: rgb(255, 0, 0);
}

.swat-disabled::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  left: -1px;
  top: -1px;
  border: solid 1px rgb(255, 0, 0);
  border-radius: inherit;
}
<<<<<<< HEAD
=======

<<<<<<< HEAD
/* .disabled::after { 
=======
/* .disabled::after {
>>>>>>> 6d67a71 (更新文档+修复bug)
>>>>>>> 7672e946abb9e2c758abc818868742b751a36db8
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  transform: translate(-50%, -50%) rotate(-45deg);
  top: 50%;
  left: 50%;
  background-color: rgb(255, 0, 0);
}

.disabled::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  left: -1px;
  top: -1px;
  border: solid 1px rgb(255, 0, 0);
  border-radius: inherit;
} */
>>>>>>> 9ca63ab23bb3ab666e0eb5b2f608687108ec8eb7
</style>