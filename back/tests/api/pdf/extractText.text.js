const chai = require('chai');
const sinon = require('sinon');
const pdfControllers = require('../../../api/pdf/pdf.controllers');

const fs = require('fs/promises');
const pdfjs = require('pdfjs-dist/legacy/build/pdf');

const { expect } = chai;
chai.should();

let req = {};
let res = {};

describe.only('Pdf upload endpoint', () => {
  it('should return a 200 with the correct json structure', async () => {
    req = {
      params: {
        fileUID: 'fake_file_uid',
      }
    }
    res = {
      status: (httpCode) => {
        this.code = httpCode;
        this.json = (x) => this.jsonPayload = x;
        return (this);
      },
    };

    const statusSpy = sinon.spy(res, 'status');
    const jsonSpy = sinon.spy(res.status(), 'json');

    // Mock fs.fileReader to use our test.pdf file
    const testFileBuffer = await fs.readFile('./tests/test.pdf')
    const readFileMock = sinon.stub(fs, 'readFile');
    readFileMock.resolves(testFileBuffer);

    await pdfControllers.extractText(req, res);

    const resCall = statusSpy.getCall(1);
    const returnedJsonPayload = resCall.returnValue.jsonPayload
    expect(resCall.returnValue.code).to.be.equal(200);
    expect(returnedJsonPayload).to.eql({
      numberOfPages: 1,
      textArray: [' Test'],
    });

    sinon.restore();
  });

  it('should return an error 400 on wrong file id', async () => {
    req = {
      params: {
        fileUID: 'fake_file_uid',
      }
    }
    res = {
      status: (httpCode) => {
        this.code = httpCode;
        this.json = (x) => this.jsonPayload = x;
        return (this);
      },
    };

    const statusSpy = sinon.spy(res, 'status');
    const jsonSpy = sinon.spy(res.status(), 'json');

    await pdfControllers.extractText(req, res);

    const resCall = statusSpy.getCall(1);
    const returnedJsonPayload = resCall.returnValue.jsonPayload
    expect(resCall.returnValue.code).to.be.equal(400);
    expect(returnedJsonPayload).to.eql({ message: 'ENOENT' });
  });
});
