import React, {Component} from "react";
import { Helmet } from 'react-helmet'
import Shortcuts from "../elements/Shortcuts";
import PostDisplay from "../elements/PostDisplay";
import {Link} from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Spinner from "../elements/Spinner";
import AchievementsGallery from "../elements/AchievementsGallery";
import SectionImage from "../elements/SectionImage";



export class HomePage extends Component {
    state = {
        isLoaded: false,
        title: global.config.mainTitle + " Strona główna",
        postCategory: "komunikaty",
        postCount: 3,
        width: 0,
        achievements: [],
        shortcutElements: [
            {
                title: "Kontakt",
                path: "/kontakt"
            },
            {
                title: "Rekrutacja",
                path: "/rekrutacja"
            },
            {
                title: "Spacer po szkole",
                path: "/o-szkole/spacer-po-szkole"
            },
            {
                title: "Kalendarz",
                path: "/uczen/kalendarz"
            }
        ]
    }

    componentDidMount() {
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=home-page"
        //TODO: lepsze zabezpieczenie tego

        axios.get(contentUrl)
            .then(res => this.setState({
                content: res.data[0].acf,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }


    render() {
        const {isLoaded, width, title, postCategory, postCount, shortcutElements} = this.state;

        if(isLoaded) {
            const sections = this.state.content.sections
            const photo1 = sections[0].images[0].image
            const photo2 = sections[1].images[0].image
            const hShortcut = sections[0].lonely_headers[0].text
            const hAnnouncements= sections[1].lonely_headers[0].text


            return (
                <div className={"content"}>
                    {/*<WindowSizeListener onResize={(windowSize) => this.setState({width: windowSize.windowWidth})} />*/}
                    <Helmet>
                        <title>{title}</title>
                    </Helmet>
                    <div className={"section"}>
                        <SectionImage image={photo1}/>
                        <div className={"section-container"}>
                            <h1 dangerouslySetInnerHTML={{__html: hShortcut}}/>
                            <Shortcuts elements={shortcutElements}/>
                        </div>
                    </div>
                    <div className={"section section-2"}>
                        <SectionImage image={photo2}/>
                        <div className={"section-container"}>
                            <h1 dangerouslySetInnerHTML={{__html: hAnnouncements}}/>
                            <PostDisplay postCategories={[postCategory]} postsCount={postCount} />
                            <Link to={"/aktualnosci/komunikaty"}><button className={"button-accent-1"}>Czytaj więcej</button></Link>
                        </div>

                    </div>

                    <div className={"section grey"}>
                        <h1>Nasze osiągnięcia</h1>
                        <div className={"slider-container"}>
                            <AchievementsGallery />
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

export default HomePage;