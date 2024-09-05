<template>
   <div class="profile mt-10 px-4" >
    <ul>
        <li v-for="(list, index) in lists" :key="index">
            <span  >
                <router-link class='px-5'   :to="list.link" :class="{act:isActive(list.link), inAct:isDarkMode }" id="item-in-list">
                    <div>
                        <font-awesome-icon class="icon" :icon="list.icon"  />
                        {{ list.name }}
                    </div>
                    <span v-if="index === 0 "> {{ list.count = counter }}</span>
                    <span v-if="index === 1">{{ list.count = todayCount }}</span>
                    <span v-if="index === 2">{{ list.count = upcomingCount  }}</span>
                </router-link>
            </span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    // components:{
    //     Profile
    // },
    data(){
        return{
            isProf:false
        }
    },
    props:['lists', 'toggleBar', 'colorChange', 'task', 'counter', 'todayCount', 'upcomingCount','isDarkMode'],
    methods:{
        isActive(path){
            return this.$route.path === path;
        },
        addTask(task){
            this.$emit('add-task', task);
        }
    }
}
</script>

<style scoped>
.profile{
    display: flex;
    flex-direction: column;
    gap: 5px;

    width: 100%; 
}
.profile-item{
    width: 100%;
}
.profile-item p{
    font-size: 2em;
    width: 100%;
    cursor: pointer;
}
.profile-item p:hover{
    background: #fff;
    color: #007BFF;
    padding: 5px;
    border-radius: 10px;
}
ul{
    min-height: 30px; 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
}
li{
    font-size: 18px;
    list-style: none;
    width:100%;
    font-weight: 400;

}
li a{
    text-decoration: none;
    color: #007BFF;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px;
    border-radius: 10px;
}
.color{
    color: #fff;
}

.color:hover{
    /* background:#888; */
    color: #fff;
}
li a:hover{
    background: #fff;
    color: #007BFF;
}
.act{
    background: #fff;
    color: #007BFF;
}
.inAct{
    color: #fff;
    background: #007BFF;
}
.a{
    text-decoration: none;
    width: 40px;
    font-size: 16px;
}
.prof{
    position: absolute;
    z-index: 9;
    width: 95%;
}
#item-in-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>