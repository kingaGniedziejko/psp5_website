import React, {Component} from "react";
import Spinner from "../../elements/Spinner"
import Attachment from "../../elements/Attachment"
import axios from "axios";
import Helmet from "react-helmet";
import SectionImage from "../../elements/SectionImage";


export class Documents extends Component {
    state = {
        title: "Dokumenty",
        content: [],
        isLoaded: false,
        documents: [],
        documentTypes: {},
    }

    componentDidMount() {
        let contentUrl = global.config.proxy + "/wp-json/wp/v2/built_in_pages?slug=documents"
        let typesUrl = global.config.proxy + "/wp-json/wp/v2/document_types"
        let documentsUrl = global.config.proxy + "/wp-json/wp/v2/documents"
        //TODO: lepsze zabezpieczenie tego

        let getContent = axios.get(contentUrl);
        let getTypes = axios.get(typesUrl);
        let getDocuments = axios.get(documentsUrl);
        
        axios.all([getContent, getTypes, getDocuments])
            .then(res => {
                let documentTypes = {};
                let documents = [];

                res[1].data.forEach(type => {
                    documentTypes[type.id] = type.name;
                });

                res[2].data.forEach(document => {
                    documents.push({key: document.id, name: document.title.rendered, type: document.document_types[0], url: document.acf.document.url})
                })

                this.setState({
                    content: res[0].data[0].acf,
                    documentTypes: documentTypes,
                    documents: documents,
                    isLoaded: true
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        if(this.state.isLoaded) {
            const sections = this.state.content.sections
            const photo = sections[0].images[0].image

            return (
                <div className={"content"}>
                    <Helmet>
                        <title>{global.config.mainTitle + " " + this.state.title}</title>
                    </Helmet>
                    <div className={"section"}>
                        <SectionImage image={photo}/>
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