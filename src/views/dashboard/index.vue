<template>
  <div class="app-video">
    <div class="app-topbar">
      <ul>
        <li class="active">视图</li>
        <li>云台控制</li>
        <li>设置</li>
      </ul>
    </div>
    <div class="app-page">
      <el-row class="videolist" :gutter="20">
        <el-col :span="6" v-for="item in videoList" :key="item.id">
          <div class="grid-content">
            <video :id="'myVideo'+item.id" class="video-js" ref="myVideo">
              <!-- <source src="../../../static/7efaf904a76f6050251da6d38980600c.mp4" type="video/mp4" > -->
              <source :src="item.url" type="rtmp/flv" />
            </video>
          </div>
          <div class="grid-title">{{item.name}}</div>
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

  beforeDestroy: function() {
    const videoDom = this.$refs.myVideo; //不能用document 获取节点
    this.$video(videoDom).dispose(); //销毁video实例，避免出现节点不存在 但是flash一直在执行，报 this.el.......is not function
    this.myPlayer.dispose(); //销毁video实例
  },
  mounted() {
    this.initVideo();
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
        let myPlayer = this.$video("myVideo" + item.id, {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          autoplay: true,
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "metadata"
          //设置视频播放器的显示宽度（以像素为单位）
          // width: "400px",
          //设置视频播放器的显示高度（以像素为单位）
          //height: "200px"
        });
      });
      //
    }
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
  background: #000;
  border-radius: 6px;
  padding: 2px;
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
.app-topbar {
  height: 50px;
  background: #fff;
  text-align: center;
}
.grid-title {
  color: #1d397a;
  text-align: center;
  line-height: 28px;
}
.app-topbar ul {
  margin: 0 auto;
}
.app-topbar li {
  color: #1d397a;
  display: inline-block;
  font-size: 16px;
  line-height: 50px;
  padding: 0 30px;
  cursor: 0;
}
.app-topbar li.active {
  background: #4b6eca;
  color: #fff;
}
</style>
