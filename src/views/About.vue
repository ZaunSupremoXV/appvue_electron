<template>
  <b-button @click="toFullscreen">Toggle full screen</b-button>  
</template>


<script>
// @ is an alias to /src
import screenfull from "screenfull";//import screenfull

export default {
  methods: {
    toFullscreen() {
             //If screenfull is not supported, print error
      if (!screenfull.isEnabled) {
        console.error("unEnabled");
        return;
      }
      screenfull.toggle();
    },
  },
};
</script>


