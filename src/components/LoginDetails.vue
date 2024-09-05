<template>
  <div class="login p-4  lg:w-11/12 lg:mt-4  mx-auto">
        <div class="logo flex gap-1 items-center">
            <img class="h-10 " src="../assets/images/logo.png" alt="logo">
            <p class="font-bold text-xl text-blue-700">to-do-Dist</p>
        </div>
        <div class="form-container mt-8 px-2 md:flex md:flex-row-reverse gap-2">
            <div class="img-container "></div>
            <div class="form md:w-1/2">
                <h1 class="text-black-600 my-5 text-lg ">Login</h1>
                <div>
                    <button  class="border p-4 flex items-center gap-2 w-full ">
                        <img src="../assets/images/googleLogo.png" alt="google-logo"  class="apple-logo w-10"> Continue with Google
                    </button><br>
                    <button class="border p-4 flex items-center gap-2 w-full">
                        <img src="../assets/images/apple-logo-transparent.png" alt="apple-logo"  class="apple-logo w-10"> Continue with Apple
                    </button>
                </div>

                <form @submit.prevent="handleSubmit" class="my-4">
                    <div class="form-text rounded-xl border px-4 py-2 flex flex-col">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" required placeholder="Enter your email..." class="w-full p-2">
                    </div>

                    <div class="form-text rounded-xl border px-4 py-2 flex mt-5 flex-col">
                        <label for="password">Password</label>
                       <div class="password flex justify-between">
                            <input 
                                :type="toggleEye"  
                                placeholder="Enter your password..."  
                                v-model="password"
                                class="w-full"
                            />
                            <img :src="toggleIcon" alt="toggle password" @click="toggleEyeBtn"  class="apple-logo w-5 p-0" >
                       </div>
                    </div>
                    <span class="error">{{ passwordError }}</span>
                    <button class="log w-full bg-[#0056b3] mt-5 text-lg font-bold text-white px-2 rounded-lg py-3">Log in</button>
                </form>
            </div>
        </div>
   </div>
</template>

<script>
export default {
    data(){
        return{
            toggleEye:'password',
            password:'',
            showPasswordIcon: require('@/assets/images/eye.png'),
            hidePasswordIcon: require('@/assets/images/hide-eye.webp'),
            passwordError:''
        }
    },
    computed:{
        toggleIcon(){
            return this.toggleEye ==='password' ? this.showPasswordIcon : this.hidePasswordIcon
        }
    },
    methods: {
        toggleEyeBtn(){
            this.toggleEye = this.toggleEye === 'password'? 'text' :'password';
        },
        handleSubmit(){
            // this.passwordError = this.password.length > 5 ? '' : 'password must be at least 6 chars long'
            if(this.password.length > 5){
                this.passwordError = ''
                this.$router.push('/inbox')
            }else{
                this.passwordError='password must be at least 6 chars long'
            }
        },
    },
}
</script>

<style>

.img-container{
    background: url('../assets/images/todo-img.jpg');
    background-position:top ;
    background-size: cover;
    background-repeat: no-repeat;
    height: 200px;
}
@media (min-width: 768px){
    .img-container{
        display: flex;
        background-size: cover;
        min-width: 400px;
        min-height: 500px;

    }
}
</style>