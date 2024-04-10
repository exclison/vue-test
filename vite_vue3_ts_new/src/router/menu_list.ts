/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2024-01-31 09:08:28
 * @LastEditors: Hanyuchen e-exclison@outlook.ocm
 * @LastEditTime: 2024-04-10 10:48:22
 * @FilePath: \lrx_h5\src\router\menu_list.ts
 * @Description: 
 */


export interface MenuItem {
    id: number | string;
    title: string;
    path: string;
    name?: string;
    hash?: string;
    icon?: string;
    image?: string;
    initials?: string; //缩写
    active: boolean;
    isConstruction?: boolean;//建设中
    children?: MenuItem[];
}

export const menu_list: MenuItem[] = [
  // {
  //   id: 1,
  //   title: "展品图库",
  //   initials: "图库",
  //   icon: "icon-tuku-01",
  //   path: "/collection",
  //   active: false,
  // },
];

export const menu_list2: MenuItem[] = [
    // { id: 13, title: '策展人说',  path: '/czrs', active: false },
]