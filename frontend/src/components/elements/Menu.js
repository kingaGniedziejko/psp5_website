import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Submenu from "./Submenu"

export class Menu extends Component {
    state = {
        barItems: [],
        isLoaded: false
    }

    componentDidMount() {
        axios.get("/wp-json/menus/v1/menus/main-menu")
            .then(res => this.setState({
                barItems: res.data.items,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {
        const {barItems, isLoaded} = this.state;

        if(isLoaded){
            console.log(barItems);
            return (
                <ul className={"menu"}>
                    <li><Link to={"/"}>H</Link></li>
                        {barItems.map((barItem, index) => {
                            return (
                                <li>
                                    <Link to={barItem.url}>{barItem.title}</Link>
                                    <Submenu key={index} barItem={barItem} barItemNo={index} />
                                </li>
                            );
                        })}
                    <li><a href={"#"} onClick={console.log("search")}>S</a></li>
                </ul>
            );
        }
        return <h3>...</h3> ;
    }
}

export default Menu;