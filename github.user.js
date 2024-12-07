// ==UserScript==
// @name         GitHub 添加 git clone 命令
// @namespace    http://tampermonkey.net/
// @version      2024-11-28
// @description  GitHub 添加 git clone 命令
// @author       tianmuyun
// @match        https://github.com/*/*
// @exclude      https://github.com/*/*/*
// @icon         https://github.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
  "use strict"; // 使用严格模式来避免潜在的错误
  // 定义一个函数来检查并更新 git clone 命令
  const addGitClone = () => {
    const httpsInput = document.getElementById("clone-with-https");
    const sshInput = document.getElementById("clone-with-ssh");

    if (httpsInput && !httpsInput.value.startsWith("git clone")) {
      httpsInput.value = "git clone " + httpsInput.value;
      // console.log("添加 git clone 到 HTTPS 地址");
    }

    if (sshInput && !sshInput.value.startsWith("git clone")) {
      sshInput.value = "git clone " + sshInput.value;
      // console.log("添加 git clone 到 SSH 地址");
    }
  };

  // 使用 MutationObserver 监听 id="clone-with-https" 和 id="clone-with-ssh" 元素的变化
  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        if (
          document.getElementById("clone-with-https") ||
          document.getElementById("clone-with-ssh")
        ) {
          addGitClone();
        }
      }
    }
  });

  // 配置 MutationObserver 监听 DOM 的变化
  const config = { childList: true, subtree: true };

  // 开始观察 document.body 上的变化
  observer.observe(document.body, config);
})();
