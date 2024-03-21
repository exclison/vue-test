/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2022-11-22 10:01:52
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2022-11-22 10:03:28
 * @FilePath: \hljkjg_web\src\library\loadjs.ts
 * @Description: 
 */
function loadJs(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    document.body.appendChild(script);

    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject();
    };
  });
}

export default loadJs;
