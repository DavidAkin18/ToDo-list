<template>
   <div   class=" flex flex-row min-h-screen" :class="{'inbox bg-[#f8fafc] ': !isDarkMode, 'inbox bg-[#1e293b] text-white ': isDarkMode}">
    <Sidebar
      class="nav w-[max-300px]"
      :lists="lists" 
      :tasks="tasks"
      :dueReminderCount="dueReminderCount"
      :isDarkMode="isDarkMode"
      @toggle-dark-mode="toggleDarkMode"  
      @add-task="addNewTask" 
      :counter="tasks.length" 
      :username="username"
      :profileImage="profileImage"
      :todayCount="todayCount" 
      :upcomingCount="upcomingCount" 
    />
    
    <div class="border pt-14 w-full px-2  mx-auto lg:flex flex-col  lg:w-8/12 lg:mr-10 ">
        <h1 class="text-3xl text-[#007BFF] font-bold mb-4">Notifications:</h1>
        <div  v-if="filteredReminder">
            <ul>
                <li v-for="task in filteredReminder" :key="task.id" class="mb-4 p-4 border border-[#007BFF] rounded">
                    <div class="">
                      <h3 class="text-xl font-bold text-[#007BFF]"><font-awesome-icon :icon="['fas', 'bell']" /> Do not forget</h3>
                      <div class="pl-4">
                        <h2 class="font-bold text-xl">{{ task.text }}</h2>
                        <p>{{ task.description }}</p>
                        <p>Don't forget: {{ formatDate(task.reminder) }}</p>
                      </div>
                    </div>
                    
                </li>
            </ul>
        </div>
        <div v-else>
            <p>No overdue tasks.</p>
        </div>
        <div  v-if="filteredOverDue">
            <ul>
                <li v-for="task in filteredOverDue" :key="task.id" class="mb-4 p-4 border border-red-500 rounded">
                    <div>
                      <h3 class="text-xl font-bold text-[#007BFF]"><font-awesome-icon class="text-[#007BFF] md:text-lg" :icon="['fas', 'calendar-days']" /> Task outdated already</h3>
                      <div class="pl-4">
                        <h2 class="font-bold text-xl">{{ task.text }}</h2>
                        <p>{{ task.description }}</p>
                        <p class="text-red-600">Overdue since: {{ formatDate(task.dueDate) }}</p>
                      </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>No overdue tasks.</p>
        </div>
    </div>
  </div>
</template>

<script>
import { format, differenceInDays } from 'date-fns';
import Sidebar from '@/components/Sidebar.vue';
import { faInbox, faUser, faCalendarDays,faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs';
import { mapState, mapActions } from 'vuex';

export default {
    components:{
        Sidebar
    },
    props:{
    tasks: {
      type: Array,
      required: true
    },
    profiles: {
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
    },
   
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
  computed: {
    ...mapState({
      username: state => state.profile.username,
      profileImage: state => state.profile.imagePreview,
    }),
      
      filteredReminder() {
          const dueDate = dayjs().format('YYYY-MM-DDTHH:mm');
          return this.tasks.filter(task => task.reminder < dueDate);
      },
      filteredOverDue() {
          const dueDate = dayjs().format('YYYY-MM-DDTHH:mm');
          return this.tasks.filter(task => task.dueDate < dueDate);
      },
  },
  methods: {
    ...mapActions(['loadProfile']),
    formatDate(date) {
        return format(new Date(date), 'MMMM d, yyyy hh:mm aa'); 
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

<style scoped>


.notification-page h1 {
  margin-bottom: 20px;
}

.notification-page ul {
  list-style-type: none;
  padding: 0;
}

.notification-page li {
  background-color: #ffe5e5;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
