<template>
  <div>
    <v-container>
      <v-card class="elevation-4">
        <div class="py-5 d-flex">
          <v-card-title> All Notes List </v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="ma-2 pa-2" @click="showDialog = true"
            >Add New Patient</v-btn
          >

          <v-dialog
            v-model="showDialog"
            style="max-width: 1200px"
            @click:outside="closeDialog"
          >
            <v-card>
              <v-card-title class="headline">Add New Patient</v-card-title>
              <v-form class="pt-16 pb-16 pl-8 pr-8" @submit.prevent="saveForm">
                <v-text-field
                  v-model="form.firstName"
                  label="First Name"
                ></v-text-field>
                <v-text-field
                  v-model="form.lastName"
                  label="Last Name"
                ></v-text-field>
                <v-text-field
                  v-model.number="form.age"
                  label="Age"
                ></v-text-field>
                <v-btn type="submit">Save</v-btn>
              </v-form>
              <v-card-actions>
                <v-btn color="primary" text @click="showDialog = false"
                  >Close</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <v-table>
          <thead>
            <tr>
              <th class="text-left">firstName</th>
              <th class="text-left">lastName</th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody class="">
            <tr v-for="item in patients" :key="item.id">
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td class="d-flex justify-end">
                <v-btn
                  class="ma-2 pa-2"
                  color="primary"
                  @click="seePatient(item)"
                  >See patient</v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// import { getPatients, addPatient } from '~/services/patient';

export default {
  name: "NotesPage",
  data() {
    return {
      patients: [],
      showDialog: false,
      form: {
        firstName: "",
        lastName: "",
        age: null,
      },
    };
  },
  async mounted() {
    // get patients from patient service
    // this.patients = await getPatients();
  },
  methods: {
    seePatient(item) {
      // I want to go to the dynamic route 'patient/[id]' of the id associated with the v-table item
      navigateTo(`/patient/${item.id}`);
    },
    openDialog() {
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    async saveForm() {
      const formData = {
        ...this.form,
      };
      try {
        // const res = await addPatient(formData);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
tbody tr {
  height: 50px;
}
</style>
