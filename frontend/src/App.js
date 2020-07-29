import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/style.css';
import {Header} from './components/layouts/Header';
import {Content} from './components/layouts/Content';
import {Footer} from './components/layouts/Footer';

export const App = function() {
    return (
        <div className={"container"}>
            <BrowserRouter>
                <Header />
                <Content />
                <Footer />
            </BrowserRouter>
        </div>
    );
}