<template>
  <div>
    <v-container>
      <v-btn
        variant="text"
        prepend-icon="mdi-chevron-left"
        class="mb-4 text-primary font-weight-bold"
        @click="backToDashboard"
      >
        Back to Dashboard
      </v-btn>
      <v-card class="elevation-4">
        <div class="py-5 d-flex">
          <v-card-title> Patient List </v-card-title>
          <v-spacer></v-spacer>
          <v-btn
            prepend-icon="mdi-plus"
            color="primary"
            class="mx-2 pa-2"
            @click="patientDialog = true"
            >Add New Patient</v-btn
          >
        </div>
        <v-table>
          <thead>
            <tr>
              <th class="text-left" @click="sortPatients('acctNo')">
                Account Number
              </th>
              <th class="text-left" @click="sortPatients('firstName')">
                First Name
              </th>
              <th class="text-left" @click="sortPatients('lastName')">
                Last Name
              </th>
              <th class="text-left" @click="sortPatients('phoneNumber')">
                Phone Number
              </th>
              <th class="text-left" @click="sortPatients('lastUpdated')">
                Last Updated
              </th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody class="">
            <template v-for="(item, index) in displayedPatients" :key="item.id">
              <tr
                :class="index % 2 == 0 ? 'bg-surface' : 'bg-surface-darken-1'"
              >
                <td>{{ item.acctNo }}</td>
                <td>{{ item.firstName }}</td>
                <td>{{ item.lastName }}</td>
                <td>{{ formatPhoneNumber(item.phoneNumber) }}</td>
                <td>{{ formatDateTime(item.lastUpdated) }}</td>
                <td class="d-flex justify-end">
                  <v-icon
                    class="ma-2 pa-3 pt-5"
                    title="Update patient info"
                    @click="editPatientItem(item)"
                    >mdi-pencil</v-icon
                  >
                  <v-icon
                    class="ma-2 pa-3 pt-5"
                    title="Delete patient"
                    @click="deletePatient(item)"
                    >mdi-delete</v-icon
                  >
                  <!-- Add delete button -->
                  <v-btn
                    append-icon="mdi-arrow-right"
                    class="ma-2"
                    color="primary"
                    @click="goToPatient(item)"
                  >
                    Select patient
                  </v-btn>
                </td>
              </tr>
            </template>
          </tbody>
        </v-table>
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="5"
          color="primary"
        ></v-pagination>
      </v-card>
    </v-container>
    <PatientDialog
      v-model="patientDialog"
      :selected-item="selectedPatientItem"
      @close-dialog="closePatientDialog"
      @patient-added="refreshPatientList"
    />
  </div>
</template>

<script>
import PatientDialog from '~/components/dialogs/PatientDialog.vue';
import { patientStore } from '~/store/patient';
import { createPatientService } from '~/services/patient';

export default {
  name: 'PatientPage',
  components: {
    PatientDialog,
  },
  data() {
    return {
      patientDialog: false,
      patientService: null,
      patients: [],
      displayedPatients: [],
      itemsPerPage: 10,
      currentPage: 1,
      totalPages: 1,
      selectedPatientItem: null,
    };
  },
  watch: {
    currentPage() {
      this.updateDisplayedPatients();
    },
  },
  async mounted() {
    this.patientStore = patientStore();
    this.patientService = createPatientService(this.$api);
    this.patients = await this.patientService.getPatients();
    this.updateDisplayedPatients();
  },
  methods: {
    async deletePatient(item) {
      try {
        await this.patientService.deletePatient({
          id: item.id,
        });
        this.refreshPatientList();
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    },
    async refreshPatientList() {
      this.patients = await this.patientService.getPatients();
      this.updateDisplayedPatients();
    },
    goToPatient(item) {
      this.patientStore.setCurrentPatient(item);
      this.$router.push(`/patient/${item.id}`);
    },
    editPatientItem(patient) {
      this.selectedPatientItem = patient;
      this.patientDialog = true;
    },
    backToDashboard() {
      this.$router.push('/');
    },
    closePatientDialog() {
      this.selectedPatientItem = null;
      this.patientDialog = false;
    },
    updateDisplayedPatients() {
      this.totalPages = Math.ceil(this.patients.length / this.itemsPerPage);
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.displayedPatients = this.patients.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    sortPatients(field) {
      this.patients = this.patients.sort((a, b) => {
        if (a[field] < b[field]) {
          return -1;
        }
        if (a[field] > b[field]) {
          return 1;
        }
        return 0;
      });
      this.updateDisplayedPatients();
    },
    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);

      // const formattedTime = new Intl.DateTimeFormat('en-US', {
      //   hour: '2-digit',
      //   minute: '2-digit',
      //   hour12: true,
      // }).format(date);

      return `${formattedDate}`;
    },
    formatPhoneNumber(phoneNumber) {
      const cleaned = ('' + phoneNumber).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
      }
      return null;
    },
  },
};
</script>
