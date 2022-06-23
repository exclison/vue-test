// websocket
 class Connection {
    constructor({ url, messageHandler, openHandler, closeHandler, errorHandler }) {
        this.url = url;
        this.openHandler = openHandler;
        this.closeHandler = closeHandler;
        this.errorHandler = errorHandler;
        this.messageHandler = messageHandler;

        this.instance = new WebSocket(url);

        this.instance.onopen = this.onopen.bind(this);
        this.instance.onclose = this.onclose.bind(this);
        this.instance.onerror = this.onerror.bind(this);
        this.instance.onmessage = this.onmessage.bind(this);
    }

    onopen(e) {
        console.log("连接服务器成功");
        this.openHandler && this.openHandler(e)
    }
    onclose(e) {
        console.log("服务器关闭");
        this.closeHandler && this.closeHandler(e)
    }
    onerror(e) {
        console.log("连接出错");
        this.errorHandler && this.errorHandler(e)
    }
    onmessage(e) {
        this.messageHandler && this.messageHandler(e)
    }

    sendMessage(params) {
        const hasString = Object.prototype.toString.call(params) === "[object String]";
        const param = hasString ? params : JSON.stringify(params);
        // console.log(param,'param')
        this.instance.send(param);
    }
}
