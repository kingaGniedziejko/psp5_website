import React, {Component} from "react";
import axios from "axios";
import NavigationBarItem from "../elements/NavigationBarItem"

export class NavigationBar extends Component {
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
                <div className={"menu"}>
                    {barItems.map((barItem, index) => {
                        return <NavigationBarItem key={index} barItem={barItem} barItemNo={index} />;
                    })}
                </div>
            );
        }
        return <h3>...</h3> ;
    }
}

export default NavigationBar;