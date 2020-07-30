// 这里假设有一个视频 demo.mp4
// 时长如果不超过 1 个小时，比如 55 分钟，那就打印 55 分钟
// 如果超过 1 个小时，比如 65 分钟，打印 1 小时 5 分钟
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const util = require('util')

//=> util.promisify 传入一个遵循常见的错误优先的回调风格的函数，并返回一个promise版本
const open = util.promisify(fs.open)
const read = util.promisify(fs.read)

function getTime (buffer) {
  // 关于 mvhd + 17 可以看下文档
  // https://www.yuque.com/5k/tdu0oz/ok8obr#IQ2ih
  //=> Buffer.from('mvhd') 将mvhd编码成buffer
  //=> buffer.indexOf(Buffer.from('mvhd')) 查找mvhd的位置下标
  const start = buffer.indexOf(Buffer.from('mvhd')) + 17

  //=> readUInt32BE 读取之前要跳过的字节数
  const timeScale = buffer.readUInt32BE(start)
  const duration = buffer.readUInt32BE(start + 4)
  const movieLength = Math.floor(duration / timeScale)
  return movieLength
}

function getLocaleTime (seconds) {
  return moment
    .duration(seconds, 'seconds')
    .toJSON()
    .replace(/[PTHMS]/g, str => {
      switch (str) {
        case 'H': return '小时'
        case 'M': return '分钟'
        case 'S': return '秒'
        default: return ''
      }
    })
}

;(async function () {
  //=> 将地址解析成绝对路径
  const filePath = path.resolve(__dirname + '/video/demo.mp4')

  //=> 打开指定路径上的文件，r 是以只读的方式打开 文件不存在，会发生异常
  //=> 回调中捕获异常并做相关提示
  const fd = await open(filePath, 'r')

  //=> 分配一个大小为 100字节的Buffer，默认以0填充
  const buff = Buffer.alloc(100)

  //=> 从已经打开的文件fd中读取内容
  //=> buff 将读取的内容写入到buff上
  //=> 0 buff 写入时的偏移量
  //=> 100 指定读取的字节数
  //=> 0 从fs的 起始位置开始读取 
  const { buffer } = await read(fd, buff, 0, 100, 0)
  const time = getTime(buffer)
  const res = {
    '视频总时长': getLocaleTime(time)
  }
  
  console.log(res)
})()