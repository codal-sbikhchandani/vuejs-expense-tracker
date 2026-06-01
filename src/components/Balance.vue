<script setup lang="ts">
defineProps(['total'])
</script>
<template>
  <h4>Your Balance</h4>
  <h1 id="balance">${{ total }}</h1>
</template>
