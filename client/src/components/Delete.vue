<template>
  <div>
    <div class="text-right">
      <v-btn depressed color="white" @click="showDeleteDialog()">
        <v-icon small color="green"> delete </v-icon>
      </v-btn>
    </div>
    <div class="text-center">
      <v-dialog v-model="deleteDialog" width="500">
        <v-card>
          <v-card-title class="headline">
            Are you sure you want to delete this item?
          </v-card-title>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="deleteDialog = false">
              No
            </v-btn>
            <v-btn color="primary" @click="removeItem()"> Yes </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <Loader :showLoading="showLoading"></Loader>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../components/Loader.vue";
export default {
  props: ["itemId"],
  components: {
    Loader,
  },
  data() {
    return {
      items: [],
      deleteDialog: false,
      showLoading: false
    };
  },
  methods: {
    showDeleteDialog() {
      this.deleteDialog = true;
    },
    async removeItem(item, i) {
      this.showLoading = true;
      const response = await axios.delete(
        "http://localhost:3000/api/bucketListItems/" + this.itemId,
        this.deleteDialog = false,
      );
      this.items.splice(i, 1);
      if (response.status === 200) {
        this.$emit("getImgListData");
        this.showLoading = false;
      }
    },
  },
};
</script>
