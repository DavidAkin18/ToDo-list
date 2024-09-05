<template>
    <div
    class="sidenav flex flex-col min-h-screen fixed transition-all duration-500"
    :class="{'bg-[#e2e8f0]': !isDarkMode, 'bg-[#374151]': isDarkMode}"
  >
    <!-- Sidebar Header and Toggle Buttons -->
    <div class="flex flex-col items-start  mt-2">
      <div 
        class="relative transition-all  duration-500  flex items-center" 
        :class="{
          'left-0 w-0': !toggleBar,
          'left-28   md:left-40': toggleBar,
        }"
      >
        <button 
          @click="$emit('toggle-dark-mode')"
          v-if="toggleBar"
          class="w-12  rounded text-xl transition-colors"
          :class="{'text-yellow-400': isDarkMode, 'text-[#fcd34d]': !isDarkMode}"
        >
          <font-awesome-icon :icon="['fas', 'lightbulb']"/>
        </button>
        <div v-if="toggleBar">
          <router-link :to="{ name: 'notifications', params: { tasks: tasks } }"  class="w-12  rounded text-xl transition-colors" :class="[
              'border-[#007BFF] text-[#007BFF]',
              {'bg-[#1e293b] text-blue-600 border-gray-900': isDarkMode}
            ]">
            <font-awesome-icon :icon="['fas', 'bell']" /> {{ dueReminderCount }}
          </router-link>
        </div>
        <button 
          class="bar-btn z-30 m-2 border border-[#007BFF] p-1 text-[#007BFF] bg-white transition-colors"
          @click="handleToggleBar"
          :class="[
            'border-[#007BFF] text-[#007BFF]',
            {'bg-[#1e293b] text-blue-600 border-gray-900': isDarkMode}
          ]"
        >
          <font-awesome-icon :icon="['fas', 'door-closed']" v-if="toggleBar" />
          <font-awesome-icon :icon="['fas', 'door-open']" v-else :class="{'fixed':toggleBar}" />
        </button>
      </div>
      
      <!-- Profile Dropdown Section -->
      <div 
        class="absolute  mt-2"
        v-if="toggleBar"
      >
        <button 
          @click="toggleProfile = !toggleProfile"  :class="{'bg-[#3b82f6] text-[#fff]':toggleProfile}"
          class="border border-[#3b82f6] text-[#3b82f6] sm:ml-2 ml-4 hover:border-[#2563eb] text-[#2563eb]  rounded-lg px-2 py-1"
        >
          <div class=" md:flex items-center text-center gap-2">
            <img v-if="profileImage" :src="profileImage" alt="Profile Image" class="rounded-full w-6 h-6" >
            <img v-else src="../assets/images/profileID.jpeg" alt="profile pic" class="rounded-full w-6 h-6">
            <span v-if="username">{{ username }} <font-awesome-icon :icon="['fas', 'caret-down']" v-if="toggleProfile" /> </span>
            <span v-else>Username <font-awesome-icon :icon="['fas', 'caret-down']" v-if="toggleProfile" /> </span>
            <font-awesome-icon :icon="['fas', 'caret-up']" v-if="!toggleProfile" />
          </div>
        </button>
       
        <div 
          class="absolute top-full  mt-2 right-0 bg-gray-400 rounded-lg shadow-lg transition-transform duration-500"
          :class="{
            'transform scale-100': toggleProfile,
            'transform scale-0': !toggleProfile
          }"
        >
          
        </div>
      </div>
    </div>
    <profile v-if="toggleProfile" 
    class="absolute mt-14 bg-gray-400 w-full mx-auto shadow-lg rounded-lg p-1"
    :class="[
            'border-[#007BFF] text-[#007BFF]',
            {'bg-[#1e293b] text-blue-600 border-gray-900': isDarkMode}
          ]"
    />
   
    <div 
      class="profile flex mt-5"
      :class="dynamic"
    >
      <ul v-if="lists" class="flex flex-col">
        <div 
          class="search-inbox flex flex-col text-xl gap-5 px-2"
          :class="{'text-white': isDarkMode, 'text-[#007BFF]': !isDarkMode}"
        >
          <button 
            @click="addNewTask"
            class="addOn text-xl text-left"
            :class="{'text-white': isDarkMode, 'text-[#007BFF]': !isDarkMode}"
          >
            <font-awesome-icon class="icon" id="add-icon" icon="add" /> Add inbox
          </button>
          <div class="search flex items-center gap-2">
            <font-awesome-icon 
              class="icon text-lg"
              :class="{'text-gray-300': isDarkMode, 'text-[#007BFF]': !isDarkMode}"
              icon="search"
            />
            <input 
              type="text" 
              id="search"
              v-model="searchQuery" 
              placeholder="Search..." 
              @blur="handleShowResult"
              @keypress="showResult = true"
              class="w-full rounded-lg p-2 py-1"
              :class="{'bg-gray-800 text-white': isDarkMode, 'bg-white text-black': !isDarkMode}"
            />
          </div>
          <ul :class="{searchOption: !showResult}" class="flex flex-col gap-6">
            <li v-for="item in filteredItems" :key="item.id">
              {{ item.name }}
            </li>
          </ul>
        </div>
        <Search 
          :lists="lists"  
          :toggleBar="toggleBar" 
          :isDarkMode="isDarkMode"
          :colorChange="colorChange"  
          :counter="counter" 
          :task="task" 
          :todayCount="todayCount" 
          :upcomingCount="upcomingCount" 
        />
      </ul>
    </div>
    <div class="absolute bottom-0 w-full  text-white p-4" :class="{
          'w-0': !toggleBar,
          'w-36 md:w-36': toggleBar,
          'left-0': !toggleBar,
          'left-36   md:left-2': toggleBar,
        }">
      <router-link v-if="toggleBar" to="login" class="text-red-400 flex items-center gap-2">
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
        <h2>Log Out</h2>
      </router-link>
    </div>
  </div>
</template>

<script>
import Search from './Search.vue';
import profile from '../components/ProfileDetails/Profile.vue'
export default {
  props:{
    lists : {
      type: Array,
      required: true,
    },
    tasks:{
      type: Array,
      required: true,
    },
    counter:{
      type:Number,
      required:true
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
    username: {
      type: String,
      required: true
    },
    profileImage: {
      type: String,
      required: false
    },
  },
  components:{
      Search,
      profile
  },
  data(){
      return{
        searchQuery: '',
        toggleBar:false,
        showProfile: false,
        showResult:false,
        toggleProfile:false,
      }
  },
  computed:{
    filteredItems() {
      return this.lists.filter(list =>
        list.link.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    dynamic(){
      return{
        active:this.toggleBar,
        inActive:!this.toggleBar
      }
    },
    barShift(){
      return{
        act:this.toggleBar,
        inAct:!this.toggleBar
      } 
    },
    barContainer(){
      return{
        left:!this.toggleBar,
        right:this.toggleBar
      }
    }
  },
  methods:{
    handleToggleBar(){
      this.toggleBar = !this.toggleBar
      if (this.toggleBar) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
      this.showProfile= !this.showResult
    },
    handleShowResult(){
      setTimeout(() => {
        this.showResult = false
      }, 200);
    },
    addNewTask(){
      this.$emit('add-task')
    },
    HandleToggleProfile(){
      this.toggleProfile = true
    },
    updateProfile(profile) {
      this.username = profile.username;
      this.profileImage = profile.profileImage;
    } 
  },
}
</script>

<style scoped>
.inActive{
  display: none;
  overflow: hidden;
}
.no-scroll {
  overflow: hidden;
  height: 100%;
}
.active{
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 250px;
  transition: width 0.5s ease;
 
}
.left{
    text-align: left;
    width: 30px;
    transition: width 0.5s ease;
}
.right{
    text-align: right;
    width: 250px;
    transition: width 0.5s ease;
} 

.act{
    text-align: right;
    margin: 5px;
    z-index: 99;
    background: inherit;
    padding:3px;  
    transition: all 0.5s ease;
}
.inAct{
    text-align: left;
    position: static;
    margin: 5px;
    transition: all 0.5s ease;
}

.searchOption{
    display: none
}
@media (min-width:768px){
   
    .active{
        width: 300px;
        padding-left: 10px;
    }
    .right{
        text-align: right;
        width: 300px;
    }
}
</style>