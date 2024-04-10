/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2024-02-23 09:44:52
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2024-02-28 17:18:56
 * @FilePath: \lrx_h5\src\store\menu.ts
 * @Description: 菜单数据store
 */

import { defineStore } from "pinia";
interface MenuState {
    menu_list: [];
}
export const useMenuStore = defineStore({
    id: "menu_store", // id必填，且需要唯一
    state: (): MenuState => {
        return {
            menu_list: [],
        };
    },
    getters: {
        getMenuStateById(state) {
            return (id: number) => {
                return getDataById(id, state.menu_list) || {};
            };
        },
    },
    actions: {
        updateMenuList(menu_list: []) {
            this.$patch({ menu_list })
        },
    },
});

function getDataById(id: number, dataList: any): any {
    let data = null

    for (let i = 0; i < dataList.length; i++) {
        if (dataList[i].id == id) {
            data = dataList[i];
            break;
        } else if (dataList[i].sub_channel) {
            const sub_data = getDataById(id, dataList[i].sub_channel);
            if (sub_data) {
                data = sub_data;
                break;
            }
        }
    }
    return data;
}

// const a = [
//     {
//         "id": 3,
//         "title": "",
//         "sub_channel": []
//     },
//     {
//         "id": 5,
//         "title": "绣罗翠微",
//         "content": "",
//         "sub_channel": [
//             {
//                 "id": 9,
//                 "title": "梳妆粉黛",
//                 "content": "",
//                 "sub_channel": null
//             },
//             {
//                 "id": 12,
//                 "title": "簪珥璎珞",
//                 "content": "",
//                 "sub_channel": null
//             }
//         ]
//     },
// ]
