<template>
  <div class="home mt-32 p-3 mx-auto text-center">
    <div class="flex flex-col items-center justify-center gap-6  mx-auto">
            <h1 class=" text-4xl font-bold md:text-7xl text-[#111] lg:w-7/12 " :class="{'text-white ': isDarkMode}">Organize your work and life, finally.</h1>
            <p class="text-left text-[#666] md:text-3xl text-md lg:w-7/12 md:text-center" :class="{'text-[#888] ': isDarkMode}">Simplify life for both you and your team. The world’s #1 task manager and to-do list app.</p>
    </div>
    <div class="mt-8">
        <button @click="handleSubmit" :class="{' btn bg-[#007BFF] md:text-3xl md:font-bold hover:bg-[#006BEE]  py-2 px-4 rounded-lg text-[#fff]' :!isDarkMode,   'text-[#007BFF] bg-[#fff] hover:bg-[#999] hover:text[#006BEE] md:text-3xl md:font-bold  py-2 px-4 rounded-lg': isDarkMode}"><router-link to="/registration">Start for Free</router-link></button>
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
  },
  methods:{
    handleSubmit(){
      localStorage.removeItem('tasks'); 
      this.$router.push({ name: 'inbox', query: { from: 'registration' } });
    },
  }
}
</script>

<style>

</style>