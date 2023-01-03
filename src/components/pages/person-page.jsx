import React, { Component } from "react";
import PersonDetails from "../sw-components/person-details"
import {PersonList} from "../sw-components/item-lists"
import Row from "../row/row";

export default class PersonPage extends Component {
    state = {
        selectedPerson : null
    }
    onPersonSelected = (selectedPerson) => {
        this.setState({selectedPerson})
    }
    render () {
        return (
            <Row 
                left={<PersonList onItemSelected = {this.onPersonSelected}/>} 
                right={<PersonDetails itemId={this.state.selectedPerson}/>}/>
        )
    }
}
