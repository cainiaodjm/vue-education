<template>
  <div class="slide-render-view">
    <div class="slide-wrapper">
      <div class="slide-content">
        <slide :autoPlay="isAutoPlay" :interval="interval" :loop="isLoop">
          <div v-for="(item,index) in data " :key="index">
            <a :href="item.url">
              <img :src="item.imageUrl" alt>
            </a>
          </div>
        </slide>
      </div>
    </div>
    <div class="group">
      <Card style="width:100%" :shadow="true">
        <switch-option
          class="item sub"
          name="auto play"
          :value="isAutoPlay"
          @update:value="updateAutoPlay"
        ></switch-option>
        <input-option v-show="isAutoPlay"
         class="item sub" 
         @update:value="updateInterval" 
         name="interval" :value="interval">
         </input-option>
         <switch-option
          class="item sub"
          name="loop"
          :value="isLoop"
          @update:value="updateLoop"
        ></switch-option>
      </Card>
    </div>
  </div>
</template>
<script>
import { bannerData } from "@/lib/tools.js";
import Slide from "@/components/slide";
import switchOption from "@/components/switch-option";
import inputOption from "@/components/input-option";
const items = bannerData;
export default {
  name: "slide-render",
  components: {
    Slide,
    switchOption,
    inputOption
  },
  computed: {
    data() {
      return items[0];
    }
  },
  data() {
    return {
      index: 0,
      turnToPrev: false,
      turnToNext: false,
      isAutoPlay: true,
      isLoop: true,
      isShowDot: true,
      speed: 400,
      threshold: 0.3,
      interval: 4000
    };
  },
  methods: {
    updateAutoPlay(val) {
      this.isAutoPlay = val;
    },
    updateInterval(val){
        this.interval=val
    },
    updateLoop(val){
        this.isLoop=val
    }
  }
};
</script>
<style lang="less">
.slide-render-view {
  .slide-wrapper {
    position: relative;
    width: 100%;
    padding-top: 40%;
    margin-bottom: 10px;
    overflow: hidden;
    .slide-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .group {
    margin-bottom: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.3rem;
    background: #fff;
    .item {
      height: 3.2rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      &.sub {
        font-size: 14px;
      }
    }
    .item:last-child {
      border-bottom: none;
    }
    .item:nth-child(even) {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
}
</style>

