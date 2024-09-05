<template>
  <div :class="{'dark-mode': darkMode}">
    <!-- <Navbar @toggle-dark-mode="toggleDarkMode"/> -->
    <router-view
    :tasks="tasks"
    :todayCount="todayCount"
    :dueReminderCount="dueReminderCount"
    :upcomingCount="upcomingCount"
    :inboxCount="inboxCount"
    :is-dark-mode="isDarkMode"
    @add-upcoming="addUpcomingTask"
    @add-task="addTask"
    @toggle-dark-mode="toggleDarkMode" 
    @add-today="addTodayTask"
    @update-task="updateTask"
    @deleted-task="deleteTask" 
  />
  </div>
</template>
<script>
import dayjs from 'dayjs';
import Navbar from './components/Navbar.vue';

export default{
  components:{Navbar},
  data(){
    return{
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      isDarkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
    }
  },
  computed:{
    todayCount() {
      const today = dayjs().format('YYYY-MM-DD');
      return this.tasks.filter(task => task.dueDate === today).length;
    },
    upcomingCount() {
      const today = dayjs().format('YYYY-MM-DD');
      return this.tasks.filter(task => task.dueDate > today).length;
    },
    dueReminderCount(){
      const dueReminder = dayjs().format('YYYY-MM-DDTHH:mm');
      return this.tasks.filter(task => task.reminder < dueReminder).length
    },
    inboxCount() {
      return this.tasks.length;
  }
  },
  methods:{
    addTask(){
      const newTask = { 
        text: '', 
        description: '', 
        dueDate: '', 
        priority: '',
        reminder: dayjs().format('YYYY-MM-DDTHH:mm'),
        labels: [],
        subtasks: [],
        isEditing: true, 
        id: Date.now() 
      }
      this.tasks.push(newTask);
      this.saveTasksToLocalStorage();
    },
    addTodayTask(){
      const today = dayjs().format('YYYY-MM-DD');
      const reminder = dayjs().format('YYYY-MM-DDTHH:mm');
      const newTask = { 
        text: '', 
        description: '', 
        dueDate: today, 
        isEditing: true,
        priority: '',
        reminder: reminder,
        labels: [],
        subtasks: [],
        id: Date.now() 
      };
      this.tasks.push(newTask);
      this.saveTasksToLocalStorage();
    },
    addUpcomingTask(){
      const upcoming = dayjs().add(1, 'day').format('YYYY-MM-DD');
      const reminder = dayjs().format('YYYY-MM-DDTHH:mm');
      const newTask = { 
        text: '', 
        description: '', 
        dueDate: upcoming, 
        isEditing: true, 
        priority: '',
        reminder: reminder,
        labels: [],
        subtasks: [],
        id: Date.now() 
      };
      this.tasks.push(newTask);
      this.saveTasksToLocalStorage();
    },
    addSubtask(task, subtaskText) {
    const newSubtask = {
      text: subtaskText,
      isCompleted: false,
      id: Date.now()
    };
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index].subtasks.push(newSubtask);
    }
    this.saveTasksToLocalStorage();
  },
  toggleSubtaskCompletion(task, subtask) {
    const subtaskIndex = task.subtasks.findIndex(st => st.id === subtask.id);
    if (subtaskIndex !== -1) {
      this.tasks.find(t => t.id === task.id).subtasks[subtaskIndex].isCompleted = !task.subtasks[subtaskIndex].isCompleted;
    }
    this.saveTasksToLocalStorage();
  },
    updateTask(updatedTask) {
      const index = this.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        this.tasks.splice(index, 1, updatedTask);
        this.saveTasksToLocalStorage();
      }
    },
    
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasksToLocalStorage();
    },
    checkReminder(task){
      if(task.reminder){
        const reminderTime =new Date(task.reminder).getTime();
        const now = new Date().getTime()
        const timeout = reminderTime - now;
        if(timeout >0){
          setTimeout(() =>{
            showNotification(task);
          }, timeout)
        }
      }
      this.saveTasksToLocalStorage();
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', this.isDarkMode);
    },
    saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
  },

  created() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
      this.tasks.forEach(task => {
        task.isEditing = false;  
      });
    }else {
      this.tasks = []; // Initialize as empty if no tasks are found
    }
    
    
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      this.isDarkMode = JSON.parse(savedDarkMode);
    }
  },
}
</script>
<style>
.dark {
  background-color: #1e293b;
  color: #f8fafc;
}
/* Default Light Mode */
body {
  background-color: #fff;
  color: #000;
}

/* Dark Mode */
.dark {
  background-color: #1e293b;
  color: #f8fafc;
}
</style>
