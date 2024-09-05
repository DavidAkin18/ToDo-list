<template>
  <div class="inbox flex flex-row mo" :class="{'inbox bg-[#f8fafc] ': !isDarkMode, 'inbox bg-[#1e293b] text-white ': isDarkMode}">
    <Sidebar 
      class="nav w-[max-300px] "
      :lists="lists" 
      :tasks="tasks" 
      :dueReminderCount="dueReminderCount"
      :isDarkMode="isDarkMode"
      @toggle-dark-mode="toggleDarkMode"  
      @add-task="addNewTask" 
      :counter="tasks.length" 
      :todayCount="todayCount" 
      :upcomingCount="upcomingCount" 
      @profile-updated="refreshSidebarProfile" 
    />
    <div class="main pt-14 w-full px-2 lg:w-8/12 mx-auto lg:flex flex-col items-right mr-10 mx-auto">
      <h1 class="hd text-[#007BFF] p-3 text-2xl lg:text-3xl" :class="{'text-[#007BFF]': !isDarkMode, 'text-[#60a5fa]': isDarkMode}"></h1>
      <Profile 
        :tasks="tasks" 
        :isDarkMode="isDarkMode"
        @profile-updated="refreshSidebarProfile"
      />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Profile from '@/components/ProfileDetails/Profile.vue'
import { faInbox, faUser, faCalendarDays,faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
export default {
    components:{
      Sidebar,
      Profile
    },
    props:{
    tasks: {
      type: Object,
      required: true
    },
    todayCount: {
      type: Number,
      required: true
    },
    upcomingCount: {
      type: Number,
      required: true
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
    data(){
      return{
        username: '', 
        imagePreview: null,
        counter:undefined,
        lists:[
          {name:'Inbox', icon:faInbox , link:'/inbox', count:undefined},
          {name:'Today', icon:faCalendarWeek, link:'/today'},
          {name:'Upcoming', icon:faCalendarDays, link:'/upcoming'},
        ],
      
      }
    },
    methods:{
      toggleDarkMode() {
        this.$emit('toggle-dark-mode');
      },
      saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },
      updateProfileData(profile) {
        // Update username and imagePreview when the profile is updated
        this.username = profile.username;
        this.imagePreview = profile.imagePreview;
      }
    }
}
</script>

<style>

</style>