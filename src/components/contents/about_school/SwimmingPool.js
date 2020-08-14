import React, {Component} from "react";
import Helmet from "react-helmet";
import ReactPaginate from 'react-paginate';
import "../../../styles/pagination_style.css"
import axios from "axios";
import Spinner from "../../elements/Spinner";
import WaterExamine from "../../elements/WaterExamine";

import "../../../styles/swimmingpool_style.css"
import SectionImage from "../../elements/SectionImage";

export class SwimmingPool extends Component {
    state = {
        title: "Basen",
        content: [],
        isLoaded: false,
        waterExamine: [],
        isExamineLoaded: false,
        examinePerPage: 1,
        offset: 0
    }

    loadContent(){
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=swimmingpool";

        axios.get(contentUrl)
            .then(res => this.setState({
                content: res.data[0].acf,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    loadWaterExamine(){
        const {offset, examinePerPage} = this.state;

        let waterExamineUrl = global.config.proxy + "/wp-json/wp/v2/water_examine";
        waterExamineUrl += "?per_page=" + examinePerPage;
        waterExamineUrl += "&offset=" + offset;

        axios.get(waterExamineUrl)
            .then(res => this.setState({
                waterExamine: res.data,
                isExamineLoaded: true,
                pageCount: Number(res.headers["x-wp-totalpages"])
            }))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.loadContent();
        this.loadWaterExamine();
    }

    handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.examinePerPage);

        this.setState({ offset: offset }, () => {
            this.loadWaterExamine();
        });
    };

    render() {
        const {title, content, isLoaded, waterExamine, isExamineLoaded, pageCount} = this.state;

        if (isLoaded){
            const sections = content.sections;

            const photo1 = sections[0].images[0].image;
            const title1 = sections[0].modules[0].header;
            const text1 = sections[0].modules[0].text;

            const photo2 = sections[1].images[0].image;
            const title2 = sections[1].modules[0].header;
            const text2 = sections[1].modules[0].text;

            let examineContent = <Spinner/>;

            if (isExamineLoaded) {
                examineContent = (
                    <div className={"water-examine-container"}>
                        {waterExamine.map((exam, index) => {
                            return <WaterExamine key={index} examine={exam}/>
                        })}
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                        />
                    </div>
                );
            }

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + title}</title>
                    </Helmet>
                    <div className={"section section-1"}>
                        <SectionImage image={photo1}/>
                        <div className={"section-container centered"} id={""}>
                            <h1 dangerouslySetInnerHTML={{__html: title1}}/>
                            <div dangerouslySetInnerHTML={{__html: text1}}/>
                        </div>
                    </div>
                    <div className={"section section-2"}>
                        <SectionImage image={photo2}/>
                        <div className={"section-container centered"} id={""}>
                            <h1 dangerouslySetInnerHTML={{__html: title2}}/>
                            <div dangerouslySetInnerHTML={{__html: text2}}/>
                        </div>
                        {examineContent}
                    </div>
                </div>
            );
        }

        return (
            <Spinner />
        );
    }
}

export default SwimmingPool;