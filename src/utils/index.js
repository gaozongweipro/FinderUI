// import { parseTime } from "./ruoyi";

/**
 * 表格时间格式化
 */
export function formatDate(cellValue) {
  if (cellValue == null || cellValue == '') return ''
  var date = new Date(cellValue)
  var year = date.getFullYear()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
// export function formatTime(time, option) {
//   if (("" + time).length === 10) {
//     time = parseInt(time) * 1000;
//   } else {
//     time = +time;
//   }
//   const d = new Date(time);
//   const now = Date.now();

//   const diff = (now - d) / 1000;

//   if (diff < 30) {
//     return "刚刚";
//   } else if (diff < 3600) {
//     // less 1 hour
//     return Math.ceil(diff / 60) + "分钟前";
//   } else if (diff < 3600 * 24) {
//     return Math.ceil(diff / 3600) + "小时前";
//   } else if (diff < 3600 * 24 * 2) {
//     return "1天前";
//   }
//   if (option) {
//     return parseTime(time, option);
//   } else {
//     return (
//       d.getMonth() +
//       1 +
//       "月" +
//       d.getDate() +
//       "日" +
//       d.getHours() +
//       "时" +
//       d.getMinutes() +
//       "分"
//     );
//   }
// }

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val]
}

export const exportDefault = 'export default '

export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/_[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

// 转化对象的key
export function transformObjectKey(data, map) {
  let res = {}
  if (map) {
    Object.keys(map).forEach(item => {
      res[item] = data[map[item]]
    })
  } else {
    res = data
  }
  return res
}

/**
 * 迭代的方法把树拍平
 * @param {树结构数据} treeData
 * @param {子数组的key} children
 * @returns
 */
export function treeToList(treeData, children) {
  // 只有Array的instanceof 是Array，
  const nodeData = treeData instanceof Array ? treeData : [treeData]
  const resList = []
  while (nodeData.length) {
    const stack = nodeData.shift()
    resList.push(stack)
    if (stack[children] && stack[children].length) {
      nodeData.unshift(...stack[children])
    }
  }
  return resList
}

/**
 * 对象转化为FormData
 * @param {要转化为FormData的对象} data
 * @returns
 */
export function objectToFormData(data) {
  const formData = new FormData()
  data &&
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
  return formData
}

/**
 * 属性访问
 * @param {被访问的对象} obj
 * @param {访问的路径} p
 * @returns 返回访问到的值
 */
export function getDescendantProp(obj, p) {
  const arr = p.split('.')
  while (arr.length) {
    obj = obj[arr.shift()]
  }
  return obj
}

/**
 * 见时间格式化为模板模样
 * @param {时间参数} time
 * @param {格式化模板} formate
 * @returns
 */
export function getFormateDate(time, formate = 'YYYY-MM-DD') {
  let str = formate
  const date = new Date(time)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  const second = date.getSeconds().toString().padStart(2, '0')

  str = str.replace(/YYYY/, year)
  str = str.replace(/MM/, month)
  str = str.replace(/DD/, day)
  str = str.replace(/hh/, hour)
  str = str.replace(/mm/, minute)
  str = str.replace(/ss/, second)
  // 时间段开始时间
  str = str.replace(/hStart/, '00')
  str = str.replace(/mStart/, '00')
  str = str.replace(/sStart/, '00')
  // 时间段结束时间
  str = str.replace(/hEnd/, '23')
  str = str.replace(/mEnd/, '59')
  str = str.replace(/sEnd/, '59')
  return str
}

/**
 * 获取字典label的map
 * @param {字典数据} data
 * @returns
 */
export function getTextMap(data) {
  let res = {}
  data.forEach(item => {
    res[item.dictValue] = item.dictLabel
  })
  return res
}

/**
 * 把列表转化为树结构
 * @param {列表数据} data
 * @param {指定id， parentId， children} config
 * @returns
 */
export function listToTree(data, config) {
  const listData = toRaw(data)
  const { parentId = 'parentId', id = 'id', children = 'children' } = config
  const map = {}
  const tree = []
  console.log(listData)
  if (!listData && listData.length) return []

  // 创建节点映射
  listData.forEach(item => {
    map[item[id]] = { ...item, [children]: [] }
  })

  // 构建树结构
  listData.forEach(item => {
    const parent = map[item[parentId]]
    if (parent) {
      parent[children].push(map[item[id]])
    } else {
      tree.push(map[item[id]])
    }
  })

  return tree
}

/**
 * 获取特定结构字典数据的文本
 * @param {字典数据列表} data
 * @param {字典的value值} val
 * @returns
 */
export function getText(data, val) {
  let text = ''
  data.forEach(item => {
    if (item.value.toString() === val.toString()) {
      text = item.label
    }
  })
  return text
}

/**
 * 树结构数据搜索
 * @param {* 树结构数据} data
 * @param {* 搜索值} searchKeyword
 * @param {* valueKey } idkey
 * @param {* labelKey } labelKey
 * @returns
 */
export function treeSearch(data, searchKeyword, valueKey, labelKey) {
  // 定义一个数组，用于存储搜索结果
  let results = {}

  // 定义一个递归函数，遍历树结构数据
  function traverseTree(node) {
    // 检查当前节点的值是否包含搜索关键字
    console.log(node[valueKey], searchKeyword)
    console.log(node[valueKey] === searchKeyword)
    if (node[valueKey].toString() === searchKeyword.toString()) {
      results = node // 将匹配的节点添加到结果数组中
    }

    // 递归遍历子节点
    if (node.children) {
      node.children.forEach(item => {
        traverseTree(item)
      })
    }
  }

  // 调用递归函数，开始遍历树结构数据
  if (data.length > 0) {
    data.forEach(item => {
      traverseTree(item)
    })
  }

  return results // 返回搜索结果数组
}

// 根据当前的日期和星期几获取当前日期所在的一周的日期列表
/**
 *
 * @param {当前日期 String} date
 * @param {当前日期是星期几 1-7 周一~周日} week
 */
export function getAllWeekList(date, week) {
  let timeStamp = new Date(date).getTime()
  const dayLong = 86400000
  const res = [1, 2, 3, 4, 5, 6, 7].map(item => {
    let thisDate = new Date(timeStamp - (week - item) * dayLong)
    return (
      thisDate.getFullYear() +
      '-' +
      (thisDate.getMonth() + 1 < 10 ? '0' + (thisDate.getMonth() + 1) : thisDate.getMonth() + 1) +
      '-' +
      (thisDate.getDate() < 10 ? '0' + thisDate.getDate() : thisDate.getDate())
    )
  })
  return res
}

// 根据当前的日期和星期几获取当前日期所在的一周的日期列表
/**
 *
 * @param {当前日期 String} date
 * @return 返回当前日期对应的星期，1-7 周一~周日
 */
export function getDateWeek(date) {
  let week = new Date(date).getDay()
  if (week === 0) {
    return 7
  } else {
    return week
  }
}
