import { defineStore } from 'pinia';
import { note } from '@prisma/client';

interface NoteState {
  currentNote: note;
}

export const noteStore = defineStore('note', {
  state: () => ({
    currentNote: {} as note,
  }),

  getters: {
    // getCurrentPatient: (state) => state.currentPatient,
    getCurrentNote: (state: NoteState): note | null =>
      Object.keys(state.currentNote).length > 0 ? state.currentNote : null,
  },
  actions: {
    setCurrentNote(note: note) {
      this.currentNote = note;
    },
  },
});
