import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import axios from "axios";
import Helmet from "react-helmet";
import SectionImage from "../../elements/SectionImage";
import ReactHtmlParser from 'react-html-parser';
import Moment from "react-moment";


export class Canteen extends Component {
    state = {
        title: "Stołówka",
        content: [],
        menus: [],
        isLoaded: false
    }

    componentDidMount() {
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=canteen"
        let menusUrl = global.config.proxy + "/wp-json/wp/v2/menus"

        let getContent = axios.get(contentUrl);
        let getMenus = axios.get(menusUrl);

        axios.all([getContent, getMenus])
            .then(res => {
                let menus = []

                res[1].data.forEach(menu => {
                    menus.push({key: menu.id, startingDate: menu.acf.starting_date, content: this.fixText(menu.acf.content)})
                })

                this.setState({
                    content: res[0].data[0].acf,
                    menus: menus,
                    isLoaded: true
                });
            })
            .catch(err => console.log(err));
    }

    fixText(originalText) {
        let text = originalText.toString()
        console.log(text)
        text = text.replace(/[ \t]+:/g, ':')
        text = text.replace(/[ \t]+/g, ' ')
        text = text.replace(/[ \t]*\([ \t]/g, ' (')
        text = text.replace(/[, \t]*\)[ \t]*/g, ') ')
        text = text.replace(/[ \t]*,(?=[^ \t])/g, ', ')
        text = text.replace(/[ \t]*-(?=[^ \t])/g, ' - ')
        text = text.replace(/\r\n /g, '\r\n')

        let weekdays = [new RegExp("poniedziałek.*", 'gi'), new RegExp("wtorek.*", 'gi'), new RegExp("środa.*", 'gi'), new RegExp("czwartek.*", 'gi'), new RegExp("piątek.*", 'gi')]
        let dayMenus = []
        // text = JSON.stringify(text)
        text = text.split(weekdays[0])
        text = text[1]

        for(let day=1; day<6; day++ ) {
            text = text.split(weekdays[day])
            text[0] = text[0].trim()
            dayMenus.push(text[0])
            if(text.length > 1)
                text = text[1]
        }
        return dayMenus
    }


    render() {


        if(this.state.isLoaded) {
            let weekdays = ['PONIEDZIAŁEK', 'WTOREK', 'ŚRODA', 'CZWARTEK', 'PIĄTEK']

            const {menus} = this.state

            const sections = this.state.content.sections

            const photo = sections[0].images[0].image

            const hAllergens = sections[0].modules[0].header
            const tAllergens = sections[0].modules[0].text

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>
                    <div className={"section"}>
                        <SectionImage image={photo}/>
                        <div className={"section-container"}>
                            {
                                menus.map((menu) => {
                                        return (
                                            <details>
                                                <summary>
                                                    <Moment locale={"pl"} format="DD MMMM">{menu.startingDate}</Moment> - <Moment locale={"pl"} format="DD MMMM">{menu.startingDate}</Moment>
                                                </summary>
                                                {
                                                    menu.content.map((day, index) =>
                                                        <div>

                                                            <h1><Moment locale={"pl"} format="dddd" add={{days: index}}>{menu.startingDate}</Moment></h1>
                                                            <div style={{whiteSpace: "pre-wrap"}}
                                                                 dangerouslySetInnerHTML={{__html: day}}/>
                                                        </div>
                                                    )}
                                            </details>
                                        )
                                    }

                                )
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

export default Canteen;