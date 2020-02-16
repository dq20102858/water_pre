<template>
 <div class="app-page">

   <el-row :gutter="20">
  <el-col :span="6"><div class="grid-content">
     <video id="myVideo" class="video-js" ref="myVideo">
      <!-- <source src="../../../static/7efaf904a76f6050251da6d38980600c.mp4" type="video/mp4" > -->
      <source src="rtmp://10.100.100.11:1935/live/" type="rtmp/flv" />
    </video>
    </div>
    </el-col>
   <el-col :span="6"><div class="grid-content">
     <video id="myVideo" class="video-js" ref="myVideo">
      <!-- <source src="../../../static/7efaf904a76f6050251da6d38980600c.mp4" type="video/mp4" > -->
      <source src="rtmp://10.100.100.11:1935/live/" type="rtmp/flv" />
    </video>
    </div>
    </el-col>
    <el-col :span="6"><div class="grid-content">
     <video id="myVideo" class="video-js" ref="myVideo">
      <!-- <source src="../../../static/7efaf904a76f6050251da6d38980600c.mp4" type="video/mp4" > -->
      <source src="rtmp://10.100.100.11:1935/live/" type="rtmp/flv" />
    </video>
    </div>
    </el-col>
     <el-col :span="6"><div class="grid-content">
     <video id="myVideo" class="video-js" ref="myVideo">
      <!-- <source src="../../../static/7efaf904a76f6050251da6d38980600c.mp4" type="video/mp4" > -->
      <source src="rtmp://10.100.100.11:1935/live/" type="rtmp/flv" />
    </video>
    </div>
    </el-col>
     <el-col :span="6"><div class="grid-content">
     <video id="myVideo" class="video-js" ref="myVideo">
      <!-- <source src="../../../static/7efaf904a76f6050251da6d38980600c.mp4" type="video/mp4" > -->
      <source src="rtmp://10.100.100.11:1935/live/" type="rtmp/flv" />
    </video>
    </div>
    </el-col>
</el-row>

  
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import "videojs-flash";
export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard',
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {

  },
  beforeDestroy:function(){
    const videoDom = this.$refs.myVideo;  //不能用document 获取节点
    this.$video(videoDom).dispose() //销毁video实例，避免出现节点不存在 但是flash一直在执行，报 this.el.......is not function
    this.myPlayer.dispose() //销毁video实例
   },
  mounted() {
        this.initVideo();
    },
  methods:{
    initVideo() {
            //初始化视频方法
                this.myPlayer = this.$video(myVideo, {
                //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                controls: true,
                //自动播放属性,muted:静音播放
                autoplay: true,
                //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                preload: "metadata",
                //设置视频播放器的显示宽度（以像素为单位）
                width: "800px",
                //设置视频播放器的显示高度（以像素为单位）
                height: "400px"
            });
      }
  }
}
</script>
<style>
.video-js{background: none}
.grid-content{background: #000;border-radius:6px;padding: 2px;}
.myVideo-dimensions{width: 100%;height: 200px}
  .el-row {
    margin-bottom: 20px;
  }
    .el-row :last-child {
      margin-bottom: 0;
    }

  .el-col {
    border-radius: 4px;margin-bottom: 20px
  }
</style>
