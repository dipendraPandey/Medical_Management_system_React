class Config {
    static loginUrl = "http://127.0.0.1:8000/api/gettoken/";
    static refreshApiUrl = 'http://127.0.0.1:8000/api/refresh_token/';
    static companyApiUrl = 'http://127.0.0.1:8000/api/medicine-company/';
    static companyBankApiUrl = 'http://127.0.0.1:8000/api/company-bank/';
    static medicineApiUrl = 'http://127.0.0.1:8000/api/medicine/';
    static allCompanyAccountUrl = 'http://127.0.0.1:8000/api/company-account/';
    static employeeUrl = 'http://127.0.0.1:8000/api/employee/';
    static employeeSalary = 'http://127.0.0.1:8000/api/employee-salary/';
    static employeeSalaryinfoUrl = 'http://127.0.0.1:8000/api/employeesalaryinfo/';
    static employeeBankinfoUrl = 'http://127.0.0.1:8000/api/employeebankinfo/';
    static employeeBankUrl = 'http://127.0.0.1:8000/api/employee-bank/';
    static medicineByName = 'http://127.0.0.1:8000/api/medicinebyname/';
    static billGenerationUrl = 'http://127.0.0.1:8000/api/generate-bill/';
    static custormerRequestUrl = 'http://127.0.0.1:8000/api/customer-request/';
    static homePageContentUrl = 'http://127.0.0.1:8000/api/home/';

    static homeUrl = "/home";
    static companyUrl = '/company';
    static companyDetailUrl = '/company/:id';
    static companyDeleteUrl = '/deleteCompany/:id';
    static companyBankUrl = '/companybank/:id';
    static loginPageUrl = '/';
    static logoutPageUrl = '/logout';


    static sidebarItem = [
        { "index": 0, "title": "Home", "url": "/home", "icon": "fas fa-fire", },
        { "index": 1, "title": "Company", "url": "/company", "icon": "fas fa-building" },
        { "index": 2, "title": "Add Medicine", "url": "/medicine", "icon": "fas fa-prescription-bottle-alt" },
        { "index": 3, "title": "Manage Medicine", "url": "/managemedicine", "icon": "fas fa-medkit" },
        { "index": 4, "title": "Manage Account", "url": "/managecompanyaccount", "icon": "fas fa-money-check-alt" },
        { "index": 5, "title": "Manage Employees", "url": "/employees", "icon": "fas fa-users" },
        { "index": 6, "title": "Generate Bill", "url": "/generatebill", "icon": "fas fa-file-invoice-dollar" },
        { "index": 7, "title": "Customer Request", "url": "/customerrequest", "icon": "fas fa-pills" },
    ]
}
export default Config