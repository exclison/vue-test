/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2022-09-14 14:46:45
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2023-05-17 10:56:23
 * @FilePath: \hljkjg_web\src\views\exhibit_nav\components\exhibit1\active_stack.ts
 * @Description: 维护单选多选状态模块
 */
// 使用该模块传入类型所必须的属性 泛型约束
interface ActiveStackMust {
  id: number | string;
  active: boolean;
}
// 初始化选项
interface ActiveStackOption<T> {
  hasMulti?: boolean; //开启多选 默认false
  hasToggle?: boolean; //是否可以切换选中 默认false
  activeItem?: T; //初始化选项
}
// 用于管理当前选中的菜单
export class ActiveStack<T extends ActiveStackMust> {
  hasMulti: boolean = false;
  hasToggle: boolean = false;
  activeList: T[] = [];
  constructor({ activeItem, hasMulti, hasToggle }: ActiveStackOption<T>) {
    hasMulti && (this.hasMulti = hasMulti);
    hasToggle && (this.hasToggle = hasToggle);
    activeItem && this.push(activeItem);
  }
  changeStatus(activeItem: T | undefined, callback?: Function) {
    if (!activeItem) {
      this.popAll()
      return
    };

    // 已经选中
    if (activeItem.active && this.hasToggle) {
      this.popSingle(activeItem);
    } else {
      this.push(activeItem);
    }
    callback && callback(activeItem, this.activeList);
  }
  push(activeItem: T) {
    activeItem.active = true;
    // 多选
    if (this.hasMulti) {
      this.activeList.push(activeItem);
    }
    // 单选
    else {
      this.popAll();
      activeItem.active = true;
      this.activeList.push(activeItem);

    }

  }
  popSingle(activeItem: T) {
    if (!this.hasToggle) return;
    const active_item = this.activeList.find((active: T) => active.id === activeItem.id);
    active_item && (active_item.active = false);
    this.activeList = this.activeList.filter((active: T) => active.active);
  }
  popAll() {
    this.activeList.forEach((activeItem: T) => {
      activeItem.active = false;
    });
    this.activeList = [];
  }
}

