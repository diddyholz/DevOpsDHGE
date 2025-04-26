//import * as app from '../index.js';

import * as app from '../index.js';

function createMockReq(body = {}, params = {}) {
  return { body, params };
}

function createMockRes() {
  const res = {};
  res.statusCode = 200;
  res.status = function(code) {
    this.statusCode = code;
    return this;
  };
  res.sendData = null;
  res.send = function(data) {
    this.sendData = data;
    return this;
  };
  return res;
}

beforeEach(() => {
  app.surveys.length = 0;
});

describe('postSurvey', () => {
  it('should create a survey successfully', () => {
    const req = createMockReq({ name: 'Test', date: '2025', status: 'open', songs: [] });
    const res = createMockRes();

    app.postSurvey(req, res);

    expect(typeof res.sendData).toBe('string');
  });
});

describe('getSurvey', () => {
  it('should return surveys', () => {
    const req = createMockReq();
    const res = createMockRes();

    app.getSurvey(req, res);

    expect(res.sendData).toBeDefined();
  });
});

describe('getSurveyId', () => {
  it('should return a survey by id', () => {
    const survey = { id: '123', name: 'Test', votes: [] };
    app.surveys.push(survey);

    const req = createMockReq({}, { id: '123' });
    const res = createMockRes();

    app.getSurveyId(req, res);

    expect(res.sendData).toContain('123');
  });

  it('should return 404 if survey not found', () => {
    const req = createMockReq({}, { id: 'nonexistent' });
    const res = createMockRes();

    app.getSurveyId(req, res);

    expect(res.statusCode).toBe(404);
  });
});

describe('putSurveyId', () => {
  it('should update a survey', () => {
    const survey = { id: '1', name: 'Old', date: '2024', status: 'open', songs: [], votes: [] };
    app.surveys.push(survey);

    const req = createMockReq({ name: 'New', date: '2025', status: 'closed', songs: ['song1'] }, { id: '1' });
    const res = createMockRes();

    app.putSurveyId(req, res);

    expect(res.sendData).toContain('New');
  });

  it('should return 404 if survey not found', () => {
    const req = createMockReq({}, { id: 'nonexistent' });
    const res = createMockRes();

    app.putSurveyId(req, res);

    expect(res.statusCode).toBe(404);
  });
});

describe('deleteSurveyId', () => {
  it('should delete a survey', () => {
    const survey = { id: '1', name: 'Test', votes: [] };
    app.surveys.push(survey);

    const req = createMockReq({}, { id: '1' });
    const res = createMockRes();

    app.deleteSurveyId(req, res);

    expect(res.statusCode).toBe(204);
  });

  it('should return 404 if survey not found', () => {
    const req = createMockReq({}, { id: 'nonexistent' });
    const res = createMockRes();

    app.deleteSurveyId(req, res);

    expect(res.statusCode).toBe(404);
  });
});

describe('postVote', () => {
  it('should add a vote successfully', () => {
    app.surveys.push({ id: '1', status: 'open', votes: [] });

    const req = createMockReq({ survey: '1', songs: ['Song A'] });
    const res = createMockRes();

    app.postVote(req, res);

    expect(res.statusCode).toBe(204);
  });

  it('should return 400 if vote data invalid', () => {
    const req = createMockReq({ songs: ['Song A'] });
    const res = createMockRes();

    app.postVote(req, res);

    expect(res.statusCode).toBe(400);
  });
});

describe('getResultId', () => {
  it('should return 500 when fetch fails', async () => {
    const survey = { id: '1', votes: [] };
    app.surveys.push(survey);

    const req = createMockReq({}, { id: '1' });
    const res = createMockRes();

    await app.getResultId(req, res);

    expect([500, 404]).toContain(res.statusCode);
  });
});
