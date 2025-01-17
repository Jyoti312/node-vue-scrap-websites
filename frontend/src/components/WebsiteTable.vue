<template>
    <div class="website-table">
        <h1>Website Data</h1>
        <table border="1" cellpadding="10">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Url</th>
                    <th>Description</th>
                    <th>Facebook</th>
                    <th>LinkedIn</th>
                    <th>Twitter</th>
                    <th>Instagram</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="website in websites" :key="website._id">
                    <td>{{ website.name }}</td>
                    <td>{{ website.url }}</td>
                    <td>{{ website.description }}</td>
                    <td><a :href="website.facebook" target="_blank">Facebook</a></td>
                    <td><a :href="website.linkedin" target="_blank">LinkedIn</a></td>
                    <td><a :href="website.twitter" target="_blank">Twitter</a></td>
                    <td><a :href="website.instagram" target="_blank">Instagram</a></td>
                    <td>{{ website.address }}</td>
                    <td>{{ website.phone }}</td>
                    <td>{{ website.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            websites: [],
        };
    },
    mounted() {
        this.fetchWebsites();
    },
    methods: {
        async fetchWebsites() {
            try {
                const response = await axios.get('http://localhost:3000/api/websites');
                this.websites = response.data;
            } catch (error) {
                console.error('Error fetching website data:', error);
            }
        },
    },
};
</script>

<style>
.website-table {
    padding: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 10px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}
</style>
