import React, { Component } from "react";
import Button from "../components/buttons";
import apiHandler from "../utils/apiHandler";
import {Modal} from 'react-bootstrap'


class CompanyPageContent extends Component {
  constructor(props) {
    super(props);
    this.formSubmint = this.formSubmint.bind(this);
    this.deleteMedicineCompany = this.deleteMedicineCompany.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyData:[],
    dataLoaded:false,
    modalDeleteShow:false,
    company_id:undefined,
  };
  async formSubmint(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.saveCompanyData(
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
    let companydata = await apihandler.fetchAllCompany();
    this.setState({companyData:companydata.data.data})
    this.setState({dataLoaded:true});
    console.log(companydata);

  }

  viewCompanyDetails=(company_id)=>{
    console.log(company_id);
    console.log(this.props);
    this.props.history.push("/company/"+company_id);
  }


  async deleteMedicineCompany(company_id){
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.deleteCompany(company_id);
    this.setState({dataLoaded:true});
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.handleDeleteModalClose();
    this.componentDidMount();
  }

  handleDeleteModalShow=(id)=>{
    this.setState({company_id:id})
    this.setState({modalDeleteShow:true})
  }

  handleDeleteModalClose=()=>{
    this.setState({modalDeleteShow:false})
  }
  render() {
    return (
      <>
        <div className="main-content" style={{ minHeight: "549px" }}>
          <section className="section">
            <div className="section-header">
              <h1>Company Page</h1>
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
              onSubmit={this.formSubmint}
            >
              <div className="card-header">
                <h4>Add Company</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Company Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
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
                    ? "Add Company"
                    : "Adding Company Please wait ..."}
                </button>
              </div>
            </form>
          </div>
          {/* for company detail here is the code */}
                <div className="card">
                  <div className="card-header">
                    <h4>All Company </h4>
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
                          <th>License No</th>
                          <th>Address</th>
                          <th>Contact No</th>
                          {/* <th>Email</th> */}
                          <th>Added On</th>
                          <th>Action</th>
                        </tr>
                        {this.state.companyData.map((company,index)=>(
                          <tr key={company.id}> 
                          <td>{company.id}</td>
                          <td>{company.name}</td>
                          <td>{company.license_no}</td>
                          <td>{company.address}</td>
                          <td>{company.contact_no}</td>
                          {/* <td>{company.email}</td> */}
                          <td>{new Date(company.added_on).toLocaleDateString()}</td>
                          {/* <td>{company.added_on}</td> */}
                        <td>
                        <Button
                            className="btn btn-info btn-sm mr-2"
                            onClick={()=>this.viewCompanyDetails(company.id)}
                          >
                            <i className="fas fa-eye"></i>
                          </Button>
                          <Button
                            className="btn btn-danger btn-sm mr-2"
                            onClick={()=>this.handleDeleteModalShow(company.id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Button>

                        </td>
                        
                        </tr>
                        ))}
                      </tbody></table>
                    </div>
                  </div>
                </div>
              
        </div>

        <Modal
                show={this.state.modalDeleteShow}
                keyboard={false}
                animation={true}
                className=""
              >
                
                <Modal.Header>
                  <Modal.Title >Delete Customer Request</Modal.Title>

                  <Button
                    className="close"
                    onClick={this.handleDeleteModalClose}
                  >
                    <span aria-hidden="true" style={{ color: "red" }}>
                      ×
                    </span>
                  </Button>
                </Modal.Header>
                <Modal.Body>
                  <p style={{color:'red'}}>Are You Sure You Want to delete?</p>
                </Modal.Body>
                <Modal.Footer>
                  <div className="text-right">
                    <button
                      className="btn btn-danger btn-sm mr-3"
                      onClick={()=>this.deleteMedicineCompany(this.state.company_id)}
                      type="button"
                    >
                      Yes, Delete
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={this.handleDeleteModalClose}
                      type="button"
                    >
                      Cancle
                    </button>
                  </div>
                </Modal.Footer>
              </Modal>
      </>
    );
  }
}

export default CompanyPageContent;
