<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div id="app">
    <WebsiteForm />
    <WebsiteTable />
  </div>
</template>

<script>
import WebsiteForm from './components/WebsiteForm.vue';
import WebsiteTable from './components/WebsiteTable.vue';
import apiClient from './services/api';

export default {
    components: {
      WebsiteForm,
      WebsiteTable,
    },
    data() {
        return {
            message: '',
        };
    }
};
</script>

<style scoped>
h1 {
  width : 100px;
}
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
