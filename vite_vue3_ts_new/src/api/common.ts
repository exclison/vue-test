/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2024-01-30 15:24:54
 * @LastEditors: Hanyuchen e-exclison@outlook.ocm
 * @LastEditTime: 2024-04-10 10:50:51
 * @FilePath: \lrx_h5\src\api\common.ts
 * @Description:
 */
import { $get, $post } from "../library/ajax";

namespace common {
  export const apiList: ApiList = {
    "/menu_text": "/glrxgwapi/home/menu_text",
  };

  export const apiMethods: ApiMathods = {
    menu_text: (params) => $get(apiList["/menu_text"], { p: "w", ...params }, { baseURL: BASEURL }),
  };
}
export default common;
//   export { apiList, apiMethods };
