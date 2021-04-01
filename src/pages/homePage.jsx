import React, { Component } from "react";
import apiHandler from "../utils/apiHandler";

class HomePageContent extends Component {
  constructor(props) {
    super(props);
    this.fetchHomeData = this.fetchHomeData.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    homeData: [],
    dataLoaded: false,
  };

  componentDidMount() {
    this.fetchHomeData();
  }
  async fetchHomeData() {
    let apihandler = new apiHandler();
    let homedata = await apihandler.homePageData();
    this.setState((state) => ({
      ...state,
      homeData: homedata.data,
      dataLoaded: true
    }))
    console.log(homedata.data);
  }

  render() {
    return (
      <div className="main-content" style={{ minHeight: "549px" }}>
        <section className="section">
          <div className="section-header">
            <h1>Home page</h1>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-primary">
                  <i className="far fa-user"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Total Request</h4>
                  </div>
                  <div className="card-body" style={{ fontSize: "18px" }}>
                    {this.state.homeData.total_request}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-danger">
                  <i className="far fa-newspaper"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Total Medicines</h4>
                  </div>
                  <div className="card-body" style={{ fontSize: "18px" }}>
                    {this.state.homeData.total_medicine}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-warning">
                  <i className="far fa-file"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Total Company</h4>
                  </div>
                  <div className="card-body" style={{ fontSize: "18px" }}>
                    {this.state.homeData.total_company}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-success">
                  <i className="fas fa-circle"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header pr-0">
                    <h4>Total Employees</h4>
                  </div>
                  <div className="card-body" style={{ fontSize: "18px" }}>
                    {this.state.homeData.employee_number}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-primary">
                  <i className="far fa-user"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header pr-0">
                    <h4>Total Salse Amount</h4>
                  </div>
                  <div className="card-body pr-0" style={{ fontSize: "18px" }}>
                    Rs:{this.state.homeData.total_sell_amount}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-danger">
                  <i className="far fa-newspaper"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Total Profit</h4>
                  </div>
                  <div className="card-body" style={{ fontSize: "18px" }}>
                    Rs:{this.state.homeData.total_profit}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-warning">
                  <i className="far fa-file"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header pr-0">
                    <h4>Todays Salaes Amount</h4>
                  </div>
                  <div className="card-body pr-0" style={{ fontSize: "18px" }}>
                  Rs:{this.state.homeData.today_total_sell}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="card card-statistic-1">
                <div className="card-icon bg-success">
                  <i className="fas fa-circle"></i>
                </div>
                <div className="card-wrap">
                  <div className="card-header">
                    <h4>Todays Profit</h4>
                  </div>
                  <div className="card-body" style={{ fontSize: "18px" }}>
                  Rs:{this.state.homeData.today_total_profit}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomePageContent;
