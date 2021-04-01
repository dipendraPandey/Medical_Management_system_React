import React, { Component } from 'react'

export class Notification extends Component {
    render() {
        return (
            
                <div className={this.props.className == 'danger'?'alert alert-danger alert-has-icon':'alert alert-success alert-has-icon'}>
              <div className="alert-icon">
                <i className="far fa-lightbulb"></i>
              </div>
              <div className="alert-body">
                <div className="alert-title">{this.props.title}</div>
                {this.props.message}
              </div>
              </div>
        )
    }
}

export default Notification
