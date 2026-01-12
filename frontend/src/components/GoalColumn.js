import React, { useState } from 'react';

const GoalColumn = ({ title, goals, onAdd, onUpdate, onDelete }) => {
    const [newGoal, setNewGoal] = useState('');

    const handleAdd = () => {
        if (newGoal.trim()) {
            onAdd(newGoal, title);
            setNewGoal('');
        }
    };

    return (
        <div className="goal-column">
            <h3>{title}</h3>
            <div className="goal-list">
                {goals.map(goal => (
                    <div key={goal.id} className="goal-card">
                        <span>{goal.title}</span>
                        <div className="actions">
                            {title !== 'Completed' && (
                                <button onClick={() => onUpdate(goal, 'COMPLETED')} title="Mark Complete">✓</button>
                            )}
                            <button onClick={() => onDelete(goal.id)} title="Delete">X</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="add-goal">
                <input
                    type="text"
                    placeholder="New Goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
                <button onClick={handleAdd}>ADD</button>
            </div>
        </div>
    );
};

export default GoalColumn;
