import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";
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
            return (
                <ul className={"menu"}>
                    <li><NavLink to={"/"} exact className={"menu-item"} activeClassName={"menu-item-active"}>H</NavLink></li>
                        {barItems.map((barItem, index) => {
                            return (
                                <li>
                                    <NavLink to={barItem.url} className={"menu-item"} activeClassName={"menu-item-active"}>{barItem.title}</NavLink>
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