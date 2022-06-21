// websocket
class Connection {
    constructor({url, messageHandler, openHandler, closeHandler, errorHandler}) {
        this.url = url;
        this.openHandler = openHandler;
        this.closeHandler = closeHandler;
        this.errorHandler = errorHandler;
        this.messageHandler = messageHandler;

        this.instance = new WebSocket(url);

        this.instance.onopen = this.openHandler;
        this.instance.onclose = this.closeHandler;
        this.instance.onerror = this.errorHandler;
        this.instance.onmessage = this.messageHandler;
    }

    sendMessage(params) {
        const hasString = Object.prototype.toString.call(params) === "[object String]";
        const param = hasString ? params : JSON.stringify(params);
        console.log(param,'param')
        this.instance.send(param);
    }
}
