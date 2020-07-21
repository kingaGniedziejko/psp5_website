import React from 'react';
import './styles/style.css';
import {Header} from './components/layouts/Header';
import {Content} from './components/layouts/Content';
import {Footer} from './components/layouts/Footer';

export const App = function() {
    return (
        <div className={"container"}>
            <Header />
            <Content />
            <Footer />
        </div>
    );
}