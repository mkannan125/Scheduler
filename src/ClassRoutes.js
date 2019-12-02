import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React from "react";
import logo from "./logo.svg";
import "./App.css";

const mapStyles = {
  width: "100%",
  height: "100%"
};

class ClassRoutes extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      >
        <Marker position={{ lat: 48.0, lng: -122.0 }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCUzCerkQI_JhkxFQmtliM6MRUuxrgWjGg"
})(ClassRoutes);
