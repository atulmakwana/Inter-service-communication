const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makecreateEmployee = require('./create-employee');

const sandbox = sinon.createSandbox();

Before(() => {
    this.employeeName = undefined;
    this.employeeEmail = undefined;
    this.empDesignation = undefined;
    this.companyName = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });

function runProducer(){}

const employeeDb = {
    createDbEmployee: function(){},
    getCopmanybyName:function(){},
    getDbEmployeebyEmail:function(){}
};

const getDbEmployeebyEmailStub = sandbox.stub(employeeDb, 'getDbEmployeebyEmail');
getDbEmployeebyEmailStub.callsFake((args) => {
    expect(args).deep.equal({
        employeeEmail: this.employeeEmail,
    });
    if(this.employeeEmail=='atulll123@gmail.com'){
      return [
        {
          employee_id: '7c08cc2f-b148-4772-b062-b0859742cf7c',
          employee_name: 'Atulll',
          employee_email: 'atulll123@gmail.com',
          employee_designation: 'Intern',
          emp_company_id: '4c1e7d54-b379-4524-aa02-78f3ad8d494b',
          is_varified: true
        }];
    }
    return [];
});

const getCopmanybyNameStub = sandbox.stub(employeeDb, 'getCopmanybyName');
getCopmanybyNameStub.callsFake((args) => {
    expect(args).deep.equal({
        companyName: this.companyName,
    });
    if(this.companyName=='AbcPvt'){
      return [
        {
          "company_id": "2071bb53-3095-473e-b4b3-70744448ebaf",
          "company_name": "AbcPvt"
        }
      ]
    }
    return [];
});

const createDbEmployeeStub = sandbox.stub(employeeDb, 'createDbEmployee');
createDbEmployeeStub.callsFake((args) => {
    return [
      {
        "employee_id": "8f5f1240-5544-49f4-a37b-326f64e56ead"
      }
    ];
});



Given('Employee details name: {string}, email: {string}, desgnation: {string}, company: {string} to create new employee',
    (employeeName,employeeEmail,empDesignation,companyName) => {
      this.employeeName = employeeName || undefined;
      this.employeeEmail = employeeEmail || undefined;
      this.empDesignation = empDesignation || undefined;
      this.companyName = companyName || undefined;
    },
);
Given('Employee details empname: {int}, email: {string}, empdesg: {string}, empcompany: {string} to create new employee',
    (employeeName,employeeEmail,empDesignation,companyName) => {
      this.employeeName = employeeName || undefined;
      this.employeeEmail = employeeEmail || undefined;
      this.empDesignation = empDesignation || undefined;
      this.companyName = companyName || undefined;
    },
);
Given('Employee details empname: {string}, email: {string}, empdesg: {int}, empcompany: {string} to create new employee',
    (employeeName,employeeEmail,empDesignation,companyName) => {
      this.employeeName = employeeName || undefined;
      this.employeeEmail = employeeEmail || undefined;
      this.empDesignation = empDesignation || undefined;
      this.companyName = companyName || undefined;
    },
);
Given('Employee details empname: {string}, email: {string}, empdesg: {string}, empcompany: {int} to create new employee',
    (employeeName,employeeEmail,empDesignation,companyName) => {
      this.employeeName = employeeName || undefined;
      this.employeeEmail = employeeEmail || undefined;
      this.empDesignation = empDesignation || undefined;
      this.companyName = companyName || undefined;
    },
);

When('Try to create new employee', async ()=>{
    const createEmployee = makecreateEmployee({
        Joi,
        ValidationError:exceptions.ValidationError,
        ObjectNotFoundError:exceptions.ObjectNotFoundError,
        ObjectAlreadyExistError:exceptions.ObjectAlreadyExistError,
        runProducer,
        getCopmanybyName:employeeDb.getCopmanybyName,
        getDbEmployeebyEmail:employeeDb.getDbEmployeebyEmail,
        createDbEmployee: employeeDb.createDbEmployee
    });
    try 
    {
        this.result = await createEmployee({
          employeeName: this.employeeName,
          employeeEmail: this.employeeEmail,
          empDesignation: this.empDesignation,
          companyName: this.companyName,
        });
      } 
      catch (e) {
        this.error = {
          name: e.name,
          message: e.message,
        };
      }
});


Then('Throw error: {string} with message: {string} while creating a employee', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});

Then('It will create new employee with details: "{string}"', (newEmployeeDetails) => {
    expect(JSON.stringify(this.result)).deep.equal(newEmployeeDetails);
});
