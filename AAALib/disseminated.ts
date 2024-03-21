/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2023-02-17 14:01:03
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2023-02-22 17:43:54
 * @FilePath: \qdgmls_webpc\src\views\home\hooks\disseminated.ts
 * @Description: 
 */
const init_time = new Date().getTime();
interface PointItem {
    x: number;
    y: number;
    r: number;
    f: number;
    maxR: number;
    speed: number;
    delay: number;
}
export const pointList = [
    { x: 350, y: 300, r: 0, f: 40, maxR: 200, speed: 3, delay: 0 },
    { x: 350, y: 450, r: 0, f: 40, maxR: 200, speed: 5, delay: 2000 },
    { x: 450, y: 350, r: 0, f: 40, maxR: 300, speed: 5, delay: 1000 },
    { x: 650, y: 350, r: 0, f: 40, maxR: 200, speed: 5, delay: 1500 },
    { x: 650, y: 450, r: 0, f: 40, maxR: 200, speed: 5, delay: 1500 },
    { x: 600, y: 250, r: 0, f: 40, maxR: 200, speed: 5, delay: 1800 },
    { x: 480, y: 480, r: 0, f: 40, maxR: 200, speed: 5, delay: 1800 },
];
/**
 * @description:重置半径
 * @author: hanyuchen
 * @date 2023-02-17 14:30:32
 */
export function pointReset() {
    pointList.forEach(item => item.r = 0)
}
/**
 * @description:所有半径最大值
 * @author: hanyuchen
 * @date 2023-02-17 14:30:17
 */
export function getPointMaxR() {
    let max = 0;
    pointList.forEach(item => max = max > item.maxR ? max : item.maxR)
    return max
}
/**
 * @description:动画完成状态
 * @author: hanyuchen
 * @date 2023-02-17 14:29:52
 */
export function hasAnimateFinish() {
    let has_finish = true
    for (let i = 0; i < pointList.length; i++) {
        if (pointList[i].r < pointList[i].maxR) {
            has_finish = false
            break
        }
    }
    return has_finish
}
/**
 * @description:画圆
 * @author: hanyuchen
 * @date 2023-02-17 14:30:58
 */
function clipArc(ctx, pointList) {
    // ctx, x, y, r, f, type = "destination-in"
    const temp = document.createElement("canvas"),
        tx = temp.getContext("2d");
    temp.width = ctx.canvas.width;
    // console.log(temp.width, "ddd");
    temp.height = ctx.canvas.height;
    tx.translate(-temp.width, 0);
    tx.shadowOffsetX = temp.width;
    tx.shadowOffsetY = 0;
    tx.shadowColor = "#000";

    tx.shadowBlur = 40;
    // tx.arc(x, y, r, 0, 2 * Math.PI);
    pointList.forEach((item) => {
        tx.arc(item.x, item.y, item.r, 0, 2 * Math.PI);
    });
    tx.closePath();
    tx.fill();

    ctx.save();
    ctx.globalCompositeOperation = "destination-in";
    // ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(temp, 0, 0);
    ctx.restore();
}

export class CanvasFade {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    public imgSrc: string;
    constructor(canvas: HTMLCanvasElement, image: string) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.imgSrc = image;
        // console.log(this.imgSrc,'imgsrc')
        // this.imgSrc = canvas.getAttribute("imgSrc");
        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
    }
    init(pointList) {
        const _self = this;
        const img = new Image();
        img.onload = function () {
            const pat = _self.ctx.createPattern(img, "repeat");
            _self.ctx.fillStyle = pat;
            _self.ctx.fillRect(0, 0, _self.width, _self.height);
            clipArc(_self.ctx, pointList);
        };
        img.src = this.imgSrc;
    }
    updateImage(url: string) {
        this.imgSrc = url;
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }
}
// let c: HTMLCanvasElement = null;
// // console.log(c);
// let cf = null;
/**
 * @description:更新半径
 * @author: hanyuchen
 * @date 2023-02-17 14:31:20
 */
export function pointUpdate() {
    pointList.forEach((item) => {
        if (new Date().getTime() - init_time > item.delay) {
            item.r = item.r + item.speed > item.maxR ? item.maxR : item.r + item.speed;
        }
    });
}

// export function render() {
//     pointUpdate();
//     cf.init(pointList);
//     requestAnimationFrame(render);
// }
