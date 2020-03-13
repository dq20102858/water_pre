<template>
  <div id="progress">
    <div class="main-canvas">
      <div class="group-canvas">
        <canvas id="mycanvas" height="480" ref="mycanvas">
          <p>您的系统不支持此程序!</p>
        </canvas>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stationList: [],
      minKM: 0,
      minMileage: 0,
      totalMileage: 0,
      every: 1
    };
  },
  created() {
   
  },
  mounted() {},
  methods: {
  
    //
  }
};
</script>

<style>
#progress {
  background: #081c33;
  height: 100vh;
}
</style>