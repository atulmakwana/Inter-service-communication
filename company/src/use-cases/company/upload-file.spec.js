const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const expect = require('chai').expect;
const { Storage } = require('@google-cloud/storage');

Before(() => {
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

function makeUploadFileStub({ Storage }){
    return function uploadFile(){
        return 'File uploaded successfully';
    } 
}

Given(
  'UploadFile function wil be called.',
  () => {}
);

When('Try to upload a file on gcs.', async () => {
  try {
    const uploadFile =  makeUploadFileStub({
        Storage
    });
    this.result = await uploadFile();
  } 
  catch (e) {
    this.error = e;
  }
});

Then('It will give message on uploading file: {string}', (message) => {
   expect(this.result).deep.equal(message); 
});