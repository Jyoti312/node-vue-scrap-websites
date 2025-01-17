<template>
  <div class="website-table">
    <form @submit.prevent="submitForm">
      <label for="website">Enter Website Link:</label>
      <input
        type="url"
        id="website"
        v-model="websiteLink"
        placeholder="https://example.com"
        required
      />
      <button type="submit">Submit</button>
    </form>

    <!-- Display Scraped Data -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      websiteLink: '',
      scrapedData: null,
    };
  },
  methods: {
    async submitForm() {
      if (!this.websiteLink) {
        alert('Please enter a valid website link.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/scrape', { url: this.websiteLink });
        this.scrapedData = response.data.data; // Display the scraped data
        alert(`Data saved successfully with ID: ${response.data.id}`);
      } catch (error) {
        console.error('Error fetching scraped data:', error.message);
        alert('Failed to scrape and save website data. Please try again later.');
      }

      this.websiteLink = '';
    },
  },
};
</script>

<style scoped>
form {
  //display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 20px auto;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.scraped-data {
  margin-top: 20px;
  text-align: left;
}

.scraped-data a {
  color: #007bff;
  text-decoration: none;
}

.scraped-data a:hover {
  text-decoration: underline;
}
</style>
