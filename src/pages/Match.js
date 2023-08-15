import React, { useEffect, useState } from "react";
import Barca from "../assets/images/Barca.png";
import Real_Madrid from "../assets/images/Real_Madrid.png";
import Logo_Youg from "../assets/images/Logo_Youg.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/all.min.css";
import "../assets/css/AdminLTE.min.css";
import "../assets/css/style3.css";
import "../assets/css/_all-skins.min.css";
import "../assets/css/style2.css";

const Match = () => {
  var [isLoading, SetIsLoading] = useState(true);
  var [matchInfo, SetMatchInfo] = useState([]);
  // var respone;
  //  axios.get("http://172.17.0.1:3000/match-result/642ea8e946ad06750a613ca4").then(
  //   (res) => {respone = res.data;}
  // )
  // console.log(respone);
  // var path_name = "/update/".concat(respone._id);
  // console.log(path_name);
  useEffect(() => {
    const getMatchInfo = async () => {
      await axios.get("http://localhost:3000/matchInfo/getAll").then(
        async (res) => {
          const dataLocal = res.data;
          SetMatchInfo(dataLocal);

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
  return (
    <div class="wrapper">
      <header class="main-header">
        <a class="logo">
          <span class="logo-lg">
            <b>ADMIN</b>
          </span>
        </a>
      </header>

      <div class="breadcrumb-wrap content-wrap content-wrapper">
        <section class="content-header">
          <br />
          <br />

          <h1>Match Manage</h1>
        </section>
      </div>

      <div class="content-wrapper">
        <section class="content">
          <br />
          <Link to="/create" href="/create_match">
            <i class="fas fa-plus-circle"></i> Tạo trận đấu mới
          </Link>
          <br />
          <br />
         
            <table
              className="match"
              border="1px"
              cellpadding="8"
              cellspacing="0"
              
            >
              <tr>
                <th>STT</th>
              
                <th>Tên trận đấu</th>
                <th>Đội sân nhà</th>
                <th>Đội sân khách</th>
                <th>Thời gian</th>
                <th>Tỉ lệ cược đội sân nhà</th>
                <th>Tỉ lệ cược đội sân khách</th>
                <th>Tỉ lệ cược chung</th>
                <th>Kết quả</th>
              </tr>
              {matchInfo?.map((info, index) => (
              <tr key={info._id}>
                <td>{index}</td>
                <td>{matchInfo[index]?.matchName}</td>

                <td>
                  <img
                    src={matchInfo[index]?.team1Img}
                    alt="description of "
                    width="70px"
                    height="70px"
                  />
                </td>
                <td>
                  <img
                    src={matchInfo[index]?.team2Img}
                    alt="description of "
                    width="70px"
                    height="70px"
                  />
                </td>
                <td>
                  {new Date(matchInfo[index]?.matchStartDate).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                </td>
                <td>
                  {matchInfo[index]?.matchBetWinProportion.$numberDecimal}
                </td>
                <td>
                  {matchInfo[index]?.matchBetDrawProportion.$numberDecimal}
                </td>
                <td>
                  {matchInfo[index]?.matchBetLoseProportion.$numberDecimal}
                </td>
                <td>{matchInfo[index]?.matchResult}</td>

                <td>
                  <Link to={"/update/" + matchInfo[index]?._id}>
                    <i class="fas fa-edit"></i> Sửa
                  </Link>
                </td>
              </tr>
           
          ))}
           </table>
        </section>
      </div>

      <div class="control-sidebar-bg"></div>
    </div>
  );
};

export default Match;
