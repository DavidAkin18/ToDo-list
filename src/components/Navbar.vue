<template>
  <div class="nav flex flex-rol items-center justify-between  w-full p-2 border-b shadow lg:py-4 lg:px-20 fixed top-0 mb-20 z-50" :class="{'bg-[#1e293b] text-white border-blue-400 ': isDarkMode}">
    <div class="logo flex gap-1 items-center ">
        <img class="h-10 " src="../assets/images/logo.png" alt="logo">
        <p class="font-bold text-xl text-blue-700" :class="{'text-white ': isDarkMode}">to-do-Dist</p>
    </div>
    <div class="nav-list flex items-center gap-6">
        <ul v-for="(item, index) in lists" :key="index">
            <li class="text-blue-700 hover:text-blue-500" :class="{'text-white hover:text-gray-300': isDarkMode}"><router-link :to="item.link">{{ item.name }}</router-link></li>
        </ul>
        <button @click="$emit('toggle-dark-mode')" class="text-blue-700 hover:text-blue-500" :class="{'text-yellow-400 hover:text-yellow-300 ': isDarkMode}"><font-awesome-icon :icon="['fas', 'lightbulb']"/></button>
    </div>
    
  </div>
</template>

<script>
export default {
    data(){
        return{
            lists:[
                {name:'Login', link:'/login'},
                {name:'Register', link:'/registration'},
            ]
        }
    },
    props:{
         isDarkMode: {
            type: Boolean,
            required: true
        },
    },
    watch: {
        '$route.path'(newPath) {
        if (newPath === '/registration') {
            localStorage.clear();
        }
        },
    },
}
</script>

<style>

</style>