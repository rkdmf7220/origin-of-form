export const checkScrollDone = (refs: HTMLDivElement, e: WheelEvent): "prev" | "next" | null => {
  if (refs.scrollTop === 0 && e.deltaY <= 0) {
    // 스크롤 최상단 및 위로 스크롤
    return "prev";
  } else if (refs.scrollHeight - refs.scrollTop === refs.clientHeight && e.deltaY >= 0) {
    // 스크롤 최하단 및 아래로 스크롤
    return "next";
  } else {
    return null;
  }
};