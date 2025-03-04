<template>
  <div id="app">
    <h1>GREEN-API Vue App</h1>
    <div class="container">
      <!-- <div class="column"> -->
        <ApiForm @apiResponse="handleApiResponse" />
      <!-- </div> -->
      <!-- <div class="column"> -->
        <ResponseDisplay :response="apiResponse" />
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import ApiForm from './components/ApiForm.vue';
import ResponseDisplay from './components/ResponseDisplay.vue';

export default {
  name: 'App',
  components: {
    ApiForm,
    ResponseDisplay
  },
  data() {
    return {
      apiResponse: null
    };
  },
  methods: {
    handleApiResponse(response) {
      this.apiResponse = response;
    }
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  color: #2c3e50;
  margin: 20px auto;
  max-width: 100%;
  padding: 0 20px;
}

.container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.column {
  flex: 1;
  min-width: 0; /* Предотвращает переполнение flex-контейнера */
}

h1 {
  text-align: center;
  color: #00a74b;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .column {
    width: 100%;
  }
}
</style>