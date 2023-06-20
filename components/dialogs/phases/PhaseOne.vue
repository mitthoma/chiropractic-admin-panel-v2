<template>
  <!-- dynamic complaints form -->
  <div v-for="(complaint, index) in complaints" :key="index">
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="complaint.text"
          label="Complaint Text"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-slider
          v-model="complaint.painLevel"
          :max="5"
          :step="1"
          label="Pain Level"
        ></v-slider>
      </v-col>
    </v-row>
  </div>
  <v-row>
    <v-btn @click="addComplaint">Add New Complaint</v-btn>
  </v-row>
</template>

<script>
export default {
  name: 'PhaseOne',
  props: ['complaints', 'addComplaint'],
};
</script>