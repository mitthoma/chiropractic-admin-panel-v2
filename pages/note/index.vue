<template>
    <div>
      <v-container>
        <v-card class="elevation-4">
          <div class="py-5 d-flex">
            <v-card-title>
              Note List
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="ma-2 pa-2" @click="noteDialog = true">Add New Note</v-btn>
          </div>
          <v-table>
            <thead>
            <tr>
                <th class="text-left" @click="sortNotes('visitDate')">Visit Date</th>
                <th class="text-left" @click="sortNotes('patient.firstName')">First Name</th>
                <th class="text-left" @click="sortNotes('patient.lastName')">Last Name</th>
                <th class="text-left" @click="sortNotes('lastEdited')">Last Edited</th>
                <th class="text-left"></th>
            </tr>
            </thead>
            <tbody class="">
            <tr
                v-for="item in displayedNotes"
                :key="item.id"
            >
                <td>{{ formatDate(item.visitDate, item) }}</td>
                <td v-if="item.patient">{{ item.patient.firstName }}</td>
                <td v-if="item.patient">{{ item.patient.lastName }}</td>
                <td>{{ formatDate(item.lastEdited, item) }}</td>
                <td class="d-flex justify-end">
                    <v-icon @click="editNoteItem(item)">mdi-pencil</v-icon>
                    <v-btn class="ma-2 pa-2" color="primary" @click="goToNote(item)">See note</v-btn>
                </td>
            </tr>
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
      <NoteDialog v-model="noteDialog" :selected-item="selectedNoteItem" @close-dialog="closeNoteDialog" @note-added="refreshNoteList" />
  
    </div>
  </template>
  
  <script>
  import NoteDialog from '~/components/dialogs/NoteDialog.vue';
  import { createNoteService } from '~/services/note';
  import { noteStore } from '~/store/note';
  
  export default {
    name: 'NotePage',
    components: {
        NoteDialog
    },
    data () {
        return {
            noteDialog: false,
            noteService: null,
            notes: [],
            displayedNotes: [],
            itemsPerPage: 10,
            currentPage: 1,
            totalPages: 1,
        }
    },
    watch: {
      currentPage() {
        this.updateDisplayedNotes();
      },
    },
    async mounted() {
        this.noteService = createNoteService(this.$api);
        this.notes = await this.noteService.getNotes();
        this.updateDisplayedNotes();
    },
    methods: {
        async refreshNoteList() {
            this.notes = await this.noteService.getNotes();
            this.updateDisplayedNotes();
        },
        goToNote(item) {
            this.noteStore.setCurrentNote(item);
            this.$router.push(`/note/${item.id}`);
        },
        editNoteItem(note) {
          this.selectedNoteItem = note;
          this.noteDialog = true;
        },
        backToDashboard() {
            this.$router.push('/');
        },
        closeNoteDialog() {
            this.selectedNoteItem = null;
            this.noteDialog = false;
        },
        updateDisplayedNotes() {
          this.totalPages = Math.ceil(this.notes.length / this.itemsPerPage);
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          this.displayedNotes = this.notes.slice(startIndex, startIndex + this.itemsPerPage);
        },
        sortNotes(field) {
            this.notes = this.notes.sort((a, b) => {
                const [aField, aSubField] = field.split('.');
                const [bField, bSubField] = field.split('.');

                const aValue = aSubField ? a[aField][aSubField] : a[aField];
                const bValue = bSubField ? b[bField][bSubField] : b[bField];

                if (aValue < bValue) {
                return -1;
                }
                if (aValue > bValue) {
                return 1;
                }
                return 0;
            });
            this.updateDisplayedNotes();
        },
        formatDate(date, item) {
            if (isNaN(Date.parse(date))) {
                console.log('item.visitdatetext ', item.visitDateText);
                return item.visitDateText || "Invalid date";
            }

            const formattedDate = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }).format(new Date(date));

            return `${formattedDate}`;
        }
      },
    }
  </script>