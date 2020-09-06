import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import PageLogin from './view/login/index'
import MyClock from './components/clock/MyClock'
// import ScrollReveal from "scrollreveal"

import './lib/iconfont.css'
import cn from 'classnames'

import { createStore } from 'redux'
import reducers from './reducers/counter'
import { Provider } from 'react-redux'

import ComMessage from './components/message/index'
// import "./lib/iconfont.js"
// import MyPop from "./components/pop/MyPop"

import moment from 'moment'
const store = createStore(reducers)
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: ['app-filter'],
      coverClass: ['cover'],
      hitokoto: '',
      from: '',
      url: '',
      inputFilter: ['input', 'ypoctonod'],
      searchOptBoxClass: [],
      inputValueClass: ['keyword'],
      list: [],
      value: '抖音串烧',

      id: '',
      musicData: {
        duration: '',
        nowTime: '',
        progress: '',
      },

      selected: 'baidu',
    }
    this.audioPlay = React.createRef()
  }

  bindFocusFn = (e) => {
    e.stopPropagation()
    this.setState({
      filter: ['app-filter', 'active'],
      searchOptBoxClass: ['active'],
      inputValueClass: ['keyword', 'active'],

      inputFilter: ['input', 'ypoctonod', 'active'],
      coverClass: ['cover', 'active'],
    })
  }

  bindSearch = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  bindKeyDown = (e) => {
    if (e.which === 13) {
      this.getData()
    }
  }

  getData = () => {
    if (this.state.selected === 'baidu') {
      fetch(
        `/sugrec?wd=${this.state.value}&bs=${this.state.value}&pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&csor=4`
      )
        .then((res) => res.json())
        .then((res) => {
          if (!res.g) res.g = []
          this.setState({
            list: res.g,
          })
        })
    } else if (this.state.selected === 'music') {
      fetch(
        `https://autumnfish.cn/search?keywords=${this.state.value}&limit=10&offset=0`
      )
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            list: res.result.songs,
          })
        })
    }
  }

  bindBlurFn = () => {
    this.setState({
      filter: ['app-filter'],
      inputFilter: ['input', 'ypoctonod'],
      searchOptBoxClass: [],
      inputValueClass: ['keyword'],
      coverClass: ['cover'],
    })
  }

  bindPlayMusic = (id) => {
    fetch('https://autumnfish.cn/song/url?id=' + id)
      .then((res) => res.json())
      .then((res) => {
        let url = res.data[0].url
        this.play(id, url, (data) => console.log(data))
      })
      .catch((e) => console.log(e))
  }

  play = (id, url, cb) => {
    this.setState(
      {
        url: url,
        id: id,
      },
      () => {
        this.audioPlay.current.play()
        setInterval(() => {
          var progress =
            (this.audioPlay.current.currentTime /
              this.audioPlay.current.duration) *
            100

          // console.log(
          //   moment(parseInt(this.audioPlay.current.currentTime * 1000)).format(
          //     'mm:ss'
          //   ),
          //   moment(parseInt(this.audioPlay.current.duration * 1000)).format(
          //     'mm:ss'
          //   )
          // )
          let clone = this.state.musicData
          clone.progress = progress
          // let aa = this.audioPlay.current.currentTime * 1000
          // console.log(parseInt(aa))
          // let bb = moment(aa).format('mm')
          // console.log(bb)
          clone.nowTime = moment(
            parseInt(
              (this.audioPlay.current.duration -
                this.audioPlay.current.currentTime) *
                1000
            )
          ).format('mm:ss')
          this.setState({
            musicData: clone,
          })
        }, 1000)
      }
    )
  }

  bindClickTab = (str) => {
    this.setState({
      selected: str,
    })
  }

  render() {
    return (
      <div className="App">
        {/* <img
          className={this.state.filter.join(' ')}
          src={require('./img/BG_A_Default_1.jpg')}
          alt="图片"
        /> */}
        <div
          className={this.state.coverClass.join(' ')}
          onClick={this.bindBlurFn}
        ></div>
        <MyClock />
        <div>
          <input
            type="text"
            className={this.state.inputFilter.join(' ')}
            name="word"
            size="30"
            placeholder="Search-Music"
            onFocus={this.bindFocusFn}
            value={this.state.value}
            onChange={this.bindSearch}
            onKeyDown={this.bindKeyDown}
            autoComplete="off"
            // onBlur={this.bindBlurFn}
          ></input>
        </div>

        <div id="searchOptBox" className={this.state.searchOptBoxClass}>
          <span
            className={cn({
              active: this.state.selected === 'baidu',
              searchOpt: true,
            })}
            onClick={() => this.bindClickTab('baidu')}
            id="baiduSearchOpt"
          >
            <img src={require('./svg/baidu.svg')} alt="消息"></img>
          </span>
          <span
            className={cn({
              active: this.state.selected === 'bing',
              searchOpt: true,
            })}
            onClick={() => this.bindClickTab('bing')}
            id="bingSearchOpt"
          >
            <img src={require('./svg/Bing.svg')} alt="消息"></img>
          </span>
          <span
            className={cn({
              active: this.state.selected === 'google',
              searchOpt: true,
            })}
            onClick={() => this.bindClickTab('google')}
            id="googleSearchOpt"
          >
            <img src={require('./svg/google.svg')} alt="消息"></img>
          </span>
          <span
            className={cn({
              active: this.state.selected === 'music',
              searchOpt: true,
            })}
            onClick={() => this.bindClickTab('music')}
            id="musicOpt"
          >
            <img src={require('./svg/music.svg')} alt="音乐"></img>
          </span>
        </div>

        <audio
          style={{ display: 'none' }}
          controls
          ref={this.audioPlay}
          src={this.state.url}
        />

        <div className="app-progress">
          <div
            className="app-progress-line"
            style={{
              width: this.state.musicData.progress + '%',
            }}
          ></div>
          <div className="app-progress-time">
            {this.state.musicData.nowTime}
          </div>
        </div>

        <div className="app-music-box">
					<div className="app-music-btn">
						<span className="icon iconfont">&#xe898;</span>
					</div>
					<div className="app-music-btn">
						<span className="icon iconfont">&#xe9a3;</span>
					</div>
					<div className="app-music-btn">
						<span className="icon iconfont">&#xe9a3;</span>
					</div>
				</div>

        <div className={this.state.inputValueClass.join(' ')}>
          {this.state.list.map((item, index) => {
            return (
              <div
                key={index}
                onClick={(e) => {
                  this.bindPlayMusic(item.id)
                }}
              >
                {item.name || item.q} {this.state.id === item.id ? 'play' : ''}
              </div>
            )
          })}
        </div>

        <div className="quotebox waves-effect waves-light" id="quotebox">
          <span className="quote-bg"></span>
          <p className="quote-content">「 {this.state.hitokoto} 」</p>
          <p className="quote-author">—— {this.state.from}</p>
        </div>

        <PageLogin />

        <ComMessage />
      </div>
    )
  }

  componentDidMount() {
    fetch(
      'https://autumnfish.cn/login/cellphone?phone=18267094443&password=forever@xiaoyu'
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res)

        fetch(
          `https://autumnfish.cn/user/playlist?uid=32953014?uid=${res.account.id}`
        )
          .then((res) => res.json())
          .then((res) => {
            console.log(res)
          })
      })

    fetch('https://v1.hitokoto.cn/?c=d&c=i&encode=json')
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        this.setState({
          hitokoto: res.hitokoto,
          from: res.from,
        })
      })
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
