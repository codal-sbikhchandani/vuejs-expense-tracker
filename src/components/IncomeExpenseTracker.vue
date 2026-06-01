<script setup lang="ts">
defineProps(['income', 'expenses'])
</script>
<template>
  <div class="inc-exp-container">
    <div>
      <h4>Income</h4>
      <p id="money-plus" class="money plus">+${{ income }}</p>
    </div>
    <div>
      <h4>Expense</h4>
      <p id="money-minus" class="money minus">-${{ Math.abs(expenses) }}</p>
    </div>
  </div>
</template>
