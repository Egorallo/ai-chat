import { defineStore } from 'pinia';
import { ref } from 'vue';
import { sendMsg } from '@/services/api';

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<{ text: string; isAnswer: boolean }[]>([]);

  async function sendMessage(message: string) {
    try {
      messages.value.push({ text: message, isAnswer: false });

      const response = await sendMsg(message);
      messages.value.push({ text: response.message, isAnswer: true });
      localStorage.setItem('messages', JSON.stringify(messages.value));
    } catch (error) {
      console.error('error sending message to AI:', error);
    }
  }

  function loadMessagesFromLocalStorage() {
    const savedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.value = savedMessages;
  }
  return { messages, sendMessage, loadMessagesFromLocalStorage };
});
