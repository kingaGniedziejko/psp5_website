import React, {Component} from "react";
import Spinner from "../elements/Spinner";
import WindowSizeListener from 'react-window-size-listener'


export class SectionImage extends Component {
    state = {
        isLoaded: false,
        image: "",
        url: ""
    }

    getImageUrl(width)  {
        const image = this.state.image
        if(width < 512)
            return image.sizes["header_small"];
        if(width < 1024)
            return image.sizes["header_medium"];
        if(width < 1536)
            return image.sizes["header_large"];
        if(width < 2048)
            return image.sizes["header_very_large"];
        return image.url
    }

    componentDidMount() {
        this.setState({
            image: this.props.image,
            isLoaded: true,
            url: this.getImageUrl(2048)
        })
    }


    render() {
        const {isLoaded, url} = this.state;
        if(isLoaded) {
            return(
                <WindowSizeListener onResize={(windowSize) => {
                    this.setState({
                        url: this.getImageUrl(windowSize.windowWidth)
                    })
                }}>
                    <div className={`photo ${this.props.type}`} style={{backgroundImage: `url(${url})`}}/>
                </WindowSizeListener>
            )
        }
        return (
            <Spinner />
        );
    }
}

export default SectionImage;