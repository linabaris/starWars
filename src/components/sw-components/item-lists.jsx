import withData from "../hoc-helper/with-data"
import ItemList from "../item-list/item-list"
import withSwapiService from "../hoc-helper/with-swapi-service"

const withChildFunction = (Wrapped, fn) => {
    return(props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
}
const renderName = ({name}) => <span>{name}</span>;

const renderNameAndModel = ({ name, model }) => <span>{ name } ({ model })</span>

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    }
}
const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    }
}
const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    }
}

const PersonList = withSwapiService(
                    withData(
                        withChildFunction(ItemList,renderName)), 
                    mapPersonMethodsToProps);
const PlanetList = withSwapiService(
                    withData(
                        withChildFunction(ItemList, renderName)), 
                        mapPlanetMethodsToProps);
const StarshipList = withSwapiService(
                        withData(
                            withChildFunction(ItemList, renderNameAndModel)), 
                            mapStarshipMethodsToProps);

export {
    PersonList, 
    PlanetList, 
    StarshipList
};