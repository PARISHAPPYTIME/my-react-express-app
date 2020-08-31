import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import MyClock from './components/clock/MyClock'

import moment from 'moment'
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
      value: '',
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
    fetch(
      `https://autumnfish.cn/search?keywords=${this.state.value}&limit=10&offset=0`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          list: res.result.songs,
        })
      })
    // fetch(
    //   `/sugrec?wd=${this.state.value}&bs=${this.state.value}&pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&csor=4`
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     if (!res.g) res.g = []
    //     this.setState({
    //       list: res.g,
    //     })
    //   })
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
        this.play(url, (data) => console.log(data))
      })
      .catch((e) => console.log(e))
  }

  play = (url, cb) => {
    this.setState(
      {
        url: url,
      },
      () => {
        this.audioPlay.current.play()
        console.log(moment(this.audioPlay.duration).format('HH:mm'))
      }
    )
  }

  render() {
    return (
      <div className="App">
        <img
          className={this.state.filter.join(' ')}
          src={require('./img/BG_A_Default_1.jpg')}
          alt="图片"
        />
        <div
          className={this.state.coverClass.join(' ')}
          onClick={this.bindBlurFn}
        ></div>
        <MyClock />
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

        <div id="searchOptBox" className={this.state.searchOptBoxClass}>
          <span className="searchOpt" id="baiduSearchOpt">
            <img src={require('./svg/baidu.svg')} alt="消息"></img>
          </span>
          <span className="searchOpt" id="bingSearchOpt">
            <img src={require('./svg/Bing.svg')} alt="消息"></img>
          </span>
          <span className="searchOpt" id="googleSearchOpt">
            <img src={require('./svg/google.svg')} alt="消息"></img>
          </span>
          <span className="searchOpt active" id="musicOpt">
            <img src={require('./svg/music.svg')} alt="音乐"></img>
          </span>
        </div>

        <audio
          style={{ display: 'none' }}
          controls
          ref={this.audioPlay}
          src={this.state.url}
        />
        <div className={this.state.inputValueClass.join(' ')}>
          {this.state.list.map((item, index) => {
            return (
              <div
                key={index}
                onClick={(e) => {
                  this.bindPlayMusic(item.id)
                }}
              >
                {item.name}
              </div>
            )
          })}
        </div>

        <span className="shouldNotFade" id="btnBox">
          <span id="btnWarn" title="消息">
            <img src={require('./svg/notification.svg')} alt="消息"></img>
          </span>
        </span>

        <div className="quotebox waves-effect waves-light" id="quotebox">
          <span className="quote-bg"></span>
          <p className="quote-content">「 {this.state.hitokoto} 」</p>
          <p className="quote-author">—— {this.state.from}</p>
        </div>
      </div>
    )
  }

  componentDidMount() {
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
    <App></App>
  </React.StrictMode>,
  document.getElementById('root')
)
