import React from "react";

import "../assets/css/home.css";

import axios from "axios";

export class match_home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePopupWin: false,
            activePopupDraw: false,
            activePopupLose: false,
        };
        
        this.updateMatchResult = this.updateMatchResult.bind(this);
        this.updateMatch = this.updateMatch.bind(this);
        this.stateSuccess = this.stateSuccess.bind(this);
      }
}