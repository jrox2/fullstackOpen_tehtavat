import React from 'react'
import '../index.css'

class Togglable2 extends React.Component {
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
        <div>   
          <span className="clickableElement nameDiv" onClick={this.toggleVisibility}>{this.props.buttonLabel}</span>
          <div className="contentDiv" style={showWhenVisible}>
            {this.props.children}
          </div>
        </div>
      )
    }
  }

  export default Togglable2