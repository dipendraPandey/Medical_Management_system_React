import React, { Component } from "react";
import apiHandler from "../utils/apiHandler";
export class AutoCompleteMedicine extends Component {
    constructor(props){
        super(props)
        this.loadMedicineName = this.loadMedicineName.bind(this)
        this.inputData = React.createRef();

    }


  state = {
    onFocus: false,
    medicineByName: [],
  };

  onFocusChange = () => {
    this.setState({ onFocus: true });
  };
  onBlurChange = () => {
    this.setState({ onFocus: false });
  };

  onShowItem = (medicine)=>{
      
      this.inputData.current.value = medicine.name
      this.props.showInputData(this.props.itemPosition, medicine)
      this.onBlurChange()
      
  }
  async loadMedicineName(event) {
    var apihandler = new apiHandler();
    let medicinename = await apihandler.fetchMedicineByName(event.target.value);
    this.setState({ medicineByName: medicinename.data});
  }
  render() {
    return (
      <>
        <input
          id="medicine_name"
          name="medicine_name"
          type="text"
          className="form-control"
          required={true}
          onFocus={this.onFocusChange}
          autoComplete="off"
          onChange={this.loadMedicineName}
          ref={this.inputData}
        />
        {this.state.onFocus == true ? (
          <div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                border: "1px solid lightgrey",
                boxShadow: "1px 1px 1px lightgrey",
                position: "absolute",
                width: "100%",
                zIndex: 1,
                background: "white",
              }}
            >
              {this.state.medicineByName.map((medicine) => (
                <li
                  style={{
                    padding: "3px",
                    borderBottom: "1px solid lightgrey",
                  }}
                  key={medicine.id}
                  onClick={()=>this.onShowItem(medicine)}
                >
                  {medicine.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default AutoCompleteMedicine;
