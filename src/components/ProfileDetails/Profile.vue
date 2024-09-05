<template>
   <div class="profil min-h-screen text-[#3b82f6] hover:text-[#2563eb] px-4">
    <div class="item py-4">
        <h1 class="" :class="{'text-[#fff]':isDarkMode}">
            <router-link to="user">View Profile</router-link>
        </h1>
    </div>
    <hr class="border-[#3b82f6]" >

    <div class="item py-4">
       <ul>
        <li class="py-2" :class="{'text-[#fff]':isDarkMode}"><font-awesome-icon :icon="['fas', 'gear']" />   Settings</li>
        <li class="py-2" :class="{'text-[#fff]':isDarkMode}"><font-awesome-icon :icon="['fas', 'add']" />   Add a team</li>
       </ul>
    </div>
    <hr class="border-[#3b82f6]">

    <div class="item py-4">
        <ul>
            <li class="py-2" :class="{'text-[#fff]':isDarkMode}"><font-awesome-icon :icon="['fas', 'chart-line']" />   Activity log</li>
            <li class="py-2" :class="{'text-[#fff]':isDarkMode}"><font-awesome-icon :icon="['fas', 'print']" />   Print</li>
            <li class="py-2" :class="{'text-[#fff]':isDarkMode}"><font-awesome-icon :icon="['fas', 'book-open']"/>   Resources</li>
        </ul>
    </div>
    <hr class="border-[#3b82f6]">

    <div class="item py-4">
        <ul>
            <li class="py-2" :class="{'text-[#fff]':isDarkMode}">
                <font-awesome-icon :icon="['fas', 'gift']" 
                />   
                What's new
            </li>
        </ul>
    </div>
    <hr class="border-[#3b82f6]">

    <div class="item py-4">
        <ul>
            <li class="py-2" :class="{'text-[#fff]':isDarkMode}"><font-awesome-icon :icon="['fas', 'rotate']" />   Sync</li>
            <li class="py-2 text-red-400" ><router-link to="login">
                <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" /> Log out </router-link> </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        isDarkMode: {
        type: Boolean,
        required: true
        },
        // username: {
        // type: String,
        // required: false,
        // default: "David",
        // },
        // profileImage: {
        // type: String,
        // required: false,
        // default: "default-image-path.jpg", // Default image if not set
        // },
    },
    data() {
        return {
            username: '',
            profileImage: ''
        };
    },
    methods: {
        updateProfile(profile) {
            this.username = profile.username;
            this.profileImage = profile.profileImage;
        }
    },
    
}
</script>

<style>

</style>