const taresize = (element) => {
  const style = window.getComputedStyle(element, null);
  const heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
  element.style.height = '';
  let endHeight = element.scrollHeight + heightOffset;
  element.style.height = endHeight + 'px';
}

export default taresize;