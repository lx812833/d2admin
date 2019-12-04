const directives = {
  // 自定义拖动指令
  drag: {
    inserted: (el) => { 
      el.onmousedown = function (e) {
        e.preventDefault();
        let bw = document.body.clientWidth;
        let bh = document.body.clientHeight;
        //鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - el.offsetLeft;
        let disY = e.clientY - el.offsetTop;
        // 计算两边坐标
        document.onmousemove = function (e) {
          let left = 0;
          let top = 0;
          // 拖动边界
          if (e.clientX >= bw) {
            left = bw - disX;
          } else if (e.clientX <= 0) {
            left = 0 - disX;
          } else {
            left = e.clientX - disX;
          }
          if (e.clientY >= bh) {
            top = bh - disY;
          } else if (e.clientY <= 0) {
            top = 0 - disY;
          } else {
            top = e.clientY - disY;
          }
          //移动当前元素
          el.style.left = left + 'px';
          el.style.top = top + 'px';
        };
        // 鼠标停止移动时，事件移除
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  }
}

export default directives