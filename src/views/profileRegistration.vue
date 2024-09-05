<template>
  <div class="min-h-screen bg-red-400" :class="{'inbox bg-[#f8fafc] min-h-screen': !isDarkMode, 'inbox bg-[#1e293b]   text-white min-h-screen': isDarkMode}">
    <!-- <Sidebar  class=""
      :lists="lists" 
      :tasks="tasks" 
      :dueReminderCount="dueReminderCount"
      :isDarkMode="isDarkMode"
      @toggle-dark-mode="toggleDarkMode"  
      @add-task="addNewTask" 
      :todayCount="todayCount" 
      :upcomingCount="upcomingCount" 
      @profile-updated="refreshSidebarProfile" 
    /> -->
    <UserInfo 
    :class="{'inbox bg-[#f8fafc] min-h-screen': !isDarkMode, 'inbox bg-[#1e293b]   text-white min-h-screen': isDarkMode}"
    :formFields="formFields"
     @toggle-dark-mode="toggleDarkMode"
    :isDarkMode="isDarkMode"
    />
  </div>
</template>

<script>
import UserInfo from '@/components/ProfileDetails/UserInfo.vue';
import Sidebar from '@/components/Sidebar.vue';
import { faInbox, faUser, faCalendarDays,faCalendarWeek } from '@fortawesome/free-solid-svg-icons'

export default {
  components:{
      UserInfo,
      Sidebar
  },
  props: {
    isDarkMode: {
      type: Boolean,
      required: true
    },
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
  }

}
</script>

<style>

</style>