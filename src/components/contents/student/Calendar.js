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
                                        src="https://calendar.google.com/calendar/embed?&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FWarsaw&amp;src=a2FsZW5kYXJ6LnBzcC41QGdtYWlsLmNvbQ&amp;src=cGwucG9saXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%234285F4&amp;color=%23D81B60&amp;showCalendars=0&amp;showTitle=0&amp;showDate=1&amp;showPrint=0&amp;showTabs=0&amp;showTz=0&amp;mode=MONTH"
                                        title={"Month Calendar"}
                                        frameBorder="0"
                                        style={{border: "solid 3px", borderRadius: ".5em", margin: "1em"}}
                                        height={"800px"}
                                        scrolling="no"/>
                                    :
                                    <iframe
                                        src="https://calendar.google.com/calendar/embed?&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FWarsaw&amp;src=a2FsZW5kYXJ6LnBzcC41QGdtYWlsLmNvbQ&amp;src=cGwucG9saXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%234285F4&amp;color=%23D81B60&amp;showCalendars=0&amp;showTitle=0&amp;showDate=1&amp;showPrint=0&amp;showTabs=0&amp;showTz=0&amp;mode=AGENDA"
                                        title={"Agenda Calendar"}
                                        frameBorder="0"
                                        style={{border: "solid 3px", borderRadius: ".5em", margin: "1em"}}
                                        height={"800px"}
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