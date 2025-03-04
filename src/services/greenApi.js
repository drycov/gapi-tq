import axios from 'axios';

export default class GreenApiService {
  constructor() {
    this.baseUrl = '/wa-api/waInstance';
  }

  validateUrl(url) {
    const urlPattern = /^https?:\/\/.+/i;
    if (!url) {
      throw new Error('URL не может быть пустым');
    }
    if (!urlPattern.test(url)) {
      throw new Error('URL должен начинаться с http:// или https://');
    }
    return true;
  }

  createAxiosInstance() {
    return axios.create({
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
  }

  async getSettings(idInstance, apiTokenInstance) {
    try {
      const response = await this.createAxiosInstance().get(
        `${this.baseUrl}${idInstance}/getSettings/${apiTokenInstance}`
      );
      return (response.data);
    } catch (error) {
      this.handleError('getSettings', error);
    }
  }

  async getStateInstance(idInstance, apiTokenInstance) {
    try {
      const response = await this.createAxiosInstance().get(
        `${this.baseUrl}${idInstance}/getStateInstance/${apiTokenInstance}`
      );
      return (response.data);
    } catch (error) {
      this.handleError('getStateInstance', error);
    }
  }

  async sendMessage(idInstance, apiTokenInstance, phoneNumber, message) {
    try {
      const response = await this.createAxiosInstance().post(
        `${this.baseUrl}${idInstance}/sendMessage/${apiTokenInstance}`,
        {
          chatId: `${phoneNumber}@c.us`,
          message: this.escapeJsonString(message)
        }
      );
      return (response.data);
    } catch (error) {
      this.handleError('sendMessage', error);
    }
  }

  async sendFileByUrl(idInstance, apiTokenInstance, phoneNumber, fileUrl, fileName, caption) {
    try {
      this.validateUrl(fileUrl);

      const response = await this.createAxiosInstance().post(
        `${this.baseUrl}${idInstance}/sendFileByUrl/${apiTokenInstance}`,
        {
          chatId: `${phoneNumber}@c.us`,
          urlFile: fileUrl,
          fileName: this.escapeJsonString(fileName || 'file'),
          caption: this.escapeJsonString(caption || '')
        }
      );
      return (response.data);
    } catch (error) {
      if (error.message.includes('URL')) {
        throw error;
      }
      this.handleError('sendFileByUrl', error);
    }
  }

  handleError(method, error) {
    console.error(`Ошибка ${method}:`, error);
    
    let errorMessage = '';
    
    if (error.response) {
      const serverMessage = error.response.data?.message || 'Неизвестная ошибка';
      errorMessage = this.formatErrorMessage(error.response.status, serverMessage);
    } else if (error.request) {
      errorMessage = 'Нет ответа от сервера. Проверьте подключение к интернету.';
    } else {
      errorMessage = `Ошибка запроса: ${this.escapeJsonString(error.message)}`;
    }
    
    throw new Error(errorMessage);
  }

  formatErrorMessage(status, message) {
    return `Ошибка сервера: ${status} - ${this.escapeJsonString(message)}`;
  }

  escapeJsonString(str) {
    if (typeof str !== 'string') return str;
    
    return str.replace(/[\\"\u0000-\u001f\u007f-\u009f]/g, match => {
      const codes = {
        '"': '\\"',
        '\\': '\\\\',
        '/': '\\/',
        '\b': '\\b',
        '\f': '\\f',
        '\n': '\\n',
        '\r': '\\r',
        '\t': '\\t'
      };
      
      return codes[match] || `\\u${match.charCodeAt(0).toString(16).padStart(4, '0')}`;
    });
  }

  formatSuccessResponse(data) {
    try {
      return typeof data === 'object' 
        ? JSON.stringify(data, null, 2)
        : this.escapeJsonString(String(data));
    } catch (error) {
      console.warn('Ошибка форматирования ответа:', error);
      return String(data);
    }
  }
}