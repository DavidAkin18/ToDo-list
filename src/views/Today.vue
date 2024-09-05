<template>
 <div class="inbox flex flex-row" :class="{'inbox bg-[#f8fafc] min-h-screen': !isDarkMode, 'inbox bg-[#1e293b]  text-white min-h-screen': isDarkMode}">
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
    <div class="pt-14 w-full px-2  mx-auto lg:flex flex-col  lg:w-8/12 lg:mr-10">
       <h1 class="hd text-[#007BFF] p-3 text-3xl" :class="{'text-[#007BFF]': !isDarkMode, 'text-white': isDarkMode}">Today:</h1>
      <TodayList 
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
import TodayList from '@/components/Today/TodayList.vue';
import { faInbox, faUser, faCalendarDays,faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import {format, isFriday, isMonday, isSaturday, isSunday, differenceInDays, isThisMonth, isThisWeek, isThisYear, isThursday, isToday, isTomorrow, isTuesday, isWednesday, isYesterday} from 'date-fns'
import { mapState, mapActions } from 'vuex';

import dayjs from 'dayjs';


export default {
    components:{
        Sidebar,
        TodayList
    },
    data() {
    return {
      lists: [
      
        { name: 'Inbox', icon: faInbox, link: '/inbox' },
        { name: 'Today', icon: faCalendarWeek, link: '/today' },
        { name: 'Upcoming', icon: faCalendarDays, link: '/upcoming' },
      ],
    };
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    todayCount: {
      type: Number,
      required: true,
    },
    upcomingCount: {
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
    inboxClasses() {
      return {
        'inbox bg-[#f8fafc] min-h-screen': !this.isDarkMode,
        'inbox bg-[#1e293b] text-white min-h-screen': this.isDarkMode,
      };
    },
    headingClass() {
      return {
        'text-[#007BFF]': !this.isDarkMode,
        'text-[#60a5fa]': this.isDarkMode,
      };
    },
    filteredTasks() {
      const today = dayjs().format('YYYY-MM-DD');
      return this.tasks.filter(task => task.dueDate === today);
    },
  },
  methods: {
    ...mapActions(['loadProfile']),
    addNewTask() {
      this.$emit('add-today');
    },
    addOrUpdateTask(task) {
      task.isEditing = false;
      this.$emit('update-today', task);
    },
    deleteTask(index) {
      // this.$emit('delete-today', index);
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
  watch:{
      dueDate(newDate){
          if(newDate){
            this.formattedDueDate = dayjs(newDate).format('dddd')
          }
          else{
            this.formattedDueDate=''
          }
      }
  },
  created() {
      this.loadProfile(); 
    },
}

</script>

<style scoped>
.inbox{
  
}
</style>