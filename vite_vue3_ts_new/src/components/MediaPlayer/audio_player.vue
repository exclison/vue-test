<!--
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2023-05-16 09:31:17
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2024-03-13 15:27:55
 * @FilePath: \btbwg_web\src\components\MediaPlayer\audio_player.vue
 * @Description: 音频播放器
-->
<template>
  <div class="audio_player">
    <div class="audio_control" @click="handlePlayStatus">
      <i class="audio_icon iconfont icon-bofang" v-if="audio_pasued"></i>
      <i class="audio_icon iconfont icon-zanting" v-else></i>
      <i class="audio_icon iconfont icon-stop-circle" @click.stop="hanldePlayStop"></i>
    </div>
    <div class="audio_progress_box">
      <div ref="progress_ref" class="progress_content" @click="handleProgressClick">
        <div class="playing_progress" :style="playing_progress_style"></div>
        <div class="playing_dot" :style="playing_dot_style"></div>
      </div>

      <!-- <div class="audio_time">
        <div class="audio_playing_time">{{ formatSeconds(audio_current_time, "mm:ss") }}</div>
        <div class="audio_total_time">{{ formatSeconds(audio_total_time, "mm:ss") }}</div>
      </div> -->
    </div>
    <audio ref="audio_ref">
      <source :src="props.audioUrl" />
    </audio>
  </div>
</template>

<script lang="ts">
export default {
  name: "AudioPlayer",
};
</script>
<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { formatSeconds } from "@/library/timeformat";

const props = defineProps({
  audioUrl: { type: String, default: "", require: true },
});

const audio_ref: any = ref(null);
const progress_ref: any = ref(null);
const audio_pasued: any = ref(true);
const audio_current_time: any = ref(0);
const audio_total_time: any = ref(0);
let audio_loop_timer: any = null;

const playing_progress = computed(() => {
  const current_time = audio_current_time.value;
  const total_time = audio_total_time.value;
  if (total_time == 0) return 0;
  const progress = current_time / total_time;
  return progress * 100;
});

const playing_progress_style = computed(() => {
  return {
    width: `${playing_progress.value}%`,
  };
});
const playing_dot_style = computed(() => {
  return {
    left: `${playing_progress.value}%`,
  };
});

onMounted(() => {
  handleAudioEvent();
});

// 播放暂停控制
function handlePlayStatus() {
  if (!audio_ref.value) return;
  if (audio_ref.value.paused) {
    audio_ref.value.play();
  } else {
    audio_ref.value.pause();
  }
}

function hanldePlayStop() {
  if (!audio_ref.value) return;
  audio_ref.value.pause();
  audio_ref.value.currentTime = 0;
  getAudioCurrentTime();
}

function getAudioCurrentTime() {
  audio_current_time.value = audio_ref.value.currentTime;
}

function getAudioTotalTime() {
  audio_total_time.value = audio_ref.value.duration;
}

function startLoop() {
  audio_loop_timer = setInterval(() => {
    getAudioCurrentTime();
  }, 1000);
}

function stopLoop() {
  clearInterval(audio_loop_timer);
}

function handleAudioEvent() {
  audio_ref.value.oncanplay = function () {
    getAudioTotalTime();
  };
  audio_ref.value.onplay = function () {
    audio_pasued.value = audio_ref.value.paused;
    startLoop();
  };
  audio_ref.value.onpause = function () {
    audio_pasued.value = audio_ref.value.paused;
    stopLoop();
  };
  audio_ref.value.onended = function () {
    audio_pasued.value = audio_ref.value.paused;
    stopLoop();
  };
  audio_ref.value.timeupdate = function () {};
}

function handleProgressClick(e: any) {
  const offsetX = e.offsetX;
  const { width: progress_width } = progress_ref.value.getBoundingClientRect();
  let percent = offsetX / progress_width;
  percent = percent > 1 ? 1 : percent;
  const current_time = audio_total_time.value * percent;
  updateAudioCurrentTime(current_time);
  getAudioCurrentTime();
}

function updateAudioCurrentTime(time: number) {
  audio_ref.value.currentTime = time;
}
</script>

<style scoped lang="scss">
.audio_player {
  width: 100%;
  display: flex;
  align-items: flex-start;
  .audio_control {
    width: 150px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    .audio_icon {
      color: #fff;
      font-size: 60px;
      margin-right: 30px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .audio_progress_box {
    width: calc(100% - 170px);
    height: 60px;
    margin-left: 25px;
    padding-top: 17px;
    .progress_content {
      width: 100%;
      height: 12px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.12);
      position: relative;
      .playing_progress {
        width: 80%;
        height: 12px;
        border-radius: 3px;
        background: #fff;
      }
      .playing_dot {
        width: 24px;
        height: 24px;
        // background: url("@/assets/images/common/play_dot.webp");
        background-size: 100% 100%;
        position: absolute;
        left: 80%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .audio_time {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .audio_playing_time {
        font-family: "PingFang SC";
        font-weight: 400;
        font-size: 18px;
        line-height: 53px;
        text-align: left;
        color: #a45418;
      }
      .audio_total_time {
        font-family: "PingFang SC";
        font-weight: 400;
        font-size: 18px;
        line-height: 53px;
        text-align: left;
        color: #a45418;
      }
    }
  }
}
</style>
