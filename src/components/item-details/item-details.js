import React from "react";
import './item-details.css';
// import Spinner from "../spinner/spinner";
// import ItemDetails from ".";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Record = ({item, field, label}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li> 
    )
}
export {Record};

// export default class ItemDetails extends Component {
//     state = {
//         item: null,
//         loading: true,
//         image: null
//     }
//     componentDidMount() {
//         this.updateItem(); 
//     }   
//     componentDidUpdate(prevProps) {
//         if(this.props.itemId !== prevProps.itemId) {
//             this.updateItem();
//         }
//     }
//     updateItem () {
//         const { itemId, getData, getImageUrl } = this.props;
//         if(!itemId) {
//             return;
//         }
//         getData(itemId)
//             .then((item) =>{
//                 this.setState({
//                     item,
//                     loading: false,
//                     image: getImageUrl(item)
//                 })
//             } )
//     }
//     render() {
//         if(!this.state.item) {
//             return <span>Select a person from a list</span>
//         }
//         if(this.state.loading) {
//             return <Spinner/>
//         }
//         const { item, image } = this.state;
//         const {name} = item;
//         return (
//             <div className="item-details card">
//                 <img className="item-image" alt="avatar"
//                     src={image}/>
                
//                 <div className="card-body">
//                     <h4>{name}</h4>
//                     <ul className="list-group list-group-flush">
//                         {React.Children.map(this.props.children,(child) => {
//                             return React.cloneElement(child, {item});
//                         })}
//                     </ul>
//                 </div>
//             </div>
//         )
//     }
// }

const ItemDetails = (props) => {
    
    const {id} = useParams();
    
    const [image, setImage] = useState(null);
    const [item, setItem] = useState(null);
    const { getData, getImageUrl } = props;   
    

    useEffect(() => {
        
        getData(id)
            .then(item => {
                setItem(item)
                setImage(getImageUrl(item))
            })
    }, [id]);

    
    if(!item) {
        return (
            <span>Select a person from a list</span>
        )
    }


    const {name} = item;
    return (
        <div className="item-details card">
            <img className="item-image" alt="avatar"
                src={image}/>
                
            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {React.Children.map(props.children,(child) => {
                            return React.cloneElement(child, {item});
                    })}
                </ul>
            </div>
        </div>
    )
}

export {ItemDetails};