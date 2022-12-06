import React, {Component} from "react";
import './item-details.css';
import ErrorButton from '../error-button'
import Spinner from "../spinner/spinner";

const Record = ({item, field, label}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li> 
    )
}
export {
    Record
};

export default class ItemDetails extends Component {
    state = {
        item: null,
        loading: true,
        image: null
    }
    componentDidMount() {
        this.updateItem();
    }
    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }
    updateItem () {
        const { itemId, getData, getImageUrl } = this.props;
        if(!itemId) {
            return;
        }
        getData(itemId)
            .then((item) =>{
                this.setState({
                    item,
                    loading: false,
                    image: getImageUrl(item)
                })
            } )
    }
    render() {
        if(!this.state.item) {
            return <span>Select a person from a list</span>
        }
        if(this.state.loading) {
            return <Spinner/>
        }
        const { item, image } = this.state;
        const {name, gender, birthYear, eyeColor} = item;
        return (
            <div className="item-details card">
                <img className="item-image" alt="avatar"
                    src={image}/>
                
                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {React.Children.map(this.props.children,(child) => {
                            return React.cloneElement(child, {item});
                        })}
                    </ul>
                    <ErrorButton/>
                </div>
            </div>
        )
    }
}