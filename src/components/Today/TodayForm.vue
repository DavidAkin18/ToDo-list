<template>
  <div v-if="task.isEditing" :class="{'bg-gray-800 text-white': isDarkMode, 'bg-gray-100 text-black': !isDarkMode}"
  class="form-input border p-4 rounded-md shadow-lg mb-7 mt-5">
    <div>
      <input 
        class="w-80 mx-1 py-2 px-4 rounded-lg mb-4 md:w-full md:p-5"
        type="text"
        v-model="task.text"
        :class="{'bg-gray-700 text-white': isDarkMode, 'bg-gray-200 text-black': !isDarkMode}"
        placeholder="Task name" required
      >
    </div>
    <textarea cols="60"
              class="w-80 mx-1 py-2 px-4 rounded-lg mb-4 md:w-full md:p-5"
              rows="3"
              :class="{'bg-gray-700 text-white': isDarkMode, 'bg-gray-200 text-black': !isDarkMode}"
              v-model="task.description"
              placeholder="Description" required>
    </textarea>
    <div class="date-input md:flex gap-2 items-center">
      <div class="flex gap-4 w-full my-2">
        <div class="input-wrapper">
          <input type="date"
                 v-model="task.dueDate"
                 @focus="hidePlaceholder"
                 @blur="showPlaceholder"
                 :class="{'bg-gray-700 text-white': isDarkMode, 'bg-gray-200 text-black': !isDarkMode}"
                 class="w-40 mx-1 py-2 px-4 rounded-lg mb-4">
        </div>
        <select v-model="task.priority"
          :class="{'bg-gray-700 text-white': isDarkMode, 'bg-gray-200 text-black': !isDarkMode}"
          class="w-1/2 mx-1 py-2 px-4 rounded-lg mb-4"
          id="selected-priority"
        >
          <option disabled value="">Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div class="input-wrapper w-full">
        <input type="datetime-local"
          :class="{'bg-gray-700 text-white': isDarkMode, 'bg-gray-200 text-black': !isDarkMode}"
          class="w-40 mx-1 py-2 px-4 rounded-lg mb-4"
          v-model="task.reminder"
          @focus="hidePlaceholder"
          @blur="showPlaceholder"
        >
      </div>
    </div>

    <!-- Subtasks Section -->
    <div class="subtasks mt-4">
      <h3 
        :class="{'text-white': isDarkMode, 'text-blue-600': !isDarkMode}"
        class="text-lg font-bold pl-4 py-2">Subtasks</h3>
      <div v-for="(subtask) in task.subtasks" :key="subtask.id" 
        class="subtask-item p-3 rounded-md mb-2"
        :class="{'bg-gray-700': isDarkMode, 'bg-gray-100': !isDarkMode}"
      >
        <input
          type="checkbox"
          v-model="subtask.isCompleted"
          @change="toggleSubtaskCompletion(task, subtask)"
          :class="{'bg-gray-600': isDarkMode, 'bg-gray-300': !isDarkMode}"
          class="mx-1 p-2 rounded-md h-3 w-4"
        />
        <input
          type="text"
          v-model="subtask.text"
          :class="{'bg-gray-700 text-white': isDarkMode, 'bg-gray-200 text-black': !isDarkMode}"
          class="mx-1 p-2 rounded-md"
        />
        <button @click="removeSubtask(subtask.id)" 
        :class="{'text-red-400 hover:text-red-600 bg-gray-700': isDarkMode, 'text-red-600 hover:text-red-800 bg-gray-100': !isDarkMode}" 
        class="text-red-400 hover:text-red-600 border p-1.5 rounded-md"><font-awesome-icon :icon="['fas', 'trash']" /></button>
      </div>
      <div class="new-subtask flex justify-start gap-3 mx-1">
        <input
          v-model="newSubtaskText"
          type="text"
          placeholder="New subtask"
          :class="{'bg-gray-700 text-white': isDarkMode, 'bg-gray-200 text-black': !isDarkMode}"
          class="p-2 w-3/4 rounded-md"
        />
        <button @click="addSubtask" 
        :class="{'bg-gray-600 hover:bg-gray-500 text-white': isDarkMode, 'bg-gray-300 hover:bg-gray-200 text-black': !isDarkMode}" 
        class="p-2 rounded-md">Add <font-awesome-icon :icon="['fas', 'plus']" /></button>
      </div>
    </div>

    <!-- Save and Cancel Buttons -->
    <div class="buttons flex p-2 justify-start gap-2">
      <button @click="$emit('cancel-edit')" 
        :class="{'bg-gray-700 hover:bg-gray-600 text-white': isDarkMode, 'bg-gray-200 hover:bg-gray-300 text-black': !isDarkMode}" 
        class="p-2 rounded-lg font-bold text-md">Cancel</button>
      <button @click="saveTask" 
        :class="{'bg-blue-600 hover:bg-blue-700 text-white': isDarkMode, 'bg-blue-500 hover:bg-blue-600 text-white': !isDarkMode}"
        class="p-2 rounded-lg font-bold text-md">Save Task</button>
    </div>
  </div>

  <hr class="p-2">
  <div class="buttons flex text-left w-full items-center justify-end p-2 gap-3">
    <button              
      :class="{'bg-gray-700 hover:bg-gray-600 text-white': isDarkMode, 'bg-gray-200 hover:bg-gray-300 text-black': !isDarkMode}"
      class="p-2 rounded-lg text-md font-bold"
      @click="$emit('cancel-edit')">
      Cancel
    </button>
    <button @click="addOrUpdateTask"
      :class="{'bg-blue-600 hover:bg-blue-700 text-white': isDarkMode, 'bg-blue-500 hover:bg-blue-600 text-white': !isDarkMode}" 
      class="p-2 rounded-lg font-bold text-md">
      Add Task
    </button>
  </div>
</template>

<script>
import { faInbox, faUser, faCalendarDays,faCalendarWeek } from '@fortawesome/free-solid-svg-icons'

export default {
    props: {
    task: {
      type: Object,
      required: true
    },
    isDarkMode: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    addOrUpdateTask() {
      this.$emit('add-task');
    },
    addSubtask() {
      if (this.newSubtaskText.trim()) {
        this.$emit('add-subtask', this.newSubtaskText);
        this.newSubtaskText = '';
      }
    },
    toggleSubtaskCompletion(task, subtask) {
      if (subtask.isCompleted) {
        this.$emit('remove-subtask', subtask.id);
      } else {
        this.$emit('toggle-subtask', subtask);
      }
    },
    removeSubtask(subtaskId) {
      this.$emit('remove-subtask', subtaskId);
    },
    saveTask() {
      this.$emit('add-task');
    },
    
  }
}
</script>

<style>

</style>