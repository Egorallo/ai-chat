<script setup lang="ts">
import { defineProps } from 'vue';
import ChatMessage from '@/components/ChatMessage.vue';

interface Message {
  text: string;
  isAnswer: boolean;
}

interface Props {
  messages: Message[];
}

const props = defineProps<Props>();
</script>

<template>
  <div class="message__container">
    <ChatMessage
      v-for="(message, index) in messages"
      :message="message.text"
      :is-answer="message.isAnswer"
      :key="index"
    />
  </div>
</template>

<style scoped>
.message__container {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
  scrollbar-width: thin;
}
</style>
