<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <video style="width:800px" src="" id="videoElement" muted controls></video>
    </div>
  </div>
</template>

<script>
import flvjs from 'flv.js'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    flvVideo(){
      var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'http://127.0.0.1:8000/live/123.flv'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        console.log(flvPlayer,'tttt')
        flvPlayer.play();
    }
  },
  mounted(){
    this.flvVideo()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
