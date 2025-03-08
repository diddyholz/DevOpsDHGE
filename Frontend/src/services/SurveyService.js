const MOCK_TIMEOUT = 1000;

class SurveyService {
    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    generateMockSurvey(id, songCount) {
        let survey = {
            id: id || (Math.random() * 100000).toFixed(0).toString(),
            title: "Survey Title",
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
        let surveys = [];

        for (let i = 0; i < 10; i++) {
            surveys.push(this.generateMockSurvey());
        }

        await this.timeout(MOCK_TIMEOUT);

        return surveys;
    }
    
    async getSurvey(id) {
        await this.timeout(MOCK_TIMEOUT);
        return this.generateMockSurvey(id, 5);
    }

    async deleteSurvey(id) {
        await this.timeout(MOCK_TIMEOUT);
        return;
    }

    async createVote(surveyId, vote) {
        let request = {
            survey: surveyId,
            songs: vote,
        };

        await this.timeout(MOCK_TIMEOUT);
        return request;
    }
}

export default new SurveyService();
