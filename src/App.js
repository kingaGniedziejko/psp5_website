import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from "axios";

import './styles/style.css';
import './config';

import ScrollToTop from './components/elements/ScrollToTop';
import Header from './components/layouts/Header';
import {Content} from './components/layouts/Content';
import {Footer} from './components/layouts/Footer';

export class App extends Component {
    state = {
        menuItems: [],
        isLoaded: false
    }

    componentDidMount() {
        axios.get(global.config.proxy + "/wp-json/menus/v1/menus/main-menu")
            .then(res => {
                this.setState({
                    menuItems: res.data.items,
                    isLoaded: true
                });
            })
            .catch(err => console.log(err));
    }

    render (){
        const { menuItems, isLoaded } = this.state;

        if (isLoaded){
            global.config.menuItems = menuItems;
            return (
                <BrowserRouter >
                    <div className={"container"}>
                        <ScrollToTop />
                        <Header menuItems={menuItems}/>
                        <Content menuItems={menuItems}/>
                        <Footer />
                    </div>
                </BrowserRouter>
            );
        }
        return "";
    }
}

export default App;