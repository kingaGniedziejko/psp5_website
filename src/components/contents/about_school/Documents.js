import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import Attachment from "../../elements/Attachment"
import axios from "axios";
import Helmet from "react-helmet";
import PageContent from "../../elements/PageContent";


export class Documents extends Component {
    state = {
        title: "Dokumenty",
        page: undefined,
        isLoaded: false,
        documents: [],
        documentTypes: {},
    }

    componentDidMount() {
        let typesUrl = global.config.proxy + "/wp-json/wp/v2/document_types"
        let documentsUrl = global.config.proxy + "/wp-json/wp/v2/documents?per_page=100"

        let getTypes = axios.get(typesUrl);
        let getDocuments = axios.get(documentsUrl);
        let otherDocuments;

        axios.all([getTypes, getDocuments])
            .then(res => {
                let documentTypes = {};
                let documents = [];

                res[0].data.forEach(type => {
                    return(documentTypes[type.id] = type.name)

                });

                res[1].data.forEach(document => {
                    documents.push({key: document.id, name: document.title.rendered, type: document.document_types.map(type => documentTypes[type]), url: document.acf.document.url})
                })

                documentTypes =  Object.values(documentTypes).sort((a,b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0));
                otherDocuments = documentTypes.filter((type) => type === "Inne dokumenty")
                documentTypes = documentTypes.filter((type) => type !== "Inne dokumenty")
                documentTypes.push(otherDocuments[0])

                this.setState({
                    page: this.props.page,
                    documentTypes: documentTypes,
                    documents: documents,
                    isLoaded: true
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        if(this.state.isLoaded) {
            const {page} = this.state

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>

                    <PageContent page={page}/>

                    <section>
                        <div className={"section-content"}>
                            <div className={"one-column center"}>
                                <div className={"text-container"}>
                                    {
                                        this.state.documentTypes.map(documentType => {
                                            const filteredDocuments = this.state.documents.filter(document => document.type !== undefined && document.type.includes(documentType));
                                            filteredDocuments.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                                            if(filteredDocuments.length > 0) {
                                                return(
                                                    <div key={documentType}>
                                                        <h1 dangerouslySetInnerHTML={{__html: documentType}}/>
                                                        {
                                                            filteredDocuments.map((filteredDocument, index) => {
                                                                if(filteredDocument && filteredDocument !== "" && filteredDocument.name !== "...")
                                                                    return (
                                                                        <Attachment key={index}
                                                                                    title={filteredDocument.name}
                                                                                    url={filteredDocument.url}/>
                                                                    )
                                                                return ""})
                                                        }
                                                    </div>
                                                )
                                            }
                                            return ""
                                        })
                                    }
                                </div>

                            </div>

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

export default Documents;