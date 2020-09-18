<template>
<div>
 <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <div >
    <video src="" id="videoElement"></video>
  </div>
</div>
 
</template>

<script>
import {flvjs} from '/node_modules/flv.js/src/player/flv-player.js'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  },
  setup(){
    function flvVideo(){
      // if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'http://localhost:8000/live/123.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    // }
    }
  }
}
</script>
