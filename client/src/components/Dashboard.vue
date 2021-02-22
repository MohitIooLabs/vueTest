<template>
  <div>
    <v-container fluid>
      <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar dark color="blue darken-3" class="mb-1">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-btn depressed color="primary" @click="addImageTag()">
                Add Image Tag
              </v-btn>
            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row class="ma-2">
            <v-col
              v-for="item in props.items"
              :key="item._id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              class="pa-3 d-flex flex-column"
            >
              <v-card class="elevation-5 flex d-flex flex-column">
                <DeleteImageTag
                  :itemId="item._id"
                  @getImgListData="getImgListData"
                ></DeleteImageTag>
                <div class="imgTag">
                  <v-card-title class="subheading font-weight-bold">
                    {{ item.description }}
                  </v-card-title>
                </div>

                <v-divider></v-divider>

                <v-list dense>
                  <v-list-item>
                    <v-img
                      max-height="100%"
                      max-width="100%"
                      :src="item.imgUrl"
                    ></v-img>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <template v-slot:footer>
          <v-row class="mt-2" align="center" justify="center">
            <span class="grey--text">Items per page</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  text
                  color="primary"
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <span class="mr-4 grey--text">
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="mr-1"
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
    <div class="text-center">
      <v-dialog v-model="addImageTagDialog" width="500">
        <AddImageTag @addImageTagDialog="addImageTagDialogAction"></AddImageTag>
      </v-dialog>
    </div>
    <Loader :showLoading="showLoading"></Loader>
  </div>
</template>

<script>
import axios from "axios";
import AddImageTag from "./AddImageTag.vue";
import DeleteImageTag from "./Delete.vue";
import Loader from "../components/Loader.vue";
import { bus } from "../main";
export default {
  name: "Dashboard",
  components: {
    AddImageTag,
    DeleteImageTag,
    Loader,
  },
  data() {
    return {
      items: [],
      addImageTagDialog: false,
      showLoading: false,
      imgUrl: "",
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
    };
  },
  created() {
    bus.$on("addItemDone", (data) => {
      this.addImageTagDialog = data;
      this.getImgListData();
    });
  },
  mounted() {
    this.getImgListData();
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  methods: {
    async getImgListData() {
      this.showLoading = true;
      const response = await axios.get(
        "http://localhost:3000/api/bucketListItems/"
      );
      if (response.status === 200) {
        this.showLoading = false;
        this.reverseArr(response.data);
      }
      
      // this.items = response.data;
    },
    reverseArr(input) {
      var ret = new Array();
      for (var i = input.length - 1; i >= 0; i--) {
        ret.push(input[i]);
        this.items = ret;
      }
    },

    addImageTagDialogAction(item) {
      this.addImageTagDialog = item;
      // this.getImgListData();
    },
    addImageTag() {
      this.addImageTagDialog = true;
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
};
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 1000px;
}
.icon {
  cursor: pointer;
}
.imgTag {
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>

