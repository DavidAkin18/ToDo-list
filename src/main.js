import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style.css'

 

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser,faUserSecret, faArrowRight, faInbox, faTrash, faSearch, faRightFromBracket , faCaretDown, faCaretUp , faLightbulb, faDoorOpen, faDoorClosed, faAdd, faCircleHalfStroke, faCalendarDays,faPenToSquare, faFlag, faCalendarWeek, faUpload, faGear, faChartLine, faBell, faPrint, faBookOpen, faPlus, faRotate,faGift,faArrowRightFromBracket, faDroplet} from '@fortawesome/free-solid-svg-icons';

library.add(faArrowRight, faInbox, faSearch, faAdd,faUserSecret, faTrash, faBell,faFlag, faRightFromBracket,faUpload,faCaretDown,faCaretUp, faUser,faLightbulb, faDoorOpen, faDoorClosed, faCalendarDays,faCalendarWeek,faCircleHalfStroke, faPenToSquare,faFlag, faGear,faBell, faChartLine,faPrint,faBookOpen,faGift, faPlus, faRotate,faArrowRightFromBracket, faDroplet);

createApp(App).use(store).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
