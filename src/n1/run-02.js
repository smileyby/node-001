//=> 在01基础上的优化版本
const chalkWorker = require('chalk-animation')

class Race {
  constructor(props = {}) {
    [
      ['rabbit', '兔子'],
      ['turtle', '乌龟'],
      ['start', '|'],
      ['end', '>'],
      ['pad', '.'],
      ['speed', 1],
      ['steps', 50],
      ['stopAt', (Math.floor(Math.random() * 50))],
    ].forEach(elem => {
      const [key, value] = elem;
      if (!(key in props)) {
        this[key] = value
      }
    })
  }

  getRaceTrack(t){
    const {
      start,
      end, 
      pad,
      turtle,
      rabbit,
      steps,
      stopAt
    } = this;
    let state = ''
    if (t >= stopAt) {
      if (t >= 50) {
        state = `${start}${pad.repeat(stopAt)}${rabbit}${pad.repeat(steps - stopAt)}${end}${turtle}`;
        clearInterval(this.timer);
      } else {
        state = `${start}${pad.repeat(stopAt)}${rabbit}${pad.repeat(t - stopAt)}${turtle}${pad.repeat(steps - t)}${end}`;
      }
    } else {
      if (3*t >= stopAt) {
        state = `${start}${pad.repeat(t)}${turtle}${pad.repeat(stopAt - t)}${rabbit}${pad.repeat(steps - stopAt)}${end}`;
      } else {
        state = `${start}${pad.repeat(t)}${turtle}${pad.repeat(3*t - t)}${rabbit}${pad.repeat(steps - 3*t)}${end}`;
      }
    }
    return state
  }

  updateRaceTrack(state, racing){
    racing.replace(state)
  }

  race(){
    const {
      turtle,
      rabbit,
      start,
      end,
      pad
    } = this;
    const initState = `${turtle}${rabbit}${start}${pad.repeat(50)}${end}`;
    const racing = chalkWorker.rainbow(initState);
    let t = 0;
    this.timer = setInterval(()=>{
      if (t > 12) {
        const state = this.getRaceTrack(t - 12);
        this.updateRaceTrack(state, racing);
        racing.replace(state);
      }
      t++;
    }, 150)
  }
}

race = new Race()
race.race()