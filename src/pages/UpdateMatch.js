import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/all.min.css";
import "../assets/css/AdminLTE.min.css";
import "../assets/css/style.css";
import "../assets/css/_all-skins.min.css";
import { UpdateInfo } from "./update_form";
import { useLocation } from "react-router-dom";
import axios from "axios";
const UpdateMatch = () => {
  var [matchInfo, SetMatchInfo] = useState(null);
  var [isLoading, SetIsLoading] = useState(true);
  useEffect(() => {
    const getMatchInfo = async () => {
      const route = "http://localhost:3000/match-result/" + location.pathname.substring(8);
      await axios.get(route).then(
        async (res) => {
          const dataLocal = res.data;
          SetMatchInfo(dataLocal);
          console.log(matchInfo);
          SetIsLoading(false);
          
        },
        (error) => {
          console.log(error);
        }
      );
    };
    if (isLoading) {
      getMatchInfo();

    }
  }, [isLoading]);
  const location = useLocation();
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
        <UpdateInfo id= {location.pathname.substring(8)}  ></UpdateInfo>
      </div>
    </div>
  );
};

export default UpdateMatch;
