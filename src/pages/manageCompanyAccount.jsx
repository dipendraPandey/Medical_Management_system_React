import React, { Component } from "react";
import apiHandler from "../utils/apiHandler";

class mangeCompanyAccount extends Component {
  constructor(props) {
    super(props);
    this.formSubmint = this.formSubmint.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyAccountDataList: [],
    companyData: [],
    dataLoaded: false,
  };
  async formSubmint(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.addCompanyTransactionData(
      event.target.company_id.value,
      event.target.transaction_type.value,
      event.target.transaction_amount.value,
      event.target.transaction_date.value,
      event.target.payment_mode.value,
    );
    console.log(this.state.companyAccountDataList);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
  }
  // this method works when  Page is Ready
  componentDidMount() {
    this.fetchCompanyAccountDataList();
  }
  async fetchCompanyAccountDataList() {
    let apihandler = new apiHandler();
    let accountdatalist = await apihandler.fetchAllCompanyAccountData();
    let companydata = await apihandler.fetchAllCompany();
    this.setState({ companyAccountDataList: accountdatalist.data.data });
    this.setState({ dataLoaded: true });
    this.setState({ companyData: companydata.data.data });
    console.log(this.state.companyAccountDataList);
  }

  viewCompanyDetails = (company_id) => {
    console.log(company_id);
    console.log(this.props);
    this.props.history.push("/company/" + company_id);
  };

  deleteCompany = (company_id) => {
    this.props.history.push("/deleteCompany/" + company_id);
  };
  render() {
    return (
      <>
        <div className="main-content" style={{ minHeight: "549px" }}>
          <section className="section">
            <div className="section-header">
              <h1>Manage Company Account</h1>
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
            <form className="needs-validation" onSubmit={this.formSubmint}>
              <div className="card-header">
                <h4>Add Company Account Bills</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Medicine Company</label>
                      <select
                        className="form-control"
                        id="company_id"
                        name="company_id"
                      >
                        <option>-----</option>
                        {this.state.companyData.map((company) => (
                          <option key={company.id} value ={company.id}>{company.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                  <div className="form-group">
                      <label>Transaction Type</label>
                      <select
                        className="form-control"
                        id="transaction_type"
                        name="transaction_type"
                      >
                        <option>-----</option>
                          <option  value ='DEBIT'>Debit</option>
                          <option  value ='CREDIT'>Credit</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label>Transaction Amount</label>
                      <input
                        id="transaction_amount"
                        name="transaction_amount"
                        type="number"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Transaction Amount</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label>Transaction Date</label>
                      <input
                        id="transaction_date"
                        name="transaction_date"
                        type="date"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Transaction Date ?</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label>Payment Mode</label>
                      <input
                        id="payment_mode"
                        name="payment_mode"
                        type="text"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Payment Mode?</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-right">
                <button className="btn btn-primary" type="submit">
                  {this.state.btnMessage === 0
                    ? "Add Transaction"
                    : "Adding Transaction Please wait ..."}
                </button>
              </div>
            </form>
          </div>
          {/* for company detail here is the code */}
          <div className="card">
            <div className="card-header">
              <h4>All Companise Account Transaction </h4>
            </div>
            {this.state.dataLoaded == false ? (
              <div className="text-center">
                <p className="loader"></p>
              </div>
            ) : (
              ""
            )}

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-sm" >
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <th>Company Name</th>
                      <th>Transaction Type</th>
                      <th>Transaction Amount</th>
                      <th>Payment Mode</th>
                      <th>Transaction Date</th>
                      <th >Action</th>
                    </tr>
                    {this.state.companyAccountDataList.map((companyaccount) => (
                      <tr key={companyaccount.id}>
                        <td>{companyaccount.id}</td>
                        <td>{companyaccount.medicinecompany.name}</td>
                        <td>{companyaccount.transaction_type}</td>
                        <td>{companyaccount.transaction_amount}</td>
                        <td>{companyaccount.payment_mode}</td>
                        <td>
                          {new Date(
                            companyaccount.transaction_date
                          ).toLocaleDateString()}
                        </td>
                        <td>
                        <div className="buttons">
                          <button
                            className="btn btn-icon btn-sm btn-primary"
                            onClick={() => this.viewMedicineDetails(companyaccount.id)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-icon btn-sm btn-danger"
                            onClick={() => this.deleteMedicine(companyaccount.id)}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default mangeCompanyAccount;
