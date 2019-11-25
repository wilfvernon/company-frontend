import React, { Component } from 'react';
import { connect } from 'react-redux';
 
class PreferredJobScene extends Component {
    render() { 
        return (
            <div>
                PreferredJobScene
            </div>
        );
    }
}
 
export default connect()(PreferredJobScene);