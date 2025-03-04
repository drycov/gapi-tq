<template>
  <div class="response-container">
    <div class="header">
      <h2>Результат запроса</h2>
      <button 
        v-if="formattedResponse" 
        @click="clearResponse" 
        class="clear-button"
        title="Очистить результат"
      >
        ✕
      </button>
    </div>
    <transition name="fade">
      <div v-if="showError" class="error-notification">
        <div class="error-content">
          <span class="error-icon">⚠️</span>
          <span class="error-message">{{ errorMessage }}</span>
        </div>
        <button class="close-button" @click="clearError">×</button>
      </div>
    </transition>
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
          setTimeout(this.clearError, 5000);
        }
      },
      immediate: true
    }
  },
  methods: {
    clearError() {
      this.showError = false;
      this.errorMessage = '';
    },
    clearResponse() {
      this.$emit('update:response', null);
    }
  },
  computed: {
    formattedResponse() {
      if (!this.response) return '';
      try {
        return typeof this.response === 'object' 
          ? JSON.stringify(this.response, null, 2)
          : this.response;
      } catch (error) {
        console.error('Ошибка форматирования ответа:', error);
        return String(this.response);
      }
    }
  }
}
</script>

<style scoped>
.response-container {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
  /* padding: 20px; */
  background-color: #fff;
  border-radius: 8px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

.response-wrapper {
  position: relative;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-top: 20px;
}

.response-area {
  width: 100%;
  height: 65vh;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #2c3e50;
  background-color: transparent;
  resize: none;
  outline: none;
}

h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
}

.error-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 24px;
  background-color: #fff1f0;
  border: 1px solid #ffccc7;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.error-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-message {
  color: #cf1322;
  font-size: 14px;
  line-height: 1.4;
}

.close-button {
  background: none;
  border: none;
  color: #595959;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #000;
}

/* Анимации */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
}

.clear-button {
  position: absolute;
  right: 0;
  background: none;
  border: none;
  color: #666;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.clear-button:hover {
  color: #dc2626;
  background-color: rgba(220, 38, 38, 0.1);
}

@media (max-width: 768px) {
  .response-container {
    margin: 10px;
    padding: 15px;
  }

  .response-area {
    height: 300px;
    font-size: 13px;
  }

  .error-notification {
    left: 20px;
    right: 20px;
    max-width: none;
  }
}
</style>