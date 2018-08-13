import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './GameButtonList.css';
// eslint-disable-next-line
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class GameButtonList extends Component {
    render() {
        return (
            <ul className="text-center GameButtonList">
                <li>
                    <Link to="/game/facts" className="button large" >
                        Math Facts
                    </Link>
                </li>
                <li>
                    <Link to="/game/integers" className="button large" >
                        Integers
                    </Link>
                </li>
            </ul>
        );
    }
}

export default GameButtonList;