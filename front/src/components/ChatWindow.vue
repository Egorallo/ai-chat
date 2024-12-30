<script setup lang="ts">
import { ref } from 'vue';
import ArrowIcon from '@/components/icons/ArrowIcon.vue';
import MessageContainer from '@/components/ChatMessageContainer.vue';
import { sendMessage } from '@/services/api';

const message = ref('');
const messages = ref<{ text: string; isAnswer: boolean }[]>([]);

const handleSendMessage = async () => {
  try {
    if (!message.value.trim()) return;
    console.log('Message:', message.value);

    messages.value.push({ text: message.value, isAnswer: false });

    message.value = '';

    const response = await sendMessage(messages.value[messages.value.length - 1].text);

    messages.value.push({ text: response.message, isAnswer: true });
  } catch (error) {
    console.error('Error in sending message:', error);
  }
};

// const messages: { text: string; isAnswer: boolean }[] = [
//   { text: 'Hello', isAnswer: false },
//   { text: 'Hi, user!', isAnswer: true },
//   { text: 'What time is it now?', isAnswer: false },
//   { text: "It's 2pm.", isAnswer: true },
//   { text: 'What time is it now?', isAnswer: false },
//   { text: "It's 2pm.", isAnswer: true },
//   { text: 'What time is it now?', isAnswer: false },
//   { text: "It's 2pm.", isAnswer: true },
//   { text: 'What time is it now?', isAnswer: false },
//   { text: "It's 2pm.", isAnswer: true },
//   { text: 'What time is it now?', isAnswer: false },
//   { text: "It's 2pm.", isAnswer: true },
//   { text: 'What time is it now?', isAnswer: false },
//   {
//     text: 'Yes, Skibidi Toilet is in Fortnite!\n\nThe popular internet series, which features a poorly animated head popping out of a toilet, has been added to the game as a skin and bundle. The Skibidi Toilet Bundle includes the character Plungerman, themed back gear, toilet plunger harvesting tools, and the skibidi pack.\n\nThe bundle was released on Wednesday, 18th December 2024, and is available to purchase from the in-game Item Shop.',
//     isAnswer: true,
//   },
//   { text: 'What time is it now?', isAnswer: false },
//   { text: "It's 2pm.", isAnswer: true },
//   { text: 'What time is it now?', isAnswer: false },
//   { text: "It's 2pm.", isAnswer: true },
// ];

function handleClick() {
  console.log('Button clicked');
}

const handleEnter = (event: KeyboardEvent) => {
  if (!event.shiftKey) {
    event.preventDefault();
  }
};

function adjustHeight(event) {
  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}
</script>

<template>
  <div class="chat__window">
    <div class="chat__window__header">
      <h1 class="chat__window__header__title">AI Chat 🤖</h1>
    </div>
    <div class="chat__window__body">
      <MessageContainer :messages="messages" />
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
        ></textarea>
        <button @click="handleSendMessage" class="chat__window__footer__button">
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
  /* border: 1px solid black; */
  border-radius: 16px;
  flex: 1;
  overflow: auto;
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
