import React, { useEffect, useState } from 'react';
import GoalService from './services/GoalService';
import GoalColumn from './components/GoalColumn';

function App() {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        try {
            const response = await GoalService.getAllGoals();
            setGoals(response.data);
        } catch (error) {
            console.error("Error loading goals:", error);
        }
    };

    const addGoal = async (title, columnTitle) => {
        let status = 'PENDING';
        if (columnTitle === 'Completed') status = 'COMPLETED';
        if (columnTitle === '2026 Planned') status = 'PLANNED_2026';

        const newGoal = { title, status };
        try {
            await GoalService.createGoal(newGoal);
            loadGoals();
        } catch (error) {
            console.error("Error adding goal:", error);
        }
    };

    const updateGoalStatus = async (goal, newStatus) => {
        const updatedGoal = { ...goal, status: newStatus };
        try {
            await GoalService.updateGoal(goal.id, updatedGoal);
            loadGoals();
        } catch (error) {
            console.error("Error updating goal:", error);
        }
    };

    const deleteGoal = async (id) => {
        try {
            await GoalService.deleteGoal(id);
            loadGoals();
        } catch (error) {
            console.error("Error deleting goal:", error);
        }
    };

    const pendingGoals = goals.filter(g => g.status === 'PENDING');
    const completedGoals = goals.filter(g => g.status === 'COMPLETED');
    const plannedGoals = goals.filter(g => g.status === 'PLANNED_2026');

    return (
        <div className="App">
            <header>
                <h1>Life Goals Tracker</h1>
            </header>
            <div className="columns-container">
                <GoalColumn
                    title="Pending"
                    goals={pendingGoals}
                    onAdd={addGoal}
                    onUpdate={updateGoalStatus}
                    onDelete={deleteGoal}
                />
                <GoalColumn
                    title="Completed"
                    goals={completedGoals}
                    onAdd={addGoal}
                    onUpdate={updateGoalStatus}
                    onDelete={deleteGoal}
                />
                <GoalColumn
                    title="2026 Planned"
                    goals={plannedGoals}
                    onAdd={addGoal}
                    onUpdate={updateGoalStatus}
                    onDelete={deleteGoal}
                />
            </div>
        </div>
    );
}

export default App;
