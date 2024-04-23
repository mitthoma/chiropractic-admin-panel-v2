<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <div class="card-header">
            <v-card-title class="text-h5 pb-5">Doctor Note</v-card-title>
            <div class="icon-container">
              <v-icon v-if="!editMode" @click="editMode = true"
                >mdi-pencil</v-icon
              >
              <div v-if="editMode">
                <v-icon @click="handleCancel">mdi-trash-can</v-icon>
                <v-icon @click="handleSave">mdi-check</v-icon>
              </div>
            </div>
          </div>
          <v-card-text>
            <v-row>
              <!-- Doctor Note Field -->
              <v-col cols="12">
                <v-textarea
                  v-if="editMode"
                  v-model="doctorNote"
                  label="Edit Doctor Note"
                  rows="5"
                  outline
                ></v-textarea>
                <div v-else>
                  <p>{{ doctorNote }}</p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createNoteService } from '~~/services/note';

export default {
  name: 'DoctorNote',
  data() {
    return {
      noteService: null,
      editMode: false,
      doctorNote: null,
      note: null,
    };
  },
  async mounted() {
    this.noteService = createNoteService(this.$api);
    await this.retrieveData();
  },
  methods: {
    async handleSave() {
      const notePayload = {
        ...this.note,
        doctorNote: this.doctorNote,
        id: this.note.id,
      };
      await this.noteService.updateNote(notePayload);
      this.editMode = false;
      await this.retrieveData();
    },
    async handleCancel() {
      this.editMode = false;
      await this.retrieveData();
    },
    async retrieveData() {
      this.note = await this.noteService.getNote({
        id: this.$route.params.noteId,
      });

      this.doctorNote = this.note.doctorNote;
    },
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon-container {
  display: flex;
  align-items: center;
  padding: 10px;
}
</style>
