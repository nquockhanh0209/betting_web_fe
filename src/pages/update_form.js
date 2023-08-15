import React from "react";

import "../assets/css/style.css";

import axios from "axios";



export class UpdateInfo extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
      matchResult: "",
      matchEndDate: "",
      matchStatus: "",
    };
 

    this.updateMatchResult = this.updateMatchResult.bind(this);
    this.updateMatch = this.updateMatch.bind(this);
    
   
  }
  updateMatchResult(event) {
    
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    if (name == "end_date") {
      this.setState({
        matchEndDate: value,
      });
      
    } else if (name == "result") {
      this.setState({
        matchResult: value,
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
    }
  }
  
  
  updateMatch(event) {
    const { id } = this.props;
    
    event.preventDefault();

    var matchResult = {
      matchResult: this.state.matchResult,
      matchEndDate: this.state.matchEndDate,
      matchStatus: this.state.matchStatus,
    };
    const api = "http://localhost:3000/match-result/"
    console.log(typeof id, id);
    var api_link = api.concat(id);
    
    axios.put(api_link, matchResult).then(
      (res) => {
        console.log("post result success");
        console.log(res.data);
        console.log(res.data._id);
        alert("Update result success!");
        this.setState({
            matchResult: "",
            matchEndDate: "",
            matchStatus: "",
        });
        window.location = '/match';
        return res.data;
      },
      (error) => {
        console.log("An error has occur: ", error);
        alert("Update result fail with error:"+ error);
      }
    );
  }
  
  render() {
    return (
      <form name="create" action="" method="post" onSubmit={(event)=>{this.updateMatch(event)}}>
       
        <br />
        <br />
        <h1>Update match</h1>
        <br />
        <br />
       
  
        
        <div class="form-group">
        <label>
        Kết quả trận đấu:
          <input
            type="text"
            name="result"
            id="result" 
            value={this.state.updateMatchResult}
            onChange={this.updateMatchResult}

          />
        </label>
        </div>

        <br />

        <div class="form-group">
          <label>
          Thời gian kết thúc:
            <input
              type="datetime-local"
              name="end_date"
              id="end_date"
              value={this.state.updateMatchResult}
              onChange={this.updateMatchResult}
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
            onChange={this.updateMatchResult}
          />{" "}
          Chưa diễn ra
          <input
            type="radio"
            name="Match_status"
            value="1"
            onChange={this.updateMatchResult}
          />{" "}
          Đang diễn ra
          <input
            type="radio"
            name="Match_status"
            value="2"
            onChange={this.updateMatchResult}
          />{" "}
          Kết thúc
        </label>
        </div>
        <br />
        <br />

        
        <input
          type="submit"
          name="submit"
          id="submit"
          class="btn btn-success"
          value="Cập nhật"
        />
      </form>
    );
  }
}
