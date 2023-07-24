import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { GoChevronDown, GoChevronUp } from "react-icons/go";


const readingTime = 1000;

const Uplist = React.memo(({ allItems, show }) => {
  if (!show) {
    return null;
  }

  return (
    <ul className="divide-y divide-gray-100" style={{ height: "400px", overflow: "auto" }}>
      {allItems.map(item => (
        <li className="flex items-center justify-between gap-x-6 py-5">
          <div className="flex gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={item.face} />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <a href={`https://space.bilibili.com/${item.mid}`}>{item.author}</a>
              </p>
              <p className="mt-1 text-ellipsis overflow-hidden text-xs leading-5 text-gray-500" style={{ display: "-webkit-box", overflow: "hidden" }}>
                {item.sign}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
});

const ToggleButton = React.memo(({ onClick, showListContent }) => {
  return (
    <div
      className="w-full h-11 text-sm rounded-md px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white font-bold flex justify-between items-center cursor-pointer"
      onClick={onClick}
    >
      <div></div> {/* 添加一个空的 div 元素 */}
      <span>相似Up主推荐列表</span>
      {showListContent ? <GoChevronUp /> : <GoChevronDown />}
    </div>
  );
});


const NoResultHint = React.memo(({ onClose }) => {
  return (
    <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded relative" style={{ position: "relative" }}>
      <span className="absolute top-0 right-0 cursor-pointer p-2" style={{ fontWeight: "bold", fontSize: "1.2em" }} onClick={onClose}>&times;</span>
      <p>目前无法找到这个Up主的同类型推荐，可能是因为该Up主的视频数量或粉丝太少</p>
    </div>
  );
});

setTimeout(() => {
  // Send a message to the background script
  let upName = document.querySelectorAll('.up-name')[0].text.trim()
  console.log('upName:', upName);
  chrome.runtime.sendMessage({ action: 'queryData', keyword: upName }, function (response) {
    console.log('查询到的数据：', response);
    let allItems = response;

    // 创建一个新的 div 元素，作为 React 组件的容器
    const reactContainer = document.createElement('div');

    // 渲染 React 组件到新的 div 元素中
    ReactDOM.render(
      <App allItems={allItems} />,
      reactContainer
    );

    // Support for API reference docs
    const upInfoContainer = document.querySelector('.up-info-container');
    upInfoContainer.insertAdjacentElement('afterend', reactContainer);
  });
}, readingTime);

function App({ allItems }) {
  const [showListContent, setShowListContent] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showToggleButton, setShowToggleButton] = useState(false); // 新增状态，用于控制 ToggleButton 的显示

  const toggleListContent = useCallback(() => {
    setShowListContent(show => !show);
  }, []);

  const closeHint = useCallback(() => {
    setShowHint(false);
  }, []);

  useEffect(() => {
    console.log('allItems:', allItems);
    if (allItems === '没有找到结果') {
      setShowHint(true);
    } else if (allItems.length > 0) {
      setShowToggleButton(true); // 当有数据时，显示 ToggleButton
    }
  }, [allItems]);

  return (
    <>
      {showToggleButton && <ToggleButton onClick={toggleListContent} showListContent={showListContent} />} {/* 使用 showToggleButton 控制 ToggleButton 的显示 */}
      {showHint && <NoResultHint onClose={closeHint} />}
      <Uplist allItems={allItems} show={showListContent} />
    </>
  );
}
