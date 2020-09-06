import React from 'react'
import { connect } from 'react-redux'
import cn from 'classnames'
import './index.css'

class pageLogin extends React.Component {
  render() {
    return (
      <div
        className={cn({
          title: true,
        })}
      >
        这是个登录页面 {this.props.connect}
      </div>
    )
  }
}

const mapStateTpPros = (state) => {
  return {
    connect: state,
  }
}

export default connect(mapStateTpPros)(pageLogin)
