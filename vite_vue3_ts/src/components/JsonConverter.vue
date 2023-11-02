<!--
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2023-11-02 09:54:27
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2023-11-02 11:34:10
 * @FilePath: \vue-test\vite_vue3_ts\src\components\JsonConverter.vue
 * @Description: 数据转换
-->
<template>
  <div class="JsonConverter"></div>
</template>

<script lang="ts">
export default {
  name: "JsonConverter",
};
</script>
<script setup lang="ts">
import { ref, reactive } from "vue";

// import { IJsonConverter, JsonProperty, JsonConverter } from "../library/json_property";
import { JsonProperty } from "../library/property_convert";

// class BindResultRespModel extends JsonConverter<any> {
//   @JsonProperty<string, string[]>("bind_sheet.doc_id.domain_id|bind_sheet.doc_id.pad_id", {
//     fromJson: ([domainId, padId]) => `${domainId}$${window.atob(padId)}`,
//     formJsonDef: "",
//   })
//   sheetId?: string;

//   @JsonProperty("bind_sheet.sub_id", {
//     fromJson: window.atob,
//     formJsonDef: "",
//   })
//   sheetSubId?: string;

//   @JsonProperty<string, string[]>("bind_sheet.doc_url|bind_sheet.sub_id", {
//     fromJson: ([url, tab]) => `${window.atob(url)}?tab=${window.atob(tab)}`,
//     formJsonDef: "",
//   })
//   sheetUrl?: string;

//   @JsonProperty("bind_sheet.sub_type")
//   sheetType?: any;

//   @JsonProperty("total")
//   maxSyncCnt!: number;

//   @JsonProperty("sync_total")
//   currSyncCnt!: number;

//   @JsonProperty<string, number[]>("sync_total|total", {
//     fromJson: ([syncTotal, total]) =>
//       syncTotal >= total ? "100%" : `${((syncTotal / total) * 100).toFixed(2)}%`,
//     formJsonDef: "0%",
//   })
//   syncProcess!: string;
// }

// class BindResultReqModel extends JsonConverter<any> {
//   @JsonProperty("form_id")
//   globalPadId!: string;

//   @JsonProperty("task_id")
//   taskId!: string;
// }

// const bindResultRespModel = new BindResultRespModel();
// const bindResultReqModel = new BindResultReqModel();

// const json = {
//   bind_sheet: {
//     doc_id: {
//       domain_id: "300000000",
//       pad_id: "RkVXRFdMR2xRaVli",
//       scode: null,
//     },
//     sub_id: "bHpmMWZ1",
//     doc_url: "Ly9kb2NzLnFxLmNvbS9zaGVldC9EUmtWWFJGZE1SMnhSYVZsaQ==",
//     doc_type: null,
//     sub_type: "grid",
//   },
//   total: 30,
//   sync_total: 30,
// };

// const a = bindResultRespModel.fromJson(json);

// console.log(a, "jsonnnn");

class BindUserModel {
  @JsonProperty("user_name", {})
  userName?: string;
}

const bind_user_model = new BindUserModel();

const json = {
  user_id: "user_id",
  user_name: "user_name",
  bind_sheet: {
    doc_id: {
      domain_id: "300000000",
      pad_id: "RkVXRFdMR2xRaVli",
      scode: null,
    },
    sub_id: "bHpmMWZ1",
  },
  total: 30,
  sync_total: 30,
  bind_list: [
    {
      bind_list_id: "ididid",
      bind_list_name: "namename",
    },
  ],
};
</script>

<style scoped lang="scss">
.JsonConverter {
}
</style>
