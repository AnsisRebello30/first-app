import React, { useState } from 'react';

function App() {
  const ecoActions = [
    { id: 1, name: "Use a reusable water bottle", co2Reduction: 0.5 },
    { id: 2, name: "Take public transport", co2Reduction: 2.6 },
    { id: 3, name: "Eat a plant-based meal", co2Reduction: 0.8 },
    { id: 4, name: "Use energy-efficient light bulbs", co2Reduction: 0.1 },
    { id: 5, name: "Recycle paper", co2Reduction: 0.2 },
  ];

  const [Actions, setActions] = useState([]);

  const addAction = (action) => {
    setActions((prevActions) => {
      const existingAction = prevActions.find((a) => a.id === action.id);
      if (existingAction) {
        return prevActions.map((a) =>
          a.id === action.id ? { ...a, count: a.count + 1 } : a
        );
      } else {
        return [...prevActions, { ...action, count: 1 }];
      }
    });
  };

  const removeAction = (id) => {
    setActions((prevActions) => prevActions.filter((action) => action.id !== id));
  };

  const totalCo2Reduction = Actions.reduce(
    (total, action) => total + action.co2Reduction * action.count,
    0
  );

  return (
    <div>
      <h1>Eco-Friendly Actions</h1>
      <ActionList ecoActions={ecoActions} onAddAction={addAction} />
      <ImpactSummary
        actions={Actions}
        totalCo2Reduction={totalCo2Reduction}
        onRemoveAction={removeAction}
      />
    </div>
  );
}

function ActionList({ ecoActions, onAddAction }) {
  return (
    <div className='container'>
      {ecoActions.map((action) => (
        <div key={action.id}>
          <ul className='eco-actions'>
            <li>{action.name} - CO2 Reduction: {action.co2Reduction} kg</li>
            <button onClick={() => onAddAction(action)}>Add</button>
          </ul>
        </div>
      ))}
    </div>
  );
}

function ImpactSummary({ actions, totalCo2Reduction, onRemoveAction }) {
  return (
    <div className='container'>
      <h2>Impact Summary</h2>
      <p>Total CO2 Reduction: {totalCo2Reduction.toFixed(2)} kg</p>
      {actions.length > 0 ? (
        <ul className='impact-summary'>
          {actions.map((action) => (
            <li key={action.id}>
              {action.name} - {action.count}x - Total: {(action.co2Reduction * action.count).toFixed(2)} kg CO2
              <button onClick={() => onRemoveAction(action.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No actions tracked yet.</p>
      )}
    </div>
  );
}

export default App;
