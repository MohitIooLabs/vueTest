<template>
  <div class="text-end">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Add Image Tags
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-file-input
            v-model="file"
            chips
            accept="image/*"
            label="Image"
            @change="onFileChange"
            :rules="imgeFileRules"
          />
          <v-text-field
            v-model="tags"
            :rules="nameRules"
            label="Enter Image Tag Name"
            required
          ></v-text-field>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" rounded text @click="closeDialog()">
              Close
            </v-btn>
            <v-btn color="success" class="mr-4" @click="addItem()" rounded>
              Submit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
    <Loader :showLoading="showLoading"></Loader>
  </div>
</template>

<script>
import axios from "axios";
import { bus } from "../main";
import Loader from "../components/Loader.vue";

export default {
  name: "AddImageTag",
  components: {
    Loader,
  },
  data: () => ({
    valid: true,
    addImageTagDialog: false,
    file: null,
    image: null,
    showLoading: false,
    tags: "",
    nameRules: [(v) => !!v || "Tags Name is required"],
    imgeFileRules: [(v) => !!v || "Image is required"],
  }),

  methods: {
    closeDialog() {
      this.addImageTagDialog = false;
      this.$emit("addImageTagDialog", this.addImageTagDialog);
      this.reset();
    },
    validate() {
      this.$refs.form.validate();
      console.log(this.$refs.form.validate());
      //   this.addItem();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    onFileChange() {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        this.image = e.target.result;
      };
    },
    async addItem() {
      if (this.$refs.form.validate() === true) {
        this.showLoading = true;
        const response = await axios.post(
          "/api/bucketListItems/",
          {
            description: this.tags,
            imgUrl: this.image,
          }
        );
        if (response.status === 200) {
          bus.$emit("addItemDone", this.addImageTagDialog);
          this.showLoading = false;
          this.reset();
        }
        this.items.push(response.data);
        this.imgUrl = "";
      }
    },
  },
};
</script>