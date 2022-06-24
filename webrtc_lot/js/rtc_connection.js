// RTCPeerConnection
class RTCConnection {
    constructor({
        id,
        localId,
        username,
        options,
        connection,
        // ontrack,
        // ondatachannel,
        // onicecandidate,
        // onicecandidateerror,
        // onnegotiationneeded,
        // onsignalingstatechange,
        // onconnectionstatechange,
        // onicegatheringstatechange,
        // oniceconnectionstatechange,
    }) {
        this.id = id;
        this.localId = localId;
        this.username = username;
        this.connection = connection
        this.inboundStream = null
        const option = Object.assign(
            {
                iceServers: [
                    {
                        urls: "stun:stun.l.google.com:19302",
                    },
                ],
            },
            options || {}
        );
        this.instance = new RTCPeerConnection(option);
        this.instance.ontrack = this.ontrack.bind(this);
        // this.instance.ondatachannel = ondatachannel;
        this.instance.onicecandidate = this.onicecandidate.bind(this);
        // this.instance.onicecandidateerror = onicecandidateerror;
        // this.instance.onnegotiationneeded = onnegotiationneeded;
        // this.instance.onsignalingstatechange = onsignalingstatechange;
        // this.instance.onconnectionstatechange = onconnectionstatechange;
        // this.instance.onicegatheringstatechange = onicegatheringstatechange;
        // this.instance.oniceconnectionstatechange = oniceconnectionstatechange;
    }

    ontrack(event) {
        console.log(event,'track')
        const videoDom = this.getVideoDom('remote')
        if (event.streams && event.streams[0]) {
            videoDom.srcObject = event.streams[0];
        } else {
            if (!this.inboundStream) {
                this.inboundStream = new MediaStream();
                videoDom.srcObject = this.inboundStream;
            }
            this.inboundStream.addTrack(event.track);
        }
    }

    onicecandidate(event) {
        if (event.candidate) {
            const params = JSON.stringify({
                id: this.localId,
                targetId: this.id,
                username: this.username,
                type: "new_candidate",
                ice: event.candidate,
            });
            this.sendMessage(params);
        }
    }

    sendMessage(params) {
        if (!this.connection) {
            throw new Error('没有websocket实例')
        }
        this.connection.sendMessage(params);
    }

    getVideoDom(type) {
        if (!type) throw new Error('必须有type参数')
        const typeEnum = {
            'local': 'local',
            'remote': 'remote'
        }
        const id = `${this.id}_${typeEnum[type]}`
        if(!document.getElementById(id)){
            const videoDom = document.createElement('video')
            videoDom.autoplay = true
            videoDom.controls = true
            videoDom.id = id
            document.body.appendChild(videoDom)
        }
        const video = document.getElementById(id);
        return video
    }

    async receptIceAndAddIce(message) {
        const hasString = Object.prototype.toString.call(message) === "[object String]";
        const messageParse = hasString ? JSON.parse(message) : message
        const { id, ice } = messageParse
        // this.id为远端id ,id为远端来源id
        this.id === id && this.addIceCandidate(ice)
    }

    async createOfferAndSendMessage(stream,options = {}) {
        console.log('create_offer')
        for (const track of stream.getTracks()) {
            this.instance.addTrack(track);
        }

        const option = Object.assign({ OfferToReceiveAudio: true }, options);
        const offer = await this.instance.createOffer(option);
        await this.setLocalDescription(offer)
        // 所有消息发送使用本地id以确定信息来源
        const params = JSON.stringify({
            id: this.localId,
            targetId:this.id,
            username: this.username,
            type: "send_offer",
            sdp: this.instance.localDescription,
        });
        this.sendMessage(params);
    }

    async createAnswerAndSendMessage(offer, stream) {
        console.log('create_answer')
        await this.setRemoteDescription(offer);
        for (const track of stream.getTracks()) {
            this.instance.addTrack(track);
        }
        const answer = await this.createAnswer();
        await this.setLocalDescription(answer);
        // 所有消息发送使用本地id以确定信息来源
        const params = JSON.stringify({
            id: this.localId,
            targetId: this.id,
            username: this.username,
            type: "send_aswer",
            sdp: this.instance.localDescription,
        });
        this.sendMessage(params);
    }

    async createOffer(options = {}, handler) {
        const option = Object.assign({ OfferToReceiveAudio: true }, options);
        const offer = await this.instance.createOffer(option);
        handler && handler();
        return offer;
    }

    async createAnswer(options = {}, handler) {
        const option = Object.assign({}, options);
        const answer = await this.instance.createAnswer(option);
        handler && handler();
        return answer;
    }

    async setLocalDescription(offer, handler) {
        await this.instance.setLocalDescription(offer);
        handler && handler();
    }
    async setRemoteDescription(offer, handler) {
        const description = new RTCSessionDescription(offer);
        await this.instance.setRemoteDescription(description);
        handler && handler();
    }
    async addIceCandidate(candidate, handler) {
        const icecandidate = new RTCIceCandidate(candidate)
        await this.instance.addIceCandidate(icecandidate)
        handler && handler();
    }

    async getMedia() {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        return stream;
    }

}