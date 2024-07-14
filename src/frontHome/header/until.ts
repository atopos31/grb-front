import { useEffect, useState } from "react";

function useIsAtTop(_buffer = 100) {
    const [isAtTop, setIsAtTop] = useState(true);
  
    const handleScroll = () => {
      // 利用防抖技术
      clearTimeout(debounceTimeout);
      setTimeout(() => {
        // 判断是否处于顶部，引入缓冲区概念
        setIsAtTop(window.scrollY==0 || document.documentElement.scrollTop == 0);
      }, 1); // 防抖时间设置为100毫秒
    };
  
    // 缓存debounceTimeout以清除定时器
    let debounceTimeout: number | undefined;
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(debounceTimeout); // 清除定时器，避免内存泄漏
      };
    }, []);
  
    return isAtTop;
  }

export default useIsAtTop;