import React, {Component} from 'react'

class CommunityShow extends Component {

    state={
        community: null
    }

    componentDidMount(){
        console.log(this.props.id)
        fetch("https://xivapi.com/freecompany/" + this.props.id)
        .then(res=>res.json())
        .then((fc)=>this.setState({
            community: fc
        }))
    }

    render(){
        console.log(this.community)
        return(
        this.state.community?<h1>{this.state.community["FreeCompany"]["Name"]}</h1>:<h1>Loading</h1>
        )
    }
}

export default CommunityShow