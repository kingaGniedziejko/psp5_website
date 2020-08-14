import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import {NavLink} from "react-router-dom";
import axios from "axios";
import Helmet from "react-helmet";
import Moment from "react-moment";
import SectionImage from "../../elements/SectionImage";


export class ParentsCouncil extends Component {
    state = {
        title: "Spotkania z rodzicami",
        content: [],
        isLoaded: false
    }

    componentDidMount() {
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=parents-meetings"
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

            const hMeetings = sections[0].modules[0].header
            const tMeetings = sections[0].modules[0].text

            const tCalendar = sections[0].modules[1].text
            const link = sections[0].links[0].link

            const dates = this.state.content.dates

            let key = 0;

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>

                    <div className={"section"}>
                        <SectionImage image={photo}/>

                        <div className={"section-container centered"} id={""}>
                            <h1 dangerouslySetInnerHTML={{__html: hMeetings}}/>
                            <div dangerouslySetInnerHTML={{__html: tMeetings}}/>
                            {
                                dates.map(date => {return <Moment key={key++} locale={"pl"} format="D MMMM YYYYr.">{date.date}</Moment>})
                            }

                            <div className={"spacer"}/>

                            <div dangerouslySetInnerHTML={{__html: tCalendar}}/>
                            <NavLink to={link.url}>
                                <button className={"button-accent-2"}>
                                    {link.title}
                                </button>
                            </NavLink>

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

export default ParentsCouncil;