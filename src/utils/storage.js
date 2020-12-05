/**
 * 本地存储封装模块
 */

export const getItem = (name) => {
  const data = window.localStorage.getItem(name)
  try {
    // 尝试把data转换为JSON格式对象
    return JSON.parse(data)
  } catch (error) {
    // 无法转换就直接返回原格式
    return data
  }
}

export const setItem = (name, value) => {
  // 如果value是对象就转为JSON格式字符串
  if (typeof value === "object") {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}