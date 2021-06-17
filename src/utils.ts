export function encodeData(text: any) {
  return btoa(encodeURIComponent(JSON.stringify(text)));
}

export function decodeData(payload: string) {
  try {
    const text = JSON.parse(decodeURIComponent(atob(payload)));
    return text;
  } catch (err) {}
}

enum IDStatus {
  EMPTY,
  USED,
}

export function debounce(fun: Function, delay: number, immediate = true) {
  let id: NodeJS.Timeout | IDStatus = IDStatus.EMPTY;
  return (...args: any) => {
    // let that = this as unknown
    if (id === IDStatus.EMPTY) {
      if (immediate) fun(...args);
      id = IDStatus.USED;
      return;
    }
    if (id !== IDStatus.USED) clearTimeout(id);

    id = setTimeout(function () {
      fun(...args);
      id = IDStatus.EMPTY;
    }, delay);
  };
}

export function once(func: Function, timeout: number) {
  let id: NodeJS.Timeout | IDStatus = IDStatus.EMPTY;
  return (...args: any) => {
    // let that = this as unknown
    if (id === IDStatus.EMPTY) {
      func(...args);
      id = IDStatus.USED;
      return;
    }
    if (id !== IDStatus.USED) clearTimeout(id);

    id = setTimeout(function () {
      clearTimeout(id as NodeJS.Timeout);
      id = IDStatus.EMPTY;
    }, timeout);
  };
}
