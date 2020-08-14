import React, {Component} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Spinner from "../elements/Spinner";
import {ReactComponent as IconCross} from "../../images/cross.svg";
import {NavLink} from "react-router-dom";

export class FullscreenModal extends Component {
    state = {
        isLoaded: false,
        image: 0,
    }

    componentDidMount() {
        this.setState({
            image: this.props.image,
            url: this.props.url,
            isLoaded: true
        })
    }

    render() {
        const {image, url, isLoaded} = this.state;

        if (isLoaded) {
            return (
                <div className={"fullscreen-container"}>
                    <img src={image}/>
                    <div className="image-button" id={"close-button"}>
                        <IconCross onClick={this.props.closeFullscreen}/>
                    </div>
                    {
                        url !== undefined ?
                            <a href={url.url} rel="noopener noreferrer" target="_blank">
                                <button className={"button-accent-2"}>
                                    Szczegóły
                                </button>
                            </a>
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

export default FullscreenModal;