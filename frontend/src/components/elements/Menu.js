import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";
import Submenu from "./Submenu"
import { ReactComponent as IconHome } from '../../images/home.svg';
import { ReactComponent as IconSearch } from '../../images/search.svg';

export class Menu extends Component {
    state = {
        barItems: [],
        isLoaded: false,
        width:  0
    }

    updateDimensions() {
        if(window.innerWidth < 500) {
            this.setState({ width: 450, height: 102 });
        } else {
            let update_width  = window.innerWidth-100;
            this.setState({ width: update_width});
        }
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
        axios.get("/wp-json/menus/v1/menus/main-menu")
            .then(res => this.setState({
                barItems: res.data.items,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        const {barItems, isLoaded} = this.state;

        if(isLoaded) {
            if(this.state.width > 1060) {
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
                                    <div>
                                        <NavLink to={barItem.url} activeClassName={"menu-item-active"}>
                                            <li className={"menu-item"}>
                                                <div>{barItem.title}</div>
                                            </li>
                                        </NavLink>
                                        <Submenu key={index} barItem={barItem} barItemNo={index} />
                                    </div>
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
        }
        if(this.props.open) {
            return (
                <div id={"side-menu"}>
                    {
                        barItems.map((barItem, index) => {
                            return (
                                <div>
                                    <NavLink to={barItem.url} activeClassName={"menu-item-active"}>
                                        <li className={"side-menu-item"}>
                                            <div>{barItem.title}</div>
                                        </li>
                                    </NavLink>
                                    <Submenu key={index} barItem={barItem} barItemNo={index}/>
                                </div>
                            );
                        })
                    }
                </div>
            );
        }

        return null;
    }
}

export default Menu;