<template>
    <div>
      <v-container>
        <v-btn class="mb-4" @click="backToDashboard">Back to Dashboard</v-btn>
        <v-card class="elevation-4">
          <div class="py-5 d-flex">
            <v-card-title>
              User List
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mx-2 pa-2" @click="userDialog = true">Add New User</v-btn>
          </div>
          <v-table>
            <thead>
              <tr>
                <th class="text-left" @click="sortUsers('firstName')">
                  First Name
                </th>
                <th class="text-left" @click="sortUsers('lastName')">
                  Last Name
                </th>
                <th class="text-left" @click="sortUsers('email')">
                  Email
                </th>
                <!-- Additional columns as per your requirements -->
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in displayedUsers"
                :key="user.id"
              >
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.email }}</td>
                <!-- Additional fields as per your requirements -->
                <td class="d-flex justify-end">
                  <v-btn color="primary" @click="resetPassword(user)">Reset Password</v-btn>
                  <!-- Additional action items as per your requirements -->
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
      <!-- <UserDialog v-model="userDialog" :selected-item="selectedUserItem" @close-dialog="closeUserDialog" @user-added="refreshUserList" /> -->
    </div>
  </template>
  
  <script>
//   import UserDialog from '~/components/dialogs/UserDialog.vue'; // Import your UserDialog component
  import { userStore } from '~/store/user'; // Import your userStore
  import { createUser } from '~/composables/useFirebase'; // Import your createUser function
  import {createUserService} from '~/services/user'; // Import your user service
  
  export default {
    name: 'UserPage',
    components: {
        // UserDialog
    },
    data () {
        return {
            userDialog: false,
            userService: null,
            users: [],
            displayedUsers: [],
            itemsPerPage: 10,
            currentPage: 1,
            totalPages: 1,
            selectedUserItem: null,
        }
    },
    watch: {
      currentPage() {
        this.updateDisplayedUsers();
      },
    },
    async mounted() {
        this.userStore = userStore();
        this.userService = createUserService(this.$api);
        // Load the users here from your user service
        // this.users = <Your code to load users from Prisma>;
  
        // this.updateDisplayedUsers();
    },
    methods: {
      async createUser(email, password) {
        try {
          const credentials = await createUser(email, password);
          // After the user is created in Firebase, you can save it to your PostgreSQL database
          await this.userService.saveUser({ firebaseUid: credentials.user.uid, email });
          this.refreshUserList();
        } catch (error) {
          console.error(error);
        }
      },
      refreshUserList() {
        // Load the users here from your user service
        // this.users = <Your code to load users from Prisma>;
        this.updateDisplayedUsers();
      },
      updateDisplayedUsers() {
          this.totalPages = Math.ceil(this.patients.length / this.itemsPerPage);
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          this.displayedUsers = this.users.slice(startIndex, startIndex + this.itemsPerPage);
        },
      },
    };
  </script>