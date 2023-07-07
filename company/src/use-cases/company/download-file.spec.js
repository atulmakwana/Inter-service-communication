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

function makeDownloadFileStub({ Storage }){
    return function downloadFile(){
        return 'File downloaded successfully';
    } 
}

Given(
  'DownloadFile function will be called.',
  () => {}
);

When('Try to download a file from gcs.', async () => {
  try {
    const downloadFile =  makeDownloadFileStub({
        Storage
    });
    this.result = await downloadFile();
  } 
  catch (e) {
    this.error = e;
  }
});

Then('It will give message on downloading file: {string}', (message) => {
   expect(this.result).deep.equal(message); 
});