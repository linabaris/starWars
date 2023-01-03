import React, { Component } from "react"
import ErrorIndicator from "../error-indicator"
import Header from '../header'
import RandomPlanet from '../random-planet'
import SwapiService from "../../services/swapi-service"
import ErrorBoundry from "../error-boundry"
import { SwapiServiceProvider} from '../swapi-service-context/swapi-service-context'
import {PersonPage, PlanetPage, StarshipPage } from "../pages"

import './app.css'

import { Routes, Route } from "react-router-dom"
import StarshipDetails from "../sw-components/starship-details"


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
        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                   
                        <div className="stardb-app">
                            <Header/>
                            {planet}
                            <button className="toggle-planet btn btn-warning btn-lg"
                                onClick={this.toggleRandomPlanet}>
                                Toggle Random Planet
                            </button>
                            <Routes>
                                <Route path="/" element={<h2>Welcome to StarDB</h2>}/>
                                
                                <Route path="/people" element={<h2>People</h2>}/>
                                <Route path="/people" element={<PersonPage/>}/>
                                <Route path="/planets" element={ <PlanetPage/> }/>
                                <Route path="/starships" element={ <StarshipPage/> } />
                                <Route path="/starships/:id"  element={<StarshipDetails/>}/>
                            </Routes>
                        </div>
                </SwapiServiceProvider>  
            </ErrorBoundry>
        );
    } 
};