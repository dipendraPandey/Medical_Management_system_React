import React, { Component } from "react";
import Button from "../components/buttons";
import apiHandler from "../utils/apiHandler";


class employeeComponents extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    employeeData:[],
    dataLoaded:false,
  };
  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.addEmployees(
      event.target.name.value,
      event.target.joining_date.value,
      event.target.phone.value,
      event.target.address.value,
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.updatePageContent()
  }

  updatePageContent(){
    this.componentDidMount();
  }
  // this method works when  Page is Ready
  componentDidMount(){
    this.fetchEmployeesData();
  }
  async fetchEmployeesData(){
    let apihandler = new apiHandler();
    let employeesdata = await apihandler.fetchAllEmployee();
    this.setState({employeeData:employeesdata.data.data})
    this.setState({dataLoaded:true});
   

  }

  viewemployeeDetails=(eid)=>{
    this.props.history.push("/employees/"+eid);
  }

  deleteCompany=(company_id)=>{
    this.props.history.push('/deleteCompany/'+company_id)
  }
  render() {
    return (
      <>
        <div className="main-content" style={{ minHeight: "549px" }}>
          <section className="section">
            <div className="section-header">
              <h1>Employess Page</h1>
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
              onSubmit={this.formSubmit}
            >
              <div className="card-header">
                <h4>Add Employee</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Emplyee Name</label>
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
                      <label>Join Date</label>
                      <input
                        id="joining_date"
                        name="joining_date"
                        type="date"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Join date</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
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
                  <div className="col-6">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        type="phone"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">phone ?</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-right">
                <button className="btn btn-primary" type="submit">
                  {this.state.btnMessage === 0
                    ? "Add employee"
                    : "Adding employee Please wait ..."}
                </button>
              </div>
            </form>
          </div>
          {/* for company detail here is the code */}
                <div className="card">
                  <div className="card-header">
                    <h4>All Employees </h4>
                  </div>
                  {this.state.dataLoaded === false ? (<div className='text-center'>
                    <p className='loader'></p>
                  </div>):''}
                  
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped table-md">
                        <tbody><tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Address</th>
                          <th>Join Date</th>
                          <th>Action</th>
                        </tr>
                        {this.state.employeeData.map((employee)=>(
                          <tr key={employee.id}> 
                          <td>{employee.id}</td>
                          <td>{employee.name}</td>
                          <td>{employee.phone}</td>
                          <td>{employee.address}</td>
                          {/* <td>{employee.email}</td> */}
                          <td>{new Date(employee.joining_date).toLocaleDateString()}</td>
                          {/* <td>{company.added_on}</td> */}
                        <td><div className="buttons">
                          <Button
                            className="btn btn-icon btn-sm btn-primary"
                            onClick={() => this.viewemployeeDetails(employee.id)}
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button
                            className="btn btn-icon btn-sm btn-danger"
                            onClick={() => this.deleteMedicine(employee.id)}
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </div></td>
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

export default employeeComponents;
