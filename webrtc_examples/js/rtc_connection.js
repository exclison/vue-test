// RTCPeerConnection
class RTCConnection {
    constructor({
        options,
        ontrack,
        ondatachannel,
        onicecandidate,
        onicecandidateerror,
        onnegotiationneeded,
        onsignalingstatechange,
        onconnectionstatechange,
        onicegatheringstatechange,
        oniceconnectionstatechange,
    }) {
        const option = Object.assign(
            {
                iceServers: [
                    {
                        urls: "stun:stun.l.google.com:19302",
                    },
                ],
            },
            options
        );
        this.instance = new RTCPeerConnection(option);
        this.instance.ontrack = ontrack;
        this.instance.ondatachannel = ondatachannel;
        this.instance.onicecandidate = onicecandidate;
        this.instance.onicecandidateerror = onicecandidateerror;
        this.instance.onnegotiationneeded = onnegotiationneeded;
        this.instance.onsignalingstatechange = onsignalingstatechange;
        this.instance.onconnectionstatechange = onconnectionstatechange;
        this.instance.onicegatheringstatechange = onicegatheringstatechange;
        this.instance.oniceconnectionstatechange = oniceconnectionstatechange;
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
        console.log(offer, "answer");
        handler && handler();
    }
}