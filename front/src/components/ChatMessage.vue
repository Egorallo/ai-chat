<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  message: string;
  isAnswer: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="message" :class="{ 'message-ai': isAnswer, 'message-user': !isAnswer }">
    {{ message }}
  </div>
</template>

<style scoped>
.message {
  max-width: 70%;
  background-color: var(--bg-color-message);
  border-radius: 16px;
  height: auto;
  padding: 10px;
  display: inline-block;
  white-space: pre-wrap;
}

.message-ai {
  align-self: flex-start;
  background-color: var(--bg-color-message-ai);
}

.message-user {
  align-self: flex-end;
}
</style>
