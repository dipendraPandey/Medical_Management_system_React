import React, { Component } from "react";
import apiHandler from "../utils/apiHandler";

class manageMedicinePage extends Component {
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
    medicineData: [],
    medicinedetail: [],
    singleMedicine: [],
    dataLoaded: false,
    noofsalt: 0,
  };
  async formSubmint(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.updateMedicineData(
      this.state.singleMedicine.id,
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
    this.fetchInitialData();
  }
  async fetchInitialData() {
    let apihandler = new apiHandler();
    let companydata = await apihandler.fetchAllCompany();
    let medicinedata = await apihandler.fetchMedicineData();
    this.setState({ companyData: companydata.data.data });
    this.setState({ dataLoaded: true });
    this.setState({ medicineData: medicinedata.data.data });
  }

  addSalt = () => {
    let item = {
      id: 0,
      salt_name: "",
      salt_qty: "",
      salt_qty_type: "",
      description: "",
    };
    this.state.medicinedetail.push(item);
    this.setState({});
  };

  removeSalt = () => {
    if (this.state.medicinedetail.length !== this.state.noofsalt) {
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

  viewMedicineDetails = (id) => {
    this.setState({ singleMedicine: this.state.medicineData[id] });
    this.setState({
      medicinedetail: this.state.medicineData[id].medicine_details,
    });
    this.setState({
      noofsalt: this.state.medicineData[id].medicine_details.length,
    });
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
          {/* medicine details here */}

          <div className="card-body m-0">
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Medicine Type</th>
                    <th>Cost Price</th>
                    <th>Sell Price</th>
                    <th>Expire date</th>
                    <th>Stock</th>
                    <th>Shelf No</th>
                    <th>Action</th>
                  </tr>
                  {this.state.medicineData.map((medicine, index) => (
                    <tr key={medicine.id}>
                      <td>{medicine.id}</td>
                      <td>{medicine.name}</td>
                      <td>{medicine.medicinecompany.name}</td>
                      <td>{medicine.medical_type}</td>
                      <td>{medicine.buy_price}</td>
                      <td>{medicine.sell_price}</td>
                      <td>
                        {new Date(medicine.expire_date).toLocaleDateString()}
                      </td>
                      <td>{medicine.in_stock}</td>
                      <td>{medicine.shelf_no}</td>
                      <td>
                        <div className="buttons">
                          <button
                            className="btn btn-icon btn-sm btn-primary"
                            onClick={() => this.viewMedicineDetails(index)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-icon btn-sm btn-danger"
                            onClick={() => this.deleteMedicine(index)}
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
          {/* medicine details ends here */}

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
                        defaultValue={this.state.singleMedicine.name}
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
                        defaultValue={this.state.singleMedicine.medical_type}
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
                          <option
                            key={company.id}
                            selected={
                              company.id ===
                              this.state.singleMedicine.company_id
                                ? true
                                : false
                            }
                          >
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
                        defaultValue={this.state.singleMedicine.buy_price}
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
                        defaultValue={this.state.singleMedicine.sell_price}
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
                        defaultValue={this.state.singleMedicine.vat}
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
                        defaultValue={this.state.singleMedicine.mfg_date}
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
                        defaultValue={this.state.singleMedicine.expire_date}
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
                        defaultValue={this.state.singleMedicine.qty_in_strip}
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
                        defaultValue={this.state.singleMedicine.batch_no}
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
                        type="text"
                        className="form-control"
                        required={true}
                        defaultValue={this.state.singleMedicine.shelf_no}
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
                        defaultValue={this.state.singleMedicine.in_stock}
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
                    defaultValue={this.state.singleMedicine.description}
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
                          value={item.salt_name}
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
                          defaultValue={item.salt_qty}
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
                          defaultValue={item.salt_qty_type}
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
                          defaultValue={item.description}
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

export default manageMedicinePage;
