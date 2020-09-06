import React from 'react'
import cn from 'classnames'

import anime from 'animejs/lib/anime.es.js'

import './index.css'

class ComMessage extends React.Component {
  state = {
    isActive: false,
  }
  render() {
    return (
      // <div
      //   className={cn({
      //     messgaeBox: true,
      //   })}
      // >
      //   <div className="message-icon">
      //     <i className="icon iconfont">&#xe8b6;</i>
      //   </div>
      //   <div className="txt"> 这就是一段测试的文字的消息效果！</div>
      // </div>
      <div
        className={cn({
          messgaeBox: true,
        })}
      >
        <div className="message-icon">
          <i className="icon iconfont">&#xe8a9;</i>
        </div>
        <div className="txt"> 正在播放音乐</div>
      </div>
    )
  }

  componentDidMount() {
    setTimeout(() => {
      anime({
        targets: '.messgaeBox',
        translateY: 250,
        duration: 400,
        easing: 'easeInOutCubic',
      })
    }, 3000)
  }
}

export default ComMessage
