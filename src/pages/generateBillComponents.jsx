import React, { Component } from "react";
import apiHandler from "../utils/apiHandler";
import AutoCompleteMedicine from "../components/autoCompleteMedicine";

class generateBillComponents extends Component {
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
      {
        sr_no: 1,
        medicine_id:'',
        medicine_name: "",
        vat: "",
        qty: "",
        unit_price: "",
        amount: "",
      },
    ],
    current_sr_no: 1,
    singleMedicine: [],
    dataLoaded: false,
    noofsalt: 0,
    quantity: 1,
    amount: 0,
    vat: 0,
  };
  async formSubmint(event) {
    event.preventDefault();
    console.log(this.state.medicinedetail);
    console.log(event.target.customer_name.value);
    console.log(event.target.address.value);
    console.log(event.target.phone_no.value);
    this.setState({ btnMessage: 1 });
    this.setState({ sendData: true });
    let apihandler = new apiHandler();
    let response = await apihandler.addBills(
      event.target.customer_name.value,
      event.target.address.value,
      event.target.phone_no.value,
      this.state.medicinedetail,
      console.log(this.state.medicinedetail),
    );
    this.setState({ btnMessage: 0 });
    this.setState({ errorRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
  }
  // this method works when  Page is Ready

  showInputData = (index, item) => {
    console.log(index);
    console.log(item);
    this.state.medicinedetail[index].qty = 1;
    this.state.medicinedetail[index].medicine_id = item.id;
    this.state.medicinedetail[index].qty_type = "Pieces";
    this.state.medicinedetail[index].unit_price = item.sell_price;
    this.state.medicinedetail[index].medicine_name = item.name;
    this.state.medicinedetail[index].amount =
      parseInt(item.sell_price) +
      (parseInt(item.vat) * parseInt(item.sell_price)) / 100;
    this.state.medicinedetail[index].vat = item.vat + "%";
    this.setState({ vat: item.vat });
    this.setState({});
  };

  qtyChangeUpdate = (e) => {
    let index = e.target.dataset.index;
    let value;
    if (e.target.value === "") {
      value = 0;
    } else {
      value = e.target.value;
    }
    this.state.medicinedetail[index].qty = value;
    this.state.medicinedetail[index].amount =
      parseInt(value) * parseInt(this.state.medicinedetail[index].unit_price) +
      (parseInt(value) *
        parseInt(this.state.medicinedetail[index].unit_price) *
        parseInt(this.state.medicinedetail[index].vat)) /
        100;
    this.setState({});
  };


  addMedicine = () => {
    let serial_no = this.state.current_sr_no + 1;
    this.setState({current_sr_no:serial_no})
    let item = {
      sr_no: serial_no,
      medicine_id :'',
      medicine_name: "",
      qty: "",
      unit_price: "",
      amount: "",
    };
    this.state.medicinedetail.push(item);
    this.setState({});
  };

  removeMedicine = () => {
    let serial_no = this.state.current_sr_no - 1;
    this.setState({current_sr_no:serial_no})
    if (this.state.medicinedetail.length != 1) {
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
              <h1>Bill Generate</h1>
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
                <h4>Generate Bill For Customer</h4>
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
                        defaultValue={this.state.singleMedicine.name}
                      />
                      <div className="invalid-feedback">Medicine name?</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Address:</label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        className="form-control"
                        required={true}
                        defaultValue={this.state.singleMedicine.medical_type}
                      />
                      <div className="invalid-feedback">Medicine Type ?</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Phone No</label>
                      <input
                        id="phone_no"
                        name="phone_no"
                        type="text"
                        className="form-control"
                        required={true}
                        defaultValue={this.state.singleMedicine.shelf_no}
                      />
                      <div className="invalid-feedback">Phone No ?</div>
                    </div>
                  </div>
                </div>
                <div className="form-group m-0">
                  <p className="ml-4">Medicine Details</p>
                  {this.state.medicinedetail.map((item, index) => (
                    <div className="row mx-1 my-0" key={index}>
                      <div className="col-1">
                        <div className="form-group m-0">
                          <label>SR NO</label>
                          <input
                            id="sr_no"
                            name="sr_no"
                            type="text"
                            disabled
                            className="form-control"
                            defaultValue={index + 1}
                            required={true}
                            onChange={this.handleInput}
                            data-index={index}
                          />
                          <div className="invalid-feedback">SR NO ?</div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="form-group m-0">
                          <label>Medicine Name</label>
                          <AutoCompleteMedicine
                            itemPosition={index}
                            showInputData={this.showInputData}
                          />
                          <div className="invalid-feedback">Medicine Name?</div>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="form-group m-0">
                          <label>Quantity</label>
                          <input
                            id="qty"
                            name="qty"
                            type="number"
                            className="form-control"
                            required={true}
                            defaultValue={item.qty}
                            onChange={this.qtyChangeUpdate}
                            data-index={index}
                          />
                          <div className="invalid-feedback">Medicine Qty?</div>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="form-group m-0">
                          <label>Unit Price</label>
                          <input
                            id="unit_price"
                            name="unit_price"
                            type="text"
                            disabled
                            className="form-control"
                            required={true}
                            defaultValue={item.unit_price}
                            onChange={this.handleInput}
                            data-index={index}
                          />
                          <div className="invalid-feedback">Unit Price ?</div>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="form-group m-0">
                          <label>Vat</label>
                          <input
                            id="unit_price"
                            name="unit_price"
                            type="text"
                            className="form-control"
                            required={true}
                            defaultValue={item.vat}
                            disabled
                            data-index={index}
                          />
                          <div className="invalid-feedback">Unit Price ?</div>
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="for-group m-0">
                          <label>Amount</label>
                          <input
                            id="amount"
                            name="amount"
                            type="text"
                            disabled
                            className="form-control"
                            required={true}
                            defaultValue={item.amount}
                            onChange={this.handleInput}
                            data-index={index}
                          />
                          <div className="invalid-feedback">Amount ?</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="row my-3">
                    <div className="col-3">
                      <button
                        className="btn btn-success col-11 ml-3"
                        type="button"
                        onClick={this.addMedicine}
                      >
                        add medicine
                      </button>
                    </div>
                    <div className="col-3">
                      <button
                        className="btn btn-danger col-11 "
                        type="button"
                        onClick={this.removeMedicine}
                      >
                        remove medicine
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center pt-0">
                <button className="btn btn-primary col-12" type="submit">
                  {this.state.btnMessage === 0
                    ? "Generate Bill"
                    : "Generating Bill Please wait ..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default generateBillComponents;
