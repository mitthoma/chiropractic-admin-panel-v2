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
          <h1 class="text-h4 font-weight-bold mb-2">Settings</h1>
          <p class="text-body-1 text-medium-emphasis">
            Manage treatment options and room assignments
          </p>
        </v-col>
      </v-row>

      <DemoModeNotice
        v-if="isDemo"
        :show="true"
        title="Demo Mode: Settings View Only"
        message="Adding or modifying settings is disabled in demo mode. You can view all current options. Contact us for a quote to get your own customizable system."
        type="warning"
        icon="mdi-lock"
      />

      <h2 class="text-h5 font-weight-bold mb-4">
        Treatment Options Management
      </h2>
      <v-row>
        <v-col cols="6">
          <v-card class="elevation-4">
            <div class="d-flex pa-3">
              <v-card-title class="justify-start">
                Physio Positioning Options
              </v-card-title>
              <v-spacer></v-spacer>
              <v-tooltip location="bottom">
                <template #activator="{ props }">
                  <div v-bind="props">
                    <v-btn
                      class="mb-4 justify-end"
                      color="primary"
                      :disabled="isDemo"
                      @click="showAddDialog('physioPositioning')"
                    >
                      Add New Option
                    </v-btn>
                  </div>
                </template>
                <span v-if="isDemo">Disabled in demo mode</span>
              </v-tooltip>
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
              <v-tooltip location="bottom">
                <template #activator="{ props }">
                  <div v-bind="props">
                    <v-btn
                      class="mb-4 justify-end"
                      color="primary"
                      :disabled="isDemo"
                      @click="showAddDialog('treatmentPositioning')"
                    >
                      Add New Option
                    </v-btn>
                  </div>
                </template>
                <span v-if="isDemo">Disabled in demo mode</span>
              </v-tooltip>
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
              <v-tooltip location="bottom">
                <template #activator="{ props }">
                  <div v-bind="props">
                    <v-btn
                      class="mb-4 justify-end"
                      color="primary"
                      :disabled="isDemo"
                      @click="showAddDialog('treatmentTechnique')"
                    >
                      Add New Option
                    </v-btn>
                  </div>
                </template>
                <span v-if="isDemo">Disabled in demo mode</span>
              </v-tooltip>
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
      <br />
      <br />

      <v-title>Treatment Method Name Management</v-title>
      <br />
      <v-row>
        <v-col cols="6">
          <v-card class="elevation-4">
            <div class="d-flex pa-3">
              <v-card-title class="justify-start">
                Treatment Method Names
              </v-card-title>
              <v-spacer></v-spacer>
              <v-tooltip location="bottom">
                <template #activator="{ props }">
                  <div v-bind="props">
                    <v-btn
                      class="mb-4 justify-end"
                      color="primary"
                      :disabled="isDemo"
                      @click="showAddTreatmentMethodNameDialog = true"
                    >
                      Add New Method Name
                    </v-btn>
                  </div>
                </template>
                <span v-if="isDemo">Disabled in demo mode</span>
              </v-tooltip>
            </div>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left" @click="sortNotes('name')">Name</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody class="">
                <tr v-for="item in treatmentMethodNames" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td class="d-flex justify-end">
                    <v-icon
                      class="ma-2 pa-3 pt-5"
                      @click="editTreatmentMethodNameItem(item)"
                      >mdi-pencil</v-icon
                    >
                    <v-icon
                      class="ma-2 pa-3 pt-5"
                      @click="openDeleteTreatmentMethodNameDialog(item)"
                      >mdi-delete</v-icon
                    >
                  </td>
                </tr>
              </tbody>
            </v-table>

            <v-dialog
              v-model="showAddTreatmentMethodNameDialog"
              max-width="600px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">Add New Treatment Method Name</span>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="newTreatmentMethodName.name"
                    label="Treatment Method Name"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="showAddTreatmentMethodNameDialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="addTreatmentMethodName"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog
              v-model="showEditTreatmentMethodNameDialog"
              max-width="600px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">Edit Treatment Method Name</span>
                </v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="editedTreatmentMethodName.name"
                    label="Treatment Method Name"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="showEditTreatmentMethodNameDialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="updateTreatmentMethodName"
                    >Update</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog
              v-model="showDeleteTreatmentMethodNameDialog"
              max-width="600px"
            >
              <v-card>
                <v-card-title>
                  <span class="text-h5">Delete Treatment Method Name</span>
                </v-card-title>
                <v-card-text>
                  Are you sure you want to delete this treatment Method Name?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="showDeleteTreatmentMethodNameDialog = false"
                    >No</v-btn
                  >
                  <v-btn
                    color="red darken-1"
                    text
                    @click="deleteTreatmentMethodName(item)"
                    >Yes</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { createTreatmentOptionService } from '~~/services/treatmentOption';
import { createTreatmentMethodNameService } from '~~/services/treatmentMethodName';
import { demoStore } from '~/store/demo';

export default {
  name: 'SettingsPage',
  components: {},
  data() {
    return {
      treatmentOptionService: null,
      treatmentMethodNameService: null,
      treatmentOptions: [],
      treatmentMethodNames: [],
      physioPositioningOptions: [],
      treatmentPositioningOptions: [],
      treatmentTechniqueOptions: [],
      newTreatmentOption: {
        text: '',
        category: '',
      },
      newTreatmentMethodName: {
        name: '',
      },
      editedTreatmentOption: null,
      editedTreatmentMethodName: null,
      showAddTreatmentOptionDialog: false,
      showAddTreatmentMethodNameDialog: false,
      showEditTreatmentOptionDialog: false,
      showEditTreatmentMethodNameDialog: false,
      showDeleteTreatmentOptionDialog: false,
      showDeleteTreatmentMethodNameDialog: false,
      treatmentOptionToDelete: null,
      treatmentMethodNameToDelete: null,
      currentTreatmentOptionCategory: null,
    };
  },
  computed: {
    isDemo() {
      const demo = demoStore();
      return demo.getIsDemo;
    },
  },
  async mounted() {
    const demo = demoStore();

    if (demo.getIsDemo) {
      // Load demo data
      this.treatmentOptions = demo.getTreatmentOptions;
      this.treatmentMethodNames = demo.getTreatmentMethodNames;
      this.physioPositioningOptions = this.treatmentOptions.filter(
        (option) => option.category === 'physioPositioning'
      );
      this.treatmentPositioningOptions = this.treatmentOptions.filter(
        (option) => option.category === 'treatmentPositioning'
      );
      this.treatmentTechniqueOptions = this.treatmentOptions.filter(
        (option) => option.category === 'treatmentTechnique'
      );
    } else {
      this.treatmentOptionService = createTreatmentOptionService(this.$api);
      await this.loadTreatmentOptions();
      this.treatmentMethodNameService = createTreatmentMethodNameService(
        this.$api
      );
      await this.loadTreatmentMethodNames();
    }
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
    async loadTreatmentMethodNames() {
      this.treatmentMethodNames =
        await this.treatmentMethodNameService.getTreatmentMethodNames();
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
    async addTreatmentMethodName() {
      await this.treatmentMethodNameService.addTreatmentMethodName(
        this.newTreatmentMethodName
      );
      this.showAddTreatmentMethodNameDialog = false;
      this.newTreatmentMethodName.name = '';
      await this.loadTreatmentMethodNames();
    },
    editTreatmentOptionItem(treatmentOption) {
      this.editedTreatmentOption = Object.assign({}, treatmentOption);
      this.showEditTreatmentOptionDialog = true;
    },
    editTreatmentMethodNameItem(treatmentMethodName) {
      this.editedTreatmentMethodName = Object.assign({}, treatmentMethodName);
      this.showEditTreatmentMethodNameDialog = true;
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
    async updateTreatmentMethodName() {
      await this.treatmentMethodNameService.updateTreatmentMethodName(
        this.editedTreatmentMethodName
      );
      this.showEditTreatmentMethodNameDialog = false;
      await this.loadTreatmentMethodNames();
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
    openDeleteTreatmentMethodNameDialog(item) {
      this.treatmentMethodNameToDelete = item;
      this.showDeleteTreatmentMethodNameDialog = true;
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
    async deleteTreatmentMethodName() {
      await this.treatmentMethodNameService.deleteTreatmentMethodName(
        this.treatmentMethodNameToDelete
      );
      this.showDeleteTreatmentMethodNameDialog = false;
      this.treatmentMethodNameToDelete = null;

      await this.loadTreatmentMethodNames();
    },
    backToDashboard() {
      this.$router.push('/');
    },
  },
};
</script>
