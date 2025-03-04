<template>
  <div class="response-container">
    <h2>Результат запроса</h2>
    <div v-if="showError" class="error-notification">
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <span class="error-message">{{ errorMessage }}</span>
      </div>
      <button class="close-button" @click="clearError">×</button>
    </div>
    <div class="response-wrapper">
      <textarea 
        v-model="formattedResponse" 
        readonly 
        class="response-area"
        placeholder="Здесь будет отображен ответ от API..."
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    response: {
      type: [String, Object, null],
      default: null
    }
  },
  data() {
    return {
      showError: false,
      errorMessage: ''
    }
  },
  watch: {
    response: {
      handler(newValue) {
        if (typeof newValue === 'string' && newValue.toLowerCase().includes('ошибка')) {
          this.showError = true;
          this.errorMessage = newValue;
          setTimeout(() => {
            this.clearError();
          }, 5000); // Скрыть через 5 секунд
        }
      },
      immediate: true
    }
  },
  methods: {
    clearError() {
      this.showError = false;
      this.errorMessage = '';
    }
  },
  computed: {
    formattedResponse() {
      if (!this.response) return '';
      return typeof this.response === 'object' 
        ? JSON.stringify(this.response, null, 2)
        : this.response;
    }
  }
}
</script>

<style scoped>
.response-container {
  max-width: 700px;
  width: 700px;
  margin: 0 auto;
  padding: 20px;

  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
}

.response-wrapper {
  position: relative;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.response-area {
  width: 100%;
  height:450px;
  padding: 16px;
  border: none;
  border-radius: 6px;
  font-family: 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #2c3e50;
  background-color: transparent;
  resize: none;
  outline: none;
}

.response-area::placeholder {
  color: #6c757d;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .response-container {
    width: 100;
    /* padding: 15px; */
  }

  .response-area {
    height: 300px;
    font-size: 13px;
  }
}

.error-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #fff1f0;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 400px;
  animation: slideIn 0.3s ease-out;
}

.error-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-icon {
  font-size: 16px;
}

.error-message {
  color: #cf1322;
  font-size: 14px;
}

.close-button {
  background: none;
  border: none;
  color: #595959;
  font-size: 18px;
  cursor: pointer;
  padding: 0 0 0 12px;
  line-height: 1;
}

.close-button:hover {
  color: #000;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Добавляем класс для анимации исчезновения */
.error-notification.fade-out {
  animation: fadeOut 0.3s ease-out forwards;
}
</style>