const { Given, When, Then, And, Before } = require('@cucumber/cucumber');
const sinon = require("sinon");
const expect = require("chai").expect
const sandbox = sinon.createSandbox();
const nodemailer = require('nodemailer');

function makesendEmailStub({ nodemailer }){
    return function sendEmail(){
        return 'Email sent successfully!';
    } 
}

Before(() => {
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
});

Given('sendMail function will be called',
    () => {}
);
    
When('Try to send mail to company', async () => {
    try {
        const sendEmail = makesendEmailStub({ nodemailer });
        this.result = sendEmail();
    } 
    catch (error){
      this.error = error;
    }
});

Then('It will show detail: {string}', (emaildetail) => {
    expect(this.result).deep.equal(emaildetail);
});
 