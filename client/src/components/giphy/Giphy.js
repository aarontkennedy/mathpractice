import React, { Component } from 'react';
import './Giphy.css';
//import axios from "axios";
import callServer from "../../utils/callServer";

class Giphy extends Component {

    giphyImageObjectsArray = null;

    state = {
        imageURL: ""
    }
/*
    componentDidMount() {
        console.log("Giphy:componentDidMount()");
        let search = encodeURIComponent(this.props.search);
        let myKey = "MSfEV1eyHtNS3mXorDXyqTQ7JB6jY8Pi";
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${search}&rating=g&limit=20&api_key=${myKey}`;

        console.log(queryURL);

        axios.get(queryURL)
            .then((response) => {
                console.log(response);
                this.giphyImageObjectsArray = response.data.data;
                const index = Math.floor(Math.random() * this.giphyImageObjectsArray.length);
                const url = this.giphyImageObjectsArray[index].images.original.url;
                this.setState({ imageURL: url });
            })
            .catch((err) => {
                console.log("Giphy Error");
                console.log(err)
            });
    }*/

    componentDidMount() {
        console.log("Giphy:componentDidMount()");
        callServer.getSupportImage()
            .then((response) => {
                /*console.log(response);
                console.log(response.data);
                console.log(response.data[0].url);*/
                this.setState({ imageURL: response.data[0].url });
            })
            .catch((err) => {
                console.log("Giphy Error");
                console.log(err)
            });
    }

    render() {

        if (this.state.imageURL) {
            return (<img className="Giphy "
                alt={this.props.search}
                src={this.state.imageURL} />);
        }
        return "";
    }
}

export default Giphy;