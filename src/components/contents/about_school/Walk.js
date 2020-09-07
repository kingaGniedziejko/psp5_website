import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import Helmet from "react-helmet";
import "../../../styles/walk_style.css"
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import {NavLink} from "react-router-dom";
import {isMobile} from 'react-device-detect';
import schoolPhoto from '../../../images/photo_school.jpeg'

export class Walk extends Component {
    state = {
        title: "Spacer po szkole",
        page: undefined,
        hoveredName: "",
        hoveredId: "",
        areas: [],
        selectedArea: "",
        images: [],
        isLoaded: false
    }

    componentDidMount() {
        this.setState({
            page: this.props.page,
            areas: this.props.page.acf.areas,
            isLoaded: true
        })
    }

    isValidUrl(string) {
        try {
            new URL(string);
        } catch (_) {
            return false;
        }
        return true;
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
            selected.images.map(image =>
                images.push({
                    fullscreen: image.image.url,
                    original: image.image.sizes.large,
                    thumbnail: image.image.sizes.thumbnail
                }))
        this.setState({
            selectedArea: selected,
            images: images
        })
        if(true) {
            document.getElementById(selected.id).classList.add("clicked");
        }
        setTimeout(function () {
            if (document.getElementById("area-info-id") !== null) {
                window.scrollTo({
                    top: document.getElementById("area-info-id").offsetTop - 90,
                    behavior: "smooth"
                })
            }
        }, 500)

    }

    handleMouseOut = () => {
        this.setState({
            hoveredName: "",
            hoveredId: ""
        })
    }

    render() {
        const {images, selectedArea, hoveredName, page} = this.state

        if(this.state.isLoaded) {
            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>
                    <section>
                        <div className={"section-content"}>
                            <div className={"centered"}>
                                <h1>{page.acf.sections[0].one_column_content.modules[0].header}</h1>
                                <div className={"interactive-photo-container"}>
                                    <figure>
                                        <img src={schoolPhoto} alt={"Zdjęcie szkoły z lotu ptaka"}/>

                                        <svg id="outlines" width="3071" height="2128" viewBox="0 0 3071 2128">
                                            <path id="stolowka" name="Stołówka" onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M6.889-.61,446.218-32.845l25.8,576.522-477.8,6.773Z" transform="translate(1747.691 1101.436) rotate(30)" fill="rgba(255,245,198,0.39)"/>
                                            <path id="boisko_tartanowe" name="Boisko tartanowe" onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M152.643-119.662,470.394-12.449,514.447,327.9,254.1,268.588l-35.948,49.727-34.765.834Z" transform="matrix(0.485, -0.875, 0.875, 0.485, 472.805, 446.542)" fill="rgba(255,245,198,0.39)"/>
                                            <path id="sala_gimnastyczna" name="Sala gimnastyczna" onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M6.889-.61l313.7-38.022L268.925,283.4l64.262,45.811L-8.3,347.42l-51.2-37.346Z" transform="translate(1042.691 115.436) rotate(30)" fill="rgba(255,245,198,0.39)"/>
                                            <path id="amfiteatr" name="Amfiteatr" onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M6.889-.61l853.624-14.7L825.974,397.4,519.637,378.2s-42.37,326.487-290.39,302.3S40.982,354.415,40.982,354.415l-81.925-7.573Z" transform="translate(642.691 1325.436) rotate(30)" fill="rgba(255,245,198,0.39)"/>
                                            <path id="boisko" name="Boisko" onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M6.889-.61,585.7-37.783l-268.965,1192.4L-122.411,393.992Z" transform="translate(310.691 277.436) rotate(30)" fill="rgba(255,245,198,0.39)"/>
                                            <path id="swietlica" name="Świetlica" onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M-.442-7.016,341.652-39.158l9.481,70.019L508.992,7.648l-6.733-78.455,385.131-30.45,23.122,237.286.564,61.839-111.563,2.247,10.193,46.625-2.076,26.706-433.092,34-12.883-22.314L357.7,247.01,33.872,271.268-3.511,221.2Z" transform="translate(2004.691 798.436) rotate(30)" fill="rgba(255,245,198,0.39)"/>
                                            <path id="aula" name="Aula" onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M6.889-.61,174.613-21.989l-7.225,190.78L2.7,192.348Z" transform="translate(2066.691 622.436) rotate(30)" fill="rgba(255,245,198,0.39)"/>
                                            <path id="biblioteka" name="Biblioteka" onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M3.862,7.718,162.517-10.957l11.294,180.48L-2.01,193.964Z" transform="translate(2249.691 690.436) rotate(30)" fill="rgba(255,245,198,0.39)"/>
                                            <path id="pracownie_informatyczne" name="Pracownie informatyczne" onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M4937.965,20795.088l-186.784,231.621,59.341,17.252-59.341,73.2,15.909,74.82,183.744,74.379v-62.176l24.751-52.223,52.325,20.07,65.807-110.678-105.968-34.645,68.609-106.43,95.339,34.383,69.176-92.432-33.781-12,33.781-41.453-192.962-68.467-52.325,68.467Z" transform="translate(-2989 -20672)"/>
                                            <path id="winda" name="Winda" onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M4741.992,21026.84l-18.736,25.115v69.838h18.736l14.539-16.537,49.026-53.3Z" transform="translate(-2989 -20672)"/>
                                            <path id="sale_lekcyjne_1_3" name="Sale lekcyjne klas 1-3" onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M4014.884,21351.941l-152.726,174.475,201.941,105.293,8.276,27.17-88.653,110.264-17.934-2.211-205.319-114.125L3591.278,21855.9l276.133,157.025,162.666-215.207,16.963,11.49,80.242-113.912,2.514-26.682,42.07-58.971,3.334,8.738,122.691,60.213,7.884-7.561-46.417,73.623,16.45,21.9-80.21,112.729-5.14-1.514-18.593-10.709-178.232,223.227,299.287,178.441,159.984-238.951-193.547-104.467h18.089l82.563-117.459-15.307-24.1,194.1,94.014,136.311-199.174-281.873-125.656-40.018,56.705h0l-123.008-56.705-5.786-10.717,50.012-66.969Z" transform="translate(-2989 -20672)"/>
                                            <path id="sale_lekcyjne" name="Sale lekcyjne" onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M5105.913,21074.316l246.855,101.324,58.683-101.324-250.752-94.361,86.45-148.324,390.5,148.324-226.2,426.283-416.626-166.494Z" transform="translate(-2989 -20672)"/>
                                            <path id="pracownie_scisle" name="Pracownie nauk Ścisłych" onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M5448.552,21337.953h0v85.387l371.046,147.791,30.769-62.215,68.6-156.258-110.652-47.7-17.486-42.582-215.105-75.852-17.553,53.873-41.445-19.154Z" transform="translate(-2879 -20874)"/>
                                            <path id="pracownie_jezykowe" name="Pracownie językowe" onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M5448.552,21337.953l38.959,14.705-29.542,56.072-21.95,83.5,372.3,154.652,26.333-47.248,79.987-184.437-79.987-30.9-34.943-13.434-21.681-43.7-88.478-36.148-175.621-67.336Z" transform="translate(-2992 -20664)"/>
                                            <path id="forum" name="Forum"  onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M4634.475,21168.738l377.4,152.41-85.758,147.768,28.484,12.377L4848.784,21651.7l10.517,73.6-31.3,63.336-128.7-63.336v-63.988l-124.609-55.906,27.458-42.189-130.112-56.91-11.487-25.018-36.319-21.324Z" transform="translate(-2989 -20672)"/>
                                            <path id="blok_sportowy" name="Blok sportowy"  onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M-9.121-21.585l323.948-37.76L287.244,199.782l40.375,51.492L146.276,267.406,134.554,327,.094,351.8l-59.6-41.731Z" transform="translate(1341.691 268.436) rotate(30)" fill="rgba(255,245,198,0.39)"/>
                                            <path id="basen" name="Basen"  onClick={(e) => this.handleClicked(e)}
                                                  onMouseOver={(e) => this.handleMouseOver(e)}
                                                  onMouseOut={() => this.handleMouseOut()} d="M5.275-83.529l-14.663-25.4L40.484-227.618,353.09-276.334,313.761-160.11l12.43,37.523L316.124-71.7-4.989-31.661Z" transform="translate(1341.691 268.436) rotate(30)"/>
                                        </svg>

                                        <a href={"https://www.youtube.com/watch?v=gsaEFiQmigs"} className={"source"} rel="noopener noreferrer" target="_blank">źródło</a>

                                        <div className={"dim"}>
                                            <h1>Kliknij<br/>budynek</h1>
                                        </div>
                                    </figure>
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

                    </section>
                    {
                        selectedArea !== "" ?
                            <section className={"grey"}>
                                <div key={selectedArea.id} className={"section-content area-info"} id={"area-info-id"}>
                                        <h1 dangerouslySetInnerHTML={{__html: selectedArea.name}}/>
                                        {selectedArea.oembed ? <div dangerouslySetInnerHTML={{__html: selectedArea.oembed}} className={"oembed-container"}/> : "" }                                    {
                                        images.length !== 0 ?
                                            <ImageGallery items={images}
                                                          additionalClass={images.length === 1 ? "single" : ""}
                                                          useBrowserFullscreen={false}/>
                                            : ""
                                    }
                                        {selectedArea.link ?
                                            (this.isValidUrl(selectedArea.link.url)?
                                                <a href={selectedArea.link.url} rel="noopener noreferrer" target="_blank">
                                                    <button className={"button-accent-2"}>
                                                        Więcej
                                                    </button>
                                                </a>
                                                :
                                                <NavLink to={selectedArea.link.url}>
                                                    <button className={"button-accent-2"}>
                                                        Więcej
                                                    </button>
                                                </NavLink>)
                                            : ""
                                        }
                                </div>
                            </section>
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

