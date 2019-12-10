import React from 'react'
import {Alert} from 'react-bootstrap'
export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: {}, errorInfo: {}};
    }
  
    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true, error})
    }
  
    render() {
      if (this.state.hasError) {
       return (
            <div>
                <Alert variant="danger" onClose={() => {this.setState({hasError: false})}} dismissable>{this.state.error.toString()}</Alert>
                {this.props.children}
            </div>
       )
      } else return this.props.children
    }
  }