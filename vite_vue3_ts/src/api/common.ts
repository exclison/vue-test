import { $get, $post } from "../library/ajax";

namespace common {

  export const apiList: ApiList = {
    "/get-user-info": "/common/user/get-user-info",
  };

  export const apiMethods: ApiMathods = {
    getUserInfo: () =>
      $get(
        apiList["/get-user-info"],
        { id: "111", name: "name" },
        { baseURL: "http://127.0.0.1:8990" }
      ),
    getUserList: () =>
      $get(
        "/get-user-info",
        { id: "111", name: "name" },
        { baseURL: "http://127.0.0.1:8990" }
      ),
  };

}
export default common
//   export { apiList, apiMethods };
