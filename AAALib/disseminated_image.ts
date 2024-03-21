/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2023-02-17 14:01:03
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2023-03-06 14:22:21
 * @FilePath: \qdgmls_webpc\src\views\home\hooks\disseminated.ts
 * @Description: 
 */
import img_1 from '@/assets/images/disseminated_image/1.png'
import message_bg from '@/assets/images/home/message_bg.png'
import section5_bg from '@/assets/images/home/section5_bg.png'

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
    init() {
        const _self = this;
        _self.ctx.globalCompositeOperation = "source-over";

        const img = new Image();
        img.onload = function () {
            _self.ctx.drawImage(img, 0, 0, _self.width, _self.height); // 核心函数
            _self.ctx.globalCompositeOperation = "source-in";

            const img_child = new Image();
            img_child.onload = function () {
                // 获取图片宽高
                const img_width = img_child.width;
                const img_height = img_child.height;
                // 画布长宽比
                const aspet_ratio = _self.width / _self.height;

                // 利用图片宽高与画布尺寸计算截取图片宽高与起始位置
                // 图片宽高中最短一方尺寸 结合画布比例 计算长的一方尺寸
                let img_w = img_width,
                    img_h = img_height;
                let img_x = 0,
                    img_y = 0;
                if (img_width > img_height) {
                    img_w = aspet_ratio * img_height;
                    img_x = (img_width - img_height) / 2;
                } else {
                    img_h = img_width / aspet_ratio;
                    img_y = (img_height - img_width) / 2;
                }

                _self.ctx.drawImage(img_child, img_x, img_y, img_w, img_h, 0, 0, _self.width, _self.height); // 核心函数
                // _self.ctx.drawImage(img_child, 0, 0, _self.width, _self.height); // 核心函数
                _self.ctx.globalCompositeOperation = "source-in";
                // _self.ctx.globalAlpha = 0.4
            };
            img_child.src = _self.imgSrc;
        };
        img.src = img_1;
    }
    updateImage(url: string) {
        this.imgSrc = url;
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }
}

// export function render() {
//     pointUpdate();
//     cf.init(pointList);
//     requestAnimationFrame(render);
// }
