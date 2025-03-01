class SurveyService {
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

        return surveys;
    }
    
    async getSurvey(id) {
        return this.generateMockSurvey(id, 5);
    }

    async createVote(surveyId, vote) {
        let request = {
            survey: surveyId,
            songs: vote,
        };

        return request;
    }
}

export default new SurveyService();
