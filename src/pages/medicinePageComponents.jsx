import React, { Component } from "react";
import apiHandler from "../utils/apiHandler";

class MedicinePageComponents extends Component {
  constructor(props) {
    super(props);
    this.formSubmint = this.formSubmint.bind(this);
  }
  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyData: [],
    medicinedetail: [
      { salt_name: "", salt_qty: "", salt_qty_type: "", description: "" },
    ],
    dataLoaded: false,
  };
  async formSubmint(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.addMedicineData(
      event.target.name.value,
      event.target.medical_type.value,
      event.target.buy_price.value,
      event.target.sell_price.value,
      event.target.vat.value,
      event.target.batch_no.value,
      event.target.shelf_no.value,
      event.target.expire_date.value,
      event.target.mfg_date.value,
      event.target.company_id.value,
      event.target.description_medicine.value,
      event.target.in_stock.value,
      event.target.qty_in_strip.value,
      this.state.medicinedetail
    );
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
  }
  // this method works when  Page is Ready
  componentDidMount() {
    this.fetchCompanyData();
  }
  async fetchCompanyData() {
    let apihandler = new apiHandler();
    let companydata = await apihandler.fetchAllCompany();
    this.setState({ companyData: companydata.data.data });
    this.setState({ dataLoaded: true });
  }

  addSalt = () => {
    let item = {
      salt_name: "",
      salt_qty: "",
      salt_qty_type: "",
      description: "",
      id: 0,
    };
    this.state.medicinedetail.push(item);
    this.setState({});
  };

  removeSalt = () => {
    if (this.state.medicinedetail.length !== 1) {
      this.state.medicinedetail.pop(this.state.medicinedetail.length - 1);
    }
    this.setState({});
  };

  handleInput = (event) => {
    let index = event.target.getAttribute("data-index");
    let name = event.target.name;
    let value = event.target.value;
    let medicinedetail = [...this.state.medicinedetail];
    medicinedetail[index] = { ...medicinedetail[index], [name]: value };
    this.setState({ medicinedetail });
  };
  render() {
    return (
      <>
        <div className="main-content" style={{ minHeight: "549px" }}>
          <section className="section">
            <div className="section-header">
              <h1>Medicine Page</h1>
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
                <h4>Add Medicine</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label>Medicine Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Medicine name?</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label>Medicine Type</label>
                      <input
                        id="medical_type"
                        name="medical_type"
                        type="text"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Medicine Type ?</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label>Medicine Company</label>
                      <select
                        className="form-control"
                        id="company_id"
                        name="company_id"
                      >
                        <option>-----</option>
                        {this.state.companyData.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label>Buy price</label>
                      <input
                        id="buy_price"
                        name="buy_price"
                        type="float"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Buy Price ?</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label>Sell Price</label>
                      <input
                        id="sell_price"
                        name="sell_price"
                        type="float"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Sell Price ?</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label>Vat</label>
                      <input
                        id="vat"
                        name="vat"
                        type="float"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Vat ? </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label>Mamufacture Date</label>
                      <input
                        id="mfg_date"
                        name="mfg_date"
                        type="date"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Mamufacture Date ?</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label>Expire Date</label>
                      <input
                        id="expire_date"
                        name="expire_date"
                        type="date"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Expire Date ? </div>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label>Quantity In Strip</label>
                      <input
                        id="qty_in_strip"
                        name="qty_in_strip"
                        type="number"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">
                        Quantity In Strip ?{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label>Batch No</label>
                      <input
                        id="batch_no"
                        name="batch_no"
                        type="number"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Batch No ?</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label>Shelf No</label>
                      <input
                        id="shelf_no"
                        name="shelf_no"
                        type="number"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Shelf No ?</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label>Stock </label>
                      <input
                        id="in_stock"
                        name="in_stock"
                        type="number"
                        className="form-control"
                        required={true}
                      />
                      <div className="invalid-feedback">Stocke ?</div>
                    </div>
                  </div>
                </div>

                <div className="form-group mb-0">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    id="description_medicine"
                    name="description_medicine"
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

              <div className="form-group ">
                <div className="row my-3">
                  <div className="col-6">
                    <button
                      className="btn btn-success col-11 ml-3"
                      type="button"
                      onClick={this.addSalt}
                    >
                      add salt
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-danger col-11 "
                      type="button"
                      onClick={this.removeSalt}
                    >
                      remove salt
                    </button>
                  </div>
                </div>
                {this.state.medicinedetail.map((item, index) => (
                  <div className="row mx-1" key={index}>
                    <div className="col-3">
                      <div className="form-group">
                        <label>Salt Name</label>
                        <input
                          id="salt_name"
                          name="salt_name"
                          type="text"
                          className="form-control"
                          required={true}
                          onChange={this.handleInput}
                          data-index={index}
                        />
                        <div className="invalid-feedback">Salt Name?</div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group">
                        <label>Salt Qty</label>
                        <input
                          id="salt_qty"
                          name="salt_qty"
                          type="text"
                          className="form-control"
                          required={true}
                          onChange={this.handleInput}
                          data-index={index}
                        />
                        <div className="invalid-feedback">Salt Qty?</div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group">
                        <label>Salt Qty Type</label>
                        <input
                          id="salt_qty_type"
                          name="salt_qty_type"
                          type="text"
                          className="form-control"
                          required={true}
                          onChange={this.handleInput}
                          data-index={index}
                        />
                        <div className="invalid-feedback">Salt Qty Type ?</div>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-group mb-0">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          id="description"
                          name="description"
                          required={true}
                          onChange={this.handleInput}
                          data-index={index}
                          style={{
                            marginTop: " 0px",
                            marginBottom: "0px",
                            height: "45px",
                          }}
                        ></textarea>
                        <div className="invalid-feedback">Description </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-footer text-center">
                <button className="btn btn-primary col-12" type="submit">
                  {this.state.btnMessage === 0
                    ? "Add medicine"
                    : "Adding medicine Please wait ..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default MedicinePageComponents;
