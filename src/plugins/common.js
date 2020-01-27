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

export { debounce };
