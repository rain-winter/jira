import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);
// 值是undefined null 空字符串就是无意义的，用于替换isFalsy
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// let a: object
// a = { name: 'jack' }
// a = () => {}
// a = new RegExp('')
// a = { ...() => {} } // 这就是一个空对象了
// 这里我们想要的就是一个键值对的对象

// let a: { [key: string]: unknown }

export const cleanObject = (object?: { [key: string]: unknown }) => {
  //
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // 假设 value==0 也会删掉
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
// hook 是要在组件、其他hook里运行
// use开头是hook 里面可以使用useEffect
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项加上callback会造成无线循环，这个和useCallback以及useMeno有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// debounce 输入字，输完发一次请求
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 每次再value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 每次再上一个useEffect处理完后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = document.title;
  useEffect(() => {
    document.title = title;
  }, [title]);
  // 页面卸载时执行
  // useEffect(() => {
  //   return () => {};
  // }, []);
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, []);
};
