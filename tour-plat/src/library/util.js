const Util = {
  install: function(Vue, opt = {}) {
    Vue.prototype.$alertSuccess = function(title) {
      this.$Message.config({
        top: 100,
        duration: 3,
      });
      this.$Message.success({
        content: title,
      });
    };
    Vue.prototype.$alertError = function(title) {
      this.$Message.config({
        top: 100,
        duration: 3,
      });
      this.$Message.error({
        content: title,
      });
    };
    Vue.prototype.$alertWarning = function(title) {
      this.$Message.config({
        top: 100,
        duration: 3,
      });
      this.$Message.warning({
        content: title,
      });
    };
    Vue.prototype.$alertConfirm = function({
      title,
      content,
      okText,
      cancelText,
      onOk,
      onCancel,
    }) {
      
      this.$Modal.confirm({
        width: 400,
        closable: false,
        title: title || "确认操作",
        content: content || "请确认操作",
        okText: okText || "确定",
        cancelText: cancelText || "取消",
        onOk: () => {
          if (onOk) onOk();
        },
        onCancel: () => {
          if (onCancel) onCancel();
        },
      });
    };
  },
};

export default Util;
