import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/all.min.css";
import "../assets/css/AdminLTE.min.css";
import "../assets/css/style.css";
import "../assets/css/_all-skins.min.css";

// import "../assets/css/style3.css";
import axios from "axios";
import { MatchInfo } from "./createMatch_form";
const CreateMatch = () => {
  return (
    <div class="wrapper">
      <header class="main-header">
        <a class="logo">
            <span class="logo-lg"><b>ADMIN</b></span>
        </a>
    </header>

      <Link class="main-sidebar">
        <section class="sidebar">
          <ul class="sidebar-menu" data-widget="tree" />
          <br/>
          <br/>
          <br/>
          <li>
            <Link href="Match.html">
              <i class="fa fa-th"></i> <span>Quản lý trận đấu</span>
              <span class="pull-right-container"></span>
            </Link>
          </li>
        </section>
      </Link> 
      

      <div class="content-wrapper" id="create_form">
        <MatchInfo></MatchInfo>
      </div>
    </div>
  );
};

export default CreateMatch;
