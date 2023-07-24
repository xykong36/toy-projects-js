
const readingTime = 3000;

let currentPage = 1;  // 当前页数
let itemsPerPage = 5;  // 每页的项目数


let list = document.createElement('ul');
list.className = "divide-y divide-gray-100";
list.style.display = "none";  // 默认显示列表
list.style.height = 400 + "px";  // 设置列表高度
list.style.overflow = "auto";  // 设置列表溢出时的滚动条

let toggleButton = document.createElement('button');  // 创建一个新的按钮
toggleButton.className = "rounded-full px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold";
toggleButton.textContent = "展示/隐藏推荐Up主列表";
toggleButton.style.display = "none";  // 默认隐藏按钮

let noResultHint = document.createElement('div');  // 创建一个新的提示信息
noResultHint.className = "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative";
noResultHint.style.display = "none";  // 默认隐藏提示信息
noResultHint.style.position = "relative";  // 设置div的定位为相对定位

let closeButton = document.createElement('span');  // 创建关闭按钮
closeButton.innerHTML = "&times;";
closeButton.className = "absolute top-0 right-0 cursor-pointer p-2";
closeButton.style.fontWeight = "bold";
closeButton.style.fontSize = "1.2em";
closeButton.addEventListener('click', () => {  // 添加点击事件监听器
  noResultHint.style.display = "none";  // 隐藏提示信息
});

let message = document.createElement('p');  // 创建一个新的段落来包含文本
message.textContent = "目前无法找到这个Up主的同类型推荐，可能是因为该Up主的视频数量或粉丝太少";

noResultHint.appendChild(closeButton);  // 将关闭按钮添加到提示信息中
noResultHint.appendChild(message);  // 将消息文本添加到提示信息中


toggleButton.addEventListener('click', () => {
  if (list.style.display === "none") {
    list.style.display = "block";
  } else {
    list.style.display = "none";
  }
});

function showNoResultNotification() {
  noResultHint.style.display = "block"; // 显示提示信息
  // setTimeout(() => {
  //   noResultHint.style.display = "none"; // 3秒后隐藏提示信息
  // }, 3500);
}

function updatePage(allItems) {
  if (allItems == '没有找到结果') {
    showNoResultNotification()
  } else {
    allItems.forEach(item => {
      let li = document.createElement('li');
      li.className = "flex items-center justify-between gap-x-6 py-5";

      let div = document.createElement('div');
      div.className = "flex gap-x-4";

      let img = document.createElement('img');
      img.className = "h-12 w-12 flex-none rounded-full bg-gray-50";
      img.src = `${item.face}`
      let divText = document.createElement('div');
      divText.className = "min-w-0 flex-auto";

      let pName = document.createElement('p');
      pName.className = "text-sm font-semibold leading-6 text-gray-900";
      let pNameLink = document.createElement('a'); // 创建 <a> 元素
      pNameLink.href = `https://space.bilibili.com/${item.mid}`;
      pNameLink.textContent = item.author;
      pName.appendChild(pNameLink);

      let pSign = document.createElement('p');
      pSign.className = "mt-1 text-ellipsis overflow-hidden text-xs leading-5 text-gray-500";
      pSign.textContent = `${item.sign}`;

      pSign.style.display = "-webkit-box";  // 使用flexbox
      pSign.style.overflow = "hidden";  // 阻止内容溢出

      divText.appendChild(pName);
      divText.appendChild(pSign);

      div.appendChild(img);
      div.appendChild(divText);

      li.appendChild(div);
      list.appendChild(li);
    })
    if (list.childNodes.length > 0) {  // 如果列表有内容，就显示切换按钮
      toggleButton.style.display = "block";
      noResultHint.style.display = "none";  // 有结果时隐藏提示信息
    }
  }
}

// Wait for 10 seconds after the page loads
setTimeout(() => {
  console.log("3秒钟过去了，开始我的表演+++++")
  // Send a message to the background script
  upName = document.querySelectorAll('.up-name')[0].text.trim()
  console.log('upName:', upName);
  chrome.runtime.sendMessage({ action: 'queryData', keyword: upName }, function (response) {
    console.log('查询到的数据：', response);
    allItems = response;
    updatePage(allItems);

  });

  // Support for API reference docs
  const upInfoContainer = document.querySelector('.up-info-container');

  upInfoContainer.insertAdjacentElement('afterend', list);
  upInfoContainer.insertAdjacentElement('afterend', toggleButton);
  upInfoContainer.insertAdjacentElement('afterend', noResultHint);  // 将提示信息添加到页面中
}, readingTime);
