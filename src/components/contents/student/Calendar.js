import React, {Component} from "react";
import Spinner from "../../elements/Spinner"

import "../../../styles/library_style.css"
import Helmet from "react-helmet";
import '../../../config';
import WindowSizeListener from "react-window-size-listener";
import PageContent from "../../elements/PageContent";


export class Library extends Component {
    state = {
        title: "Kalendarz",
        page: undefined,
        width: 2048,
        isLoaded: false
    }

    componentDidMount() {
        this.setState({
            page: this.props.page,
            isLoaded: true
        })
    }

    render() {
        const {isLoaded, page} = this.state

        if(isLoaded) {

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>

                    <PageContent page={page}/>

                    <section>
                        <WindowSizeListener onResize={(windowSize) => {
                            this.setState({
                                width: windowSize.windowWidth
                            })
                        }}/>
                        <div className={"section-content centered"}>
                            {
                                this.state.width > 700 ?

                                    <iframe
                                        src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FWarsaw&amp;src=Z29iMW1qM2l1OWp2a2o5YmlrYXA5bnVtMTBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%234285F4&amp;showTitle=0&amp;showPrint=0;mode=MONTH"
                                        title={"Month Calendar"}
                                        frameBorder="0"
                                        style={{border: "solid 3px", borderRadius: ".5em", margin: "1em"}}
                                        height={"800px"}
                                        scrolling="no"/>
                                    :
                                    <iframe
                                        src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FWarsaw&amp;src=Z29iMW1qM2l1OWp2a2o5YmlrYXA5bnVtMTBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%234285F4&amp;showTitle=0&amp;showPrint=0&amp;mode=AGENDA&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0"
                                        title={"Agenda Calendar"}
                                        frameBorder="0"
                                        style={{border: "solid 3px", borderRadius: ".5em", margin: "1em"}}
                                        height={"400px"}
                                        scrolling="no"/>
                            }
                        </div>

                    </section>
                </div>
            );
        }
        return (
            <Spinner />
        );
    }
}

export default Library;