<template>
 
  <div class="inbox flex flex-row" :class="{'inbox bg-[#f8fafc] min-h-screen': !isDarkMode, 'inbox bg-[#1e293b]    text-white min-h-screen': isDarkMode}">
    <Sidebar 
      class="nav w-[max-300px]"
      :lists="lists" 
      :tasks="tasks" 
      :dueReminderCount="dueReminderCount"
      :isDarkMode="isDarkMode"
      @toggle-dark-mode="toggleDarkMode"    
      @add-task="addNewTask" 
      :username="username"
      :profileImage="profileImage"
      :counter="tasks.length" 
      :todayCount="todayCount" 
      :upcomingCount="upcomingCount" 
    />
    <div class="pt-14 w-full px-2  mx-auto lg:flex flex-col  lg:w-8/12 lg:mr-10 ">
       <h1 class="hd text-[#007BFF] p-3 text-3xl" :class="{'text-[#007BFF]': !isDarkMode, 'text-white': isDarkMode}">Upcoming:</h1>
      <UpcomingList 
        :tasks="filteredTasks" 
        @add-task="addNewTask" 
        @delete-task="deleteTask" 
        @add-subtask="addSubtask" 
        :isDarkMode="isDarkMode"
      @toggle-subtask="toggleSubtaskCompletion"/>
    </div>
  </div> 
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import UpcomingList from '@/components/Upcoming/UpcomingList.vue';
import { faInbox, faUser, faCalendarDays,faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import {format, isFriday, isMonday, isSaturday, isSunday, differenceInDays, isThisMonth, isThisWeek, isThisYear, isThursday, isToday, isTomorrow, isTuesday, isWednesday, isYesterday} from 'date-fns'
import dayjs from 'dayjs';
import { mapState, mapActions } from 'vuex';
export default {
components:{
    Sidebar,
    UpcomingList
},
data(){
        return{
            counter:undefined,
            lists:[
  
            {name:'Inbox', icon:faInbox , link:'/inbox', count:undefined},
            {name:'Today', icon:faCalendarWeek, link:'/today'},
            {name:'Upcoming', icon:faCalendarDays, link:'/upcoming'},
            ]
        }
    },
    props: {
    tasks: {
      type: Array,
      required: true,
    },
    upcomingCount: {
      type: Number,
      required: true,
    },
    todayCount: {
      type: Number,
      required: true,
    },
    dueReminderCount:{
        type: Number,
        required: true
    },
    isDarkMode: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState({
      username: state => state.profile.username,
      profileImage: state => state.profile.imagePreview,
    }),
    filteredTasks() {
      const today = dayjs().format('YYYY-MM-DD');
      return this.tasks.filter(task => task.dueDate > today);
    },
  },
  methods: {
    ...mapActions(['loadProfile']),
    addNewTask() {
      this.$emit('add-upcoming');
    },
    updateTask(task) {
      this.$emit('update-task', task);
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    addSubtask(task, subtaskText) {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks[index].subtasks.push({
          text: subtaskText,
          isCompleted: false,
          id: Date.now()
        });
      }
    },
    toggleSubtaskCompletion(task, subtask) {
      const subtaskIndex = task.subtasks.findIndex(st => st.id === subtask.id);
      if (subtaskIndex !== -1) {
        this.tasks.find(t => t.id === task.id).subtasks[subtaskIndex].isCompleted = !task.subtasks[subtaskIndex].isCompleted;
      }
    },
    toggleDarkMode() {
      this.$emit('toggle-dark-mode');
    },
  },
  created() {
    this.loadProfile(); 
  },
}
</script>

<style>

</style>