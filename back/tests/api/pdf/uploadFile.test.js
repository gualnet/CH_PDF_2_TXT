const chai = require('chai');
const sinon = require('sinon');
const pdfControllers = require('../../../api/pdf/pdf.controllers');

const { expect } = chai;
chai.should();

let req = {};
let res = {};

describe('Pdf upload endpoint', () => {
  it('should return a 200 with the correct json structure', async () => {
    req = {
      file: {
        originalname: 'fake_original_name',
        filename: 'fake_file_name',
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

    await pdfControllers.uploadFile(req, res);

    const resCall = statusSpy.getCall(1);

    expect(resCall.calledOnce);
    expect(resCall.returnValue.code).to.be.equal(200);
    expect(resCall.returnValue.jsonPayload).to.be.equal({
      originalname: 'fake_original_name',
      filename: 'fake_file_name',
    });
  });
});
