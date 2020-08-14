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

export class HomePage extends Component {
    state = {
        isLoaded: false,
        title: global.config.mainTitle + " Strona główna",
        postCategory: "komunikaty",
        postCount: 3,
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
        let achievementsUrl = global.config.proxy + "/wp-json/wp/v2/achievements"
        //TODO: lepsze zabezpieczenie tego

        axios.get(achievementsUrl)
            .then(res => this.setState({
                achievements: res.data,
                isLoaded: true
            }, () => {
                console.log(this.state.achievements)

            }))
            .catch(err => console.log(err));
    }


    render() {
        const {isLoaded, title, postCategory, postCount, shortcutElements} = this.state;

        if(isLoaded) {
            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{title}</title>
                    </Helmet>
                    <div className={"section section-1"}>
                        <div className={"photo photo-1 photo-main"}/>
                        <h1>Na skróty</h1>
                        <Shortcuts elements={shortcutElements}/>
                    </div>
                    <div className={"section section-2"}>
                        <div className={"photo photo-2"}/>
                        <h1>Komunikaty</h1>
                        <PostDisplay postCategories={[postCategory]} postsCount={postCount} />
                        <Link to={"/aktualnosci/komunikaty"}><button className={"button-accent-1"}>Czytaj więcej</button></Link>
                    </div>

                    <div className={"section"}>
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