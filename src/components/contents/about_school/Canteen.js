import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import axios from "axios";
import Helmet from "react-helmet";
import SectionImage from "../../elements/SectionImage";


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
        text = text.replace(/\s+:/g, ':')
        text = text.replace(/\s+/g, ' ')
        text = text.replace(/\s*\(\s/g, ' (')
        text = text.replace(/[,\s]\)\s*/g, ') ')
        text = text.replace(/\s*,(?=[^\s])/g, ', ')
        text = text.replace(/\s*-(?=[^\s])/g, ' - ')

        let weekdays = ["PONIEDZIAŁEK", "WTOREK", "ŚRODA", "CZWARTEK", "PIĄTEK"]
        let dayMenus = []
        text = text.split(weekdays[0])
        text = text[1]

        for(let day=1; day<6; day++ ) {
            text = text.split(weekdays[day])
            dayMenus.push(text[0])
            if(text.length > 1)
                text = text[1]
        }
        return dayMenus
    }


    render() {


        if(this.state.isLoaded) {
            let weekdays = ["PONIEDZIAŁEK", "WTOREK", "ŚRODA", "CZWARTEK", "PIĄTEK"]

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
                        <div className={"section-container centered"}>
                            {
                                menus.map(menu =>
                                    menu.content.map((day, index) =>
                                        <div>
                                            <h1>{weekdays[index]}</h1>
                                            <div dangerouslySetInnerHTML={{__html: day}}/>

                                        </div>
                                    )
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