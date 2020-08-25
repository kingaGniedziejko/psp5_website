import React, {Component} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Spinner from "../elements/Spinner";
import FullscreenModal from "../elements/FullscreenModal";


export class AchievementsGallery extends Component {
    state = {
        isLoaded: false,
        achievements: [],
        isFullscreenOpen: false,
        image: 0,
        url: ""
    }

    componentDidMount() {
        let achievementsUrl = global.config.proxy + "/wp-json/wp/v2/achievements"
        //TODO: lepsze zabezpieczenie tego

        axios.get(achievementsUrl)
            .then(res => this.setState({
                achievements: res.data,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    openFullscreen(achievement) {
        this.setState({
            isFullscreenOpen: true,
            image: achievement.acf.image.sizes.large,
            url: achievement.acf.url
        })
    }

    closeFullscreen = () => {
        this.setState({
            isFullscreenOpen: false,
            image: 0
        })
    }

    render() {
        var settings = {
            infinite: true,
            speed: 700,
            autoplaySpeed: 4000,
            slidesToShow: 7,
            slidesToScroll: 1,
            autoplay: true,
            swipeToSlide: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        };

        const {isLoaded, isFullscreenOpen, achievements} = this.state;
        if(isLoaded) {
            return(
                <div>
                    <Slider {...settings}>
                        {
                            achievements.map(achievement => { return(
                                <div key={achievement.id}>
                                    <div className={"slider-object-container"}>
                                        <img className={"slider-object"} src={achievement.acf.image.sizes.medium} onClick={() => this.openFullscreen(achievement)}/>
                                    </div>
                                </div>
                            )})
                        }
                    </Slider>
                    {
                        isFullscreenOpen ? <FullscreenModal
                            isOpen={isFullscreenOpen}
                            image={this.state.image}
                            url={this.state.url}
                            closeFullscreen={this.closeFullscreen}/>
                        : ""
                    }
                </div>
            )
        }
        return (
            <Spinner />
        );
    }
}

export default AchievementsGallery;