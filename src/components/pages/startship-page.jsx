import React, { Component } from "react";
import StarshipDetails from "../sw-components/starship-details"
import {StarshipList} from "../sw-components/item-lists"
import Row from "../row/row";

export default class StarshipPage extends Component {
    state = {
        selectedStarship : null
    }
    onStarshipSelected = (selectedStarship) => {
        this.setState({ selectedStarship })
    }
    
    render () {
        return (
            <Row 
                left={<StarshipList onItemSelected = {this.onStarshipSelected}/>} 
                // right={<StarshipDetails itemId={this.state.selectedStarship}/>}
                />
        )
    }
}
