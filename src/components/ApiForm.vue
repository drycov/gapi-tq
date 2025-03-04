<template>
  <div class="api-container">
    <form class="api-form" @submit.prevent>
      <h2>Параметры запроса</h2>

      <div class="credentials">
        <input 
          v-model="idInstance"
          @input="validateIdInstance" 
          class="input-base"
          :class="{ 'input-error': idInstanceError }"
          placeholder="Введите idInstance"
        />
        <span v-if="idInstanceError" class="error-text">{{ idInstanceErrorMessage }}</span>
        
        <input 
          v-model="apiTokenInstance"
          @input="validateApiToken" 
          :class="{ 'input-error': apiTokenError }"
          placeholder="Введите apiTokenInstance"
          class="input-field"
        />
        <span v-if="apiTokenError" class="error-text">{{ apiTokenErrorMessage }}</span>
        
        <div class="button-group">
          <button 
            @click="getSettings" 
            class="api-button tooltip"
            :disabled="!isCredentialsValid"
            data-tooltip="Получить настройки инстанса"
          >getSettings</button>
          <button 
            @click="getStateInstance" 
            class="api-button tooltip"
            :disabled="!isCredentialsValid"
            data-tooltip="Получить состояние инстанса"
          >getStateInstance</button>
        </div>
      </div>

      <div class="message-inputs">
        <input 
          v-model="phoneNumber" 
          @input="validatePhoneNumber('phoneNumber')"
          placeholder="Номер телефона (без +)"
          class="input-field"
        />
        <span v-if="phoneError" class="error-text">Неверный формат номера</span>
        <input 
          v-model="message" 
          placeholder="Текст сообщения"
          class="input-field"
        />
        <button 
          @click="sendMessage" 
          class="api-button tooltip"
          :disabled="!isValidForm"
          data-tooltip="Отправить текстовое сообщение"
        >
        sendMessage
        </button>
      </div>

      <div class="file-inputs">
        <input 
          v-model="phoneNumberFile" 
          @input="validatePhoneNumber('phoneNumberFile')"
          placeholder="Номер телефона (без +)"
          class="input-field"
        />
        <span v-if="phoneFileError" class="error-text">Неверный формат номера</span>
        <input 
          v-model="fileUrl" 
          placeholder="URL файла"
          class="input-field"
        />
        <input 
          v-model="fileName" 
          placeholder="Название файла с расширением"
          class="input-field"
        />
        <input 
          v-model="file_caption" 
          placeholder="Текст сообщения к файлу"
          class="input-field"
        />
        <button 
        @click="sendFileByUrl" 
        class="api-button tooltip"       
        :disabled="!isValidFileForm" 
        data-tooltip="Отправить файл по ссылке"
        >
        sendFileByUrl</button>
      </div>
    </form>
  </div>
</template>

<script>
import GreenApiService from '../services/greenApi';

export default {
  data() {
    return {
      idInstance: '',
      apiTokenInstance: '',
      phoneNumber: '',
      phoneNumberFile: '',
      message: '',
      fileUrl: '',
      fileName: '',
      file_caption: '',
      apiService: new GreenApiService(),
      phoneError: false,
      phoneFileError: false,
      idInstanceError: false,
      apiTokenError: false,
      idInstanceErrorMessage: '',
      apiTokenErrorMessage: ''
    };
  },
  computed: {
    isCredentialsValid() {
      return this.idInstance && 
             this.apiTokenInstance && 
             !this.idInstanceError && 
             !this.apiTokenError;
    },
    isValidForm() {
      return this.isCredentialsValid && 
             !this.phoneError && 
             !this.phoneFileError;
    },
    isValidFileForm() {
      return this.isValidForm && 
             this.fileUrl && 
             this.fileName;
    }
  },
  methods: {
    validatePhoneNumber(field) {
      this[field] = this[field].replace(/\D/g, ''); // Удаление всех нецифровых символов
      if (this[field].length > 11) {
        this[field] = this[field].slice(0, 11); // Обрезка до 11 символов
      }
      this[`${field}Error`] = this[field].length !== 11;
    },

    validateIdInstance() {
      if (!this.idInstance) {
        this.idInstanceError = true;
        this.idInstanceErrorMessage = 'IdInstance обязателен';
        return;
      }
      
      if (!/^\d+$/.test(this.idInstance)) {
        this.idInstanceError = true;
        this.idInstanceErrorMessage = 'IdInstance должен содержать только цифры';
        return;
      }

      this.idInstanceError = false;
      this.idInstanceErrorMessage = '';
    },

    validateApiToken() {
      if (!this.apiTokenInstance) {
        this.apiTokenError = true;
        this.apiTokenErrorMessage = 'ApiToken обязателен';
        return;
      }

      if (this.apiTokenInstance.length < 10) {
        this.apiTokenError = true;
        this.apiTokenErrorMessage = 'ApiToken слишком короткий';
        return;
      }

      if (!/^[a-zA-Z0-9]+$/.test(this.apiTokenInstance)) {
        this.apiTokenError = true;
        this.apiTokenErrorMessage = 'ApiToken может содержать только буквы и цифры';
        return;
      }

      this.apiTokenError = false;
      this.apiTokenErrorMessage = '';
    },

    async getSettings() {
      try {
        const response = await this.apiService.getSettings(
          this.idInstance,
          this.apiTokenInstance
        );
        this.$emit('apiResponse', JSON.stringify(response, null, 2));
      } catch (error) {
        this.$emit('apiResponse', error.message);
      }
    },

    async getStateInstance() {
      try {
        const response = await this.apiService.getStateInstance(
          this.idInstance,
          this.apiTokenInstance
        );
        this.$emit('apiResponse', JSON.stringify(response, null, 2));
      } catch (error) {
        this.$emit('apiResponse', error.message);
      }
    },

    async sendMessage() {
      if (this.phoneError) return;
      try {
        const response = await this.apiService.sendMessage(
          this.idInstance,
          this.apiTokenInstance,
          this.phoneNumber,
          this.message
        );
        this.$emit('apiResponse', JSON.stringify(response, null, 2));
      } catch (error) {
        this.$emit('apiResponse', error.message);
      }
    },

    async sendFileByUrl() {
      if (this.phoneFileError) return;
      try {
        const response = await this.apiService.sendFileByUrl(
          this.idInstance,
          this.apiTokenInstance,
          this.phoneNumberFile,
          this.fileUrl,
          this.fileName,
          this.file_caption
        );
        this.$emit('apiResponse', JSON.stringify(response, null, 2));
      } catch (error) {
        this.$emit('apiResponse', error.message);
      }
    }
  }
};
</script>

<style scoped>

.api-container {
  width: 30%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;

  background-color: #fff;
  border-radius: 8px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}
.api-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  /* padding: 20px; */
}

.credentials,
.message-inputs,
.file-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.input-field {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.api-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.api-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.api-button:hover:not(:disabled) {
  background-color: #45a049;
}

.error-text {
  color: red;
  font-size: 12px;
}

.input-error {
  border-color: #ff4d4f !important;
  background-color: #fff2f0;
}

.input-error:focus {
  box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  width: 100%; /* Растягиваем на всю ширину */
}
.button-group .api-button {
  flex: 1; /* Каждая кнопка занимает равное пространство */
  min-width: 0; /* Предотвращает переполнение flex-контейнера */
}

.error-text {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: -5px;
  margin-bottom: 5px;
}

/* Стили для tooltip */
.tooltip {
  position: relative;
}

.tooltip::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1000;
}

.tooltip:hover::before {
  visibility: visible;
  opacity: 1;
}

/* Добавляем небольшой отступ между подсказкой и кнопкой */
.tooltip::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.8);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.tooltip:hover::after {
  visibility: visible;
  opacity: 1;
}

/* Отключаем tooltip для неактивных кнопок */
.tooltip:disabled::before,
.tooltip:disabled::after {
  display: none;
}
</style>
