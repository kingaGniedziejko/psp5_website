import React, {Component} from "react";

export class NavigationBarItem extends Component {

    render() {
        const {barItem} = this.props;

        return <div className={"navigation-bar-item"}> {barItem.title} </div>;
    }
}

export default NavigationBarItem;