<template>
  <div>
    <v-container>
      <!-- <v-btn class="mb-4" @click="backToDashboard">Back to Dashboard</v-btn> -->
      <!-- <v-row>
            <v-col cols="6">
              <v-card class="elevation-4">
                <div class="d-flex pa-3">
                  <v-card-title class="justify-start">
                    Room Assignments
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn class="mb-4 justify-end" color="primary" @click="showAddRoomDialog = true">Add New Room</v-btn>
                </div>
                <v-table>
                        <thead>
                        <tr>
                            <th class="text-left" @click="sortNotes('text')">Assignment</th>
                            <th class="text-left"></th>
                        </tr>
                        </thead>
                        <tbody class="">
                        <tr
                            v-for="item in rooms"
                            :key="item.id"
                        >
                            <td>{{ item.text }}</td>
                            <td class="d-flex justify-end">
                              <v-icon class="ma-2 pa-3 pt-5" @click="editRoomItem(item)">mdi-pencil</v-icon>
                              <v-icon class="ma-2 pa-3 pt-5" @click="openDeleteDialog(item)">mdi-delete</v-icon>
                            </td>
                        </tr>
                        </tbody>
                    </v-table>

                    <v-dialog v-model="showAddRoomDialog" max-width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Add New Room</span>
                        </v-card-title>
                        <v-card-text>
                          <v-text-field v-model="newRoom.text" label="Room Name"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="showAddRoomDialog = false">Cancel</v-btn>
                          <v-btn color="blue darken-1" text @click="addRoom">Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-dialog v-model="showEditRoomDialog" max-width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Edit Room</span>
                        </v-card-title>
                        <v-card-text>
                          <v-text-field v-model="editedRoom.text" label="Room Name"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="showEditRoomDialog = false">Cancel</v-btn>
                          <v-btn color="blue darken-1" text @click="updateRoom">Update</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-dialog v-model="showDeleteRoomDialog" max-width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Delete Room</span>
                        </v-card-title>
                        <v-card-text>
                          Are you sure you want to delete this room?
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="showDeleteRoomDialog = false">No</v-btn>
                          <v-btn color="red darken-1" text @click="deleteRoom">Yes</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
              </v-card>
            </v-col>
            <v-col cols="6"></v-col>

          </v-row> -->
    </v-container>
  </div>
</template>

<script>
import { createRoomService } from "~~/services/room";

export default {
  name: "SettingsPage",
  components: {},
  data() {
    return {
      roomService: null,
      rooms: [],
      newRoom: {
        text: "",
      },
      editedRoom: null,
      showAddRoomDialog: false,
      showEditRoomDialog: false,
      showDeleteRoomDialog: false,
      roomToDelete: null,
    };
  },
  async mounted() {
    this.roomService = createRoomService(this.$api);
    await this.loadRooms();
  },
  methods: {
    async loadRooms() {
      try {
        this.rooms = await this.roomService.getRooms();
      } catch (error) {
        console.error(error);
      }
    },
    async addRoom() {
      try {
        await this.roomService.addRoom(this.newRoom);
        this.showAddRoomDialog = false;
        this.newRoom.text = "";
        await this.loadRooms();
      } catch (error) {
        console.error(error);
      }
    },
    editRoomItem(room) {
      this.editedRoom = Object.assign({}, room);
      this.showEditRoomDialog = true;
    },
    async updateRoom() {
      try {
        await this.roomService.updateRoom(this.editedRoom);
        this.showEditRoomDialog = false;
        await this.loadRooms();
      } catch (error) {
        console.error(error);
      }
    },
    openDeleteDialog(room) {
      this.roomToDelete = room;
      this.showDeleteRoomDialog = true;
    },
    async deleteRoom() {
      try {
        await this.roomService.deleteRoom(this.roomToDelete);
        this.showDeleteRoomDialog = false;
        this.roomToDelete = null;
        await this.loadRooms();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
