<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import MessageContainer from '@/components/ChatMessageContainer.vue';
import { useMessagesStore } from '@/stores/messages';

const messageStore = useMessagesStore();

const messages = computed(() => useMessagesStore().messages);
const message = ref('');

const isLoading = ref(false);

const handleSendMessage = async () => {
  if (message.value.trim()) {
    isLoading.value = true;
    const msgToSend = message.value;
    message.value = '';
    await messageStore.sendMessage(msgToSend);
    isLoading.value = false;
  }
};

const handleEnter = (event: KeyboardEvent) => {
  if (!event.shiftKey) {
    event.preventDefault();
  }
};

function adjustHeight(event: Event) {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}

onMounted(() => {
  messageStore.loadMessagesFromLocalStorage();
});
</script>

<template>
  <div class="chat__window">
    <div class="chat__window__header">
      <h1 class="chat__window__header__title">AI Chat 🤖</h1>
    </div>
    <div class="chat__window__body">
      <MessageContainer :messages="messages" :is-loading="isLoading" />
    </div>
    <div class="chat__window__footer">
      <div class="chat__window__footer__wrapper">
        <textarea
          class="chat__window__footer__textarea"
          placeholder="Type a message..."
          @input="adjustHeight"
          @keydown.enter="handleEnter"
          @keyup.enter="handleSendMessage"
          ref="textarea"
          v-model="message"
          :disabled="isLoading"
        ></textarea>
        <button
          :disabled="isLoading"
          @click="handleSendMessage"
          class="chat__window__footer__button"
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat__window {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 700px;
  margin: 0 auto;
  row-gap: 10px;
}

.chat__window__header {
  flex: 0 0 10px;
}

.chat__window__header__title {
  text-align: center;
  padding: 0;
  margin: 0;
}

.chat__window__body {
  border-radius: 16px;
  flex: 1;
  overflow-y: auto;
  scrollbar-color: black rgba(0, 0, 0, 0);
}
.chat__window__footer {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex: 0 0 auto;
  width: 100%;
}

.chat__window__footer__wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-end;
}

.chat__window__footer__textarea {
  flex: 1;
  resize: none;
  border-radius: 16px;
  border: none;
  outline: none;
  padding: 10px 50px 10px 10px;
  box-sizing: border-box;
  font-size: 15px;
  min-height: 40px;
  max-height: 200px;
  overflow-y: auto;
  background-color: var(--bg-color-textarea);
  color: var(--text-main-color);
}

.chat__window__footer__button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  bottom: 12px;
  height: 30px;
  width: 30px;
  border: none;
  outline: none;
  border-radius: 50%;
  padding: 0;
  background-color: var(--button-send-color);
  cursor: pointer;
}

.chat__window__footer__button:hover {
  background-color: var(--button-send-color-hover);
}
</style>
