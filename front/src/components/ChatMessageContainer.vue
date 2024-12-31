<script setup lang="ts">
import { defineProps } from 'vue';
import ChatMessage from '@/components/ChatMessage.vue';

interface Message {
  text: string;
  isAnswer: boolean;
}

interface Props {
  messages: Message[];
  isLoading: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="message__container">
    <ChatMessage
      v-for="(message, index) in messages"
      :message="message.text"
      :is-answer="message.isAnswer"
      :key="index"
    />
    <div class="loader" v-if="isLoading"></div>
  </div>
</template>

<style scoped>
.message__container {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  height: 100%;
  padding: 10px;
}

.loader {
  align-self: flex-start;
  width: 60px;
  aspect-ratio: 4;
  background: radial-gradient(circle closest-side, #4550e7 90%, #0000) 0 / calc(100% / 3) 100% space;
  clip-path: inset(0 100% 0 0);
  animation: l1 1s steps(4) infinite;
}

@keyframes l1 {
  to {
    clip-path: inset(0 -34% 0 0);
  }
}
</style>
