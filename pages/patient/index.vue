<template>
  <div>
    <v-container fluid class="pa-6">
      <v-row class="mb-4">
        <v-col cols="12">
          <v-btn
            variant="text"
            prepend-icon="mdi-chevron-left"
            class="mb-2"
            @click="backToDashboard"
          >
            Back to Dashboard
          </v-btn>
          <h1 class="text-h4 font-weight-bold mb-2">Patients</h1>
          <p class="text-body-1 text-medium-emphasis">
            Manage patient records and information
          </p>
        </v-col>
      </v-row>

      <v-card elevation="2" class="rounded-lg">
        <div v-if="isLoading" class="text-center py-12">
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
          ></v-progress-circular>
          <p class="text-body-1 mt-4 text-medium-emphasis">
            Loading patients...
          </p>
        </div>
        <div v-else>
          <DemoModeNotice
            v-if="demoStore && demoStore.getIsDemo"
            :show="true"
            title="Demo Mode: Explore Features"
            message="You're viewing demo data. Adding new patients is disabled. Editing and viewing existing patients works normally."
            type="info"
            icon="mdi-information"
          />
          <div class="pa-6 pb-4">
            <v-row align="center">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="searchQuery"
                  prepend-inner-icon="mdi-magnify"
                  label="Search Patients"
                  variant="outlined"
                  density="comfortable"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="text-right">
                <v-tooltip location="bottom">
                  <template #activator="{ props }">
                    <div v-bind="props" style="display: inline-block">
                      <v-btn
                        prepend-icon="mdi-plus"
                        color="primary"
                        size="large"
                        :disabled="demoStore && demoStore.getIsDemo"
                        @click="patientDialog = true"
                      >
                        Add New Patient
                      </v-btn>
                    </div>
                  </template>
                  <span v-if="demoStore && demoStore.getIsDemo">
                    Adding patients is disabled in demo mode. Contact us for a
                    quote!
                  </span>
                </v-tooltip>
              </v-col>
            </v-row>
          </div>
          <v-divider></v-divider>
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
              <template
                v-for="(item, index) in displayedPatients"
                :key="item.id"
              >
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
                      @click="openDeletePatientDialog(item)"
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
          <div class="pa-4">
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              :total-visible="5"
              color="primary"
            ></v-pagination>
          </div>
        </div>
      </v-card>
    </v-container>
    <PatientDialog
      v-model="patientDialog"
      :selected-item="selectedPatientItem"
      @close-dialog="closePatientDialog"
      @patient-added="refreshPatientList"
    />

    <v-dialog v-model="deletePatientDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Delete Patient</v-card-title>
        <v-card-text>
          Are you sure you want to delete this patient? Deleting this patient
          will delete all notes, exam summaries, and data associated with it.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deletePatientDialog = false"
            >Cancel</v-btn
          >
          <v-btn color="darken-1" text @click="deletePatientConfirmed()"
            >Delete Patient</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PatientDialog from '~/components/dialogs/PatientDialog.vue';
import { patientStore } from '~/store/patient';
import { demoStore } from '~/store/demo';
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
      isLoading: false,
      searchQuery: '',
      deletePatientDialog: false,
      patientToDelete: null,
      demoStore: null,
    };
  },
  computed: {
    filteredPatients() {
      if (!this.searchQuery) {
        return this.patients;
      }
      const searchLower = this.searchQuery.toLowerCase();
      return this.patients.filter((patient) => {
        return (
          patient.acctNo.toLowerCase().includes(searchLower) ||
          patient.firstName.toLowerCase().includes(searchLower) ||
          patient.lastName.toLowerCase().includes(searchLower) ||
          (patient.email && patient.email.toLowerCase().includes(searchLower))
        );
      });
    },
  },
  watch: {
    currentPage() {
      this.updateDisplayedPatients();
    },
    searchQuery() {
      this.currentPage = 1;
      this.updateDisplayedPatients();
    },
  },
  async mounted() {
    this.isLoading = true;
    this.patientStore = patientStore();
    this.demoStore = demoStore();

    // Use demo patients if in demo mode, otherwise fetch from API
    if (this.demoStore.getIsDemo) {
      this.patients = this.demoStore.getPatients;
    } else {
      this.patientService = createPatientService(this.$api);
      this.patients = await this.patientService.getPatients();
    }

    this.updateDisplayedPatients();
    this.isLoading = false;
  },
  methods: {
    async deletePatient(item) {
      try {
        if (this.demoStore.getIsDemo) {
          // Handle demo mode deletion
          this.demoStore.deletePatient(item.id);
          this.refreshPatientList();
        } else {
          await this.patientService.deletePatient({
            id: item.id,
          });
          this.refreshPatientList();
        }
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    },
    async refreshPatientList() {
      this.isLoading = true;

      if (this.demoStore.getIsDemo) {
        this.patients = this.demoStore.getPatients;
      } else {
        this.patients = await this.patientService.getPatients();
      }

      this.updateDisplayedPatients();
      this.isLoading = false;
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
    async deletePatientConfirmed() {
      this.deletePatientDialog = false;
      this.isLoading = true;
      await this.deletePatient(this.patientToDelete);
      this.isLoading = false;
      this.patientToDelete = null;
    },
    closePatientDialog() {
      this.selectedPatientItem = null;
      this.patientDialog = false;
    },
    updateDisplayedPatients() {
      this.totalPages = Math.ceil(
        this.filteredPatients.length / this.itemsPerPage
      );
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.displayedPatients = this.filteredPatients.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },

    openDeletePatientDialog(patient) {
      this.patientToDelete = patient;
      this.deletePatientDialog = true;
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

<style scoped>
.searchField {
  padding-left: 2vw;
  padding-right: 10vw;

  margin-bottom: 3vh;
}
</style>
