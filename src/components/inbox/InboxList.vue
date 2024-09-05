<template>
     <div :class="{'bg-[#f8fafc]': !isDarkMode, 'bg-[#1e293b] text-white': isDarkMode}">
    <div v-for="(task, index) in tasks" :key="index">
      <div v-if="task.isEditing">
        <InboxForm 
          v-if="task.isEditing"
          @add-subtask="addSubtask(task, $event)"
          @toggle-subtask="toggleSubtaskCompletion(task, $event)"
          @remove-subtask="removeSubtask(task, $event)"
          :task="task" 
          :isDarkMode="isDarkMode"
          @add-task="addOrUpdateTask(index)" 
          @cancel-edit="cancelEditTask(index)" 
        />
      </div>
      <div v-else id="text-item" class="mb-5 md:flex md:justify-between 
            p-4 rounded-lg 
            transition-colors duration-300 ease-in-out 
            shadow-xl"
            :class="{'bg-white text-black border-gray-200': !isDarkMode, 
            'bg-gray-800 text-white border-gray-700': isDarkMode}">
            
        <div class="form-team flex gap-3 items-start justify-start md:justify-between md:gap-5">
          <div 
            :class="{'bg-white border-[#007BFF]': !isDarkMode, 'bg-[#2d3748] border-[#4a5568]': isDarkMode}" 
            class="btn3 border border-2 p-4 mt-1 rounded-full cursor-pointer w-1/12 h-3 md:w-2" 
            @click="deleteTask(index)"
          ></div>
          <div class="form-item">
            <h2 :class="{'text-[#333]': !isDarkMode, 'text-[#e2e8f0]': isDarkMode}" class="text-2xl font-bold first-letter:uppercase">
              Title: {{ task.text }}
            </h2>
            <p :class="{'text-[#555]': !isDarkMode, 'text-[#e2e8f0]': isDarkMode}" class="describe font-semibold text-lg md:text-xl">
              {{ task.description }}
            </p>
            <p class="due my-2 md:text-lg md:flex gap-3 items-center" :class="{'text-[#555]': !isDarkMode, 'text-[#e2e8f0]': isDarkMode}" v-if="task.dueDate">
              <font-awesome-icon class="text-[#007BFF] md:text-lg" :icon="['fas', 'calendar-days']" /> {{ getDaysLeft(task.dueDate) }}
            </p>
            <p class="reminder my-2 md:text-lg md:flex gap-3 items-center" :class="{'text-[#555]': !isDarkMode, 'text-[#e2e8f0]': isDarkMode}" v-if="task.reminder">
              <font-awesome-icon class="text-[#007BFF] md:text-lg" :icon="['fas', 'bell']" /> {{ getReminder(task.reminder) }}
            </p>
            <div v-if="task.subtasks" class="subtasks mt-4">
              <h3 class="text-lg font-bold" :class="{'text-[#333]': !isDarkMode, 'text-[#e2e8f0]': isDarkMode}">
                Subtasks
              </h3>
              <div v-for="subtask in task.subtasks" :key="subtask.id" class="subtask-item flex gap-1.5">
                <input
                  type="checkbox"
                  v-model="subtask.isCompleted"
                  :disabled="subtask.isCompleted"
                />
                <input
                  type="text"
                  v-model="subtask.text"
                  :disabled="subtask.isCompleted"
                  :class="{'bg-gray-700': isDarkMode, 'bg-gray-300': !isDarkMode}"
                  class="px-1 rounded-md my-1"
                />
              </div>
            </div>
          </div>
        </div>
        <hr class="m-1">
        <div class="text-right p-2">
          <button 
            class="btn2 text-2xl border px-2 border-2" 
            :class="{'text-[#007BFF] border-[#007BFF] bg-[#fff]': !isDarkMode, 'text-[#e2e8f0] border-[#4a5568] bg-[#2d3748]': isDarkMode}" 
            @click="editTask(index)"
          >
            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
          </button>
        </div>
      </div>
      <hr>
    </div>
    <button @click="addNewTask" 
      class="btn mt-5 p-2 rounded-lg font-bold text-[#666] hover:text-[#333] w-full mx-auto flex gap-3"
      :class="{'bg-[#fff] text-[#666] hover:text-[#333]': !isDarkMode, 'bg-[#2d3748] text-[#e2e8f0] hover:text-[#e2e8f0]': isDarkMode}"
    >
      <font-awesome-icon :icon="['fas', 'plus']" :class="{'bg-white': !isDarkMode, 'bg-[#4a5568]': isDarkMode}" class="border border-4 p-0.5 font-bold text-sm rounded-full" /> Add New Task
    </button>
  </div>

</template>

<script>
import InboxForm from './InboxForm.vue';
import { 
  format, differenceInDays, isThisMonth, isThisWeek, isThisYear, isToday, isTomorrow, isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isSunday, addWeeks, addMonths, addYears, isAfter,
} from 'date-fns';
const parseDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};
export default {
    components: { InboxForm },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    isDarkMode: {
      type: Boolean,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    profileImage: {
      type: String,
      required: false 
    }
  },
  methods: {
    addOrUpdateTask(index) {
      // this.tasks[index].isEditing = false;
      // this.$emit('update-task', this.tasks[index]); 
      if (this.tasks[index].text.trim() && this.tasks[index].description.trim()) {
        this.tasks[index].isEditing = false;
        this.$emit('update-task', this.tasks[index]);
      } else {
        alert('Please fill out all required fields.');
      }
    },
    cancelEditTask(index) {
      this.tasks[index].isEditing = false;
    },
    editTask(index) {
      this.tasks[index].isEditing = true;
    },
    deleteTask(index) {
      this.$emit('delete-task', index);
    },
    addNewTask() {
      this.$emit('add-task');
    },
    toggleSubtaskCompletion(task, subtask) {
      const subtaskIndex = task.subtasks.findIndex(st => st.id === subtask.id);
      if (subtaskIndex !== -1) {
        task.subtasks[subtaskIndex].isCompleted = !task.subtasks[subtaskIndex].isCompleted;
      }
      this.$emit('update-task', task);  
    },
    removeSubtask(task, subtaskId) {
      const subtaskIndex = task.subtasks.findIndex(st => st.id === subtaskId);
      if (subtaskIndex !== -1) {
        task.subtasks.splice(subtaskIndex, 1);
        this.$emit('update-task', task);
      }
    },
    addSubtask(task, subtaskText) {
      const subtask = {
        text: subtaskText,
        isCompleted: false,
        id: Date.now(),
      };
      task.subtasks.push(subtask);
      this.$emit('update-task', task);
    },
    getDaysLeft(dueDate) {
      if (!dueDate) return '';

      const now = new Date();
      const due = new Date(dueDate);
      const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

      if (diff === 0) return 'Due today';
      if (diff === 1) return 'Due tomorrow';
      if (diff === 2) return 'Due in two days';
      if (diff === 3) return 'Due in three days';
      if (diff < 0) return `Overdue by ${Math.abs(diff)} days`;

      return `Due in ${diff} days`;
    },
    getReminder(reminder) {
      if (!reminder) {
        console.error('Invalid reminder:', reminder);
        return ''; // Handle invalid date
      }

      const reminderDate = parseDate(reminder);

      if (!reminderDate) {
        console.error('Invalid date object:', reminderDate);
        return ''; // Handle invalid date object
      }

      const now = new Date();
      const timeFormat = 'hh:mm aa';

      if (isToday(reminderDate)) {
        return `Today at ${format(reminderDate, timeFormat)}`;
      } else if (isTomorrow(reminderDate)) {
        return `Tomorrow at ${format(reminderDate, timeFormat)}`;
      } else if (isThisWeek(reminderDate, { weekStartsOn: 1 })) { // Week starts on Monday
        if (isMonday(reminderDate)) return `Monday at ${format(reminderDate, timeFormat)}`;
        if (isTuesday(reminderDate)) return `Tuesday at ${format(reminderDate, timeFormat)}`;
        if (isWednesday(reminderDate)) return `Wednesday at ${format(reminderDate, timeFormat)}`;
        if (isThursday(reminderDate)) return `Thursday at ${format(reminderDate, timeFormat)}`;
        if (isFriday(reminderDate)) return `Friday at ${format(reminderDate, timeFormat)}`;
        if (isSaturday(reminderDate)) return `Saturday at ${format(reminderDate, timeFormat)}`;
        if (isSunday(reminderDate)) return `Sunday at ${format(reminderDate, timeFormat)}`;
      } else if (isThisMonth(reminderDate)) {
        return `This Month on ${format(reminderDate, 'MMMM d')} at ${format(reminderDate, timeFormat)}`;
      } else if (isAfter(reminderDate, addWeeks(now, 1)) && isThisMonth(reminderDate)) {
        return `Next Week on ${format(reminderDate, 'EEEE')} at ${format(reminderDate, timeFormat)}`;
      } else if (isAfter(reminderDate, addMonths(now, 1)) && isThisYear(reminderDate)) {
        return `Next Month on ${format(reminderDate, 'MMMM d')} at ${format(reminderDate, timeFormat)}`;
      } else if (isAfter(reminderDate, addYears(now, 1))) {
        return `Next Year on ${format(reminderDate, 'MMMM d, yyyy')} at ${format(reminderDate, timeFormat)}`;
      } else {
        const diff = differenceInDays(reminderDate, now);
        if (diff < 0) {
          return `Overdue by ${Math.abs(diff)} days at ${format(reminderDate, timeFormat)}`;
        } else {
          return `Due in ${diff} days on ${format(reminderDate, 'MMMM d')} at ${format(reminderDate, timeFormat)}`;
        }
      }
    },
  },
}
</script>

<style>

</style>