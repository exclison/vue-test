
/**
 * @name:DrawDottedLine
 * @description:画一条用过渡特效的圆点线
 * @author: hanyuchen
 * @date 2022-07-08 17:16:48
 * const params = {
    canvasElement,canvas元素
    x1,y1,起始点坐标
    x2,y2,终点坐标
    dotRadius,点半径
    dotCount,画点个数
    dotColor,填充颜色
    spetal,时间间隔
    }
 */
export default class DrawDottedLine {
    constructor({ canvasElement, x1, y1, x2, y2, dotRadius, dotCount, dotColor, spetal = 30 }) {
        if (!canvasElement.getContext) throw new Error("canvasElement Error");
        this.canvas = canvasElement;
        this.dotRadius = dotRadius;
        this.dotCount = dotCount;
        this.dotColor = dotColor;
        this.spetal = spetal;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        this.init()
    }

    render() {
        return new Promise((resolve) => {
            let datestamp = new Date().getTime();

            const animatieStart = () => {
                const newdatestamp = new Date().getTime();
                if (newdatestamp - datestamp > 30) {
                    datestamp = newdatestamp;
                    this.newX += this.spaceX;
                    this.newY += this.spaceY;
                    this.dotCountNum += 1;
                    this.drawDot(this.newX, this.newY);
                }
                if (this.dotCountNum >= this.dotCount) {
                    cancelAnimationFrame(this.animatie);
                    resolve();
                } else {
                    this.animatie = requestAnimationFrame(animatieStart);
                }
            };
            animatieStart();
        });
    }

    drawDot(x, y) {
        this.context.beginPath();
        this.context.arc(x, y, this.dotRadius, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.dotColor;
        this.context.fill();
    }

    init() {
        this.context = this.canvas.getContext("2d");
        this.dx = this.x2 - this.x1;
        this.dy = this.y2 - this.y1;
        this.spaceX = this.dx / (this.dotCount - 1);
        this.spaceY = this.dy / (this.dotCount - 1);
        this.newX = this.x1;
        this.newY = this.y1;
        this.animatie = null;
        this.dotCountNum = 0;
    }

    clearRect({ x = 0, y = 0, width = 0, heiget = 0 } = {}) {
        const { width: widthCanvas, height: heightCanvas } = this.canvas
        const x1 = x || 0
        const y1 = y || 0
        const widthParam = width || widthCanvas
        const heightParam = heiget || heightCanvas
        this.context.clearRect(x1, y1, widthParam, heightParam)
    }
}

// const drawDottedLine = new DrawDottedLine({
//     canvasElement: canvas,
//     x1: 10,
//     y1: 10,
//     x2: 300,
//     y2: 300,
//     dotRadius: 10,
//     dotCount: 20,
//     dotColor: "red",
//     spetal: 30,
// });

// drawDottedLine.render().then((res) => {
//     console.log("resolve");
// });