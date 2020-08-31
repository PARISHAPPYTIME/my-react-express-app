import React from 'react'
import moment from 'moment'

import './MyClock.css'

class MyClock extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        moment: moment().format('HH:mm'),
      }
    }
  
    render(h) {
      return (
        <div className="title" id="title">
          <h1 id="titleText">{this.state.moment}</h1>
        </div>
      )
    }
  
    componentDidMount() {
      setInterval(() => {
        this.setState({
          moment: moment().format('HH:mm'),
        })
      }, 1000)
    }
  }

  export default MyClock