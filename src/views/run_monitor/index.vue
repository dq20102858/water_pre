<template>
  <div id="progress">
    <div class="box">
      <div
        class="test"
        @touchstart="gtouchstart()"
        @touchmove="gtouchmove()"
        @touchend="gtouchend()"
      >试一试呀!</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      startX: 0,
      endX: 0,
      slideStyle: {
        left: 0,
        transition: "none"
      }
    };
  },
  methods: {
    gtouchstart() {
      window.console.log("1，按下啦啦啦啦啦");
    },
    gtouchmove() {
      window.console.log("2，按下并且在移动呢");
    },
    gtouchend() {
      window.console.log("3，松开啦啦啦啦啦");
    },
    start(e) {
      //记录开始滑动屏幕的X轴的位置
      this.flag = true;
      this.startX = e.touches[0].clientX;
      this.endX = this.$refs.slide.offsetLeft;
      this.slideStyle.transition = "none";
      console.log(this.startX);
    },
    move(e) {
      if (this.flag) {
        // 处理鼠标移动的逻辑
        var moveX = this.endX + (e.touches[0].clientX - this.startX); //计算滑动的距离
        if (Math.abs(moveX) >= this.$refs.btn.offsetWidth && moveX < 0) {
          //判断滑动的距离是否大于class:btn的宽度
          moveX = (Math.abs(moveX) - this.$refs.btn.offsetWidth) * 0.1; // 0.3阻力系数
          this.slideStyle.left = -this.$refs.btn.offsetWidth - moveX + "px";
        } else if (moveX >= 0) {
          //滑动距离是否大于等于0
          this.slideStyle.left = 0 + "px"; //大于等于0让class:item等于0
        } else {
          this.slideStyle.left = moveX + "px"; //小于0让class:item等于滑动的距离
        }

        console.log(moveX);
      }
    },
    end(e) {
      if (this.flag) {
        this.flag = false;
        // endX = slide.offsetLeft;
        var moveX = e.changedTouches[0].clientX - this.startX; //计算滑动的距离
        this.slideStyle.transition = "left .3s";
        var btnWidth = this.$refs.btn.offsetWidth; //class:btn的宽度
        if (moveX < 0) {
          if (
            Math.abs(moveX) >= btnWidth / 2 ||
            Math.abs(this.$refs.slide.offsetLeft) >= this.$refs.btn.offsetWidth
          ) {
            //是否大于class:btn宽度的一半
            this.slideStyle.left = -btnWidth + "px"; //左滑超过class:btn宽度的一半就滑回去
          } else if (Math.abs(moveX) < btnWidth / 2) {
            //小于class:btn宽度的一半
            this.slideStyle.left = 0 + "px"; //左滑没有超过class:btn宽度的一半回原位
          }
        } else if (moveX > 0 && this.endX != 0) {
          if (Math.abs(moveX) >= btnWidth / 2) {
            this.slideStyle.left = 0 + "px"; //右滑超过class:btn宽度的一半就滑回去
          } else if (Math.abs(moveX) < btnWidth / 2) {
            this.slideStyle.left = -btnWidth + "px"; //右滑没有超过class:btn宽度的一半回原位
          }
        }
      }
    }
  },
  mounted() {
    var _this = this;
    // 使用js的现代事件监听transition过渡结束
    this.$refs.slide.addEventListener("transitionend", function() {
      _this.endX = this.offsetLeft;
    });
  }
};
</script>

<style>
#progress {
  background: #081c33;
  height: 100vh;
}
.box{ overflow-x: scroll; width: 3000px;}
.test {
  width: 3000px;
  height: 50px;
  text-align: center;
  background-color: Efff;
  line-height: 50px;
  font-size: 50px;
}
.btn {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background: red;
  display: flex;
}
button {
  width: 1.6rem;
  height: 100%;
  background: #f8f8f8;
  border: none;
}
.item {
  padding: 0.266667rem;
  display: flex;
  position: relative;
  background: #fff;
  z-index: 2;
  box-shadow: 0.026667rem 0 0.053333rem #ddd;
}
.item img {
  width: 2.133333rem;
  height: 2.133333rem;
  margin-right: 0.4rem;
  border-radius: 0.133333rem;
}

.item .title {
  font-size: 0.48rem;
  float: left;
}
.item .text {
  font-size: 0.426667rem;
  color: #888;
  float: left;
  margin: 0 1.33rem;
}
.item .price {
  color: #888;
  float: left;
  margin: 0 1.33rem;
}
</style>