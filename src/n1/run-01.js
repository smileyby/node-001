const chalkWorker = require('chalk-animation')

const start = '|'
const end = '>'
const pad = '.'
const rabbit = '兔子'
const turtle = '乌龟'
const speed = 1
const stopAt = Math.floor(Math.random()*50)
const steps = 50
let timer
let t = 0

//=> 初始化赛道
const initState = `乌龟兔子|${pad.repeat(50)}>`;
const racing = chalkWorker.rainbow(initState);

//=> 计算位置
const race = () => {
  timer = setInterval(()=>{
    let state = '';
    if (t >= stopAt) {
      if (t >= 50) {
        state = `|${pad.repeat(stopAt)}兔子${pad.repeat(steps - stopAt)}>乌龟`;
        clearInterval(timer);
      } else {
        state = `|${pad.repeat(stopAt)}兔子${pad.repeat(t - stopAt)}乌龟${pad.repeat(steps - t)}>`;
      }
    } else {
      if (3*t >= stopAt) {
        state = `|${pad.repeat(t)}乌龟${pad.repeat(stopAt - t)}兔子${pad.repeat(steps - stopAt)}>`;
      } else {
        state = `|${pad.repeat(t)}乌龟${pad.repeat(3*t - t)}兔子${pad.repeat(steps - 3*t)}>`;
      }
    }
    racing.replace(state);
    t++;
  }, 150)
}

const wait = (sec) => new Promise(resolve => setTimeout(() => resolve(), sec))
wait(2000).then(()=>{
  race()
})
