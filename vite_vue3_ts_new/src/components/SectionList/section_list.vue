/* * @name:section_list * @description: * @auth:hanyuchen * @date: 2022-08-10 08:41 */
<template>
  <div class="section_list">
    <div v-if="props.sectionType === 'table' && props.dataList.length > 0">
      <!-- <el-table v-bind="$attrs" :data="props.dataList">
        <el-table-column v-for="item in props.columns" v-bind="item">
          
          <template #header v-if="item.slot?.header && $slots[item.slot.header]">
            <slot :name="item.slot?.header"></slot>
          </template>
          <template #default="scope" v-if="item.slot?.default && $slots[item.slot.default]">
            <slot :name="item.slot?.default" :param="scope.row"></slot>
          </template>
        </el-table-column>
      </el-table> -->
    </div>

    <div class="card_list" v-if="props.sectionType === 'card' && props.dataList.length > 0">
      <slot
        v-for="(item, index) in props.dataList"
        name="card"
        :param="item"
        :current="index"
      ></slot>
    </div>

    <div class="data_emty" v-if="props.dataList.length <= 0">
      <!-- <img src="@/assets/images/common/no_data.webp" alt="" /> -->
      <span>暂无相关内容</span>
    </div>

    <div class="page_bar" v-if="page.total > pageSize && pagebar">
      <div class="page_bar_section">
        <span @click="handleCurrentChange(1)">首页</span>
        <van-pagination
          v-model="currentPage"
          :total-items="page.total"
          :items-per-page="pageSize"
          @change="handleCurrentChange"
          force-ellipses
        >
          <template #prev-text>
            <van-icon name="arrow-left" />
          </template>
          <template #next-text>
            <van-icon name="arrow" />
          </template>
          <template #page="{ text }">{{ text }}</template>
        </van-pagination>
        <span @click="handleCurrentChange(Math.ceil(page.total / page.pageSize))">末页</span>
      </div>
      <div class="page_bar_section2">
        <div>共{{ Math.ceil(page.total / page.pageSize) }}页,</div>
        <div class="page_jump">
          <span>跳转到</span>
          <van-field v-model="page.jump_page" type="digit" label="" />
          <span>页</span>
          <button class="jump_btn" @click="handleCurrentChange(page.jump_page as number)">
            确定
          </button>
        </div>
      </div>

      <!-- <div class="page_jump">
        <el-input-number
          v-model="jump_page"
          :min="1"
          :max="Math.ceil(page.total / page.pageSize)"
        />
        <div class="jump_btn" @click="handleJump">跳转</div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
// 声明额外的选项
export default {
  name: "SectionList",
};
</script>

<script lang="ts" setup>
// import { Right, Back } from "@element-plus/icons-vue";
import { computed, ref, useSlots, useAttrs, onMounted, reactive, watch } from "vue";

interface Props {
  columns?: Column[];
  dataList: any[];
  sectionType?: "table" | "card";
  searchForm?: SearchForm;
  page?: Page;
  pagebar?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  sectionType: "table",
  pagebar: true,
});
const emits = defineEmits(["pagechange", "sizechange"]);
const page: Page = reactive({
  total: 0,
  pageSize: 10,
  currectPage: 1,
  pageSizes: [5, 10, 20],
  jump_page: 1,
});
const page_count = computed(() => Math.ceil(page.total / page.pageSize));
const page_prev_disabled = computed(() => page.currectPage === 1);
const page_next_disabled = computed(() => page.currectPage === page_count.value);

const handleTogglePage = (type: string) => {
  let page_number: number = page.currectPage;
  if (type === "next") {
    page_number = page_number + 1 > page_count.value ? page_count.value : page_number + 1;
  }
  if (type === "prev") {
    page_number = page_number - 1 < 1 ? 1 : page_number - 1;
  }
  page.currectPage = page_number;
  emits("pagechange", page.currectPage);
};
const currentPage = computed({
  get() {
    return Number(page.currectPage);
  },
  set(value) {
    page.currectPage = Number(value);
  },
});
const pageSize = computed({
  get() {
    return page.pageSize;
  },
  set(value) {
    page.pageSize = value;
  },
});
const pageSizes = computed(() => page.pageSizes);
const handleCurrentChange = (value: number) => {
  emits("pagechange", value);
};
const handleSizeChagne = (value: number) => {
  emits("sizechange", value);
};

const pageInit = () => {
  if (props.page) Object.assign(page, props.page);
};

const jump_page = ref();
function handleJump() {
  emits("pagechange", jump_page.value || 1);
}

onMounted(() => {
  pageInit();
});
watch(
  () => props.page,
  () => {
    pageInit();
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.section_list {
  width: 100%;
}

.page_bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 35px 0 20px 0;
  cursor: pointer;

  .page_bar_section {
    display: flex;
    align-items: center;
    & > span {
      color: #fff;
      // margin: 0 20px;
      font-size: 28px;
      cursor: pointer;
      flex-shrink: 0;
    }
  }
  .page_bar_section2 {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 28px;
    margin-top: 15px;
    .page_jump {
      display: flex;
      align-items: center;
      justify-content: space-between;
      :deep(.van-field) {
        width: 70px;
        height: 50px;
        margin: 0 10px;
        border-radius: 8px;
        overflow: hidden;
        background: transparent;
        border: 1px solid #fff;
        padding:0 10px;
        .van-field__control {
          font-size: 26px;
          color: #fff;
        }
      }
      .jump_btn {
        width: 70px;
        height: 42px;
        background: hsla(0, 0%, 100%, 0.3);
        border: none;
        box-shadow: none;
        outline: none;
        font-size: 24px;
        border-radius: 4px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
}

.card_list {
  display: flex;
  flex-wrap: wrap;
}

.data_emty {
  width: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > img {
    margin-bottom: 10px;
  }
  font-family: "PingFang SC";
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #666;
}
:root:root {
  --van-pagination-font-size: 40px !important;
}
:deep(.van-pagination) {
  .van-pagination__item {
    border-radius: 50%;
  }
  .van-hairline--surround:after {
    border: none;
  }
  .van-pagination__item--active {
    background-color: hsla(0, 0%, 100%, 0.3);
  }
  .van-pagination__item:active {
    background-color: transparent;
  }
}
</style>
