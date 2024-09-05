import { createStore } from 'vuex';
import dayjs from 'dayjs';

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type.startsWith('SET_') || mutation.type === 'RESET_PROFILE') {
      localStorage.setItem('profile', JSON.stringify(state.profile));
    }
  });
};
export default createStore({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
    profile: {
      fName: '',
      lName: '',
      email: '',
      phone: '',
      username: '',
      dob: '',
      gender: '',
      bio: '',
      linkedin: '',
      imagePreview: null,
      profileName: null,
    },
    notifications: [],
  },
  getters: {
    todayCount(state) {
      const today = dayjs().format('YYYY-MM-DD');
      return state.tasks.filter(task => task.dueDate === today).length;
    },
    upcomingCount(state) {
      const today = dayjs().format('YYYY-MM-DD');
      return state.tasks.filter(task => task.dueDate > today).length;
    },
    dueReminderCount(state) {
      const dueReminder = dayjs().format('YYYY-MM-DDTHH:mm');
      return state.tasks.filter(task => task.reminder < dueReminder).length;
    },
    inboxCount(state) {
      return state.tasks.length;
    },
    isDarkMode(state) {
      return state.darkMode;
    },
    tasks(state) {
      return state.tasks;
    },
    allNotifications: (state) => state.notifications,
    profile(state) {
      return state.profile;
    },
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    TOGGLE_DARK_MODE(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },
    SET_PROFILE(state, payload) {
      state.profile = { ...state.profile, ...payload };
      localStorage.setItem('profile', JSON.stringify(state.profile));
    },
    SET_IMAGE(state, payload) {
      state.profile.imagePreview = payload.imagePreview;
      state.profile.profileName = payload.profileName;
      localStorage.setItem('profile', JSON.stringify(state.profile));

    },
    RESET_PROFILE(state) {
      state.profile = {
        fName: '',
        lName: '',
        email: '',
        phone: '',
        username: '',
        dob: '',
        gender: '',
        bio: '',
        linkedin: '',
        imagePreview: null,
        profileName: null,
      };
      localStorage.removeItem('profile'); // Clear from local storage
    },
  },
  actions: {
    addTask({ commit }) {
      const newTask = {
        text: '',
        description: '',
        dueDate: '',
        priority: '',
        reminder: dayjs().format('YYYY-MM-DDTHH:mm'),
        labels: [],
        subtasks: [],
        isEditing: true,
        id: Date.now(),
      };
      commit('ADD_TASK', newTask);
    },
    updateTask({ commit }, updatedTask) {
      commit('UPDATE_TASK', updatedTask);
    },
    deleteTask({ commit }, taskId) {
      commit('DELETE_TASK', taskId);
    },
    toggleDarkMode({ commit }) {
      commit('TOGGLE_DARK_MODE');
    },
    addNotification({ commit }, notification) {
      commit('ADD_NOTIFICATION', notification);
    },
    loadProfile({ commit }) {
      const profile = JSON.parse(localStorage.getItem('profile'));
      if (profile) {
        commit('SET_PROFILE', profile);
      }
    },
    saveProfile({ state }) {
      localStorage.setItem('profile', JSON.stringify(state.profile));
    },
    deleteAccount({ commit }) {
      commit('RESET_PROFILE');
      localStorage.removeItem('profile');
    },
    updateProfile({ commit, dispatch }, profileData) {
      commit('SET_PROFILE', profileData);
      dispatch('saveProfile');
    },
    updateImage({ commit, dispatch }, imageData) {
      commit('SET_IMAGE', imageData);
      dispatch('saveProfile');
    },
  },
  plugins: [localStoragePlugin], 
});

