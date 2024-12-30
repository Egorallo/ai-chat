<script setup lang="ts">
import ArrowIcon from '@/components/icons/ArrowIcon.vue';

function handleClick() {
  console.log('Button clicked');
}

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
      <div class="chat__window__body__messages">
        <div class="chat__window__body__messages__message">
          <p>Message</p>
        </div>
      </div>
    </div>
    <div class="chat__window__footer">
      <div class="chat__window__footer__wrapper">
        <textarea
          class="chat__window__footer__textarea"
          placeholder="Type a message..."
          @input="adjustHeight"
          @keyup.enter="handleClick"
          ref="textarea"
        ></textarea>
        <button @click="handleClick" class="chat__window__footer__button">
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
  border: 1px solid black;
  border-radius: 16px;
  flex: 1;
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
  background-color: var(--bg-color-rating);
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
