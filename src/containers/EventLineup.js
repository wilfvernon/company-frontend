import React, { Component } from 'react';
import EventLineupCard from '../components/EventLineupCard'
import { connect } from 'react-redux';
import { lineupSlotAction, clearLineupSlotAction, clearNewSlotRender } from '../redux/actions'
import './css/eventLineup.css'
 
class EventLineup extends Component {

    componentWillUnmount=()=>{
        this.props.clearLineupSlotAction()
    }

    isOrganiser = () =>{
        return this.props.activeCharacter.id===this.props.organiser.character.id
    }

    handleClick=(data)=>{
        if(this.isOrganiser()){
            this.isActive(data)?
            this.props.clearLineupSlotAction()
            :this.props.lineupSlotAction(data)
        }
    }

    isActive=(data)=>{
        return data===this.props.slot
    }

    renderPlayer=(data, position)=>{
        let m
        if(Object.keys(this.props.newSlots).length) m = Object.values(this.props.newSlots).find(member=>member.slot===data)
        if(!m){
             let mem = this.props.members.find(member=>member.slot===data)
             if(mem && !Object.keys(this.props.newSlots).includes(mem.character.name)) m = mem
            }
        if(m)return <EventLineupCard {...m} slot={data} position={position} organiserId={this.props.organiser.character.id}/>
    }

    render() {
        return (
            <div className="lineup-bg-container">
                <h2>Lineup</h2>
                <div id={this.isOrganiser() ? "org-lineup-container" : "lineup-container"}>
                    <div id="lineup-top-row">
                        <div name="tank1" id={this.isActive("tank1")?"lineup-top-left-selected":"lineup-top-left"}>
                            <div className="tank-icon" onClick={()=>this.handleClick("tank1")}/>
                            {this.renderPlayer("tank1")}
                        </div>
                        <div name="tank2" id={this.isActive("tank2")?"lineup-top-left-selected":"lineup-top-right"}>
                            <div className="tank-icon" onClick={()=>this.handleClick("tank2")}/>
                            {this.renderPlayer("tank2", "top-right")}
                        </div>
                    </div>
                    <div className="lineup-row">
                        <div name="dps1" className={this.isActive("dps1")?"lineup-left-selected":"lineup-left"}>
                            <div className="dps-icon" onClick={()=>this.handleClick("dps1")}/>
                            {this.renderPlayer("dps1")}
                        </div>
                        <div name="dps2" className={this.isActive("dps2")?"lineup-right-selected":"lineup-right"}>
                            <div className="dps-icon" onClick={()=>this.handleClick("dps2")}/>
                            {this.renderPlayer("dps2")}
                        </div>
                    </div>
                    <div className="lineup-row">
                        <div name="dps3" className={this.isActive("dps3")?"lineup-left-selected":"lineup-left"}>
                            <div className="dps-icon" onClick={()=>this.handleClick("dps3")}/>
                            {this.renderPlayer("dps3")}
                        </div>
                        <div name="dps4" className={this.isActive("dps4")?"lineup-right-selected":"lineup-right"}>
                            <div className="dps-icon" onClick={()=>this.handleClick("dps4")}/>
                            {this.renderPlayer("dps4")} 
                        </div>
                    </div>
                    <div id="lineup-bottom-row">
                        <div name="healer1" id={this.isActive("healer1")?"lineup-bottom-left-selected":"lineup-bottom-left"}>
                            <div className="healer-icon" onClick={()=>this.handleClick("healer1")}/>
                            {this.renderPlayer("healer1")}   
                        </div>
                        <div name="healer2" id={this.isActive("healer2")?"lineup-bottom-right-selected":"lineup-bottom-right"}>
                            <div className="healer-icon" onClick={()=>this.handleClick("healer2", "bottom-right")}/>
                            {this.renderPlayer("healer2")}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const msp = (state) =>({
    activeCharacter: state.characters.accountPrimary,
    slot: state.events.lineupSlot,
    newSlots: state.events.newSlots
})
 
export default connect(msp, { lineupSlotAction, clearLineupSlotAction, clearNewSlotRender })(EventLineup);