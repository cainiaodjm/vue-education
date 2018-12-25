<template>
  <div class="slide-render-view">
      <div class="slide-wrapper">
          <div class="slide-content">
              <slide>
                  <div v-for="item in data ">
                      <a :href="item.url">
                          <img :src="item.imageUrl" alt="">
                      </a>
                  </div>
              </slide>
          </div>
      </div>
      <div class="group">
          <Card style="width:100%" :shadow="false">
              asada
          </Card>
      </div>
  </div>
</template>
<script>
import { bannerData } from "@/lib/tools.js";
import Slide from "@/components/slide";
const items = bannerData;
export default {
  name: "slide-render",
  components: {
    Slide
  },
  computed:{
      data(){
          return items[0]
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
  }
};
</script>
<style lang="less">
    .slide-render-view{

        .slide-wrapper{
            position: relative;
            width: 100%;
            padding-top: 40%;
            margin-bottom: 10px;
            overflow: hidden;
            .slide-content{
                position:absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%
            }
        }
    }
</style>

