import React, { Component } from "react";
import PlanetDetails from "../sw-components/planet-details"
import {PlanetList} from "../sw-components/item-lists"
import Row from "../row/row";

export default class PlanetPage extends Component {
    state = {
        selectedPlanet : null
    }
    onPlanetSelected = (selectedPlanet) => {
        this.setState({selectedPlanet})
    }
    render () {
        return (
            <Row 
                left={<PlanetList onItemSelected = {this.onPlanetSelected}/>} 
                right={<PlanetDetails itemId={this.state.selectedPlanet}/>}/>
        )
    }
}
