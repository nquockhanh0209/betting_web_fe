import React from "react";

import "../assets/css/style.css";
import { Buffer } from "buffer";
import axios from "axios";
import { redirect } from "react-router-dom";
import AWS from "aws-sdk";

const region = "ap-southeast-2";
const bucketName = "team-image-betting-website";
const accessKey = "xc7EayBcknKazUUu";
const scretKey = "FS7jKRpXcVZCYVRk5SAKSX28X1bTDAwo";
const minioClient = new AWS.S3({
  endPoint: "localhost",
  port: 9090,
  useSSL: true,
  accessKey: accessKey,
  secretKey: scretKey,
});
console.log("minioClient", minioClient);
// var fileobj_1;

// function getFile1() {
//   var fileUpload1 = document.querySelector("Team_one");
//   var arr = event.target.files; //mảng các file được chọn
//   var f = arr[0];
//   // console.log(f);
//   fileobj_1 = f;
//   console.log(fileobj_1);
//   return true;
// }

// var fileobj_2;

// function getFile2() {
//   var fileUpload2 = document.querySelector("Team_two");
//   var arr = event.target.files; //mảng các file được chọn
//   var f = arr[0];
//   // console.log(f);
//   fileobj_2 = f;
//   console.log(fileobj_2);
//   return true;
// }

export class MatchInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchFormat: "",
      matchName: "",
      team1Name: "",
      team1Img: {},
      team2Name: "",
      team2Img: {},
      matchStartDate: "",
      matchBetWinProportion: "",
      matchBetDrawProportion: "",
      matchBetLoseProportion: "",
      matchStatus: "",
    };

    this.createMatch = this.createMatch.bind(this);
    this.setMatchInfo = this.setMatchInfo.bind(this);
  }

  setMatchInfo(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name == "format") {
      this.setState({
        matchFormat: value,
      });
    } else if (name == "match_name") {
      this.setState({
        matchName: value,
      });
    } else if (name == "time") {
      this.setState({
        matchStartDate: value,
      });
    } else if (name == "bet_home") {
      this.setState({
        matchBetWinProportion: value,
      });
    } else if (name == "bet_draw") {
      this.setState({
        matchBetDrawProportion: value,
      });
    } else if (name == "bet_away") {
      this.setState({
        matchBetLoseProportion: value,
      });
    } else if (name == "Match_status") {
      // if (match_status == 0) {
      //   match_status = "Chưa diễn ra";
      // }
      // if (match_status == 1) {
      //   match_status = "Đang diễn ra";
      // }
      // if (match_status == 2) {
      //   match_status = "Đã kết thúc";
      // }
      this.setState({
        matchStatus: value,
      });
    } else if (name == "team_1") {
      this.setState({
        team1Name: value,
      });
    } else if (name == "team_2") {
      this.setState({
        team2Name: value,
      });
    } else if (name == "file_upload_team_1") {
      var files = target.files;
      var file = files[0];
      
      this.setState({
        team1Img: file.name,
      });
    } else if (name == "file_upload_team_2") {
      var files = target.files;
      var file = files[0];
     
      this.setState({
        team2Img: file.name,
      });
    }
  }
  createMatch(event) {
    event.preventDefault();

    var matchInfo = {
      matchFormat: this.state.matchFormat,
      matchName: this.state.matchName,
      matchStartDate: this.state.matchStartDate,
      team1Name: this.state.team1Name,
      team1Img: this.state.team1Img,
      team2Name: this.state.team2Name,
      team2Img: this.state.team2Img,
      matchBetWinProportion: this.state.matchBetWinProportion,
      matchBetDrawProportion: this.state.matchBetDrawProportion,
      matchBetLoseProportion: this.state.matchBetLoseProportion,
      matchStatus: this.state.matchStatus,
      // matchContract: createMatchContract,
    };
    console.log(matchInfo);
    console.log(this.state.team1Img);
    var id;
    var route = "http://localhost:3000/matchInfo";
    axios.post(route, matchInfo).then(
      (res) => {
        console.log("post data success");
        console.log(res.data);
        console.log(res.data._id);
        id = res.data._id;
        alert("Create match success!");
        // var route_team1_img = "http://localhost:3000/matchInfo/team1/"+res.data._id;
        // axios.put(route_team1_img, {team1Img: this.state.team1Img}).then((res)=>{console.log(res);})
        this.setState({});
        window.location = "/match";
        return res.data;
      },
      (error) => {
        alert("Create match fail with error" + error);
        window.location = "/match";
        console.log("An error has occur: ", error);
      }
    );
  }

  render() {
    return (
      <form
        name="create"
        action=""
        method="post"
        onSubmit={(event) => {
          this.createMatch(event);
        }}
      >
        <br />
        <br />
        <h1>Create new match</h1>
        <br />
        <br />
        <div class="form-group">
          <label>
            Hình thức:
            <input
              type="text"
              name="format"
              id="format"
              value={this.state.setMatchInfo}
              onChange={this.setMatchInfo}
            />
          </label>
        </div>

        <br />

        <div class="form-group">
          <label>
            Tên trận đấu
            <input
              type="text"
              name="match_name"
              id="match_name"
              value={this.state.matchCode}
              onChange={this.setMatchInfo}
            />
          </label>
        </div>

        <br />
        <div class="form-group">
          <label>
            Đội sân nhà
            <input
              type="text"
              name="team_1"
              id="team_1"
              value={this.state.team1Name}
              onChange={this.setMatchInfo}
            />
            <br />
            <br />
            <input
              type="file"
              name="file_upload_team_1"
              id="file_upload"
              class="btn btn-success"
              onChange={this.setMatchInfo}
            />
          </label>
        </div>
        <br />
        <br />

        <div class="form-group">
          <label>
            Đội sân khách
            
            <input
              type="text"
              name="team_2"
              id="team_2"
              value={this.state.team2Name}
              onChange={this.setMatchInfo}
            />
            <br />
            <br />
            <input
              type="file"
              name="file_upload_team_2"
              id="file_upload"
              onChange={this.setMatchInfo}
            />
          </label>
        </div>
        <br />
        <br />
        <div class="form-group">
          <label>
            Thời gian diễn ra
            <input
              type="datetime-local"
              name="time"
              id="time"
              value={this.state.time}
              onChange={this.setMatchInfo}
            />
          </label>
        </div>
        <br />
        <br />
        <div class="form-group">
          <label>
            Tỉ lệ cược đội sân nhà thắng
            <input
              type="number"
              step="0.1"
              name="bet_home"
              id="bet_home"
              min="0"
              max="10"
              value={this.state.bet_home}
              onChange={this.setMatchInfo}
            />
          </label>
        </div>

        <div class="form-group">
          <label>
            Tỉ lệ cược đội sân nhà thua
            <input
              type="number"
              step="0.1"
              name="bet_away"
              id="bet_away"
              min="0"
              max="10"
              value={this.state.bet_away}
              onChange={this.setMatchInfo}
            />
          </label>
        </div>

        <div class="form-group">
          <label>
            Tỉ lệ cược hòa
            <input
              type="number"
              step="0.1"
              name="bet_draw"
              id="bet_draw"
              min="0"
              max="10"
              value={this.state.bet_draw}
              onChange={this.setMatchInfo}
            />
          </label>
        </div>

        <br />
        <div class="form-group">
          <label>
            Trạng thái trận đấu
            <input
              type="radio"
              name="Match_status"
              value="0"
              onChange={this.setMatchInfo}
            />{" "}
            Chưa diễn ra
            <input
              type="radio"
              name="Match_status"
              value="1"
              onChange={this.setMatchInfo}
            />{" "}
            Đang diễn ra
            <input
              type="radio"
              name="Match_status"
              value="2"
              onChange={this.setMatchInfo}
            />{" "}
            Kết thúc
          </label>
        </div>
        <br />
        <input
          type="submit"
          name="submit"
          id="submit"
          class="btn btn-success"
          value="Đăng"
        />
      </form>
    );
  }
}
