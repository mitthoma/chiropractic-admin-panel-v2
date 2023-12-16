<template>
  <div style="max-height: 500px; overflow-y: auto">
    <div v-for="(complaint, index) in complaints" :key="index">
      <v-row class="mx-5">
        <v-col cols="6">
          <v-text-field
            v-model="complaint.text"
            :value="complaint.text"
            label="Complaint Text"
            required
            @input="updateComplaintText(index, $event)"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-slider
            v-model="complaint.painLevel"
            :value="complaint.painLevel"
            :max="5"
            :step="1"
            :ticks="[0, 1, 2, 3, 4, 5]"
            show-ticks="always"
            label="Pain Level"
            @input="updateComplaintPainLevel(index, $event)"
          ></v-slider>
        </v-col>
      </v-row>
    </div>
    <v-row class="mx-5">
      <v-btn @click="addComplaint">Add New Complaint</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ComplaintPhase",
  props: ["complaints", "addComplaint"],
  methods: {
    updateComplaintText(index, newText) {
      this.$emit("update-complaint-text", index, newText.target.value);
    },
    updateComplaintPainLevel(index, newPainLevel) {
      this.$emit(
        "update-complaint-pain-level",
        index,
        newPainLevel.target.value
      );
    },
  },
};
</script>
