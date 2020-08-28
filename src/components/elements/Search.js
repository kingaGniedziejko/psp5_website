import React, {Component} from "react";
import axios from "axios";
import Spinner from "./Spinner";
import {Link} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import "../../styles/pagination_style.css"
import "../../styles/search_style.css";


export class Search extends Component {
    state = {
        phrase: "",
        formatedPhrase: "",
        results: undefined,
        isLoaded: false,
        page: 1,
        postsPerPage: 5,
        pageCount: 0
    }

    loadSearch(phrase) {

        const {page, postsPerPage} = this.state;

        console.log(phrase);
        console.log(page);
        console.log(postsPerPage);

        let searchUrl = global.config.proxy
            + "/wp-json/wp/v2/search?subtype=news,subpages,documents&search="
            + phrase
            + "&per_page=" + postsPerPage
            + "&page=" + page;

        axios.get(searchUrl)
            .then(res => this.setState({
                results: res.data,
                isLoaded: true,
                pageCount: Number(res.headers["x-wp-totalpages"])
            }))
            .catch(err => console.log(err));
    }

    handlePageClick = data => {
        let selected = data.selected + 1;

        this.setState({ page: selected }, () => {
            this.loadSearch(this.props.match.params.phrase);
        });

        setTimeout(function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, 100);
    };

    componentWillReceiveProps(newProps) {
        this.loadSearch(newProps.match.params.phrase);
    }

    componentDidMount() {
        this.loadSearch(this.props.match.params.phrase);
    }


    render() {
        const {results, isLoaded, pageCount} = this.state;

        if (isLoaded) console.log(results);

        return (
            <div className={"content content-search"}>
                <div className={"section"}>
                    <h1 id={"search-header"}>{"Wyniki wyszukiwania dla:"}</h1>
                    <h3>{"\"" + this.props.match.params.phrase.replace("+", " ") + "\""}</h3>
                    {isLoaded?
                        (results.length !== 0 ?
                            <div className={"results-container"}>
                                {results.map((elem, index) => {
                                    let url = "";
                                    let type = "";
                                    switch (elem.subtype) {
                                        case "subpages":
                                            url = new URL(elem.url).pathname;
                                            type = "strony";
                                            break;
                                        case "news":
                                            url = "/aktualnosci/" + elem.id + new URL(elem.url).pathname.substring(5);
                                            type = "aktualności";
                                            break;
                                        case "documents":
                                            url = "/o-szkole/dokumenty";
                                            type = "dokumenty";
                                            break;
                                        default:
                                            url = "/";
                                            type = "nieznane";
                                    }

                                    return (
                                        <div className={"result"} key={index}>
                                            <Link to={url}><h2 dangerouslySetInnerHTML={{__html: elem.title}}/></Link>
                                            <p><b>Kategoria: </b>{type}</p>
                                        </div>
                                    );
                                })}
                                <ReactPaginate
                                    previousLabel={"<"}
                                    nextLabel={">"}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                />
                            </div>
                            :
                            <div className={"results-container results-container-empty"}>
                                <h4><i>Brak wyników</i></h4>
                            </div>)
                        : <Spinner/>
                    }
                </div>
            </div>
        );
    }
}

export default Search;