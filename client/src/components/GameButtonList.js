import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './GameButtonList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class GameButtonList extends Component {
    render() {
        return (
            <ul className="text-center GameButtonList">
                <li>
                    <Link to="/game/facts" className="button" >
                        <FontAwesomeIcon icon="plus" /> Math Facts</Link>
                </li>
                <li>
                    <Link to="/game/integers" className="button" >
                        <FontAwesomeIcon icon="plus" /> Integers</Link>
                </li>
            </ul>
        );
    }

}

export default GameButtonList;