import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import Attachment from "../../elements/Attachment"
import axios from "axios";


export class Documents extends Component {
    state = {
        content: [],
        isLoaded: false,
        documents: [],
        documentTypes: {}
    }

    componentDidMount() {
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=documents"
        //TODO: lepsze zabezpieczenie tego

        axios.get(contentUrl)
            .then(res => this.setState({
                content: res.data[0].acf,
                isLoaded: true
            }))
            .catch(err => console.log(err));

        // get all document types
        let typesUrl = global.config.proxy + "/wp-json/wp/v2/document_types"
        var documentTypes = {}

        axios.get(typesUrl)
            .then(res => {
                res.data.map(type => {
                    documentTypes[type.id] = type.name;
                })
                this.setState({
                    documentTypes: documentTypes
                })
            })
            .catch(err => console.log(err));

        // get all documents
        let documentsUrl = global.config.proxy + "/wp-json/wp/v2/documents"

        axios.get(documentsUrl)
            .then(res => {
                let documents = []
                res.data.map(document => {
                    documents.push({key: document.id, name: document.title.rendered, type: document.document_types[0], url: document.acf.document.url})
                })
                this.setState({
                    documents: documents
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        const photo1 = this.state.content.photo_1 !== undefined ? this.state.content.photo_1 : "";

        if(this.state.isLoaded) {
            return (
                <div className={"content"}>
                    <div className={"section"}>
                        <div className={"photo-static"} style={{backgroundImage: `url(${photo1})`}}/>

                        <div className={"section-container centered"}>
                            {
                                Object.keys(this.state.documentTypes).map(documentType => {
                                    const filteredDocuments = this.state.documents.filter(document => documentType === document.type.toString());
                                    filteredDocuments.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                                    if(filteredDocuments.length > 0) {
                                        return(
                                            <div key={documentType}>
                                                <h1 dangerouslySetInnerHTML={{__html: this.state.documentTypes[documentType]}}/>
                                                {
                                                    filteredDocuments.map(filteredDocument => {
                                                    return (
                                                        <Attachment key={filteredDocument.key}
                                                                    className={"post-attachment"}
                                                                    title={filteredDocument.name}
                                                                    url={filteredDocument.url}/>
                                                    )})
                                                }
                                            </div>
                                        )



                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <Spinner />
        );
    }
}

export default Documents;