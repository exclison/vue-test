/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2023-01-05 14:06:46
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2023-01-05 14:07:06
 * @FilePath: \hljkjg_web\src\library\download_path.ts
 * @Description: 
 */
export const download_path = (path: string) => {
  const filename = getFileNameByPath(path);
  const ele = document.createElement("a");
  ele.setAttribute("href", path); //设置下载文件的url地址
  ele.setAttribute("target", "_blank"); //新窗口打开
  ele.setAttribute("download", filename); //用于设置下载文件的文件名
  ele.click();
};
export const getFileNameByPath = (path: string) => {
  const filenameRegex = path.match(/\w+\.\w+$/);
  const filename = filenameRegex ? filenameRegex[0] : "download";
  return filename;
};
export const download_url = (path, filename) => {
  const ele = document.createElement("a");
  ele.setAttribute("href", path); //设置下载文件的url地址
  ele.setAttribute("target", "_blank"); //新窗口打开
  ele.setAttribute("download", filename); //用于设置下载文件的文件名
  ele.click();
};
export const download_blob = (file, filename) => {
  const blob = new Blob([file]);
  const url = URL.createObjectURL(blob);
  const ele = document.createElement("a");
  ele.setAttribute("href", url); //设置下载文件的url地址
  ele.setAttribute("target", "_blank"); //新窗口打开
  ele.setAttribute("download", filename); //用于设置下载文件的文件名
  ele.click();
};