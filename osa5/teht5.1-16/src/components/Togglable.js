import React from 'react'


class Togglable extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false
      }
    }
  
    toggleVisibility = () => {
      this.setState({visible: !this.state.visible})
    }
  
    render() {
      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }
  
      return (
        <div className="linkRow">
          <div style={hideWhenVisible}>
            <span className="clickableElement" onClick={this.toggleVisibility}>{this.props.buttonLabel}</span>
          </div>
          <div style={showWhenVisible} className="togglableContent">
            {this.props.children}
            <button onClick={this.toggleVisibility}>Sulje</button>
          </div>
        </div>
      )
    }
  }

  export default Togglable