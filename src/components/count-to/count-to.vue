<template>
  <div class="count-to-wrapper">
    <slot name="left"></slot>
    <!-- <span ref="number" :class="countClass" :id="eleId"></span> -->
    <p class="content-outer">
      <span :class="['count-to-count-text',countClass]" :id="counterId">
        
        {{init}}
      
      </span>
        <i :class="['count-to-unit-text',unitClass]">{{unitText}}</i>
    </p>
    <slot name="right"></slot>
  </div>
</template>
<script>
import CountUp, { options } from "countup";
export default {
  name: "CountTo",
  computed: {
    counterId() {
      return `count_to${this._uid}`;
    }
    //为了保证每个count-up组件的id值唯一这里使用了vue中自带的_uid 会返回一个唯一值
  },
  data() {
    return {
      counter: null,
      unitText: ""
    };
  },
  props: {
    /**
     * @description 是否简化显示，设为true后会使用unit单位来做相关省略
     */
    simplify: {
      type: Boolean,
      default: false
    },
    init: {
      type: Number,
      default: 0
    },
    countClass: {
      type: String,
      default: ""
    },
    /**
     * @description 自定义单位，如[3, 'K+'], [6, 'M+']即大于3位数小于6位数的用k+来做省略
     *              1000即显示为1K+
     */
    unit: {
      type: Array,
      default () {
        return [[3, 'K+'], [6, 'M+'], [9, 'B+']]
      }
    },
    unitClass: {
      type: String,
      default: ""
    },
    /**
     * @description 设置动画延迟
     */
    delay: {
      type: Number,
      default: 0
    },
    /**起始值 */
    startVal: {
      type: Number,
      default: 0
    },
    /**结束值 */
    endVal: {
      type: Number,
      required: true,
      default: 0
    },
    /**表示小数点后保留几位小数 */
    decimals: {
      type: Number,
      default: 0
    },
    /**渐变时常 */
    duration: {
      type: Number,
      default: 1
    },
    /**是否使用变速效果 */
    useEasing: {
      type: Boolean,
      default: false
    },
    /**是否分组 */
    useGrouping: {
      type: Boolean,
      default: true
    },
    /**@description 分组符号 */
    separator: {
      type: String,
      default: ","
    },
    /**
     * @description 分隔整数和小数的符号，默认是小数点
     */

    decimal: {
      type: String,
      default: "."
    },
    className: {
      type: String,
      default: ""
    },
    /**
     * @description 是否禁用easing动画效果
     */
    uneasing: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否使用分组，分组后每三位会用一个符号分隔
     */
    usegroup: {
      type: Boolean,
      default: false
    },
    /**
     * @description 用于分组(usegroup)的符号
     */
    separator: {
      type: String,
      default: ","
    }
  },
  watch: {
    endVal (newVal) {
      let endVal = this.getValue(newVal)
      this.counter.update(endVal)
    }
  },

  mounted() {
    //mounted钩子是在Dom元素已经挂载上了,但是不能确定元素是否渲染完成
    //为了保证元素渲染完成。这边使用了this.$nextTick  当然你也可以使用
    //setTimeOut 20ms
    this.$nextTick(() => {
      let endVal = this.getValue(this.endVal);
      this.counter = new CountUp(
        this.counterId,
        this.startVal,
        endVal,
        this.decimals,
        this.duration,
        {
          useEasing: !this.uneasing,
          useGrouping: this.useGroup,
          separator: this.separator,
          decimal: this.decimal
        }
      );
    });
    setTimeout(() => {
      if (!this.counter.error) this.counter.start();
    }, this.delay);
  },
  methods: {
    getHandleVal(val, len) {
      return {
        endVal: parseInt(val / Math.pow(10, this.unit[len - 1][0])),
        unitText: this.unit[len - 1][1]
      };
    },
    transformValue(val) {
      let len = this.unit.length;
    
      let res = {
        endVal: 0,
        unitText: ""
      };
      /**
       * 如果值小于unit中第一个单位数组中的幂次方 
       * 100<10的3次方 
       * 那么返回原结果
       */
      if (val < Math.pow(10, this.unit[0][0])) res.endVal = val;
      else {
          /**
           * 如果值比第一个单位数组大
           */
        for (let i = 1; i < len; i++) {
          if (
            val >= Math.pow(10, this.unit[i - 1][0]) &&
            val < Math.pow(10, this.unit[i][0])
          )
            res = this.getHandleVal(val, i);
        }
      }
      if (val > Math.pow(10, this.unit[len - 1][0]))
        res = this.getHandleVal(val, len);
      return res;
    },
    getValue(val) {
        
      let res = 0;
      if (this.simplify) {
        let { endVal, unitText } = this.transformValue(val);
        this.unitText = unitText;
        res = endVal;
      } else {
        res = val;
      }
      return res;
    }
  }
};
</script>
<style lang="less">
</style>

