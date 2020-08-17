import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import axios from "axios";
import Helmet from "react-helmet";
import SectionImage from "../../elements/SectionImage";
import "../../../styles/walk_style.css"
import {CSSTransition} from "react-transition-group";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import {NavLink} from "react-router-dom";
import {isMobile} from 'react-device-detect';



export class Walk extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        title: "Spacer po szkole",
        content: [],
        hoveredName: "",
        hoveredId: "",
        areas: [],
        selectedArea: "",
        images: [],
        isLoaded: false
    }

    componentDidMount() {
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=walk"

        axios.get(contentUrl)
            .then(res => this.setState({
                content: res.data[0].acf,
                areas: res.data[0].acf.areas,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    handleMouseOver = (e) => {
        this.setState({
            hoveredName: e.target.getAttribute('name'),
            hoveredId: e.target.getAttribute('id')
        })
    }

    handleClicked = (e) => {
        if(this.state.selectedArea !== "" && this.state.selectedArea.id !== e.target.getAttribute('id')) {
            document.getElementById(this.state.selectedArea.id).classList.remove("clicked");
        }
        let selected = this.state.areas.find(area => area.id === e.target.getAttribute('id'))
        if(!selected) return
        if(selected === this.state.selectedArea) return
        let images = []
        if(selected.images)
            selected.images.map(image => {
                images.push({
                    fullscreen: image.image.url,
                    original: image.image.sizes.large,
                    thumbnail: image.image.sizes.thumbnail
                })
            })
        this.setState({
            selectedArea: selected,
            images: images
        })
        if(true) {
            document.getElementById(selected.id).classList.add("clicked");
        }
    }

    handleMouseOut = () => {
        this.setState({
            hoveredName: "",
            hoveredId: ""
        })
    }



    render() {
        const {images, selectedArea, hoveredName} = this.state

        if(this.state.isLoaded) {
            const sections = this.state.content.sections

            const interactivePhoto = sections[0].images[1].image

            const header = sections[0].lonely_headers[0].text

            return (
                <div className={"content photoless-content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>
                    <div className={"section"}>
                        <div className={"section-container"}>
                            <h1 dangerouslySetInnerHTML={{__html: header}}/>
                            <div className={"interactive-photo-container"}>
                                <img src={interactivePhoto.url}/>

                                <svg id="outlines" width="3071" height="2128" viewBox="0 0 3071 2128">
                                        <path id="stolowka" onClick={(e) => this.handleClicked(e)}
                                              onMouseOver={(e) => this.handleMouseOver(e)}
                                              onMouseOut={() => this.handleMouseOut()} name={"Stołówka"}
                                              d="M6.889-.61,446.218-32.845l25.8,576.522-477.8,6.773Z"
                                              transform="translate(1747.691 1101.436) rotate(30)"/>
                                        <path id="boisko_tartanowe" onClick={(e) => this.handleClicked(e)}
                                              onMouseOver={(e) => this.handleMouseOver(e)}
                                              onMouseOut={() => this.handleMouseOut()} name={"Boisko tartanowe"}
                                              d="M152.643-119.662,470.394-12.449,514.447,327.9,254.1,268.588l-35.948,49.727-34.765.834Z"
                                              transform="matrix(0.485, -0.875, 0.875, 0.485, 472.805, 446.542)"/>
                                        <path id="sala_gimnastyczna" onClick={(e) => this.handleClicked(e)}
                                              onMouseOver={(e) => this.handleMouseOver(e)}
                                              onMouseOut={() => this.handleMouseOut()} name={"Sala gimnastyczna"}
                                              d="M6.889-.61l313.7-38.022L268.925,283.4l64.262,45.811L-8.3,347.42l-51.2-37.346Z"
                                              transform="translate(1042.691 115.436) rotate(30)"/>
                                        <path id="basen" onClick={(e) => this.handleClicked(e)}
                                              onMouseOver={(e) => this.handleMouseOver(e)}
                                              onMouseOut={() => this.handleMouseOut()} name={"Basen"}
                                              d="M5.275-83.529l-14.663-25.4L40.484-227.618,353.541-271.3,313.761-160.11l12.43,37.523L287.244,199.782l46.914,49.228-193.438,21.6L134.554,327,.094,351.8l-59.6-41.731Z"
                                              transform="translate(1341.691 268.436) rotate(30)"/>
                                        <path id="amfiteatr" onClick={(e) => this.handleClicked(e)}
                                              onMouseOver={(e) => this.handleMouseOver(e)}
                                              onMouseOut={() => this.handleMouseOut()} name={"Amfiteatr"}
                                              d="M6.889-.61l853.624-14.7L825.974,397.4,519.637,378.2s-42.37,326.487-290.39,302.3S40.982,354.415,40.982,354.415l-81.925-7.573Z"
                                              transform="translate(642.691 1325.436) rotate(30)"/>
                                        <path id="boisko" onClick={(e) => this.handleClicked(e)}
                                              onMouseOver={(e) => this.handleMouseOver(e)}
                                              onMouseOut={() => this.handleMouseOut()} name={"Boisko"}
                                              d="M6.889-.61,585.7-37.783l-268.965,1192.4L-122.411,393.992Z"
                                              transform="translate(310.691 277.436) rotate(30)"/>
                                        <path id="sale_lekcyjne" onClick={(e) => this.handleClicked(e)}
                                              onMouseOver={(e) => this.handleMouseOver(e)}
                                              onMouseOut={() => this.handleMouseOut()} name={"Sale lekcyjne"}
                                              d="M3604.225,21858.477l258.05,153.174,171.541-213.447-276.538-144.9Z"
                                              transform="translate(-2989 -20672)"/>
                                        <path id="sale_lekcyjne-2" onClick={(e) => this.handleClicked(e)}
                                              onMouseOver={(e) => this.handleMouseOver(e)}
                                              onMouseOut={() => this.handleMouseOut()} name={"Sale lekcyjne"}
                                              data-name="sale_lekcyjne"
                                              d="M3597.578,21865.957l298.59,178.477,155.251-243.3L3757.279,21653.3Z"
                                              transform="translate(-2585 -20447)"/>
                                        <path id="sale_lekcyjne-3" onClick={(e) => this.handleClicked(e)}
                                              onMouseOver={(e) => this.handleMouseOver(e)}
                                              onMouseOut={() => this.handleMouseOut()} name={"Sale lekcyjne"}
                                              data-name="sale_lekcyjne"
                                              d="M3604.225,21858.477l291.648,134.668,135.526-212.893L3757.279,21653.3Z"
                                              transform="translate(-2343 -20776)"/>
                                        <path id="sale_lekcyjne-4" onClick={(e) => this.handleClicked(e)}
                                              onMouseOver={(e) => this.handleMouseOver(e)}
                                              onMouseOut={() => this.handleMouseOut()} name={"Sale lekcyjne"}
                                              data-name="sale_lekcyjne"
                                              d="M3604.819,21832.555l267.072,135.795,152.943-192.227L3757.279,21653.3Z"
                                              transform="translate(-2734 -20966)"/>
                                        <path id="swietlica" onClick={(e) => this.handleClicked(e)}
                                              onMouseOver={(e) => this.handleMouseOver(e)}
                                              onMouseOut={() => this.handleMouseOut()} name={"Świetlica"}
                                              d="M6.889-.61l343.2-43.4-4.544,227.54L-3.511,221.2Z"
                                              transform="translate(2004.691 798.436) rotate(30)"/>
                                        <path id="aula" onClick={(e) => this.handleClicked(e)}
                                              onMouseOver={(e) => this.handleMouseOver(e)}
                                              onMouseOut={() => this.handleMouseOut()} name={"Aula"}
                                              d="M6.889-.61l157.24-23.417L156.1,168.012,5.41,193.419Z"
                                              transform="translate(2066.691 622.436) rotate(30)"/>
                                        <path id="biblioteka" onClick={(e) => this.handleClicked(e)}
                                              onMouseOver={(e) => this.handleMouseOver(e)}
                                              onMouseOut={() => this.handleMouseOut()} name={"Biblioteka"}
                                              d="M6.889-.61l157.24-23.417L156.1,168.012-2.01,193.964Z"
                                              transform="translate(2249.691 690.436) rotate(30)"/>
                                </svg>

                                <a href={"https://www.youtube.com/watch?v=gsaEFiQmigs"} className={"source"} rel="noopener noreferrer" target="_blank">źródło</a>

                                <div className={"dim"}>
                                    <h1>Kliknij<br/>budynek</h1>
                                </div>

                            </div>

                            {
                                !isMobile ?
                                    <div className={"hovered-area"}>
                                        {
                                            hoveredName !== "" ?
                                                <h1>{this.state.hoveredName}</h1>
                                                : ""
                                        }
                                    </div>
                                : ""
                            }

                        </div>
                    </div>

                    {
                        selectedArea !== "" ?
                            <div className={"section grey"}>
                                <div key={selectedArea.id} className={"section-container area-info"}>
                                    <h1 dangerouslySetInnerHTML={{__html: selectedArea.name}}/>
                                    {
                                        images.length !== 0 ?
                                            <ImageGallery items={images}
                                                          additionalClass={images.length === 1 ? "single" : ""}
                                                          useBrowserFullscreen={false}/>
                                            : ""
                                    }
                                    {
                                        selectedArea.link ?
                                            <NavLink to={selectedArea.link.url}>
                                                <button className={"button-accent-2"}>
                                                    Więcej
                                                </button>
                                            </NavLink>
                                        : ""
                                    }
                                </div>
                            </div>
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

export default Walk;

