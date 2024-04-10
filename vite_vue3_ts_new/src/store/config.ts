/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2024-02-23 11:27:56
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2024-02-29 08:35:46
 * @FilePath: \lrx_h5\src\store\config.ts
 * @Description: 网站配置信息 store
 */


import mapApi from "@/library/map_api";
import { defineStore } from "pinia";


const method_list = mapApi('common', ['config'])

interface FriendItem {
    title: string //单位名称
    img_path: string //图片
    url: string //链接
}

interface ConfigData {
    curatorial: string //策展团队
    copyright: string //版权声明
    icp: string //备案信息
    cop: string //备案信息
    quanjing: string //数字体验展链接
    question: string //问卷链接
    friend_like: FriendItem[] //合作单位列表
}

interface ConfigState {
    data: ConfigData;
}
export const useConfigStore = defineStore({
    id: "config_store", // id必填，且需要唯一
    state: (): ConfigState => {
        return {
            data: {
                curatorial: '', //策展团队
                copyright: '', //版权声明
                icp: '', //备案信息
                cop: '', //版权所有
                quanjing: '', //数字体验展链接
                question: '', //问卷链接
                friend_like: [] //合作单位列表
            }
        };
    },
    getters: {
        getConfigState(state) {
            return state.data
        },
    },
    actions: {
        getConfig() {
            method_list.config().then((res: any) => {
                this.$patch({ data: res })
            })
        }
    },
});
