import React, { Component } from "react"
import ItemList from "../item-list"
import ItemDetails from "../item-details"
import ErrorIndicator from '../error-indicator'
import SwapiService from "../../services/swapi-service"
import ErrorBoundry from '../error-boundry'
import Row from "../row/row"

import './people-page.css'

export default class PeoplePage extends Component {

    swapiService = new SwapiService();
    state = {
        selectedPerson: 3
    }
    onPersonSelected = (selectedPerson) => {
        this.setState({selectedPerson})
    }
    
    render() {
        if(this.state.hasError) {
            return <ErrorIndicator/>
        }
        const itemList = (
            <ItemList 
                onItemSelected={this.onPersonSelected}
                getData = {this.swapiService.getAllPeople} 
            >
                {(item) => `${item.name} (${item.gender})`}
            </ItemList>
        )
        const personDetails = (
            <ErrorBoundry>
                <ItemDetails 
                    itemId={this.state.selectedPerson}
                    getData = {this.swapiService.getPerson}
                    getImageUrl={this.swapiService.getPersonImage}
                />
            </ErrorBoundry>
        )
        return (
                <Row left = {itemList} right ={personDetails}/>            
        )
    }
}