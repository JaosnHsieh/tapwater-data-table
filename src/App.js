import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
const corsServer = `http://45.32.119.183:8080/`;
const tapwaterDataUrl = `http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=6805942d-a8dd-4635-a394-01a8eadb3eba`;
const instance = axios.create({
  baseURL: `${corsServer}${tapwaterDataUrl}`,
  timeout: 10000
});
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
      isLoading: false
    };
  }
  async componentDidMount() {
    let { data: { result: { results: data } } } = await instance.get("");

    this.setState({ data });
  }
  getData = async () => {};
  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div className="App">
        <header className="App-header">臺北市自來水管承裝商業者</header>
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
          {/* {data.map(() => 1)} */}
        </section>
      </div>
    );
  }
}

export default App;
