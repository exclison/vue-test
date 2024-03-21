/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2023-02-16 10:00:00
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2023-02-25 10:34:56
 * @FilePath: \qdgmls_webpc\src\views\home\hooks\mouse_wheel.ts
 * @Description: 
 */
import { ref, } from "vue";
export const disable_scroll = ref(false);
let delay = 1000
let section_length = 6
export const current_section = ref(0);

let time_out = null;

function onMouseWheel(ev) {
    /*当鼠标滚轮事件发生时，执行一些操作*/
    var ev = ev || window.event;
    var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作
    down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;

    if (disable_scroll.value) return;
    disable_scroll.value = true;

    if (time_out) {
        clearTimeout(time_out);
    }
    time_out = setTimeout(() => {
        disable_scroll.value = false;
    }, delay);

    if (down) {
        current_section.value++;
        current_section.value = current_section.value > section_length ? section_length : current_section.value;
        console.log(current_section.value, "鼠标滚轮向下---------");
    } else {
        current_section.value--;
        current_section.value = current_section.value < 0 ? 0 : current_section.value;
        console.log(current_section.value, "鼠标滚轮向上++++++++++");
    }

    if (ev.preventDefault) {
        /*FF 和 Chrome*/
        // ev.preventDefault(); // 阻止默认事件
    }
    return false;
}



function addEvent(obj, xEvent, fn) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + xEvent, fn);
    } else {
        obj.addEventListener(xEvent, fn, false);
    }
}

export function addMouseWheel(timeout: number = 1000, sectionlength: number = 6) {
    delay = timeout
    section_length = sectionlength
    addEvent(document, "mousewheel", onMouseWheel);
    addEvent(document, "DOMMouseScroll", onMouseWheel);
}
