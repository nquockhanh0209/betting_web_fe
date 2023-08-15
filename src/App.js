import logo from './logo.svg';
import './App.css';
import axios, * as others from 'axios';
import CreateMatch from './pages/CreateMatch';
import Routers from './Router';
var matchInfo_new =  {
  "name":  "BARVMAD",
  "matchStartDate": "Mon, 27 Mar 2023 11:08:01 GMT",
  "matchResult": null,
  "matchEndDate": null,
  "matchBetWinProportion": "1.5",
  "matchBetDrawProportion": "2",
  "matchBetLoseProportion": "2.5",
  "matchContract": "0x93f5ee484fe1642dcc250da8a41d031aceeedc28"
}
function callAPI(){
  axios.post("http://localhost:3000/matchInfo", matchInfo_new,
  {
    headers:
    {"Content-Type": "application/json"}
  })
  .then(res => {
    console.log(res);
    console.log(res.data);
  }, (error) => {
    console.log('An error has occur: ', error)
  })
}
function App() {
  return (
    <Routers/>

  );
}

export default App;
