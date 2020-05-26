<template>
  <div style="width:500px;height:700px;margin:0 auto;">
    <videoPlayer class="vjs-custom-skin videoPlayer" :options="playerOptions"></videoPlayer>
  </div>
</template>
<script>
import { videoPlayer } from "vue-video-player";
import "videojs-flash";
export default {
  components: {
    videoPlayer
  },
  data() {
    return {
      playerOptions: {
        height: "300",
        sources: [
          {
            type: "rtmp/flv",
            src: "rtmp://10.100.100.8:18000/livetest/"
          }
        ],
        techOrder: ["flash"],
        autoplay: false,
        controls: true
      }
    };
  }
};
</script>