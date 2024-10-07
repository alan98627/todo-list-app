// script.js

// Display real-time date and time
function updateDateTime() {
    const now = new Date();
    document.getElementById('date').textContent = now.toLocaleDateString();
    document.getElementById('time').textContent = now.toLocaleTimeString();
  }
  setInterval(updateDateTime, 1000);
  
  // Add a new task
  function addTask() {
    const taskText = document.getElementById('new-task').value;
    if (taskText.trim() === '') return;
  
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
  
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', updateTaskStatus);
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      taskItem.remove();
      updateProgress();
    });
  
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  
    document.getElementById('new-task').value = '';
    updateProgress();
  }
  
  // Mark task as completed and update progress
  function updateTaskStatus() {
    this.parentNode.classList.toggle('completed');
    updateProgress();
  }
  
  // Update task completion progress
  function updateProgress() {
    const tasks = document.querySelectorAll('#task-list li');
    const completedTasks = document.querySelectorAll('#task-list li.completed');
    const progress = completedTasks.length / tasks.length * 100;
    document.getElementById('task-progress').textContent = `Completed: ${isNaN(progress) ? 0 : progress.toFixed(0)}%`;
  }
  
  // Reset daily tasks
  function resetTasks() {
    const tasks = document.querySelectorAll('#task-list li.completed');
    tasks.forEach(task => task.classList.remove('completed'));
    updateProgress();
  }
  
  // Call resetTasks at midnight to reset all tasks
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const msUntilMidnight = midnight.getTime() - new Date().getTime();
  setTimeout(() => {
    resetTasks();
    setInterval(resetTasks, 24 * 60 * 60 * 1000); // Repeat every 24 hours
  }, msUntilMidnight);
  