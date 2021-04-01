import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../utils/apiHandler";

class companyBankPage extends Component {
  constructor(props) {
    super(props);
    this.formSubmint = this.formSubmint.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyBankData:[],
    companyData:[],
  };
  async formSubmint(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.addBankData(
      this.props.match.params.id,
      event.target.account_no.value,
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
  }
  

  viewCompanyDetails=(company_id)=>{
    console.log(company_id);
    console.log(this.props);
  }
  render() {
    return (
      <>
        <div className="main-content" style={{ minHeight: "549px" }}>
          <section className="section">
            <div className="section-header">
              <h1>Company Add Bank Page</h1>
            </div>
          </section>
          {this.state.errorRes === false && this.state.sendData === true ? (
                <div className="alert alert-success alert-has-icon">
                  <div className="alert-icon">
                    <i className="far fa-lightbulb"></i>
                  </div>
                  <div className="alert-body">
                    <div className="alert-title">Success(◕‿◕)</div>
                    {this.state.errorMessage}
                    <Link to={'/company/'+this.props.match.params.id} className='btn btn-secondary'>Company Detail</Link>
                  </div>
                  
                </div>
              ) : (
                ""
              )}
              {this.state.errorRes === true && this.state.sendData === true ? (
                <div className="alert alert-danger alert-has-icon">
                  <div className="alert-icon">
                    <i className="far fa-lightbulb"></i>
                  </div>
                  <div className="alert-body">
                    <div className="alert-title">Error(◔̯◔)</div>
                    {this.state.errorMessage}
                  </div>
                </div>
              ) : (
                ""
              )}
          <div className="card">
            <form
              className="needs-validation"
              noValidate=""
              onSubmit={this.formSubmint}
            >
              <div className="card-header">
                <h4>Add Bank #{this.props.match.params.id}</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label>Account Number</label>
                      <input
                        id="account_no"
                        name="account_no"
                        type="text"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Account Number?</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-right">
                <button className="btn btn-primary" type="submit">
                  {this.state.btnMessage === 0
                    ? "Add bank"
                    : "Adding BankPlease wait ..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default companyBankPage;
