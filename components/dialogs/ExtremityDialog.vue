<template>
  <v-dialog max-width="1000px" @click:outside="closeDialog">
    <v-card>
      <v-card-title class="my-5">
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="extremityEntryForm" v-model="formIsValid">
          <v-row class="w-full">
            {{ currentNote }}
            <v-col cols="6">
              <v-select
                v-model="form.extremityLevel"
                :items="extremityLevelOptions"
                item-text="title"
                item-value="value"
                label="Level"
                required
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="form.side"
                :items="sideOptions"
                item-text="title"
                item-value="value"
                label="Side"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-card-text><h3>Objective Findings</h3></v-card-text>
          <v-row>
            <v-col cols="3">
              <v-checkbox v-model="form.sublux" label="Sublux"></v-checkbox>
            </v-col>
            <v-col cols="3">
              <v-checkbox
                v-model="form.muscleSpasm"
                label="Muscle Spasm"
              ></v-checkbox>
            </v-col>
            <v-col cols="3">
              <v-checkbox
                v-model="form.triggerPoints"
                label="Trigger Points"
              ></v-checkbox>
            </v-col>
            <v-col cols="3">
              <v-checkbox
                v-model="form.tenderness"
                label="Tenderness"
              ></v-checkbox>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3">
              <v-checkbox v-model="form.numbness" label="Numbness"></v-checkbox>
            </v-col>
            <v-col cols="3">
              <v-checkbox v-model="form.edema" label="Edema"></v-checkbox>
            </v-col>
            <v-col cols="3">
              <v-checkbox v-model="form.swelling" label="Swelling"></v-checkbox>
            </v-col>
            <v-col cols="3">
              <v-checkbox
                v-model="form.reducedMotion"
                label="Reduced Motion"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-card-text><h3>Physiotherapies</h3></v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="form.physioPositioning"
                label="Positioning"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-checkbox
                v-model="form.coldPack"
                label="Cold Pack"
              ></v-checkbox>
            </v-col>
            <v-col cols="3">
              <v-checkbox v-model="form.hotPack" label="Hot Pack"></v-checkbox>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3">
              <v-checkbox
                v-model="form.electStim"
                label="Elect Stim"
              ></v-checkbox>
            </v-col>
            <v-col cols="3">
              <v-checkbox v-model="form.traction" label="Traction"></v-checkbox>
            </v-col>
            <v-col cols="3">
              <v-checkbox v-model="form.massage" label="Massage"></v-checkbox>
            </v-col>
          </v-row>

          <v-card-text><h3>Treatment</h3></v-card-text>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="form.treatmentPositioning"
                label="Positioning"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="form.technique"
                label="Technique"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="form.manipulation"
                label="Manipulation"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex">
        <v-btn color="secondary">
          Techniques Key

          <v-overlay
            activator="parent"
            location-strategy="connected"
            scroll-strategy="block"
            location="top"
          >
            <v-card class="pa-2 technique-key">
              <v-row>
                <v-col cols="6"> D - Diversified </v-col>
                <v-col cols="6"> F = Flexion/Distraction </v-col>
              </v-row>
              <v-row>
                <v-col cols="6"> A = Activator </v-col>
                <v-col cols="6"> L = Logan Basic </v-col>
              </v-row>
            </v-card>
          </v-overlay>
        </v-btn>
        <v-btn color="secondary">
          Positioning Key

          <v-overlay
            activator="parent"
            location-strategy="connected"
            scroll-strategy="block"
            location="top"
          >
            <v-card class="pa-2">
              <v-row>
                <v-col cols="4"> 1 - Standing </v-col>
                <v-col cols="4"> 2 - Seated </v-col>
                <v-col cols="4"> 3 - Prone </v-col>
              </v-row>
              <v-row>
                <v-col cols="4"> 4 - Prone w/ legs declined </v-col>
                <v-col cols="4"> 5 - Supine </v-col>
                <v-col cols="4"> 6 - Supine w/ knees bent </v-col>
              </v-row>
              <v-row>
                <v-col cols="4"> 7 - Supine w/ knees elevated </v-col>
                <v-col cols="4"> 8 - Right Lateral Recumbent </v-col>
                <v-col cols="4"> 9 - Left Lateral Recumbent </v-col>
              </v-row>
            </v-card>
          </v-overlay>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submitExtremityEntryForm()">{{
          saveButtonText
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createEntryService } from "~/services/entry";
import { sides, extremityLevels } from "../helper";

export default {
  name: "ExtremityEntryDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    selectedItem: {
      type: Object,
    },
    currentNote: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        category: "extremity",
        region: null,
        spinalLevel: null,
        extremityLevel: "",
        side: "",
        sublux: false,
        muscleSpasm: false,
        triggerPoints: false,
        tenderness: false,
        numbness: false,
        edema: false,
        swelling: false,
        reducedMotion: false,
        physioPositioning: "",
        coldPack: false,
        hotPack: false,
        electStim: false,
        traction: false,
        massage: false,
        treatmentPositioning: "",
        technique: "",
        manipulation: false,
      },
      formIsValid: false,
    };
  },
  computed: {
    extremityEntryDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    sideOptions() {
      return sides;
    },
    extremityLevelOptions() {
      return extremityLevels;
    },
    isUpdateMode() {
      return !!this.selectedItem;
    },
    title() {
      return this.isUpdateMode
        ? "Update Extremity Entry"
        : "Add Extremity Entry";
    },
    saveButtonText() {
      return this.isUpdateMode ? "Update" : "Save";
    },
  },
  watch: {
    selectedItem(newItem, oldItem) {
      if (newItem && newItem !== oldItem) {
        this.populateFormData(newItem);
      }
    },
  },
  async mounted() {
    this.entryService = createEntryService(this.$api);
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
      this.resetForm();
    },
    resetForm() {
      for (const key in this.form) {
        if (typeof this.form[key] === "boolean") {
          this.form[key] = false;
        } else {
          this.form[key] = "";
        }
      }
    },
    populateFormData(item) {
      this.form = {
        ...item,
      };
    },
    async submitExtremityEntryForm() {
      const noteId = this.$route.params.noteId;
      if (this.$refs.extremityEntryForm.validate()) {
        const res = this.isUpdateMode
          ? await this.entryService.updateEntry(this.form)
          : await this.entryService.addEntry(this.form, noteId);
        if ((await res) instanceof Error) {
        } else {
          this.closeDialog();
        }
      } else {
      }
    },
  },
};
</script>

<style scoped>
.technique-key {
  width: 400px;
}
</style>
