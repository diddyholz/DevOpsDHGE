const MOCK_TIMEOUT = 1000;
const API_HOST = "http://localhost:12345";

class SurveyService {
    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    generateMockSurvey(id, songCount) {
        let survey = {
            id: id || (Math.random() * 100000).toFixed(0).toString(),
            name: "Survey Title",
            date: "2021-01-01",
            status: "open",
            songs: []
        };

        if (!songCount) {
            return survey;
        }

        for (let i = 0; i < songCount; i++) {
            let song = {
                id: (Math.random() * 100000).toFixed(0).toString(),
                name: "Song Title " + i, 
            };

            survey.songs.push(song);
        }

        return survey;
    }
    
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
        let results = {
            survey: surveyId,
            songs: []
        };

        await this.timeout(MOCK_TIMEOUT);
        return results;
    }
}

export default new SurveyService();
