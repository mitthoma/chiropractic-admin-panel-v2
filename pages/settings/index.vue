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
      <br />
      <br />

      <v-title>Treatment Options Management</v-title>
      <br />
      <v-row>
        <v-col cols="6">
          <v-card class="elevation-4">
            <div class="d-flex pa-3">
              <v-card-title class="justify-start">
                Physio Positioning Options
              </v-card-title>
              <v-spacer></v-spacer>
              <v-btn
                class="mb-4 justify-end"
                color="primary"
                @click="showAddDialog('physioPositioning')"
                >Add New Option</v-btn
              >
            </div>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left" @click="sortNotes('text')">Option</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody class="">
                <tr v-for="item in physioPositioningOptions" :key="item.id">
                  <td>{{ item.text }}</td>
                  <td class="d-flex justify-end">
                    <v-icon
                      class="ma-2 pa-3 pt-5"
                      @click="editTreatmentOptionItem(item)"
                      >mdi-pencil</v-icon
                    >
                    <v-icon
                      class="ma-2 pa-3 pt-5"
                      @click="openDeleteDialog(item)"
                      >mdi-delete</v-icon
                    >
                  </td>
                </tr>
              </tbody>
            </v-table>

            <v-dialog v-model="showAddTreatmentOptionDialog" max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Add New Option</span>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="newTreatmentOption.text"
                    label="Treatment Option Name"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="showAddTreatmentOptionDialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="addTreatmentOption(currentTreatmentOptionCategory)"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="showEditTreatmentOptionDialog" max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit Treatment Option</span>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="editedTreatmentOption.text"
                    label="Treatment Option Name"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="showEditTreatmentOptionDialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="updateTreatmentOption"
                    >Update</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog
              v-model="showDeleteTreatmentOptionDialog"
              max-width="600px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">Delete Treatment Option</span>
                </v-card-title>
                <v-card-text>
                  Are you sure you want to delete this treatment Option?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="showDeleteTreatmentOptionDialog = false"
                    >No</v-btn
                  >
                  <v-btn
                    color="red darken-1"
                    text
                    @click="deleteTreatmentOption"
                    >Yes</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="elevation-4">
            <div class="d-flex pa-3">
              <v-card-title class="justify-start">
                Treatment Positioning Options
              </v-card-title>
              <v-spacer></v-spacer>
              <v-btn
                class="mb-4 justify-end"
                color="primary"
                @click="showAddDialog('treatmentPositioning')"
                >Add New Option</v-btn
              >
            </div>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left" @click="sortNotes('text')">Option</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody class="">
                <tr v-for="item in treatmentPositioningOptions" :key="item.id">
                  <td>{{ item.text }}</td>
                  <td class="d-flex justify-end">
                    <v-icon
                      class="ma-2 pa-3 pt-5"
                      @click="editTreatmentOptionItem(item)"
                      >mdi-pencil</v-icon
                    >
                    <v-icon
                      class="ma-2 pa-3 pt-5"
                      @click="openDeleteDialog(item)"
                      >mdi-delete</v-icon
                    >
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="elevation-4">
            <div class="d-flex pa-3">
              <v-card-title class="justify-start">
                Treatment Technique Options
              </v-card-title>
              <v-spacer></v-spacer>
              <v-btn
                class="mb-4 justify-end"
                color="primary"
                @click="showAddDialog('treatmentTechnique')"
                >Add New Option</v-btn
              >
            </div>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left" @click="sortNotes('text')">Option</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody class="">
                <tr v-for="item in treatmentTechniqueOptions" :key="item.id">
                  <td>{{ item.text }}</td>
                  <td class="d-flex justify-end">
                    <v-icon
                      class="ma-2 pa-3 pt-5"
                      @click="editTreatmentOptionItem(item)"
                      >mdi-pencil</v-icon
                    >
                    <v-icon
                      class="ma-2 pa-3 pt-5"
                      @click="openDeleteDialog(item)"
                      >mdi-delete</v-icon
                    >
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { createTreatmentOptionService } from '~~/services/treatmentOption';

export default {
  name: 'SettingsPage',
  components: {},
  data() {
    return {
      treatmentOptionService: null,
      treatmentOptions: [],
      physioPositioningOptions: [],
      treatmentPositioningOptions: [],
      treatmentTechniqueOptions: [],
      newTreatmentOption: {
        text: '',
        category: '',
      },
      editedTreatmentOption: null,
      showAddTreatmentOptionDialog: false,
      showEditTreatmentOptionDialog: false,
      showDeleteTreatmentOptionDialog: false,
      treatmentOptionToDelete: null,
      currentTreatmentOptionCategory: null,
    };
  },
  async mounted() {
    this.treatmentOptionService = createTreatmentOptionService(this.$api);
    await this.loadTreatmentOptions();
  },
  methods: {
    async loadTreatmentOptions() {
      try {
        this.treatmentOptions =
          await this.treatmentOptionService.getTreatmentOptions();
        this.physioPositioningOptions = this.treatmentOptions.filter(
          (option) => option.category === 'physioPositioning'
        );
        this.treatmentPositioningOptions = this.treatmentOptions.filter(
          (option) => option.category === 'treatmentPositioning'
        );
        this.treatmentTechniqueOptions = this.treatmentOptions.filter(
          (option) => option.category === 'treatmentTechnique'
        );
      } catch (error) {
        console.error(error);
      }
    },
    async addTreatmentOption(category) {
      try {
        this.newTreatmentOption.category = category;
        await this.treatmentOptionService.addTreatmentOption(
          this.newTreatmentOption
        );
        this.showAddTreatmentOptionDialog = false;
        this.newTreatmentOption.text = '';
        this.newTreatmentOption.category = '';
        await this.loadTreatmentOptions();
      } catch (error) {
        console.error(error);
      }
    },
    editTreatmentOptionItem(treatmentOption) {
      this.editedTreatmentOption = Object.assign({}, treatmentOption);
      this.showEditTreatmentOptionDialog = true;
    },
    async updateTreatmentOption() {
      try {
        await this.treatmentOptionService.updateTreatmentOption(
          this.editedTreatmentOption
        );
        this.showEditTreatmentOptionDialog = false;
        await this.loadTreatmentOptions();
      } catch (error) {
        console.error(error);
      }
    },
    showAddDialog(category) {
      this.showAddTreatmentOptionDialog = true;
      this.currentTreatmentOptionCategory = category;
    },
    closeAddTreatmentOptionDialog() {
      this.showAddTreatmentOptionDialog = false;
      this.currentTreatmentOptionCategory = null;
    },
    openDeleteDialog(treatmentOption) {
      this.treatmentOptionToDelete = treatmentOption;
      this.showDeleteTreatmentOptionDialog = true;
    },
    async deleteTreatmentOption() {
      try {
        await this.treatmentOptionService.deleteTreatmentOption(
          this.treatmentOptionToDelete
        );
        this.showDeleteTreatmentOptionDialog = false;
        this.treatmentOptionToDelete = null;
        await this.loadTreatmentOptions();
      } catch (error) {
        console.error(error);
      }
    },
    backToDashboard() {
      this.$router.push('/');
    },
  },
};
</script>
