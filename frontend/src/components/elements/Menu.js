import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";
import axios from "axios";
import Submenu from "./Submenu"
import { ReactComponent as IconHome } from '../../images/home.svg';
import { ReactComponent as IconSearch } from '../../images/search.svg';

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
                <ul id={"menu"}>
                    <NavLink to={"/"} exact activeClassName={"menu-item-active"}>
                        <li className={"menu-item"} >
                            <div><IconHome /></div>
                        </li>
                    </NavLink>

                    {
                        barItems.map((barItem, index) => {
                            return (
                                <NavLink to={barItem.url} activeClassName={"menu-item-active"}>
                                    <li className={"menu-item"}>
                                        <div>{barItem.title}</div>
                                        <Submenu key={index} barItem={barItem} barItemNo={index} />
                                    </li>
                                </NavLink>

                            );
                        })
                    }

                    <a href={"#"} onClick={console.log("search")}>
                        <li className={"menu-item"}>
                            <div><IconSearch /></div>
                        </li>
                    </a>
                </ul>
            );
        }
        return <h3>...</h3> ;
    }
}

export default Menu;