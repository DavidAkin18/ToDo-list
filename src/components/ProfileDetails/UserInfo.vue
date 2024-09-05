<template>
  <div class="inbox min-h-screen flex flex-row" >
    <Sidebar 
      class="min-h-screen"
      :lists="lists" 
      :username="profile.username"  
      :profileImage="profile.imagePreview" 
      :tasks="tasks" 
      :isDarkMode="isDarkMode"
      @toggle-dark-mode="toggleDarkMode"    
      @add-task="addNewTask" 
      :todayCount="todayCount" 
      :upcomingCount="upcomingCount" 
    />
    <div class="main min-h-screen pt-12 w-full px-4 lg:w-9/12 mx-auto lg:flex flex-col items-right lg:mr-10     mx-auto" >
      <h1 class="lg:w-9/12 mx-auto text-2xl font-bold text-[#3b82f6]" v-if="profile.length < 0">Fill Profile</h1>
      <h1 class="lg:w-9/12 mx-auto text-2xl font-bold text-[#3b82f6]" v-else>Filled Profile</h1>
      
      <!-- Profile Display Section -->
      <div v-if="formIn" class="lg:w-9/12  rounded-lg mx-auto">
        <!-- Profile Image and Actions -->
        <div class="flex items-center gap-2">
          <img v-if="profile.imagePreview" :src="profile.imagePreview" alt="profile-img" class="rounded-full w-14 h-14" />
          <img v-else src="../../assets/images/profileID.jpeg" alt="profile-img-placeholder" class="rounded-full w-14 h-14" />
          <div class="flex items-center gap-4">
            <div class="my-2">
              <label for="UploadImg" class="cursor-pointer">
                <div class="inline-flex items-center px-2 py-2 md:px-4 md:py-2 text-sm md:text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <span v-if="formIn" >Change Photo</span> 
                </div>
              </label>
              <input type="file" id="UploadImg" @change="onFileChange" class="hidden" name="image" />
            </div>
            <button @click="removePhoto" class="px-2 py-1 md:px-4 md:py-2 hover:text-[#f87171] text-[#fca5a5] rounded-lg border border-[#fca5a5] hover:border-[#f87171] text-sm md:text-lg">Remove Photo</button>
          </div>
        </div>

        <!-- Profile Details Display -->
        <hr class="my-2" />
        <div class="pl-4">
          <h2 class="text-lg text-[#3b82f6]">Name:</h2>
          <div class="flex gap-2">
            <p class="text-sm">{{ profile.fName }}</p>
            <p class="text-sm">{{ profile.lName }}</p>
          </div>
        </div>
        <hr class="my-2" />
        
        <div class="pl-4">
          <h1 class="text-lg text-[#3b82f6]">Email:</h1>
          <p>{{ profile.email }}</p>
        </div>
        <hr class="my-2" />

        <div class="pl-4">
          <h2 class="text-lg text-[#3b82f6]">Phone number:</h2>
          <p>{{ profile.phone }}</p>
        </div>
        <hr class="my-2" />

        <div class="pl-4">
          <h2 class="text-lg text-[#3b82f6]">Username:</h2>
          <p class="text-sm">{{ profile.username }}</p>
        </div>
        <hr class="my-2" />

        <div class="pl-4">
          <h2 class="text-lg text-[#3b82f6]">Date of Birth:</h2>
          <p class="text-sm">{{ profile.dob }}</p>
        </div>
        <hr class="my-2" />

        <div class="pl-4">
          <h2 class="text-lg text-[#3b82f6]">Gender:</h2>
          <p class="text-sm">{{ profile.gender }}</p>
        </div>
        <hr class="my-2" />

        <div class="pl-4">
          <h2 class="text-lg text-[#3b82f6]">Bio:</h2>
          <p class="text-sm">{{ profile.bio }}</p>
        </div>
        <hr class="my-2" />

        <div class="pl-4">
          <h2 class="text-lg text-[#3b82f6]">LinkedIn:</h2>
          <p class="text-sm"><a :href="profile.linkedin" class="text-blue-500 hover:underline" target="_blank">{{ profile.linkedin }}</a></p>
        </div>
        <hr class="my-2" />
      </div>

      <!-- Profile Edit Form -->
      <form v-else @submit.prevent="handleForm" class="lg:w-9/12 p-2 mx-auto" >
        <!-- Image Upload -->
        <div class="my-2 flex flex-row items-center gap-4 border  rounded-lg px-2 py-1"  >
          <label for="UploadImg" class="cursor-pointer">
            <div class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <font-awesome-icon :icon="['fas', 'upload']" class="mr-2" />
              <span v-if="!profileName">Upload image</span>
              <span v-else>Change image</span>
            </div>
          </label>
          <input type="file" id="UploadImg" @change="onFileChange" class="hidden" name="image" />
          <span>{{ profileName || 'No image selected' }}</span>
        </div>

        <!-- Form Fields -->
        <div class="md:flex gap-2">
          <div  class="my-2 flex flex-col md:w-1/2 border  rounded-lg px-2 py-1" >
            <label for="fName" class="text-lg">First Name</label>
            <input v-model="profile.fName" id="fName" type="text" 
            class="p-2 my-1 bg-gray-300 border-[#3b82f6] rounded-lg text-black focus:outline-none" 
            placeholder="Enter your first name" />
          </div>
          

          <div 
            class="my-2 flex flex-col md:w-1/2 border rounded-lg px-2 py-1" >
            <label for="lName" class="text-lg">Last Name</label>
            <input v-model="profile.lName" id="lName" type="text" 
            class="p-2 my-1 bg-gray-300 border-[#3b82f6] rounded-lg text-black focus:outline-none" 
            placeholder="Enter your last name" />
          </div>
        </div>

        <div class="my-2 flex flex-col border  rounded-lg px-2 py-1">
          <label for="email" class="text-lg">Email</label>
          <input v-model="profile.email" id="email" type="email" 
           class="p-2 my-1 bg-gray-300 border-[#3b82f6] rounded-lg text-black focus:outline-none" 
          placeholder="Enter your email" />
        </div>

        <div class="my-2 flex flex-col border rounded-lg px-2 py-1">
          <label for="phone" class="text-lg">Phone</label>
          <input v-model="profile.phone" id="phone" type="text" 
           class="p-2 my-1 bg-gray-300 border-[#3b82f6] rounded-lg text-black focus:outline-none" 
          placeholder="Enter your phone number" />
        </div>

        <div class="my-2 flex flex-col border  rounded-lg px-2 py-1">
          <label for="username" class="text-lg">Username</label>
          <input v-model="profile.username" id="username" type="text" 
           class="p-2 my-1 bg-gray-300 border-[#3b82f6] rounded-lg text-black focus:outline-none"
          placeholder="Enter your username" />
        </div>

        <div  class="my-2 flex flex-col border  rounded-lg px-2 py-1">
          <label for="dob" class="text-lg">Date of Birth</label>
          <input v-model="profile.dob" id="dob" type="date" 
          class="p-2 my-1 bg-gray-300 border-[#3b82f6] rounded-lg text-black focus:outline-none"
          />
        </div>

        <div  class="my-2 flex flex-col border  rounded-lg px-2 py-1">
          <label for="gender" class="text-lg">Gender</label>
          <select v-model="profile.gender" id="gender" 
            class="p-2 my-1 bg-gray-300 border-[#3b82f6] rounded-lg text-black focus:outline-none" 
          >
            <option value="" disabled>Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        <div class="my-2 flex flex-col border  rounded-lg px-2 py-1">
          <label for="bio" class="text-lg">Bio</label>
          <textarea v-model="profile.bio" id="bio" rows="4" 
          class="p-2 my-1 bg-gray-300 border-[#3b82f6] rounded-lg text-black focus:outline-none" 
          placeholder="Tell us about yourself"></textarea>
        </div>

        <div class="my-2 flex flex-col border  rounded-lg px-2 py-1">
          <label for="linkedin" class="text-lg">LinkedIn</label>
          <input v-model="profile.linkedin" id="linkedin" type="text" 
           class="p-2 my-1 bg-gray-300 border-[#3b82f6] rounded-lg text-black focus:outline-none"
          placeholder="Enter your LinkedIn profile URL" />
        </div>
        <div class="flex justify-between mt-4 items-center  md:w-full mx-auto text-2xl font-bold text-[#3b82f6]">
          <div class="flex justify-between flex-row gap-4">
              <button type="submit" class="px-4 py-2 text-white text-sm  md:text-lg hover:bg-blue-600 rounded-lg bg-[#3b82f6]">Save Account</button>
          </div>
          <div >
              <button type="button"  @click="deleteAccount" class="px-4 py-2 hover:text-[#f87171] text-[#fca5a5] text-sm  md:text-lg rounded-lg border border-[#fca5a5] hover:border-[#f87171]">Delete Account</button>
          </div>
        </div>
        </form> 
        
        <div v-if="formIn"  class="flex justify-between mt-4 items-center  md:w-9/12 mx-auto text-2xl font-bold text-[#3b82f6]">
            <div>
                <button type="button" @click="editAccount" class="px-4 py-2  text-[#a855f7]  text-sm  md:text-lg rounded-lg border border-[#a855f7] hover:text-[#7e22ce] hover:border-[#7e22ce] ">Edit Account</button>
            </div>
            <div >
                <button type="button"  @click="deleteAccount" class="px-4 py-2 hover:text-[#f87171] text-[#fca5a5] text-sm  md:text-lg rounded-lg border border-[#fca5a5] hover:border-[#f87171]">Delete Account</button>
            </div>
        </div>
    </div>
  </div>
  
</template>

<script>
import { faInbox, faUser, faCalendarDays,faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../Sidebar.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapState, mapActions } from 'vuex';
import { ref } from 'vue';

export default {
  props:{
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
    isDarkMode: {
      type: Boolean,
      required: true
    },
  },
  components:{
    Sidebar,
    FontAwesomeIcon,
  },
 
  data() {
    return {
      formIn: false,
      isDarkMode: false,
      lists:[
        {name:'Inbox', icon:faInbox , link:'/inbox'},
        {name:'Today', icon:faCalendarWeek, link:'/today'},
        {name:'Upcoming', icon:faCalendarDays, link:'/upcoming'},
      ],
      counter: undefined ,
    };
  },
  computed:{
    ...mapState(['profile']),
    profileName(){
      return this.profile.profileName;
    },
  },

  mounted() {
    this.$store.dispatch('loadProfile');
  },
  methods: {
    ...mapActions(['updateProfile', 'updateImage',]),
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.updateImage({
            imagePreview: e.target.result,
            profileName: file.name,
          });
        };
        reader.readAsDataURL(file);
      }
    },
    handleForm() {
      this.updateProfile(this.profile);
      this.formIn = true;
      
    },
    saveProfile() {
      const profile = {
        fName: this.fName,
        lName: this.lName,
        email: this.email,
        phone: this.phone,
        username: this.username,
        dob: this.dob,
        gender: this.gender,
        bio: this.bio,
        linkedin: this.linkedin,
        imagePreview: this.imagePreview,
        profileName: this.profileName,
      };
      localStorage.setItem('profile', JSON.stringify(profile));
    },
    emitProfileUpdated() {
      this.$emit('profile-updated', {
        username: this.username,
        profileImage: this.imagePreview,
      });
    },
    loadProfile() {
      const profile = JSON.parse(localStorage.getItem('profile'));
      if (profile) {
        this.fName = profile.fName;
        this.lName = profile.lName;
        this.email = profile.email;
        this.phone = profile.phone;
        this.username= profile.username
        this.dob = profile.dob
        this.gender = profile.gender
        this.bio = profile.bio
        this.linkedin = profile.linkedin
        this.imagePreview = profile.imagePreview;
        this.profileName = profile.profileName;
        this.emitProfileUpdated()
      }
      this.formIn = true;
    },
   
    removePhoto() {
      this.updateImage({
        imagePreview: null,
        profileName: null,
      });
    },

    deleteAccount() {
      this.$store.dispatch('deleteAccount');
      this.formIn = false
    },
  
    editAccount() {
      this.formIn = false;
    },
    toggleDarkMode() {
      this.$emit('toggle-dark-mode');
    },
  }
}
</script>

<style>

</style>