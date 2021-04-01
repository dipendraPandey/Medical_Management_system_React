import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Button from "../components/buttons";
import Notification from "../components/Notification";
import apiHandler from "../utils/apiHandler";

class employeeDetailsComponents extends Component {
  constructor(props) {
    super(props);
    this.formSubmint = this.formSubmint.bind(this);
    this.handleSalaryModalSubmit = this.handleSalaryModalSubmit.bind(this);
    this.handleModalUpdate = this.handleModalUpdate.bind(this);
    this.handelDeleteSalaryModalSubmit = this.handelDeleteSalaryModalSubmit.bind(
      this
    );
    this.handleBankModalSubmit = this.handleBankModalSubmit.bind(this);
    this.handleDeleteBankModalSubmit = this.handleDeleteBankModalSubmit.bind(
      this
    );
    this.handleBankModalUpdate = this.handleBankModalUpdate.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    employeeSalaryInfoList: [],
    employeeBankInfoList: [],
    employee: [],
    index: -1,
    indexbank: -1,
    dataLoaded: false,
    modalShow: false,
    modalDeleteShow: false,
    modalProgress: false,
    deleteSalaryId: undefined,
    deleteBankId: undefined,
    bankModalShow: false,
    bankModalDeleteShow: false,
  };

  // this method works when  Page is Ready
  updatePageData = () => {
    this.componentDidMount();
  };

  componentDidMount() {
    this.fetchEmployeesData();
  }
  async fetchEmployeesData() {
    let apihandler = new apiHandler();
    let employesalary = await apihandler.fetchEmployeeSalaryInfo(
      this.props.match.params.id
    );
    let employeedetails = await apihandler.fetchEmployeeDetails(
      this.props.match.params.id
    );
    let employeebankdetails = await apihandler.fetchEmployeeBankDetails(
      this.props.match.params.id
    );

    this.setState({ employeeSalaryInfoList: employesalary.data.data });
    this.setState({ employeeBankInfoList: employeebankdetails.data.data });
    this.setState({ employee: employeedetails.data.data });
    this.setState({ dataLoaded: true });
  }

  // All Modal close function listed here
  handleModalClose = () => {
    this.setState({ modalShow: false });
    this.setState({ index: -1 });
  };

  handleBankModalClose = () => {
    this.setState({ bankModalShow: false });
    this.setState({ indexbank: -1 });
  };

  handleDeleteModalClose = () => {
    this.setState({ modalDeleteShow: false });
  };

  handleDeleteBankModalClose = () => {
    this.setState({ bankModalDeleteShow: false });
  };

  // All modal Show function listed here
  handleModalShow = () => {
    this.setState({ modalShow: true });
  };
  handleBankModalShow = () => {
    this.setState({ bankModalShow: true });
  };

  handleDeleteModalShow = (id) => {
    this.setState({ modalDeleteShow: true });
    this.setState({ deleteSalaryId: id });
  };
  handleDeleteBankModalShow = (id) => {
    this.setState({ bankModalDeleteShow: true });
    this.setState({ deleteBankId: id });
  };

  handleModalShowEdit = (id) => {
    this.setState({ index: id });

    this.setState({ modalShow: true });
  };

  handleBankModalShowEdit = (id) => {
    console.log(this.state.employeeBankInfoList[id]);
    this.setState({ indexbank: id });
    console.log(this.state.indexbank);
    this.setState({ bankModalShow: true });
  };

  // All modal submit function herer

  async formSubmint(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.updateEmployeeDetails(
      this.props.match.params.id,
      event.target.name.value,
      event.target.joining_date.value,
      event.target.phone.value,
      event.target.address.value
    );
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
  }

  async handleSalaryModalSubmit(e) {
    e.preventDefault();

    this.setState({ modalProgress: true });
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.addEmployeeSalary(
      this.props.match.params.id,
      e.target.salary_date.value,
      e.target.salary_amount.value,
      e.target.salary.value
    );

    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ modleProgress: false });
    this.handleModalClose();
    this.updatePageData();
  }

  async handelDeleteSalaryModalSubmit() {
    this.setState({ modalProgress: true });
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.deleteEmployeeSalary(
      this.state.deleteSalaryId
    );

    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ modleProgress: false });
    this.handleDeleteModalClose();
    this.updatePageData();
    this.setState({ deleteSalaryId: undefined });
  }

  async handelDeleteBankModalSubmit() {
    this.setState({ modalProgress: true });
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.deleteEmployeeSalary(
      this.state.deleteBankId
    );

    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ modleProgress: false });
    this.handleDeleteModalClose();
    this.updatePageData();
    this.setState({ deleteSalaryId: undefined });
  }

  async handleDeleteBankModalSubmit() {
    this.setState({ modalProgress: true });
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.deleteEmployeeBank(this.state.deleteBankId);

    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ modleProgress: false });
    this.handleDeleteBankModalClose();
    this.updatePageData();
    this.setState({ deleteBankId: undefined });
  }

  async handleBankModalSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.addEmployeeBankDetails(
      this.props.match.params.id,
      event.target.bank_account_no.value
    );

    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.updatePageData();
    this.handleBankModalClose();
  }

  // All modal update function here

  async handleModalUpdate(e) {
    e.preventDefault();

    this.setState({ modalProgress: true });
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.updateEmployeeSalary(
      this.state.employeeSalaryInfoList[this.state.index].id,
      this.props.match.params.id,
      e.target.salary_date.value,
      e.target.salary_amount.value,
      e.target.salary.value
    );

    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ modleProgress: false });
    this.handleModalClose();
    this.updatePageData();
  }

  async handleBankModalUpdate(e) {
    e.preventDefault();
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.updateEmployeeBank(
      this.state.employeeBankInfoList[this.state.indexbank].id,
      this.props.match.params.id,
      e.target.bank_account_no.value
    );

    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.updatePageData();
    this.handleBankModalClose();
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
            <Notification
              className="success"
              title="Success (◕‿◕)"
              message={this.state.errorMessage}
            ></Notification>
          ) : (
            ""
          )}
          {this.state.errorRes === true && this.state.sendData === true ? (
            <Notification
              className="danger"
              title="Error (◔̯◔) "
              message={this.state.errorMessage}
            ></Notification>
          ) : (
            ""
          )}
          <div className="card">
            <form className="needs-validation" onSubmit={this.formSubmint}>
              <div className="card-header">
                <h4>Edit Employee</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Emplyee Name</label>
                      <input
                        id="name"
                        name="name"
                        defaultValue={this.state.employee.name}
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
                        defaultValue={this.state.employee.joining_date}
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
                        defaultValue={this.state.employee.address}
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
                        defaultValue={this.state.employee.phone}
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
                    ? "Update employee"
                    : "Updating employee Please wait ..."}
                </button>
              </div>
            </form>
          </div>

          {/* ********************************************************************************************************************/}
          {/* ********************************************************************************************************************/}
          {/* ********************************************************************************************************************/}
          {/* Employee Bank details lists */}

          <div className="card">
            <div className="card-header">
              <h4>Employees Bank Details</h4>
              <div className="card-header-action">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.handleBankModalShow}
                >
                  <i className="fas fa-plus"></i> add Bank
                </button>
              </div>

              {/* Employee Salary Modals herer */}
              <Modal
                show={this.state.bankModalShow}
                keyboard={false}
                animation={true}
                className=""

                // className={this.state.modalProgress == true ?"modal-progre":''}
              >
                <Modal.Header>
                  <Modal.Title>
                    {this.state.indexbank + 1 > 0
                      ? "Update Employee Bank Details"
                      : "Add Employee Bank Details"}
                  </Modal.Title>

                  <Button className="close" onClick={this.handleBankModalClose}>
                    <span aria-hidden="true" style={{ color: "red" }}>
                      ×
                    </span>
                  </Button>
                </Modal.Header>
                <Modal.Body>
                  <form
                    className="needs-validation "
                    onSubmit={
                      this.state.indexbank + 1 > 0
                        ? this.handleBankModalUpdate
                        : this.handleBankModalSubmit
                    }
                  >
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label>Emplyee Name</label>
                          <input
                            id="name"
                            name="name"
                            defaultValue={this.state.employee.name}
                            type="text"
                            disabled
                            className="form-control"
                            required={true}
                          />
                          <div className="invalid-feedback">Company name?</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Account No</label>
                          <input
                            id="bank_account_no"
                            name="bank_account_no"
                            type="text"
                            className="form-control"
                            defaultValue={
                              this.state.indexbank + 1 > 0
                                ? this.state.employeeBankInfoList[
                                    this.state.indexbank
                                  ].bank_account_no
                                : ""
                            }
                            required={true}
                          />
                          <div className="invalid-feedback">Account No ?</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        className="btn btn-primary btn-sm mr-3"
                        type="submit"
                      >
                        {this.state.indexbank + 1 > 0 ? "Update" : "Add"}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={this.handleBankModalClose}
                        type="button"
                      >
                        Cancle
                      </button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>

              {/* ************************************************************************************************** */}
              {/* ************************************************************************************************** */}

              {/* deleting the Employee Bank data Modal */}

              <Modal
                show={this.state.bankModalDeleteShow}
                keyboard={false}
                animation={true}
                className=""
              >
                <Modal.Header>
                  <Modal.Title>Delete Bank information</Modal.Title>

                  <Button
                    className="close"
                    onClick={this.handleDeleteBankModalClose}
                  >
                    <span aria-hidden="true" style={{ color: "red" }}>
                      ×
                    </span>
                  </Button>
                </Modal.Header>
                <Modal.Body>
                  <p style={{ color: "red" }}>
                    Are You Sure You Want to delete?
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <div className="text-right">
                    <button
                      className="btn btn-danger btn-sm mr-3"
                      onClick={this.handleDeleteBankModalSubmit}
                      type="button"
                    >
                      Yes, Delete
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={this.handleDeleteBankModalClose}
                      type="button"
                    >
                      Cancle
                    </button>
                  </div>
                </Modal.Footer>
              </Modal>

              {/*  */}
            </div>
            {this.state.dataLoaded === false ? (
              <div className="text-center">
                <p className="loader"></p>
              </div>
            ) : (
              ""
            )}

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-md">
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <th>Added Date</th>
                      <th>Bank Name</th>
                      <th>Account No</th>
                      <th>Action</th>
                    </tr>
                    {this.state.employeeBankInfoList.map((bank, index) => (
                      <tr key={bank.id}>
                        <td>{bank.id}</td>
                        <td>{new Date(bank.added_on).toLocaleDateString()}</td>
                        <td>Nic Asia</td>
                        <td>{bank.bank_account_no}</td>
                        <td>
                          <div className="buttons">
                            <button
                              className="btn btn-icon btn-sm btn-primary"
                              onClick={() =>
                                this.handleBankModalShowEdit(index)
                              }
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-icon btn-sm btn-danger"
                              onClick={() =>
                                this.handleDeleteBankModalShow(bank.id)
                              }
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
          {/* ************************************************************************************************** */}
          {/* ************************************************************************************************** */}
          {/* ************************************************************************************************** */}

          {/* for Employee detail here is the code */}
          <div className="card">
            <div className="card-header">
              <h4>Employees Salary</h4>
              <div className="card-header-action">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.handleModalShow}
                >
                  <i className="fas fa-plus"></i> add salary
                </button>
              </div>

              {/*  */}
              <Modal
                show={this.state.modalShow}
                // onHide={this.handleModalClose}
                keyboard={false}
                animation={true}
                className=""

                // className={this.state.modalProgress == true ?"modal-progre":''}
              >
                <Modal.Header>
                  <Modal.Title>
                    {this.state.index + 1 > 0
                      ? "Update Employee Salary details"
                      : "Add Employee Salary details"}
                  </Modal.Title>

                  <Button className="close" onClick={this.handleModalClose}>
                    <span aria-hidden="true" style={{ color: "red" }}>
                      ×
                    </span>
                  </Button>
                </Modal.Header>
                <Modal.Body>
                  <form
                    className="needs-validation "
                    onSubmit={
                      this.state.index + 1 > 0
                        ? this.handleModalUpdate
                        : this.handleSalaryModalSubmit
                    }
                  >
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label>Emplyee Name</label>
                          <input
                            id="name"
                            name="name"
                            defaultValue={this.state.employee.name}
                            type="text"
                            disabled
                            className="form-control"
                            required={true}
                          />
                          <div className="invalid-feedback">Company name?</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Salary Date</label>
                          <input
                            id="salary_date"
                            name="salary_date"
                            type="date"
                            className="form-control"
                            defaultValue={
                              this.state.index + 1 > 0
                                ? this.state.employeeSalaryInfoList[
                                    this.state.index
                                  ].salary_date
                                : ""
                            }
                            required={true}
                          />
                          <div className="invalid-feedback">Salary date</div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label>Salary Amount</label>
                          <input
                            id="salary_amount"
                            name="salary_amount"
                            type="text"
                            defaultValue={
                              this.state.index + 1 > 0
                                ? this.state.employeeSalaryInfoList[
                                    this.state.index
                                  ].salary_amount
                                : ""
                            }
                            className="form-control"
                            required={true}
                          />
                          <div className="invalid-feedback">Salary Amount</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Salary</label>
                          <input
                            id="salary"
                            name="salary"
                            type="text"
                            className="form-control"
                            defaultValue={
                              this.state.index + 1 > 0
                                ? this.state.employeeSalaryInfoList[
                                    this.state.index
                                  ].salary
                                : ""
                            }
                            required={true}
                          />
                          <div className="invalid-feedback">Salary</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        className="btn btn-primary btn-sm mr-3"
                        type="submit"
                      >
                        {this.state.index + 1 > 0 ? "Update" : "Add"}
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={this.handleModalClose}
                        type="button"
                      >
                        Cancle
                      </button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>

              {/* ************************************************************************************************** */}
              {/* ************************************************************************************************** */}

              {/* deleting the salary data Modal */}

              <Modal
                show={this.state.modalDeleteShow}
                keyboard={false}
                animation={true}
                className=""
              >
                <Modal.Header>
                  <Modal.Title>Delete Employee Salary</Modal.Title>

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
                  <p style={{ color: "red" }}>
                    Are You Sure You Want to delete ?
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <div className="text-right">
                    <button
                      className="btn btn-danger btn-sm mr-3"
                      onClick={this.handelDeleteSalaryModalSubmit}
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

              {/*  */}
            </div>
            {this.state.dataLoaded === false ? (
              <div className="text-center">
                <p className="loader"></p>
              </div>
            ) : (
              ""
            )}

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-md">
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <th>Salary Date</th>
                      <th>Salary Amount</th>
                      <th>Salary</th>
                      <th>Given Date</th>
                      <th>Action</th>
                    </tr>
                    {this.state.employeeSalaryInfoList.map((salary, index) => (
                      <tr key={salary.id}>
                        <td>{salary.id}</td>
                        <td>
                          {new Date(salary.salary_date).toLocaleDateString()}
                        </td>
                        <td>{salary.salary_amount}</td>
                        <td>{salary.salary}</td>
                        <td>
                          {new Date(salary.added_on).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="buttons">
                            <button
                              className="btn btn-icon btn-sm btn-primary"
                              onClick={() => this.handleModalShowEdit(index)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-icon btn-sm btn-danger"
                              onClick={() =>
                                this.handleDeleteModalShow(salary.id)
                              }
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

export default employeeDetailsComponents;
