import { $get, $post } from "../library/ajax";

namespace user {
  export const apiList: ApiList = {
    "/get-user": "/common/user/get-user",
  };

  export const apiMethods: ApiMathods = {
    getUserInfo: () =>
      $get(
        "/get-user",
        { id: "111", name: "name" },
        { baseURL: "http://127.0.0.1:8990" }
      ),
  };
}
export default user;
