import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import Attachment from "../../elements/Attachment"

import "../../../styles/library_style.css"
import axios from "axios";
import Helmet from "react-helmet";
import '../../../config';
import SectionImage from "../../elements/SectionImage";



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

        if(this.state.isLoaded) {
            const sections = this.state.content.sections

            const photo = sections[0].images[0].image
            const hCalendar = sections[0].lonely_headers[0].text

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>
                    <div className={"section"}>
                        <SectionImage image={photo}/>
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