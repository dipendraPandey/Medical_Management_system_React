import React, { Component } from "react";
import apiHandler from "../utils/apiHandler";
import { Modal } from "react-bootstrap";
import Button from "../components/buttons";

class customerRequestComponents extends Component {
  constructor(props) {
    super(props);
    this.formSubmint = this.formSubmint.bind(this);
    this.fetchCustomerData = this.fetchCustomerData.bind(this);
    this.handleCustomerDataUpdate = this.handleCustomerDataUpdate.bind(this);
    this.handleCustomerDelete = this.handleCustomerDelete.bind(this);
    this.formRef = React.createRef();
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    customerData: [],
    singleCustomerData: [],
    dataLoaded: false,
    modalShow: false,
    modalDeleteShow: false,
    checkbox: undefined,
  };
  // this component loads data when the components are loaded
  componentDidMount() {
    this.fetchCustomerData();
  }

  async fetchCustomerData() {
    let apihandler = new apiHandler();
    let customerdata = await apihandler.fetchCustomerRequestData();
    this.setState({ customerData: customerdata.data.data });
    this.setState({ dataLoaded: true });
    console.log(customerdata);
  }

  async formSubmint(event) {
    event.preventDefault();
    console.log(event.target.customer_name.value);
    console.log(event.target.phone_no.value);
    console.log(event.target.medicine_detail.value);
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.saveCustomerRequest(
      event.target.customer_name.value,
      event.target.phone_no.value,
      event.target.medicine_detail.value
    );
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.fetchCustomerData();
    this.formRef.current.reset();
  }

  handelModalClose = () => {
    this.setState({ modalShow: false });
  };

  handelDeleteModalClose = () => {
    this.setState({ modalDeleteShow: false });
  };
  handleDeleteModalShow = (index) => {
    this.setState({ singleCustomerData: this.state.customerData[index] });
    this.setState({ modalDeleteShow: true });
  };


  handleModalShow = (index) => {
    console.log(this.state.customerData[index]);
    this.setState({ singleCustomerData: this.state.customerData[index] });
    this.setState({ checkbox: this.state.customerData[index].statue });
    this.setState({ modalShow: true });
  };

  handleCheckbox = (value) => {
    this.setState({ checkbox: !value });
    this.setState({});
  };

  async handleCustomerDelete() {
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let customerdata = await apihandler.deleteCustomerRequest(
      this.state.singleCustomerData.id
    );
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: customerdata.data.error });
    this.setState({ errorMessage: customerdata.data.message });
    this.handelDeleteModalClose();
    this.fetchCustomerData();
  }

  async handleCustomerDataUpdate(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let customerdata = await apihandler.updateCustomerRequest(
      this.state.singleCustomerData.id,
      event.target.customer_name.value,
      event.target.phone.value,
      event.target.medicine_detail.value,
      this.state.checkbox,
      this.state.singleCustomerData.added_on
    );
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: customerdata.data.error });
    this.setState({ errorMessage: customerdata.data.message });
    this.handelModalClose();
    this.fetchCustomerData();
  }

  render() {
    return (
      <>
        <div className="main-content" style={{ minHeight: "549px" }}>
          <section className="section">
            <div className="section-header">
              <h1>Manage Customer Request</h1>
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
              ref={this.formRef}
            >
              <div className="card-header">
                <h4>Customer Request Details</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Customer Name:</label>
                      <input
                        id="customer_name"
                        name="customer_name"
                        type="text"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Medicine name?</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Phone Number:</label>
                      <input
                        id="phone_no"
                        name="phone_no"
                        type="text"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Medicine Type ?</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Medicine Details</label>
                      <input
                        id="medicine_detail"
                        name="medicine_detail"
                        type="text"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Phone No ?</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center pt-0">
                <button className="btn btn-primary col-12" type="submit">
                  {this.state.btnMessage === 0
                    ? "Add Request"
                    : "Adding Request Please wait ..."}
                </button>
              </div>
            </form>
          </div>
          <div className="card">
            <div className="card-header">
              <h4>Customer Request List</h4>
            </div>
            {this.state.dataLoaded == false ? (
              <div className="text-center">
                <p className="loader"></p>
              </div>
            ) : (
              ""
            )}

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Medicine Details</th>
                      <th>Requested on</th>
                      <th>status</th>
                      <th>Action</th>
                    </tr>
                    {this.state.customerData.map((customer, index) => (
                      <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.customer_name}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.medicine_detail}</td>
                        <td>
                          {new Date(customer.added_on).toLocaleDateString()}
                        </td>
                        <td>
                          {customer.statue == false ? (
                            <span className="badge badge-warning">pending</span>
                          ) : (
                            <span className="badge badge-success">
                              completed
                            </span>
                          )}
                        </td>
                        <td>
                          <Button
                            className="btn btn-warning btn-sm mr-2"
                            onClick={() => this.handleModalShow(index)}
                          >
                            <i className="fas fa-eye"></i>
                          </Button>
                          <Button
                            className="btn btn-danger btn-sm mr-2"
                            onClick={()=>this.handleDeleteModalShow(index)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Modal for the customer edit  */}
          <Modal
            show={this.state.modalShow}
            keyboard={false}
            animation={true}
            className=""

            // className={this.state.modalProgress == true ?"modal-progre":''}
          >
            <Modal.Header>
              <Modal.Title>Update Customer request</Modal.Title>

              <Button className="close" onClick={this.handelModalClose}>
                <span aria-hidden="true" style={{ color: "red" }}>
                  ×
                </span>
              </Button>
            </Modal.Header>
            <Modal.Body>
              <form
                className="needs-validation "
                onSubmit={this.handleCustomerDataUpdate}
              >
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Customer Name</label>
                      <input
                        id="customer_name"
                        name="customer_name"
                        type="text"
                        disabled
                        defaultValue={
                          this.state.singleCustomerData.customer_name
                        }
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Customer name?</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="number"
                        disabled
                        defaultValue={this.state.singleCustomerData.phone}
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Phone Number ?</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Medicine details</label>
                      <input
                        id="medicine_detail"
                        name="medicine_detail"
                        type="text"
                        defaultValue={
                          this.state.singleCustomerData.medicine_detail
                        }
                        disabled
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Medicine details?</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Status</label>
                      <label className="custom-switch mt-2">
                        <input
                          type="checkbox"
                          name="custom-switch-checkbox"
                          className="custom-switch-input"
                          onClick={() =>
                            this.handleCheckbox(this.state.checkbox)
                          }
                          checked={this.state.checkbox}
                        />
                        <span className="custom-switch-description">
                          Pending
                        </span>
                        <span className="custom-switch-indicator"></span>
                        <span className="custom-switch-description">
                          Completed
                        </span>
                      </label>
                      <div className="invalid-feedback">Status?</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    className="btn btn-primary btn-sm mr-3"
                    type="subbmit"
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={this.handelModalClose}
                    type="button"
                  >
                    Cancle
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>

          {/* delete customer modeal */}
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
                    onClick={this.handelDeleteModalClose}
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
                      onClick={this.handleCustomerDelete}
                      type="button"
                    >
                      Yes, Delete
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={this.handelDeleteModalClose}
                      type="button"
                    >
                      Cancle
                    </button>
                  </div>
                </Modal.Footer>
              </Modal>
        </div>
      </>
    );
  }
}

export default customerRequestComponents;
