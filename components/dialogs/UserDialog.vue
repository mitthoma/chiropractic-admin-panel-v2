<template>
  <v-dialog
    v-model="userDialog"
    max-width="1000px"
    @click:outside="closeDialog"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="userForm" v-model="formValid">
          <v-row>
            <v-col cols="">
              <v-text-field
                v-model="form.firstName"
                :rules="nameRules"
                label="First Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.lastName"
                :rules="nameRules"
                label="Last Name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="Email"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.password"
                :rules="passwordRules"
                label="Temporary Password"
                required
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submitUserForm">{{
          saveButtonText
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createUserService } from '~/services/user';

export default {
  name: 'UserDialog',
  components: {
    // VueDatePicker
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    selectedItem: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '', // new field
      },
      userService: null,
      formValid: false,
      nameRules: [(v) => !!v || 'This field is required'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [(v) => !!v || 'Password is required'], // new field
    };
  },
  computed: {
    userDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    isUpdateMode() {
      return !!this.selectedItem;
    },
    title() {
      return this.isUpdateMode ? 'Update User' : 'Add User';
    },
    saveButtonText() {
      return this.isUpdateMode ? 'Update' : 'Save';
    },
  },
  watch: {
    selectedItem(newItem, oldItem) {
      if (newItem && newItem !== oldItem) {
        this.populateFormData(newItem);
      }
    },
  },
  mounted() {
    this.userService = createUserService(this.$api);
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
      this.resetForm();
    },
    populateFormData(item) {
      this.form = { ...item };
    },
    resetForm() {
      this.form.firstName = '';
      this.form.lastName = '';
      this.form.email = '';
    },
    async submitUserForm() {
      if (this.$refs.userForm.validate()) {
        const res = this.isUpdateMode
          ? await this.userService.updateUser(this.form)
          : await this.userService.addUser({
              ...this.form,
              password: this.form.password,
            });
        if ((await res) instanceof Error) {
          console.log('User not added/updated');
        } else {
          console.log(
            this.isUpdateMode
              ? 'User updated successfully'
              : 'User added successfully'
          );
          this.$emit('user-added');
          this.closeDialog();
        }
      } else {
        console.log('Form not submitted. Did not meet validation standards.');
      }
    },
  },
};
</script>
