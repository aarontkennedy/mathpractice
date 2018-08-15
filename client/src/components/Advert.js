import React, { Component } from 'react';
import './Advert.css';

class Advert extends Component {
    render() {
        return (
            <div className="Advert grid-x grid-padding-x">
                <div className="cell shrink">
                    <a href={this.props.url}>
                        <img className="Advert-icon" src={this.props.image} alt={this.props.title} />
                    </a>
                </div>
                <div className="cell auto">
                    <h3>
                        <a href={this.props.url}>{this.props.title}</a>
                    </h3>
                    <p>{this.props.description}</p>
                </div>
            </div>);
    }

}

export default Advert;