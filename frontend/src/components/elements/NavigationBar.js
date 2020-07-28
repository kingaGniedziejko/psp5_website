import React, {Component} from "react";
import axios from "axios";
import NavigationBarItem from "../elements/NavigationBarItem"

export class NavigationBar extends Component {
    state = {
        barItems: [],
        isLoaded: false
    }

    componentDidMount() {
        const getBarItems = axios.get("/wp-json/menus/v1/menus/main-menu");

        Promise.all([getBarItems])
            .then(res => this.setState({
                posts: res[0].items.data,
                isLoaded: true
            }))
            .catch(err => console.log(err));
        
    }

    render() {
        let {barItems, isLoaded} = this.state;

        if(isLoaded){
            console.log(barItems);
            return (
                <div className={"posts-container"}>
                    {barItems.map((barItem, index) => {
                        return <NavigationBarItem key={barItem.id} barItem={barItem} barItemNo={index} />;
                    })}
                </div>
            );
        }
        return <h3>...</h3> ;
    }
}

export default NavigationBar;