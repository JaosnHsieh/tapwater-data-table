import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
const corsServer = `http://45.32.119.183:8080/`;
const tapwaterDataUrl = `http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=6805942d-a8dd-4635-a394-01a8eadb3eba`;

// http://data.taipei/opendata/datalist/apiAccess?scope=datasetMetadataSearch
// &q=臺北市文化快遞資訊&sort=metadata_created desc

// http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire
// &rid=35aa3c53-28fb-423c-91b6-2c22432d0d70&limit=3&offset=5

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      offset: 0,
      data: [],
      count: 0,
      isLoading: false
    };
  }
  componentDidMount() {
    console.log("didmout");
    this.getData();
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextState.limit !== this.state.limit ||
  //     nextState.offset !== this.state.offset
  //   );
  // // }
  componentDidUpdate(previousProps, previousState) {
    if (
      previousState.limit !== this.state.limit ||
      previousState.offset !== this.state.offset
    ) {
      this.getData();
    }
  }
  getData = async (limit = 10, offset = 0) => {
    const baseURL = `${corsServer}${tapwaterDataUrl}`;
    const query = `${baseURL}&limit=${this.state.limit}`;
    let { data: { result } } = await axios.get(query);
    console.log("result", result);
    const { count, results: data } = result;

    this.setState({ data, count });
  };
  onLimitChange = async e => {
    this.setState({
      limit: e.target.value
    });
  };
  render() {
    console.log("render");

    const { data } = this.state;
    return (
      <div className="App">
        <header className="App-header">臺北市自來水管承裝商業者</header>
        <nav className="controller">
          <span>資料總筆數:{this.state.count}</span>
          <span>
            筆數
            <select onChange={this.onLimitChange} value={this.state.limit}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </span>
          <span>
            {" "}
            {"<<"} 上一頁 下一頁{">>"}
          </span>
        </nav>
        <section className="table">
          {data.length > 0 && (
            <div>
              <span>ID</span>
              <span>NAME</span>
              <span>COMNUM</span>
              <span>ADDR</span>
              <span>OWNER</span>
            </div>
          )}
          {data.map(ele => (
            <div key={ele._id}>
              <span>{ele._id}</span>
              <span>{ele.NAME}</span>
              <span>{ele.COMNUM}</span>
              <span>{ele.ADDR}</span>
              <span>{ele.OWNER}</span>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default App;
