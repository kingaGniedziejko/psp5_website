import React, {Component} from "react";
import {Link} from "react-router-dom";
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
            console.log(barItems);
            return (
                <ul id={"menu"}>
                    <li className={"menu-item"}>
                        <Link to={"/"}>
                            <IconHome />
                        </Link>
                    </li>

                    {
                        barItems.map((barItem, index) => {
                            return (
                                <Link to={barItem.url}>
                                    <li className={"menu-item"}>
                                        <div>{barItem.title}</div>
                                        <Submenu key={index} barItem={barItem} barItemNo={index} />
                                    </li>
                                </Link>
                            );
                        })
                    }

                    <li className={"menu-item"}>
                        <a href={"#"} onClick={console.log("search")}>
                            <IconSearch />
                        </a>
                    </li>
                </ul>
            );
        }
        return <h3>...</h3> ;
    }
}

export default Menu;