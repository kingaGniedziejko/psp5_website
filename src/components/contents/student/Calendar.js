import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import Attachment from "../../elements/Attachment"

import "../../../styles/library_style.css"
import axios from "axios";
import Helmet from "react-helmet";
import '../../../config';



export class Library extends Component {
    state = {
        title: "Kalendarz",
        content: [],
        isLoaded: false
    }

    componentDidMount() {
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=calendar"
        //TODO: lepsze zabezpieczenie tego

        axios.get(contentUrl)
            .then(res => this.setState({
                content: res.data[0].acf,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    render() {
        const photo1 = this.state.content.photo_1 !== undefined ? this.state.content.photo_1 : "";
        const hCalendar = this.state.content.header_1 !== undefined ? this.state.content.header_1 : "";

        if(this.state.isLoaded) {
            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>
                    <div className={"section"}>
                        <div className={"photo-static"} style={{backgroundImage: `url(${photo1})`}}/>
                        <div className={"section-container centered"}>

                        <h1 dangerouslySetInnerHTML={{__html: hCalendar}}/>

                            {
                                !global.config.isMobile ?
                                <iframe
                                    src="https://calendar.google.com/calendar/embed?&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FWarsaw&amp;src=a2FsZW5kYXJ6LnBzcC41QGdtYWlsLmNvbQ&amp;src=cGwucG9saXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%234285F4&amp;color=%23D81B60&amp;showCalendars=0&amp;showTitle=0&amp;showDate=1&amp;showPrint=0&amp;showTabs=0&amp;showTz=0&amp;mode=MONTH"
                                    frameBorder="0"
                                    style={{border: "solid 3px", borderRadius: ".5em", margin: "1em"}}
                                    height={"800px"}
                                    scrolling="no"/>
                                :
                                <iframe
                                    src="https://calendar.google.com/calendar/embed?&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FWarsaw&amp;src=a2FsZW5kYXJ6LnBzcC41QGdtYWlsLmNvbQ&amp;src=cGwucG9saXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%234285F4&amp;color=%23D81B60&amp;showCalendars=0&amp;showTitle=0&amp;showDate=1&amp;showPrint=0&amp;showTabs=0&amp;showTz=0&amp;mode=AGENDA"
                                    frameBorder="0"
                                    style={{border: "solid 3px", borderRadius: ".5em", margin: "1em"}}
                                    height={"800px"}
                                    scrolling="no"/>
                            }

                        </div>
                    </div>
                </div>
            );
        }
        return (
            <Spinner />
        );
    }
}

export default Library;