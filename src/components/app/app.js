import React, { Component } from "react"
import ErrorButton from '../error-button'
import ErrorIndicator from "../error-indicator"
import Header from '../header'
import RandomPlanet from '../random-planet'
import PeoplePage from "../people-page/people-page"
import './app.css'

import SwapiService from "../../services/swapi-service"
import ErrorBoundry from "../error-boundry"
import Row from "../row/row"
import ItemDetails, { Record } from "../item-details/item-details"


export default class App extends Component  {
    state = {
        showRandomPlanet:true,
        hasError: false
    }
    swapiService = new SwapiService();

    toggleRandomPlanet = () => {
        this.setState({
            showRandomPlanet: !this.state.showRandomPlanet
        })
    }
    componentDidCatch() {
        this.setState({hasError:true})
    }
    render () {
        if(this.state.hasError) {
            return <ErrorIndicator/>
        }
        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;
        const personDetails = (
            <ItemDetails 
                itemId={11}
                getData={this.swapiService.getPerson}
                getImageUrl={this.swapiService.getPersonImage}>
                    <Record field='gender' label='Gender'/>
                    <Record field='eyeColor' label='Eye Color'/>
            </ItemDetails>
        )
        const starshipDetails = (
            <ItemDetails 
                itemId={5}
                getData={this.swapiService.getStarship}
                getImageUrl={this.swapiService.getStarshipImage}>
                    <Record field='model' label='Model'/>
                    <Record field='length' label='Length'/>
                    <Record field='costInCredits' label='Cost'/>

            </ItemDetails>
        )
        return (
            <ErrorBoundry>
                <div className="stardb-app">
                    <Header/>
                    {planet}

                    <button className="toggle-planet btn btn-warning btn-lg"
                        onClick={this.toggleRandomPlanet}>
                        Toggle Random Planet
                    </button>
                    <ErrorButton/>
                    <PeoplePage/>
                    
                    <Row left={personDetails} right={starshipDetails}  />
                </div>  
            </ErrorBoundry>
        );
    }
};