<template>
 <div class="inbox flex flex-row min-h-screen" :class="{'inbox bg-[#f8fafc] ': !isDarkMode, 'inbox bg-[#1e293b] text-white ': isDarkMode}">

    <Sidebar  
      class="nav w-[max-300px]"
      :lists="lists" 
      :tasks="tasks" 
      :isDarkMode="isDarkMode"      
      :dueReminderCount="dueReminderCount"
      @toggle-dark-mode="toggleDarkMode"  
      @add-task="addNewTask" 
      :counter="tasks.length" 
      :username="username"
      :profileImage="profileImage"
      :todayCount="todayCount" 
      :upcomingCount="upcomingCount" 
    />
   
    <div class=" pt-14 w-full px-2  mx-auto lg:flex flex-col  lg:w-8/12 lg:mr-10">
      <h1 class="hd text-[#007BFF] p-3 text-3xl" :class="{'text-[#007BFF]': !isDarkMode, 'text-white': isDarkMode}">Inbox:</h1>
      <InboxList 
        :tasks="tasks" 
        :isDarkMode="isDarkMode"
        :username="username"
        :profileImage="profileImage"
        @add-task="addNewTask" 
        @delete-task="deleteTask" 
        @add-subtask="addSubtask" 
        @toggle-subtask="toggleSubtaskCompletion" 
      />
    </div>
  </div>

</template>

<script>
import InboxList from '@/components/inbox/InboxList.vue';
import Sidebar from '@/components/Sidebar.vue';
import { faInbox, faUser, faCalendarDays,faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import { 
  format, differenceInDays, isThisMonth, isThisWeek, isThisYear, isToday, isTomorrow, isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isSunday, addWeeks, addMonths, addYears, isAfter,
} from 'date-fns';
import dayjs from 'dayjs';

import { mapState, mapActions } from 'vuex';


export default {
  components:{
      Sidebar,
      InboxList
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
    methods:{
      ...mapActions(['loadProfile']),
      addNewTask(){
        this.$emit('add-task')
      },
      addOrUpdateTask(index){
        this.tasks[index].isEditing= false
        this.saveTasksToLocalStorage();
      },
      editTask(index){
        this.tasks[index].isEditing=true
        this.saveTasksToLocalStorage();
          
      },
      deleteTask(index){
        this.tasks.splice(index, 1)
        this.$emit('update-tasks', this.tasks);
        this.saveTasksToLocalStorage();
      },
      clearTasks() {
        // This ensures the tasks array is empty
        this.$emit('update:tasks', []);
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
      this.saveTasksToLocalStorage();
    },
    toggleSubtaskCompletion(task, subtask) {
      const subtaskIndex = task.subtasks.findIndex(st => st.id === subtask.id);
      if (subtaskIndex !== -1) {
        this.tasks.find(t => t.id === task.id).subtasks[subtaskIndex].isCompleted = !task.subtasks[subtaskIndex].isCompleted;
      }
      this.saveTasksToLocalStorage();
    },
      getDaysLeft(dueDate) {
        if (!dueDate) return '';

        const now = new Date();
        const due = new Date(dueDate);
        const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24)); // Calculate days difference

        if (diff === 0) {
          return 'Due today';
        }
        else if (diff === 1) {
          return 'Due tomorrow';
        } 
        else if (diff === 2) {
          return 'Due in two days';
        } 
        else if (diff === 3) {
          return 'Due in three days';
        } 
        else if (diff < 0) {
          return `Overdue by ${Math.abs(diff)} days`;
        } 
        else {
          return `Due in ${diff} days`;
        }
        this.saveTasksToLocalStorage();
      },
      getReminder(reminder) {
      if (!reminder) {
        console.error('Invalid reminder:', reminder);
        return ''; // Handle invalid date
      }

      const reminderDate = new Date(reminder);
      const now = new Date();
      const timeFormat = 'hh:mm aa';

      if (isToday(reminderDate)) {
        return `Today at ${format(reminderDate, timeFormat)}`;
      } else if (isTomorrow(reminderDate)) {
        return `Tomorrow at ${format(reminderDate, timeFormat)}`;
      } else if (isThisWeek(reminderDate, { weekStartsOn: 1 })) { // Week starts on Monday
        if (isMonday(reminderDate)) return `Monday at ${format(reminderDate, timeFormat)}`;
        if (isTuesday(reminderDate)) return `Tuesday at ${format(reminderDate, timeFormat)}`;
        if (isWednesday(reminderDate)) return `Wednesday at ${format(reminderDate, timeFormat)}`;
        if (isThursday(reminderDate)) return `Thursday at ${format(reminderDate, timeFormat)}`;
        if (isFriday(reminderDate)) return `Friday at ${format(reminderDate, timeFormat)}`;
        if (isSaturday(reminderDate)) return `Saturday at ${format(reminderDate, timeFormat)}`;
        if (isSunday(reminderDate)) return `Sunday at ${format(reminderDate, timeFormat)}`;
      } else if (isThisMonth(reminderDate)) {
        return `This Month on ${format(reminderDate, 'MMMM d')} at ${format(reminderDate, timeFormat)}`;
      } else if (isAfter(reminderDate, addWeeks(now, 1)) && isThisMonth(reminderDate)) {
        return `Next Week on ${format(reminderDate, 'EEEE')} at ${format(reminderDate, timeFormat)}`;
      } else if (isAfter(reminderDate, addMonths(now, 1)) && isThisYear(reminderDate)) {
        return `Next Month on ${format(reminderDate, 'MMMM d')} at ${format(reminderDate, timeFormat)}`;
      } else if (isAfter(reminderDate, addYears(now, 1))) {
        return `Next Year on ${format(reminderDate, 'MMMM d, yyyy')} at ${format(reminderDate, timeFormat)}`;
      } else {
        const diff = differenceInDays(reminderDate, now);
        if (diff < 0) {
          return `Overdue by ${Math.abs(diff)} days at ${format(reminderDate, timeFormat)}`;
        } else {
          return `Due in ${diff} days on ${format(reminderDate, 'MMMM d')} at ${format(reminderDate, timeFormat)}`;
        }
      }
    },
    handleToggleBar(){
      this.toggleBar = !this.toggleBar
      this.saveTasksToLocalStorage();
    },
    hidePlaceholder(event){
      const nextElement = event.target.nextElementSibling;
      if (nextElement && nextElement.classList.contains('placeholder')) {
        nextElement.style.display = 'none';
      }
      this.saveTasksToLocalStorage();
    },
    showPlaceholder(event) {
      const nextElement = event.target.nextElementSibling;
      if (nextElement && nextElement.classList.contains('placeholder') && !event.target.value) {
        nextElement.style.display = 'block';
      }
      this.saveTasksToLocalStorage();
    },
    toggleDarkMode() {
      this.$emit('toggle-dark-mode');
    },
    saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    },
    computed:{
      ...mapState({
        username: state => state.profile.username,
        profileImage: state => state.profile.imagePreview,
      }),
      dynamic(){
        return{
          active:this.toggleBar,
          inActive:!this.toggleBar
        }
      },
      priorityClass() {
        return {
          'high-priority': this.tasks.priority ==='High',
          'medium-priority': this.tasks.priority === 'Medium', 
          'low-priority': this.tasks.priority ==='Low',
        };
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
    mounted() {
      console.log('Tasks on mount:', this.tasks);
      if (this.$route.query.from === 'registration') {
        console.log('User navigated from registration.');
        this.deleteTask()
      } else {
        console.log('User navigated from login.');
        if (this.tasks.length === 0) {
          console.log('No tasks available.');
        } else {
          console.log('Tasks are available.');
        }
      }
    }
}
</script>

<style >
.inbox{
  position: absolute;
  width: 100%;
  background: #f8fafc;
  padding-bottom: 20px ;
  display: flex;
  flex-direction: column;
}

</style>