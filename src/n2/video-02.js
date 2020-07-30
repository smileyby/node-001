//=> 文件(夹)是否存在检查/文件合法检查/文件读取错误的提示/文件信息显示格式/多文件并发读取
//=> 如果是统计某个文件夹下的所有视频，它们的格式和总时长，可以如何实现？

/**
 * 1. 读取文件夹以及文件夹下的内容
 *  1.1 检查文件夹是否存在
 * 2. 循环获取每一个视频的格式和时长，生成统计
 *  2.1 检查文件是否存在
 *  2.2 检查文件是否为视频
 *  2.3 读取文件错误时，给出提示
 *  2.4 Promise.all 配合Promise 进行并发处理
 *  2.5 ffmpeg 获取视频时间和视频格式
 * @return { list: [name: 'xxx.mp4', duration: '10s'], totalDuration: '20s' }
 */

const fs = require('fs')
const path = require('path')
const util = require('util')
const readdir = util.promisify(fs.readdir)
const dirName = '/video/'
const normalVideoType = ['mp4', '3gp', 'avi', 'mov', 'f4v', 'flv', 'mpeg', 'rmvb', 'webm']

;(async function(){
  let dirPath = path.resolve(__dirname + dirName)
  let fileList, fileTypeList = []
  try {
    fileList = await readdir(dirPath);
  } catch(err){
    console.log(`errorTips：no such file or directory\npath：${dirPath}`)
  }

  //=> 过滤掉非视频文件
  fileList
    .filter(fileName => {
      let fileType = fileName.split('.')[1]
      return normalVideoType.indexOf(fileType) > -1
    })
    .forEach(fileName => {
      fileTypeList.push(fileName.split('.')[1])
    })

  const res = {
    fileTypeList,
    duration: '200s'
  }  
  console.log(res)
})()