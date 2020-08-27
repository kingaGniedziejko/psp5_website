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
                                        src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FWarsaw&amp;src=cHNwLm5yLjUub3BvbGVAZ21haWwuY29t&amp;src=cGwucG9saXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23F6BF26&amp;color=%23D50000&amp;showTitle=0&amp;showPrint=0&amp;showTz=0&amp;showCalendars=0"
                                        title={"Month Calendar"}
                                        frameBorder="0"
                                        style={{border: "solid 3px", borderRadius: ".5em", margin: "1em"}}
                                        height={"800px"}
                                        scrolling="no"/>
                                    :
                                    <iframe
                                        src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FWarsaw&amp;src=cHNwLm5yLjUub3BvbGVAZ21haWwuY29t&amp;src=cGwucG9saXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23F6BF26&amp;color=%23D50000&amp;showTitle=0&amp;showPrint=0&amp;showTz=0&amp;showCalendars=0&amp;mode=AGENDA&amp;showTabs=0"
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