<template>
  <div class="app-video">
    <div class="el-menu-top">
      <el-menu mode="horizontal">
        <li class="ptitle">
          <img :src="require('@/assets/image/icon-dashboard.png')" />视频监控
        </li>
      </el-menu>
    </div>
    <div class="app-page">
      <el-row :gutter="20" class="videolist">
        <el-col :span="6" v-for="(item,i) in videoList" :key="i">
          <div class="grid-content">
            <video
              :id="'myVideo'+item.id"
              class="video-js vjs-default-skin vjs-big-play-centered vjs-fluid"
              ref="myVideo"
            >
              <source :src="item.url" type="rtmp/flv" />
            </video>

            <!-- <video :id="'myVideo'+item.id" class="video-js" ref="myVideo">
              <source :src="item.url" type="rtmp/flv" />
            </video>-->
            <div class="grid-title">{{item.name}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import "videojs-flash";
export default {
  data() {
    return {
      videoList: []
    };
  },
  updated() {
    this.$nextTick(function() {
      this.initVideo();
    });
  },
  created() {
    this.getVideos();
  },
  methods: {
    getVideos() {
      this.request({
        url: "/video/getVideoList",
        method: "get"
      }).then(res => {
        let data = res.data;
        if (data.status == 1) {
          this.videoList = data.data.data;
        }
      });
    },
    initVideo() {
      //初始化video
      this.videoList.map((item, i) => {
        let id = "myVideo" + item.id;
        let myPlayer = this.$video(id, {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          autoplay: true, // 自动播放
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "none",
          fluid: true
          //设置视频播放器的显示宽度（以像素为单位）
          // width: "400px",
          // //设置视频播放器的显示高度（以像素为单位）
          // height: "200px"
        });
      });
      //
    }
  },
  beforeDestroy: function() {
    this.videoList.map((item, i) => {
      this.$video("myVideo" + item.id).dispose();
    });
    //const videoDom = this.$refs.myVideo;
    //this.$video(videoDom).dispose(); //销毁video实例，避免出现节点不存在 但是flash一直在执行，报 this.el.......is not function
    //this.myPlayer.dispose(); //销毁video实例
  }
};
</script>
<style>
.app-video .video-js {
  background: none;
  width: 100%;
  height: 180px;
}
.videolist {
  overflow: hidden;
}
.videolist .grid-content {
 background: #fff;
  border: 1px #3655a5 solid;
  border-radius: 6px;
  padding: 2px;
}
.videolist .grid-title {
 color: #1d397a;
  font-size: 16px;
  padding:10px 8px 8px 8px;
}
.videolist .el-row {
  margin-bottom: 20px;
}
.videolist .el-row :last-child {
  margin-bottom: 0;
}
.videolist .el-col {
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>
