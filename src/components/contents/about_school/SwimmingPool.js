import React, {Component} from "react";
import Helmet from "react-helmet";
import ReactPaginate from 'react-paginate';
import "../../../styles/pagination_style.css"
import axios from "axios";
import Spinner from "../../elements/Spinner";
import WaterExamine from "../../elements/WaterExamine";

import "../../../styles/swimmingpool_style.css"
import PageContent from "../../elements/PageContent";

export class SwimmingPool extends Component {
    state = {
        title: "Basen",
        page: undefined,
        isLoaded: false,
        waterExamine: [],
        isExamineLoaded: false,
        examinePerPage: 1,
        offset: 0
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
        this.setState({
            page: this.props.page,
            isLoaded: true
        })
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
        const {title, isLoaded, waterExamine, isExamineLoaded, pageCount, page} = this.state;

        if (isLoaded){
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
                    <PageContent page={page}/>
                    <section>
                        <div className={"section-content centered"}>
                            {examineContent}
                        </div>
                    </section>
                </div>
            );
        }

        return (
            <Spinner />
        );
    }
}

export default SwimmingPool;