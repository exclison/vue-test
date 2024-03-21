/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2023-02-22 17:58:03
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2023-03-03 09:39:12
 * @FilePath: \qdgmls_webpc\src\views\home\hooks\mouse_enter_throtte.ts
 * @Description: 
 */

export class MouseEvent {
    private has_enter: boolean = false;
    private el: HTMLElement;
    private handler: Function;
    private enterHandler: any;
    private leaveHandler: any;
    constructor(el: HTMLElement, handler: Function, leaveHandler: Function) {
        const _self = this
        this.el = el
        this.handler = handler
        this.enterHandler = function () {
            if (_self.has_enter) return
            _self.has_enter = true;
            handler(_self.el)
            console.log('enter')
        }
        this.leaveHandler = function () {
            _self.has_enter = false
            leaveHandler(_self.el)
            console.log('leave')

        }
        this.addEnterEvent()
        this.addLeveEvent()
    }
    addEnterEvent() {
        const _self = this
        this.el.addEventListener('mouseenter', _self.enterHandler)
    }
    removeEnterEvent() {
        const _self = this
        this.el.removeEventListener('mouseenter', _self.enterHandler)
    }
    addLeveEvent() {
        const _self = this
        this.el.addEventListener('mouseleave', _self.leaveHandler)
    }
    removeLeveEvent() {
        const _self = this
        this.el.removeEventListener('mouseleave', _self.leaveHandler)
    }
    // enterHandler() {
    //     if (this.has_enter) return
    //     this.has_enter = true;
    //     this.handler(this.el)
    // }
    // leaveHandler() {
    //     this.has_enter = false;
    // }
}