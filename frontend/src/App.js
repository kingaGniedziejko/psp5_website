import React from 'react';
import {Header} from './components/layouts/Header';
import {Content} from './components/layouts/Content';
import {Footer} from './components/layouts/Footer';

export const App = function() {
    return (
        <div id={"container"}>
            <Header />
            <Content />
            <Footer />
        </div>
    );
}