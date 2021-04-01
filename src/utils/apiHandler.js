import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import authHandler from "./authHandler";
import Config from "./Config";

class APIHandeler {
  async checkLogin() {
    if (authHandler.checkTokenExpiry()) {
      try {
        var response = await axios.post(Config.refreshApiUrl, {
          refresh: authHandler.getRefreshToken(),
        });
        reactLocalStorage.set("token", response.data.access);
      } catch (error) {
        console.log(error);
        // not using valid token for refresh
        authHandler.logoutUser();
        window.location = "/";
      }
    }
  }

  async saveCompanyData(
    name,
    license_no,
    address,
    contact_no,
    email,
    description
  ) {
    await this.checkLogin();
    // wait until token get updated
    let response = await axios.post(
      Config.companyApiUrl,
      {
        name: name,
        license_no: license_no,
        address: address,
        contact_no: contact_no,
        email: email,
        description: description,
      },
      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async fetchAllCompany() {
    await this.checkLogin();
    let response = await axios.get(Config.companyApiUrl, {
      headers: { Authorization: "Bearer " + authHandler.getLoginToken() },
    });
    return response;
  }

  async fetchCompanyDetails(id) {
    await this.checkLogin();
    let response = await axios.get(Config.companyApiUrl + "" + id + "/", {
      headers: { Authorization: "Bearer " + authHandler.getLoginToken() },
    });
    return response;
  }

  async editCompanyData(
    id,
    name,
    license_no,
    address,
    contact_no,
    email,
    description
  ) {
    await this.checkLogin();
    // wait until token get updated
    let response = await axios.put(
      Config.companyApiUrl + "" + id + "/",
      {
        name: name,
        license_no: license_no,
        address: address,
        contact_no: contact_no,
        email: email,
        description: description,
      },
      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }
  // this method is to delete the company data
  async deleteCompany(id) {
    await this.checkLogin();
    let response = await axios.delete(Config.companyApiUrl + "" + id + "/", {
      headers: { Authorization: "Bearer " + authHandler.getLoginToken() },
    });
    return response;
  }
  async addBankData(id, account_no) {
    await this.checkLogin();
    // wait until token get updated
    let response = await axios.post(
      Config.companyBankApiUrl,
      {
        company_id: id,
        bank_account_no: account_no,
      },
      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async fetchCompanyBankData(id) {
    await this.checkLogin();
    let response = await axios.get(Config.companyBankApiUrl + "" + id + "/", {
      headers: { Authorization: "Bearer " + authHandler.getLoginToken() },
    });
    return response;
  }
  async editCompanyBankData(id, bank_account_no, company_id) {
    await this.checkLogin();
    // wait until token get updated
    let response = await axios.put(
      Config.companyBankApiUrl + "" + id + "/",
      {
        bank_account_no: bank_account_no,
        company_id: company_id,
      },
      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }
  async addMedicineData(
    name,
    medical_type,
    buy_price,
    sell_price,
    vat,
    batch_no,
    shelf_no,
    expire_date,
    mfg_date,
    company_id,
    description,
    in_stock,
    qty_in_strip,
    medicine_details
  ) {
    await this.checkLogin();
    let response = await axios.post(
      Config.medicineApiUrl,
      {
        name: name,
        medical_type: medical_type,
        buy_price: buy_price,
        sell_price: sell_price,
        vat: vat,
        batch_no: batch_no,
        shelf_no: shelf_no,
        expire_date: expire_date,
        mfg_date: mfg_date,
        company_id: company_id,
        description: description,
        in_stock: in_stock,
        qty_in_strip: qty_in_strip,
        medicine_details: medicine_details,
      },
      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async fetchMedicineData() {
    await this.checkLogin();
    let response = await axios.get(Config.medicineApiUrl, {
      headers: { Authorization: "Bearer " + authHandler.getLoginToken() },
    });
    return response;
  }

  async updateMedicineData(
    id,
    name,
    medical_type,
    buy_price,
    sell_price,
    vat,
    batch_no,
    shelf_no,
    expire_date,
    mfg_date,
    company_id,
    description,
    in_stock,
    qty_in_strip,
    medicine_details
  ) {
    await this.checkLogin();
    let response = await axios.put(
      Config.medicineApiUrl + "" + id + "/",
      {
        name: name,
        medical_type: medical_type,
        buy_price: buy_price,
        sell_price: sell_price,
        vat: vat,
        batch_no: batch_no,
        shelf_no: shelf_no,
        expire_date: expire_date,
        mfg_date: mfg_date,
        company_id: company_id,
        description: description,
        in_stock: in_stock,
        qty_in_strip: qty_in_strip,
        medicine_details: medicine_details,
      },
      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async fetchAllCompanyAccountData() {
    await this.checkLogin();
    let response = await axios.get(Config.allCompanyAccountUrl, {
      headers: { Authorization: "Bearer " + authHandler.getLoginToken() },
    });
    return response;
  }

  async addCompanyTransactionData(
    company_id,
    transaction_type,
    transaction_amount,
    transaction_date,
    payment_mode
  ) {
    await this.checkLogin();
    let response = await axios.post(
      Config.allCompanyAccountUrl,
      {
        company_id: company_id,
        transaction_type: transaction_type,
        transaction_amount: transaction_amount,
        transaction_date: transaction_date,
        payment_mode: payment_mode,
      },

      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async addEmployees(name, joining_date, phone, address) {
    await this.checkLogin();
    let response = await axios.post(
      Config.employeeUrl,
      {
        name: name,
        joining_date: joining_date,
        phone: phone,
        address: address,
      },

      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async fetchAllEmployee() {
    await this.checkLogin();
    let response = await axios.get(Config.employeeUrl, {
      headers: { Authorization: "Bearer " + authHandler.getLoginToken() },
    });
    return response;
  }

  async fetchEmployeeDetails(id) {
    await this.checkLogin();
    let response = await axios.get(Config.employeeUrl + "" + id + "/", {
      headers: { Authorization: "Bearer " + authHandler.getLoginToken() },
    });
    return response;
  }
  async updateEmployeeDetails(id, name, joining_date, phone, address) {
    await this.checkLogin();
    let response = await axios.put(
      Config.employeeUrl + "" + id + "/",
      {
        name: name,
        joining_date: joining_date,
        phone: phone,
        address: address,
      },
      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async fetchEmployeeSalaryInfo(id) {
    await this.checkLogin();
    let response = await axios.get(
      Config.employeeSalaryinfoUrl + "" + id + "/",
      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async addEmployeeSalary(id, salary_date, salary_amount, salary) {
    await this.checkLogin();
    let response = await axios.post(
      Config.employeeSalary,
      {
        employee_id: id,
        salary_date: salary_date,
        salary_amount: salary_amount,
        salary: salary,
      },

      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async updateEmployeeSalary(
    id,
    employee_id,
    salary_date,
    salary_amount,
    salary
  ) {
    await this.checkLogin();
    let response = await axios.put(
      Config.employeeSalary + "" + id + "/",
      {
        employee_id: employee_id,
        salary_date: salary_date,
        salary_amount: salary_amount,
        salary: salary,
      },

      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async deleteEmployeeSalary(id) {
    await this.checkLogin();
    let response = await axios.delete(
      Config.employeeSalary + "" + id + "/",

      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async addEmployeeBankDetails(employee_id, bank_account_no) {
    await this.checkLogin();
    let response = await axios.post(
      Config.employeeBankUrl,
      {
        employee_id: employee_id,
        bank_account_no: bank_account_no,
      },

      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async fetchEmployeeBankDetails(id) {
    await this.checkLogin();
    let response = await axios.get(Config.employeeBankinfoUrl + "" + id + "/", {
      headers: { Authorization: "Bearer " + authHandler.getLoginToken() },
    });
    return response;
  }

  async updateEmployeeBank(id, employee_id, bank_account_no) {
    await this.checkLogin();
    let response = await axios.put(
      Config.employeeBankUrl + "" + id + "/",
      {
        employee_id: employee_id,
        bank_account_no: bank_account_no,
      },

      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async deleteEmployeeBank(id) {
    await this.checkLogin();
    let response = await axios.delete(Config.employeeBankUrl + "" + id + "/", {
      headers: { Authorization: "Bearer " + authHandler.getLoginToken() },
    });
    return response;
  }

  async fetchMedicineByName(name) {
    if (name != "") {
      await this.checkLogin();
      let response = await axios.get(Config.medicineByName + "" + name + "/", {
        headers: { Authorization: "Bearer " + authHandler.getLoginToken() },
      });
      return response;
    } else {
      return { data: [] };
    }
  }

  async addBills(name, address, contact, medicine_list) {
    await this.checkLogin();
    let response = await axios.post(
      Config.billGenerationUrl,
      {
        name: name,
        address: address,
        contact: contact,
        medicine_list: medicine_list,
      },
      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async fetchCustomerRequestData() {
    await this.checkLogin();
    let response = await axios.get(Config.custormerRequestUrl, {
      headers: { Authorization: "Bearer " + authHandler.getLoginToken() },
    });
    return response;
  }

  async saveCustomerRequest(name, phone, medicine_detail) {
    await this.checkLogin();
    let response = await axios.post(
      Config.custormerRequestUrl,
      {
        customer_name: name,
        phone: phone,
        medicine_detail: medicine_detail,
      },
      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async updateCustomerRequest(
    id,
    name,
    phone,
    medicine_detail,
    status,
    added_on
  ) {
    await this.checkLogin();
    console.log(id);
    let response = await axios.put(
      Config.custormerRequestUrl + "" + id + "/",
      {
        customer_name: name,
        phone: phone,
        medicine_detail: medicine_detail,
        statue: status,
        added_on: added_on,
      },
      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }
  async deleteCustomerRequest(id) {
    await this.checkLogin();
    let response = await axios.delete(
      Config.custormerRequestUrl + "" + id + "/",
      { headers: { Authorization: "Bearer " + authHandler.getLoginToken() } }
    );
    return response;
  }

  async homePageData() {
    await this.checkLogin();
    let response = await axios.get(Config.homePageContentUrl, {
      headers: { Authorization: "Bearer " + authHandler.getLoginToken() },
    });
    return response;
  }
}

export default APIHandeler;
