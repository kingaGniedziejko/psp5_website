import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import ReactDOM from 'react-dom';
import Submenu from "./Submenu"


export class SideMenu extends Component {
    state = {
        open: false
    }
    componentDidMount() {
        this.setState({
            open: this.props.open
        })
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = event => {
        const domNode = ReactDOM.findDOMNode(this);
        if (!domNode || !domNode.contains(event.target)) {
            this.setState({
                open: false
            })
            this.props.mutateState(false);
        }
    }

    render() {

        const {menuItems} = this.props;


        return (
            <>

                <ul id={"side-menu"} style={this.state.open ? {animationName: 'slide-in'} : {animationName: 'slide-out'}}>
                    <div>
                        <li className={"side-menu-item"} >
                            <NavLink to={"/"} exact activeClassName={"menu-item-active"}>
                                <div>Strona główna</div>
                            </NavLink>
                        </li>
                    </div>

                    {
                        menuItems.map((menuItem, index) => {
                            return (
                                <div key={index}>
                                    <li className={"side-menu-item"}>
                                        <NavLink to={menuItem.url} activeClassName={"menu-item-active"}>
                                            <div>{menuItem.title}</div>
                                        </NavLink>
                                        <Submenu menuItem={menuItem}/>
                                    </li>
                                </div>
                            );
                        })
                    }
                </ul>
            </>
        );
    }
}

export default SideMenu;