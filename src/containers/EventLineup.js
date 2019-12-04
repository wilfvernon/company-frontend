import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/eventLineup.css'
 
class EventLineup extends Component {
    render() { 
        return (
            <div className="lineup-bg-container">
                <div id="lineup-container">
                    <div id="lineup-top-row">
                        <div id="lineup-top-left">
                            
                        </div>
                        <div id="lineup-top-right">
                            
                        </div>
                    </div>
                    <div className="lineup-row">
                        <div className="lineup-left">
                            
                        </div>
                        <div className="lineup-right">
                            
                        </div>
                    </div>
                    <div className="lineup-row">
                        <div className="lineup-left">
                            
                        </div>
                        <div className="lineup-right">
                            
                        </div>
                    </div>
                    <div id="lineup-bottom-row">
                        <div id="lineup-bottom-left">
                           
                        </div>
                        <div id="lineup-bottom-right">
                           
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default connect()(EventLineup);