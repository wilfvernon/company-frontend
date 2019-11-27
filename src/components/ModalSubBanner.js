import React, { Component } from 'react';
 
class ModalSubBanner extends Component {
    render() { 
        return (
            <div className={this.props.class}>
                {this.props.text()}
            </div>
        );
    }
}
 
export default ModalSubBanner;