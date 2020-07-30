import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/style.css';
import Header from './components/layouts/Header';
import {Content} from './components/layouts/Content';
import {Footer} from './components/layouts/Footer';
import axios from "axios";

export class App extends Component {
    state = {
        menuItems: [],
        isLoaded: false
    }

    componentDidMount() {
        axios.get("/wp-json/menus/v1/menus/main-menu")
            .then(res => this.setState({
                menuItems: res.data.items,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render (){
        const { menuItems, isLoaded } = this.state;
        console.log(isLoaded);
        if (isLoaded){
            return (
                <div className={"container"}>
                    <BrowserRouter>
                        <Header menuItems={menuItems}/>
                        <Content menuItems={menuItems}/>
                        <Footer />
                    </BrowserRouter>
                </div>
            );
        }
        return "";
    }
}

export default App;