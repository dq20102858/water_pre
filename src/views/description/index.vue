<template>
  <div id="descrip">
    <div class="app-page">
      <div class="app-page-container">
        <div class="descpcover">
          <img :src="require('@/assets/image/introbg.jpg')" />
        </div>
        <div class="descpconn">
          <div class="desctitle">{{descData.name}}</div>
          
          <div class="content">{{descData.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      descData: ""
    };
  },
  created() {
    this.getDescp();
  },
  methods: {
    getDescp() {
      this.request({
        url: "/common/getItemDetailV2",
        method: "get"
      }).then(response => {
        let data = response.data;
        if (data.status == 1) {
          this.descData = data.data;
        }
      });
    }
  }
};
</script>
<style>
#descrip .descpcover img {
  width: 100%;
  height: auto;
  border-radius: 6px;
}
#descrip .desctitle {
  border-bottom: 1px #ddd solid;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  padding: 20px;
}
#descrip .content {
  padding: 30px 0 100px 0;
  font-size: 16px;
  line-height: 31px;
}
</style>