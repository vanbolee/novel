const debounce = (func, wait) => {
  let timeout = "";
  return v => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(v);
    }, wait);
  };
};

const overscroll = function(el) {
  el.addEventListener("touchstart", function() {
    var top = el.scrollTop,
      totalScroll = el.scrollHeight,
      currentScroll = top + el.offsetHeight;
    if (top === 0) {
      el.scrollTop = 1;
    } else if (currentScroll === totalScroll) {
      el.scrollTop = top - 1;
    }
  });
  el.addEventListener("touchmove", function(evt) {
    if (el.offsetHeight < el.scrollHeight) evt._isScroller = true;
  });
};

export { debounce, overscroll };
