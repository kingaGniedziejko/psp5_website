import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
    zIndex: '1'
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (
            <div id={"map"}>
                <Map
                    google={this.props.google}
                    zoom={15}
                    style={mapStyles}
                    containerStyle={{position: 'relative'}}
                    initialCenter={{
                        lat: 50.680498,
                        lng: 17.950237
                    }}
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'Publiczna Szkoła Podstawowa nr 5\nz Oddziałami Integracyjnymi\nim. Karola Musioła w Opolu '}
                    />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                        google={this.props.google}>
                        <div id={"info-window"}>
                            {this.state.selectedPlace.name}
                        </div>
                    </InfoWindow>
                </Map>
            </div>

        );
    }
}



export default GoogleApiWrapper({
    apiKey: 'AIzaSyBTNhOhi_nJHX694A_hVODCeK8xtTElTSk'
})(MapContainer);
