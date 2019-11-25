import React, { Component } from 'react'
import NewEventInfoScene from '../components/NewEventInfoScene'
import NewEventDescScene from '../components/NewEventDescScene'
import PreferredJobScene from '../components/PreferredJobScene'
import { connect } from 'react-redux'
import { closeModal } from '../redux/actions'

class NewEventModal extends Component {

    state={
        scene: "Info",
        content: null
    }

    setContent = (content) => {
        this.setState({ content })
    }

    getScene = () => {
        switch (this.state.scene) {
            case "Info":
                return <NewEventInfoScene setContent={this.state.content}/>
            case "Description":
                return <NewEventDescScene/>
            case "Preferred Job":
                return <PreferredJobScene/>
            default:
            break;
        }
    }

    filteredContent = (filter="") => {
        if(filter) return this.props.allContent.filter(content=>content.category === filter)
        else return this.props.allContent
    }
    render(){
        const { closeModal } = this.props
        return (
            <div>
                <h1 onClick={closeModal}>New Event Modal</h1>
                {this.getScene()}
            </div>
        )
    }
}

const msp = (state) => ({
    allContent: state.content.all
})

export default connect(msp, { closeModal })(NewEventModal)