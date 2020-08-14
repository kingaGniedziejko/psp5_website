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
        if(width < 768)
            return image.sizes["medium_large"];
        if(width < 1024)
            return image.sizes["large"];
        if(width < 1536)
            return image.sizes["1536x1536"];
        if(width < 2048)
            return image.sizes["2048x2048"];
        return image
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
                    <div className={"photo"} style={{backgroundImage: `url(${url})`}}/>
                </WindowSizeListener>
            )
        }
        return (
            <Spinner />
        );
    }
}

export default SectionImage;