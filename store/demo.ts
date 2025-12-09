import { defineStore } from 'pinia';
import {
  demoPatients,
  demoComplaints,
  demoNotes,
  demoReports,
  demoRooms,
  demoTreatmentOptions,
  demoTreatmentMethodNames,
  demoTreatmentPlanOptions,
  demoSpinalEntries,
  demoExtremityEntries,
} from '~/composables/useDemoData';

interface DemoState {
  isDemo: boolean;
  tourCompleted: boolean;
  patients: any[];
  complaints: any[];
  notes: any[];
  reports: any[];
  rooms: any[];
  treatmentOptions: any[];
  treatmentMethodNames: any[];
  treatmentPlanOptions: any[];
  spinalEntries: any[];
  extremityEntries: any[];
}

export const demoStore = defineStore('demo', {
  state: (): DemoState => ({
    isDemo: false,
    tourCompleted: false,
    patients: [],
    complaints: [],
    notes: [],
    reports: [],
    rooms: [],
    treatmentOptions: [],
    treatmentMethodNames: [],
    treatmentPlanOptions: [],
    spinalEntries: [],
    extremityEntries: [],
  }),

  getters: {
    getIsDemo: (state): boolean => state.isDemo,
    getTourCompleted: (state): boolean => state.tourCompleted,
    getPatients: (state): any[] => state.patients,
    getComplaints: (state): any[] => state.complaints,
    getNotes: (state): any[] => state.notes,
    getReports: (state): any[] => state.reports,
    getRooms: (state): any[] => state.rooms,
    getTreatmentOptions: (state): any[] => state.treatmentOptions,
    getTreatmentMethodNames: (state): any[] => state.treatmentMethodNames,
    getTreatmentPlanOptions: (state): any[] => state.treatmentPlanOptions,
    getSpinalEntries: (state): any[] => state.spinalEntries,
    getExtremityEntries: (state): any[] => state.extremityEntries,

    // Get data for specific patient
    getNoteSpinalEntries: (state) => (noteId: string) => {
      return state.spinalEntries.filter((e) => e.noteId === noteId);
    },
    getNoteExtremityEntries: (state) => (noteId: string) => {
      return state.extremityEntries.filter((e) => e.noteId === noteId);
    },
    getPatientComplaints: (state) => (patientId: number) => {
      return state.complaints.filter((c) => c.patientId === patientId);
    },
    getPatientNotes: (state) => (patientId: number) => {
      return state.notes.filter((n) => n.patientId === patientId);
    },
    getPatientReports: (state) => (patientId: number) => {
      return state.reports.filter((r) => r.patientId === patientId);
    },
  },

  actions: {
    setIsDemo(value: boolean) {
      this.isDemo = value;
      if (value) {
        // Load all demo data when entering demo mode
        this.patients = [...demoPatients];
        this.complaints = [...demoComplaints];
        this.notes = [...demoNotes];
        this.reports = [...demoReports];
        this.rooms = [...demoRooms];
        this.treatmentOptions = [...demoTreatmentOptions];
        this.treatmentMethodNames = [...demoTreatmentMethodNames];
        this.treatmentPlanOptions = [...demoTreatmentPlanOptions];
        this.spinalEntries = [...demoSpinalEntries];
        this.extremityEntries = [...demoExtremityEntries];
      } else {
        this.reset();
      }
    },
    setTourCompleted(value: boolean) {
      this.tourCompleted = value;
    },

    // Patient actions
    addPatient(patient: any) {
      const newId = Math.max(...this.patients.map((p) => p.id), 0) + 1;
      this.patients.push({ ...patient, id: newId });
    },
    updatePatient(updatedPatient: any) {
      const index = this.patients.findIndex((p) => p.id === updatedPatient.id);
      if (index !== -1) {
        this.patients[index] = updatedPatient;
      }
    },
    deletePatient(patientId: number) {
      this.patients = this.patients.filter((p) => p.id !== patientId);
      this.complaints = this.complaints.filter(
        (c) => c.patientId !== patientId
      );
      this.notes = this.notes.filter((n) => n.patientId !== patientId);
      this.reports = this.reports.filter((r) => r.patientId !== patientId);
    },

    // Complaint actions
    addComplaint(complaint: any) {
      const newId = `complaint-${Date.now()}`;
      this.complaints.push({ ...complaint, id: newId });
    },
    updateComplaint(updatedComplaint: any) {
      const index = this.complaints.findIndex(
        (c) => c.id === updatedComplaint.id
      );
      if (index !== -1) {
        this.complaints[index] = updatedComplaint;
      }
    },
    deleteComplaint(complaintId: string) {
      this.complaints = this.complaints.filter((c) => c.id !== complaintId);
    },

    // Note actions
    addNote(note: any) {
      const newId = `note-${Date.now()}`;
      this.notes.push({ ...note, id: newId });
    },
    updateNote(updatedNote: any) {
      const index = this.notes.findIndex((n) => n.id === updatedNote.id);
      if (index !== -1) {
        this.notes[index] = updatedNote;
      }
    },
    deleteNote(noteId: string) {
      this.notes = this.notes.filter((n) => n.id !== noteId);
    },

    // Report actions
    addReport(report: any) {
      const newId = `report-${Date.now()}`;
      this.reports.push({ ...report, id: newId });
    },

    // Settings actions
    addRoom(room: any) {
      const newId = Math.max(...this.rooms.map((r) => r.id), 0) + 1;
      this.rooms.push({ ...room, id: newId });
    },
    updateRoom(updatedRoom: any) {
      const index = this.rooms.findIndex((r) => r.id === updatedRoom.id);
      if (index !== -1) {
        this.rooms[index] = updatedRoom;
      }
    },
    deleteRoom(roomId: number) {
      this.rooms = this.rooms.filter((r) => r.id !== roomId);
    },

    addTreatmentOption(option: any) {
      const newId = Math.max(...this.treatmentOptions.map((o) => o.id), 0) + 1;
      this.treatmentOptions.push({ ...option, id: newId });
    },
    updateTreatmentOption(updatedOption: any) {
      const index = this.treatmentOptions.findIndex(
        (o) => o.id === updatedOption.id
      );
      if (index !== -1) {
        this.treatmentOptions[index] = updatedOption;
      }
    },
    deleteTreatmentOption(optionId: number) {
      this.treatmentOptions = this.treatmentOptions.filter(
        (o) => o.id !== optionId
      );
    },

    reset() {
      this.isDemo = false;
      this.tourCompleted = false;
      this.patients = [];
      this.complaints = [];
      this.notes = [];
      this.reports = [];
      this.rooms = [];
      this.treatmentOptions = [];
      this.treatmentMethodNames = [];
      this.treatmentPlanOptions = [];
      this.spinalEntries = [];
      this.extremityEntries = [];
    },
  },
});
