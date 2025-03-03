import React, { useState, useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Form } from 'react-bootstrap';

function App() {
  const [task, setTask] = useState(''); // To handle the task input
  const [tasks, setTasks] = useState([]); // To store the tasks

  // Load tasks from localStorage when the app first loads
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle adding new task
  const handleAddTask = () => {
    if (task.trim() === '') return(alert("Add a Task name")); // Prevent adding empty tasks
    setTasks([...tasks, { text: task, isCompleted: false }]);
    setTask(''); // Clear input field
  };

  // Handle deleting a task
  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Handle toggling task completion
  const handleToggleTask = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(newTasks);
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">To-Do List</h1>

      <div className="mb-3 d-flex gap-2">
        <Form.Control
          type="text"
          placeholder="Enter your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button variant="primary"  className='gap' onClick={handleAddTask}>
         +
        </Button>
      </div>

      <ListGroup>
        {tasks.map((task, index) => (
          <ListGroupItem
            key={index}
            className={`d-flex justify-content-between ${task.isCompleted ? 'bg-light' : ''}`}
          >
            <span
              style={{
                textDecoration: task.isCompleted ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <div className="d-flex gap-2">
              <Button
                variant={task.isCompleted ? 'success' : 'secondary'}
                onClick={() => handleToggleTask(index)}
                className="gap"
              >
                {task.isCompleted ? 'Completed' : 'Mark as Complete'}
              </Button>
              <Button variant="danger" onClick={() => handleDeleteTask(index)} > 
                Delete
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
}

export default App;
