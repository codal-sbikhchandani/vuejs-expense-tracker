<script setup lang="ts">
import { generateUniqueId } from '@/utils'
import { ref } from 'vue'
const text = ref('')
const amount = ref('')

const emit = defineEmits(['handleSubmitTransaction'])

const resetFormValues = () => {
  text.value = ''
  amount.value = ''
}

const onSubmit = () => {
  if (text.value && amount.value) {
    const dataToStore = {
      id: generateUniqueId(),
      amount: amount.value,
      text: text.value,
    }
    emit('handleSubmitTransaction', dataToStore)
    resetFormValues()
  } else {
    alert('Both fields are required!')
  }
}
</script>

<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">Text</label>
      <input type="text" id="text" placeholder="Enter text..." v-model="text" />
    </div>
    <div class="form-control">
      <label for="amount"
        >Amount <br />
        (negative - expense, positive - income)</label
      >
      <input type="text" id="amount" placeholder="Enter amount..." v-model="amount" />
    </div>
    <button class="btn">Add transaction</button>
  </form>
</template>
