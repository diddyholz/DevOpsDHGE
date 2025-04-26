//test('TEST FÜR CI. KANN GELÖSCHT WERDEN, SOBALD ECHTE TESTS DA SIND', () => {
//    expect(42).toBe(42);
//});

import * as app from '../index.js';

function createMockReq(body = {}) {
  return { body };
}

function createMockRes() {
  const res = {};
  res.statusCode = 200;
  res.headers = {};
  res.status = function(code) {
    this.statusCode = code;
    return this;
  };
  res.setHeader = function(name, value) {
    this.headers[name] = value;
  };
  res.sendData = null;
  res.send = function(data) {
    this.sendData = data;
    return this;
  };
  return res;
}

describe('postResult', () => {
  it('should return sorted results for valid votes', () => {
    const req = createMockReq({
      votes: [
        { songs: [{ id: 'song1', priority: 0 }, { id: 'song2', priority: 1 }] },
        { songs: [{ id: 'song1', priority: 0 }, { id: 'song3', priority: 0 }] },
      ]
    });
    const res = createMockRes();

    app.postResult(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.headers['Content-Type']).toBe('application/json');
    expect(res.sendData).toContain('song1');
    expect(res.sendData).toContain('song3');
  });

  it('should return 400 if no votes provided', () => {
    const req = createMockReq({});
    const res = createMockRes();

    app.postResult(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.sendData).toBe('Invalid vote data');
  });
});
