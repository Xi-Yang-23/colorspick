/**
* @down 按下
* @move 移动
* @up 松开
<<<<<<< HEAD
* @init 初始化
* @rotate 旋转 
* @init 初始化 
 
* @colorListArr 操作的数组
* @sliderWidth 滑块宽度
* @itemColorSize 颜色滑动块大小
*/
export default class Gradc {
    constructor(colorListArr, sliderWidth, itemColorSize) {
        this.colorArr = colorListArr
        this.slideW = Number(sliderWidth)
        this.iconS = Number(itemColorSize)

        // 计算比例 | 每移动1px等于this.biLi
        this.biLi = this.slideW / 100

        this.ofLeft = 0
        this.dwonWindowX = 0//浏览器x轴位置
        this.downColorX = 0//当前按下的颜色x轴位置
        this.downColorIndex = 0
        this.isMove = false
        this.evArr = []


        // 事件
        this.startEvName = null
        this.moveEvName = null
        this.endEvName = null

        // 初始化 
        this.init()
    }

    // 初始化
    init() {
        this.colorArr.forEach(colorItem => {
            colorItem.tiptoggle = 'hide'
            colorItem.disabled = false
            colorItem.zindexUp = ''

            if (colorItem.pos === 0) {
                const x = -this.iconS / 2
                colorItem.x = x
            } else {
                const x = colorItem.pos * this.biLi - this.iconS / 2
                colorItem.x = x
            }
        })
        
        // 事件
        const [start, move, end] = this.pcOrMobileEv()

        this.startEvName = start
        this.moveEvName = move
        this.endEvName = end
    }


    /**
     * 移动颜色后更新下标、删除、替换操纵
     * @param {Number} colorArrIndex 操作元素的下标
     */
    rmSpliceUpColorIndex(colorArrIndex) {
        // 保存要删的数组
        const saveRemovedArr = this.colorArr[colorArrIndex]

        this.colorArr.splice(colorArrIndex, 1) //  删除右边元素
        this.colorArr.splice(this.downColorIndex, 0, saveRemovedArr)//在按下的元素前插入删除的元素

        // 更新按下的数组下标 | 按下的下标等于更换位置的元素下标
        this.downColorIndex = colorArrIndex
    }

    // 数组排序 左右位置更新
    sortPos() {
        const colorArrIndexLen = this.colorArr.length - 1
        const downPos = this.colorArr[this.downColorIndex].pos

        // 最左边
        if (this.downColorIndex === 0) {
            const rightColorIndex = this.downColorIndex + 1
            const rightPos = this.colorArr[rightColorIndex].pos

            if (downPos > rightPos) {
                this.rmSpliceUpColorIndex(rightColorIndex)
            }

            // 最右边
        } else if (this.downColorIndex === colorArrIndexLen) {
            const leftColorIndex = this.downColorIndex - 1
            const leftPos = this.colorArr[leftColorIndex].pos

            if (downPos < leftPos) {
                this.rmSpliceUpColorIndex(leftColorIndex)
            }

            // 中间
        } else {
            // 左右数组下标
            const rightColorIndex = this.downColorIndex + 1
            const leftColorIndex = this.downColorIndex - 1

            // 数组百分比位置
            const leftPos = this.colorArr[leftColorIndex].pos
            const rightPos = this.colorArr[rightColorIndex].pos

            // 距离左右2边数组的百分比距离
            const leftDistance = downPos - leftPos
            const rightDistance = rightPos - downPos

            // 最小距离
            const minDistance = Math.min(leftDistance, rightDistance)

            // 左移
            if (minDistance === leftDistance) {
                // 移动位置小于左边
                if (downPos < leftPos) {
                    this.rmSpliceUpColorIndex(leftColorIndex)
                }
            } else {
                // 右移
                if (downPos > rightPos) {
                    this.rmSpliceUpColorIndex(rightColorIndex)
                }
            }
        }
    }

    // 鼠标移入
    mouseover(colorArrIndex) {
        // 拖动中就不执行
        if (this.isMove) return false
        this.colorArr[colorArrIndex].zindexUp = 'z-index-up'
        this.colorArr[colorArrIndex].tiptoggle = 'show'
    }

    // 鼠标移出
    mouseout(colorArrIndex) {
        // 拖动中就不执行
        if (this.isMove) return false

        this.colorArr[colorArrIndex].zindexUp = ''
        this.colorArr[colorArrIndex].tiptoggle = 'hide'
    }


    /**
     * 位置更新
     * @param {Array} itemIndexArr 要更新位置的数组下标
     */
    updataPos(itemIndexArr) {
        itemIndexArr.forEach(itemColorIndex => {
            const x = this.colorArr[itemColorIndex].pos * this.biLi - this.iconS / 2

            this.colorArr[itemColorIndex].x = x
        });
    }

    /**
     * 
     * @param {NUmber} colorArrIndex  按下的颜色下标
     * @param {event} event 
     */
    down(colorArrIndex, ev) {
        if (ev.type === 'touchstart') {
            // 手机端
            this.dwonWindowX = ev.changedTouches[0].clientX
            this.colorArr[this.downColorIndex].tiptoggle = 'hide'
            this.colorArr[colorArrIndex].tiptoggle = 'show'
        } else {
            // pc端
            this.dwonWindowX = ev.x
        }

        this.ofLeft = ev.target.getBoundingClientRect().left

        this.colorArr[colorArrIndex].zindexUp = 'z-index-up'
        this.colorArr[colorArrIndex].disabled = false

        this.downColorX = this.colorArr[colorArrIndex].x// 记录按下的颜色x轴位置
        this.downColorIndex = colorArrIndex

        this.evArr.push(e => this.up(e))
        document.addEventListener(this.endEvName, this.evArr[this.evArr.length - 1])

        this.evArr.push(e => this.move(e))
        document.addEventListener(this.moveEvName, this.evArr[this.evArr.length - 1])
    }

    move(ev) {
        //  移动的距离 
        let offsetX = 0

        if (this.startEvName === 'touchstart') {
            offsetX = ev.changedTouches[0].clientX - this.dwonWindowX
        } else {
            offsetX = ev.x - this.dwonWindowX
        }


        this.isMove = true

        // 判断是否可移动
        const moveFinish = this.moveFinish(this.downColorIndex, offsetX)

        if (moveFinish === false || this.isMove === false) return false

        let moveX = this.downColorX + offsetX

        // 不能移出边缘
        const end = this.slideW - this.iconS / 2
        const start = -this.iconS / 2

        if (moveX > end) {
            moveX = end
        } else if (moveX < start) {
            moveX = start
        }

        // 更新x轴位置
        this.colorArr[this.downColorIndex].x = moveX

        // 更新百分比 
        const pos = Math.round(Math.abs((moveX + this.iconS / 2) / this.biLi))
        this.colorArr[this.downColorIndex].pos = pos

        // 排序 更新位置
        this.sortPos()
    }

    up(ev) {
        if (this.isMove === true) {
            // 移动中颜色不可选
            this.colorArr[this.downColorIndex].disabled = true
            this.isMove = false
        }

        // 删除所有事件
        this.evArr.forEach(evItem => {
            document.removeEventListener(this.moveEvName, evItem)
            document.removeEventListener(this.endEvName, evItem)
        })

        // 清空事件数组
        this.evArr = []

        if (this.startEvName === 'touchstart') {
            // 清除百分比提示
            this.colorArr[this.downColorIndex].tiptoggle = 'show'

        } else {
            // 清除百分比提示
            this.colorArr[this.downColorIndex].tiptoggle = 'hide'
        }

    }

    /** 
     * @param {number} colorArrIndex 要判断的元素下标 
     * @param {number} offsetX 已移动的位置 
     * @returns true 可移动 | false 不可移动
     */
    moveFinish(colorArrIndex, offsetX) {
        const end = this.colorArr[colorArrIndex].x > this.slideW - this.iconS / 2
        const start = this.colorArr[colorArrIndex].x < -this.iconS / 2

        let state = null
        let LR = offsetX > 0 ? "R" : "L"

        const R = LR === 'R' && end === false //true 可移动，反之
        const L = LR === 'L' && start === false //true 可移动，反之


        R === true || L === true ? state = true : state = false
        return state
    }

    /**
     * 判断是PC端还是移动端 通过不同的设备定义不同的事件名
     * @returns {Array} 返回一个数组
     */
    pcOrMobileEv() {
        const isMobile =
            navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            ) !== null

        const events = isMobile
            ? ['touchstart', 'touchmove', 'touchend']
            : ['mousedown', 'mousemove', 'mouseup']

        return events;
    }
}