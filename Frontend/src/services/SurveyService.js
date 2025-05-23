const API_HOST = '/api';

class SurveyService {
    async getSurveys() {
        let response = await fetch(`${API_HOST}/survey`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return await response.json();
    }
    
    async getSurvey(id) {
        let response = await fetch(`${API_HOST}/survey/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await response.json();
    }

    async deleteSurvey(id) {
        await fetch(`${API_HOST}/survey/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async createSurvey(survey) {
        await fetch(`${API_HOST}/survey`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(survey)
        });
    }

    async updateSurvey(surveyId, survey) {
        await fetch(`${API_HOST}/survey/${surveyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(survey)
        });
    }

    async createVote(surveyId, songs) {
        let vote = {
            survey: surveyId,
            songs: songs
        };

        await fetch(`${API_HOST}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vote)
        });
    }

    async getResults(surveyId) {
        // let results = [
        //     { song: "1", place: 0},
        //     { song: "2", place: 1},
        //     { song: "3", place: 2},
        //     { song: "4", place: 3},
        //     { song: "5", place: 4},
        // ];

        // await this.timeout(MOCK_TIMEOUT);

        let response = await fetch(`${API_HOST}/result/${surveyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await response.json();
    }

    sortResults(results) {
        return results.sort((a, b) => a.place - b.place);
    }
}

export default new SurveyService();
