<template>
  <div class="inbox flex flex-row min-h-screen" :class="{'inbox bg-[#f8fafc] ': !isDarkMode, 'inbox bg-[#1e293b] text-white ': isDarkMode}">
    <Navbar class="mb-8"
      :isDarkMode="isDarkMode"
      @toggle-dark-mode="toggleDarkMode" 
    />
    <Main 
      :isDarkMode="isDarkMode"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import dayjs from 'dayjs';

import Navbar from '@/components/Navbar.vue';
import Main from '@/components/Main.vue';
export default {
  name: 'HomeView',
  components: {
    Navbar,
    Main
  },
  methods:{
    the(){
      const now = dayjs().format('YYYY-MM-DD');
      console.log(now);
    },
    toggleDarkMode() {
      this.$emit('toggle-dark-mode');
    },
  },
  props:{
    isDarkMode: {
      type: Boolean,
      required: true
    },
  },
  watch: {
    '$route.path'(newPath) {
      // Clear localStorage if navigating to the registration page
      if (newPath === '/registration') {
        localStorage.clear();
      }
    },
  },
}

</script>
