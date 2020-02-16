<template>
  <div class="app-page-black">welcoem vue run_monitor</div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    };
  },
  computed:{
  },
  watch:{
  },
  methods: {},
beforeCreate: function() {
   document.getElementsByTagName("body")[0].className="app-body-black";
},
beforeDestroy: function() {
  document.body.removeAttribute("class","app-body-black");
}
};

</script>

<style>

</style>
