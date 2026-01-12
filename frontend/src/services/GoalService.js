import axios from 'axios';

const API_URL = 'http://localhost:8080/api/goals';

const GoalService = {
    getAllGoals: () => {
        return axios.get(API_URL);
    },

    createGoal: (goal) => {
        return axios.post(API_URL, goal);
    },

    updateGoal: (id, goal) => {
        return axios.put(`${API_URL}/${id}`, goal);
    },

    deleteGoal: (id) => {
        return axios.delete(`${API_URL}/${id}`);
    }
};

export default GoalService;
