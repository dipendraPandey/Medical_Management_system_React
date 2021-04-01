import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CompanyBankEditPage from "./pages/companyBankEditPage";
import companyBankPage from "./pages/companyBankPage";
import CompanyDetailPageContent from "./pages/companyDetailPage";
import CompanyPageContent from "./pages/companyPage";
import customerRequestComponents from "./pages/customerRequestPage";
import employeeComponents from "./pages/employeeComponents";
import employeeDetailsComponents from "./pages/employeeDetailsComponents";
import generateBillComponents from "./pages/generateBillComponents";
import HomePageContent from "./pages/homePage";
import Login from "./pages/login";
import LogoutComponent from "./pages/logoutPage";
import mangeCompanyAccount from "./pages/manageCompanyAccount";
import manageMedicinePage from "./pages/manageMedicinePage";
import MedicinePageComponents from "./pages/medicinePageComponents";
import Config from "./utils/Config";
import { PrivateRoute1 } from "./utils/privateRoute1";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path={Config.loginPageUrl} component={Login}></Route>
      <Route
        exact
        path={Config.logoutPageUrl}
        component={LogoutComponent}
      ></Route>
      <PrivateRoute1
        exact
        path={Config.homeUrl}
        page={HomePageContent}
        activepage="0"
      ></PrivateRoute1>
      <PrivateRoute1
        exact
        path={Config.companyUrl}
        page={CompanyPageContent}
        activepage="1"
      ></PrivateRoute1>
      <PrivateRoute1
        exact
        path={Config.companyDetailUrl}
        page={CompanyDetailPageContent}
        activepage="1"
      ></PrivateRoute1>
      <PrivateRoute1
        exact
        path={Config.companyBankUrl}
        page={companyBankPage}
        activepage="1"
      ></PrivateRoute1>
      <PrivateRoute1
        exact
        path='/editcompanybank/:id'
        page={CompanyBankEditPage}
        activepage="1"
      ></PrivateRoute1>
       <PrivateRoute1
        exact
        path='/medicine'
        page={MedicinePageComponents}
        activepage="2"
      ></PrivateRoute1>
      <PrivateRoute1
        exact
        path='/managemedicine'
        page={manageMedicinePage}
        activepage="3"
      ></PrivateRoute1>
      <PrivateRoute1
        exact
        path='/managecompanyaccount'
        page={mangeCompanyAccount}
        activepage="4"
      ></PrivateRoute1>
      <PrivateRoute1
        exact
        path='/employees'
        page={employeeComponents}
        activepage="5"
      ></PrivateRoute1>
      <PrivateRoute1
        exact
        path='/employees/:id'
        page={employeeDetailsComponents}
        activepage="5"
      ></PrivateRoute1>
      <PrivateRoute1
        exact
        path='/generatebill'
        page={generateBillComponents}
        activepage="6"
      ></PrivateRoute1>
      <PrivateRoute1
        exact
        path='/customerrequest'
        page={customerRequestComponents}
        activepage="7"
      ></PrivateRoute1>
    </Switch>
  </Router>,

  document.getElementById("root")
);
