// ==UserScript==
// @name         使用细滚动条
// @namespace    http://tampermonkey.net/
// @version      2024-11-22
// @description  修改网站的滚动条为细样式
// @author       tianmuyun
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";
  // 使用 GM_addStyle 插入自定义 CSS
  GM_addStyle(`
    ::-webkit-scrollbar {
      width: 10px; /* 宽度 */
      background-color: #f0f0f0; /* 背景颜色 */
      border-radius: 10px; /* 添加圆角 */
    }
    ::-webkit-scrollbar-thumb {
      background-color: #888; /* 前景颜色 */
      border-radius: 10px; /* 滑块的圆角 */
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: #555; /* 鼠标悬停时的前景颜色 */
    }
    ::-webkit-scrollbar-track {
      border: 1px solid #ddd; /* 边框颜色 */
      border-radius: 10px; /* 轨道的圆角 */
    }
  `);
})();

