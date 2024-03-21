/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2022-11-09 08:41:00
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2022-11-09 09:40:26
 * @FilePath: \hljkjg_web\src\library\event_bus.ts
 * @Description: 事件总线
 */
interface EventMap {
  [key: string]: Function[];
}
class EventBus {
  event_map: EventMap = {};
  constructor() {}
  on(event: string, handle: Function) {
    this.event_map[event] ? this.event_map[event].push(handle) : (this.event_map[event] = [handle]);
  }
  emit(event: string) {
    console.log('emit')
    this.event_map[event] && this.event_map[event].forEach((fn: Function) => fn());
  }
}

const event_bus = new EventBus();

export default event_bus;
