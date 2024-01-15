/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2024-01-15 10:02:20
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2024-01-15 10:06:04
 * @FilePath: \ntbwy_atlas\src\lib\map.js
 * @Description: 
 */
// require('echarts/extension/bmap/bmap');
import 'echarts/extension/bmap/bmap'
export function loadBMap(ak) {
    return new Promise(function (resolve, reject) {
        if (typeof BMap !== 'undefined') {
            // eslint-disable-next-line no-undef
            resolve(BMap)
            return true
        }
        window.onBMapCallback = function () {
            // eslint-disable-next-line no-undef
            resolve(BMap)
        }
        let script = document.createElement('script')
        script.type = 'text/javascript'
        // 百度地图地址
        script.src =
            'http://api.map.baidu.com/api?v=2.0&ak=' + ak + '&__ec_v__=20240115&callback=onBMapCallback'
        script.onerror = reject
        document.head.appendChild(script)
    })
}