// ==UserScript==
// @name         哔哩轻小说增强
// @namespace    http://tampermonkey.net/
// @version      2024-12-10
// @description  详情页：添加展开简介。内容页：移除文本选中限制；自定义字体。
// @author       tianmuyun
// @match        https://www.linovelib.com/novel/*
// @icon         https://www.linovelib.com/favicon.ico
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";

  // 获取当前页面的 URL
  const currentUrl = window.location.href;
  const introduceURL = /www\.linovelib\.com\/novel\/\d+.html/;
  const contentURL = /www\.linovelib\.com\/novel\/\d+\/\d+(_\d+)*.html/;

  // 执行对应函数
  if (introduceURL.test(currentUrl)) {
    addIntroBtn();
  } else if (contentURL.test(currentUrl)) {
    removeOnSelectStart();
    modifyFont("霞鹜文楷 Medium"); // 修改字体
  }

  // 移除文本选中限制
  function removeOnSelectStart() {
    const body = document.querySelector("body");
    body.removeAttribute("onselectstart");
  }

  // 修改字体
  function modifyFont(FontFamily = "微软雅黑") {
    const title = document.getElementById("mlfy_main_text");
    const text = document.getElementById("TextContent");
    if (title) {
      title.style.fontSize = "24px";
      title.style.color = "#000";
      title.style.fontFamily = FontFamily;
    }
    if (text) {
      text.style.fontSize = "20px";
      text.style.color = "#000";
      text.style.fontFamily = FontFamily;
    }
  }

  // 添加简介按钮
  function addIntroBtn() {
    const div = document.querySelector(".book-dec.Jbook-dec.hide");
    if (div) {
      const divTag = document.createElement("div");
      const pTag = document.createElement("p");
      divTag.style.display = "flex";
      divTag.style.justifyContent = "flex-end"; // 让按钮右对齐
      pTag.textContent = "展开简介";
      pTag.style.color = "blue";
      pTag.style.cursor = "pointer"; // 设置鼠标悬停时显示手型
      pTag.addEventListener("click", getIntro); // 按钮绑定getIntro()
      divTag.appendChild(pTag);
      div.appendChild(divTag);
    }
  }

  // 获取小说简介
  function getIntro() {
    const bookDecDiv = document.querySelector(".book-dec.Jbook-dec.hide");
    if (bookDecDiv) {
      const pTag = bookDecDiv.querySelector(":scope > p");
      if (pTag) {
        const text = pTag.innerHTML;
        addMask(text);
      } else {
        alert("没有找到直接子级的 p 标签");
      }
    } else {
      alert("没有找到 class='book-dec Jbook-dec hide' 的 div 元素");
    }
  }

  function addMask(data) {
    // 添加遮罩层
    const mask = document.createElement("div");
    mask.id = "maskLayer";
    document.body.appendChild(mask);
    // 添加悬浮窗
    const floatingWindow = document.createElement("div");
    floatingWindow.id = "floatingWindow";
    document.body.appendChild(floatingWindow);
    // 创建悬浮窗的内容
    const content = document.createElement("div");
    content.innerHTML = data;
    floatingWindow.appendChild(content);
    // 设置样式
    GM_addStyle(`
      #maskLayer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9998;
        display: block;
      }
      #floatingWindow {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        z-index: 9999;
        width: 720px;
        font-size: 20px;
      }
    `);
    // 点击遮罩层关闭悬浮窗
    mask.addEventListener("click", function () {
      // 隐藏遮罩层和浮动窗口
      mask.style.display = "none";
      floatingWindow.style.display = "none";
    });
    // 阻止点击悬浮窗内部内容时关闭
    floatingWindow.addEventListener("click", function (event) {
      event.stopPropagation(); // 阻止事件冒泡，避免触发遮罩层的点击事件
    });
  }
})();
