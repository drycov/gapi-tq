<template>
	<div class="api-form">
		<h2>Параметры запроса</h2>

		<div class="credentials">
			<input 
				v-model="idInstance" 
				placeholder="Введите idInstance"
				class="input-field"
			/>
			<input 
				v-model="apiTokenInstance" 
				placeholder="Введите apiTokenInstance"
				class="input-field"
			/>
			<button @click="getSettings" class="api-button">getSettings</button>
			<button @click="getStateInstance" class="api-button">getStateInstance</button>
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
			<button @click="sendMessage" class="api-button" :disabled="phoneError">sendMessage</button>
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
			<button @click="sendFileByUrl" class="api-button" :disabled="phoneFileError">sendFileByUrl</button>
		</div>
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
			phoneFileError: false
		};
	},
	methods: {
		validatePhoneNumber(field) {
			this[field] = this[field].replace(/\D/g, ''); // Удаление всех нецифровых символов
			if (this[field].length > 11) {
				this[field] = this[field].slice(0, 11); // Обрезка до 11 символов
			}
			this[`${field}Error`] = this[field].length !== 11;
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
	/* padding: 20px; */
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.api-form {
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
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
</style>
