import React, { Component } from "react";
import tapImg from "./static/tap.png";
import "./App.css";
import axios from "axios";
const corsServer = `http://45.32.119.183:8080/`;
const tapwaterDataUrl = `http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=6805942d-a8dd-4635-a394-01a8eadb3eba`;

// http://data.taipei/opendata/datalist/apiAccess?scope=datasetMetadataSearch
// &q=臺北市文化快遞資訊&sort=metadata_created desc

// http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire
// &rid=35aa3c53-28fb-423c-91b6-2c22432d0d70&limit=3&offset=5

const LoadingImg = () => (
  <figure className="loading-div">
    <img alt="loading-icon" className="spin" src={tapImg} />{" "}
  </figure>
);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      offset: 0,
      data: [],
      count: 0,
      isLoading: false,
      sortKey: "_id",
      isReverseSort: false
    };
  }
  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      previousState.limit !== this.state.limit ||
      previousState.offset !== this.state.offset ||
      previousState.sortKey !== this.state.sortKey ||
      previousState.isReverseSort !== this.state.isReverseSort
    ) {
      this.getData();
    }
  }
  onSort = sortKey => {
    const isReverseSort =
      sortKey === this.state.sortKey
        ? !this.state.isReverseSort
        : this.state.isReverseSort;
    this.setState({
      sortKey,
      isReverseSort
    });
  };
  getData = async (limit = 10, offset = 0) => {
    this.setState({
      isLoading: true
    });
    const { sortKey, isReverseSort } = this.state;
    const orderString = isReverseSort ? "desc" : "asc";
    const baseURL = `${corsServer}${tapwaterDataUrl}`;
    const query = `${baseURL}&limit=${
      this.state.limit
    }&offset=${offset}&sort=${sortKey} ${orderString}`;
    let { data: { result } } = await axios.get(query);

    const { count, results: data } = result;

    this.setState({ data, count, isLoading: false });
  };
  onLimitChange = async e => {
    this.setState({
      limit: e.target.value
    });
  };
  render() {
    const { data, sortKey, isReverseSort, isLoading } = this.state;
    return (
      <div className="App">
        <header className="App-header">臺北市自來水管承裝商業者</header>
        <small>
          tap water icon from{" "}
          <a href="https://www.flaticon.com/free-icon/tap_752006#term=tap&page=1&position=8">
            flaticon
          </a>
        </small>
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
          <span>{/* {"<<"} 上一頁 下一頁{">>"} */}</span>
        </nav>

        <section className="table">
          {data.length > 0 && (
            <div className="table-header">
              <span
                onClick={() => {
                  this.onSort("_id");
                }}
              >
                {sortKey === "_id" ? (isReverseSort ? " ↓ " : " ↑ ") : ""}
                ID
              </span>
              <span
                onClick={() => {
                  this.onSort("NAME");
                }}
              >
                {sortKey === "NAME" ? (isReverseSort ? " ↓ " : " ↑ ") : ""}
                NAME
              </span>
              <span
                onClick={() => {
                  this.onSort("COMNUM");
                }}
              >
                {sortKey === "COMNUM" ? (isReverseSort ? " ↓ " : " ↑ ") : ""}
                COMNUM
              </span>
              <span
                onClick={() => {
                  this.onSort("ADDR");
                }}
              >
                {sortKey === "ADDR" ? (isReverseSort ? " ↓ " : " ↑ ") : ""}
                ADDR
              </span>
              <span
                onClick={() => {
                  this.onSort("OWNER");
                }}
              >
                {sortKey === "OWNER" ? (isReverseSort ? " ↓ " : " ↑ ") : ""}
                OWNER
              </span>
            </div>
          )}
          {isLoading ? (
            <LoadingImg />
          ) : (
            data.map(ele => (
              <div key={ele._id}>
                <span>{ele._id}</span>
                <span>{ele.NAME}</span>
                <span>{ele.COMNUM}</span>
                <span>{ele.ADDR}</span>
                <span>{ele.OWNER}</span>
              </div>
            ))
          )}
        </section>
      </div>
    );
  }
}

export default App;
