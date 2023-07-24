// 监听来自 Web 页面的请求
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'queryData') {
        // 根据请求的关键字查询数据
        var keyword = request.keyword;
        // uncomment to test the localhost connection
        // fetch(`http://localhost:8000/search?author=${keyword}`)
        fetch(`http://119.29.237.144:8001/search?author=${keyword}`)
            .then(response => response.json())
            .then(data => sendResponse(data))
            .catch(error => console.error('Error:', error));
        return true; // 用于异步消息处理
    }
});
