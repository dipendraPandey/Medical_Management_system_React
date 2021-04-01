import React, { Component } from "react";
import apiHandler from "../utils/apiHandler";

class CompanyDetailPageContent extends Component {
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
    dataLoaded:false
  };
  async formSubmint(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.editCompanyData(
      this.props.match.params.id,
      event.target.name.value,
      event.target.license_no.value,
      event.target.address.value,
      event.target.contact_no.value,
      event.target.email.value,
      event.target.description.value
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
  }
  // this method works when  Page is Ready
  componentDidMount(){
    this.fetchCompanyData();
  }
  async fetchCompanyData(){
    let apihandler = new apiHandler();
    let companydata = await apihandler.fetchCompanyDetails(this.props.match.params.id);
    console.log(companydata)
    this.setState({companyBankData:companydata.data.data.company_bank})
    this.setState({companyData:companydata.data.data})
    this.setState({dataLoaded:true})

  }

  viewCompanyDetails=(company_id)=>{
    console.log(company_id);
    console.log(this.props);
  }

  addCompanyBank = ()=>{
     this.props.history.push('/companybank/'+this.props.match.params.id);
  }
  
  editCompanyBank = (id)=>{
     this.props.history.push('/editcompanybank/'+""+id+"/");
  }

  render() {
    return (
      <>
        <div className="main-content" style={{ minHeight: "549px" }}>
          <section className="section">
            <div className="section-header">
              <h1>Company Detail Page</h1>
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
            <form
              className="needs-validation"
              noValidate=""
              onSubmit={this.formSubmint}
            >
              <div className="card-header">
                <h4>Edit Company</h4>
              </div>
              {this.state.dataLoaded == false ? (<div className='text-center'>
                    <p className='loader'></p>
                  </div>):''}
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Your Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        defaultValue={this.state.companyData.name}
                        className="form-control"
                        required={true}
                        
                      />
                      <div className="invalid-feedback">Company name?</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Liscense No</label>
                      <input
                        id="license_no"
                        name="license_no"
                        defaultValue={this.state.companyData.license_no}
                        type="text"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Liscense no</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        id="address"
                        name="address"
                        defaultValue={this.state.companyData.address}
                        type="text"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Address</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        id="email"
                        name="email"
                        defaultValue={this.state.companyData.email}
                        type="email"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">email ?</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label>Contact No</label>
                      <input
                        id="contact_no"
                        name="contact_no"
                        defaultValue={this.state.companyData.contact_no}
                        type="number"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Contact No </div>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-0">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    defaultValue={this.state.companyData.description}
                    required={true}
                    style={{
                      marginTop: " 0px",
                      marginBottom: "0px",
                      height: "65px",
                    }}
                  ></textarea>
                  <div className="invalid-feedback">Description </div>
                </div>
              </div>
              <div className="card-footer text-right">
                <button className="btn btn-primary" type="submit">
                  {this.state.btnMessage === 0
                    ? "Edit Company"
                    : "Editing Company Please wait ..."}
                </button>
              </div>
            </form>
          </div>
          {/* for company detail here is the code */}
                <div className="card">
                  <div className="card-header">
                    <h4>Company Bank Details </h4>
                 
                    <div class="card-header-action">
                      <button type='button' className='btn btn-success' onClick={this.addCompanyBank}><i class="fas fa-plus"></i> add bank</button>
                    </div>
                     
                  </div>
                  {this.state.dataLoaded == false ? (<div className='text-center'>
                    <p className='loader'></p>
                  </div>):''}
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped table-md">
                        <tbody><tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Account No</th>
                          {/* <th>Address</th>
                          <th>Contact No</th>
                          <th>Email</th> */}
                          <th>Added On</th>
                          <th>Action</th>
                        </tr>
                        {this.state.companyBankData.map((bank)=>(
                          <tr key={bank.id}> 
                          <td>{bank.id}</td>
                          <td>NIC Asia</td>
                          <td>{bank.bank_account_no}</td>
                          <td>{new Date(bank.added_on).toLocaleDateString()}</td>

                        <td><a href="#" className="btn btn-warning mr-3" onClick={()=>this.editCompanyBank(bank.id)}>Edit</a>
                        <a href="#" className="btn btn-danger" onClick={()=>this.viewCompanyDetails(bank.id)}>Delete</a>
                        </td>
                        </tr>
                        ))}
                      </tbody></table>
                    </div>
                  </div>
                </div>
        </div>
      </>
    );
  }
}

export default CompanyDetailPageContent;
