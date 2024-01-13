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
      <v-card class="elevation-4">
        <div class="py-5 d-flex">
          <v-card-title> User List </v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mx-2 pa-2" @click="userDialog = true"
            >Add New User</v-btn
          >
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
              <th class="text-left" @click="sortUsers('email')">Email</th>
              <th class="text-left" @click="sortUsers('role')">User Role</th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in displayedUsers" :key="user.id">
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td class="d-flex justify-end"></td>
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
    <UserDialog
      v-model="userDialog"
      :selected-item="selectedUserItem"
      @close-dialog="closeUserDialog"
      @user-added="refreshUserList"
    />
  </div>
</template>

<script>
import { userStore } from '~/store/user';
import { createUserService } from '~/services/user';
import UserDialog from '~/components/dialogs/UserDialog.vue';

export default {
  name: 'UserPage',
  components: {
    UserDialog,
  },
  data() {
    return {
      userDialog: false,
      userService: null,
      users: [],
      displayedUsers: [],
      itemsPerPage: 10,
      currentPage: 1,
      totalPages: 1,
      selectedUserItem: null,
    };
  },
  watch: {
    currentPage() {
      this.updateDisplayedUsers();
    },
  },
  async mounted() {
    this.userStore = userStore();
    this.userService = createUserService(this.$api);
    this.users = await this.userService.getUsers();

    this.updateDisplayedUsers();
  },
  methods: {
    async refreshUserList() {
      this.users = await this.userService.getUsers();
      this.updateDisplayedUsers();
    },
    updateDisplayedUsers() {
      this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.displayedUsers = this.users.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },

    sortUsers(field) {
      this.users = this.users.sort((a, b) => {
        if (a[field] < b[field]) {
          return -1;
        }
        if (a[field] > b[field]) {
          return 1;
        }
        return 0;
      });
      this.updateDisplayedUsers();
    },

    backToDashboard() {
      this.$router.push('/');
    },
    closeUserDialog() {
      this.selectedUserItem = null;
      this.userDialog = false;
    },
    editUserItem(user) {
      this.selectedUserItem = user;
      this.userDialog = true;
    },
    async deleteUser(item) {
      try {
        await this.userService.deleteUser({
          id: item.id,
        });
        this.refreshUserList();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
};
</script>
