export default class SwapiService {

    _apiBase = 'https://swapi.dev/api';
  
    async getResource (url) {
      const response = await fetch(`${this._apiBase}${url}`);

      if(!response.ok) {
        throw new Error (`Could not fetch ${url}, received ${response.status}`)
      }
      return await response.json();
    }
  
    async getAllPeople() {
      const res = await this.getResource(`/people/`)
      return res.results.map(this._transformPerson);
    }
  
    async getPerson(id) {
      const person = await this.getResource(`/people/${id}/`);
      return this._transformPerson(person);
    }
  
    async getAllPlanets() {
      const res = await this.getResource(`/planets/`)
      return res.results.map(this._transformPlanet);
    }
  
    async getPlanet(id) {
      const planet = await this.getResource(`/planets/${id}/`);
      return this._transformPlanet(planet);      
    }
  
    async getAllStarships() {
      const res = await this.getResource(`/starships/`)
      return res.results.map(this._transformStarship);
    }
  
    async getStarship(id) {
      const starship = await this.getResource(`/starships/${id}/`);
      return this._transformStarship(starship);
    }

    extraxtId = (item) => {
      const idRegExp = /\/([0-9]*)\/$/;
      const id = item.url.match(idRegExp)[1];
      return id;
    }

    _transformPlanet = (planet) => {
      return {
        id: this.extraxtId(planet),
        name: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.diameter,
      }
    }

    _transformStarship = (starship) => {
      return {
        id: this.extraxtId(starship),
        name: starship.name,
        model:starship.model,
        manufacturer: starship.manufacturer,
        costInCredits: starship.costInCredits,
        length: starship.length,
        crew: starship.crew,
        passengers: starship.passengers,
        cargoCapacity: starship.cargoCapacity
      }
    }

    _transformPerson =(person) => {
      return {
        id: this.extraxtId(person),
        name: person.name,
        gender: person.gender,
        birthYear: person.birthYear,
        eyeColor: person.eyeColor,
      }
    }
}
  