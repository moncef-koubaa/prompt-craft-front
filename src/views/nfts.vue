<script>
import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";
import NftService from "@/services/nft.service";

export default {
  components: {
    PageHeader,
    Layout,
  },
  data() {
    return {
      NFTs: [],
      filter: {
        limit: 6,
      },
      Page: 1,
      total: 0,
    };
  },
  methods: {
    async fetchNFTs(filter = {}) {
      try {
        const response = await NftService.getNFTs(filter);
        this.NFTs = response.data.getNfts.data;
        this.total = response.data.getNfts.metadata.total;
        console.log(this.total);
        console.log(this.NFTs);
      } catch (error) {
        console.error("Error fetching nfts:", error);
      }
    },
    resetFilter() {
      this.filter = {};
      this.fetchNFTs();
    },
    async updateFilter() {
      console.log("Filter updated:", this.filter.search);
      await this.fetchNFTs(this.filter);
    },
  },
  async mounted() {
    await this.fetchNFTs();
  },
  watch: {
    Page(newPage) {
      this.filter.page = newPage;
      this.fetchNFTs(this.filter);
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader title="Nft Marketplace" pageTitle="NFT Marketplace" />
    <BRow>
      <BCol xxl="9">
        <BCard no-body>
          <BCardHeader class="border-0">
            <div class="d-lg-flex align-items-center">
              <div class="flex-grow-1">
                <h5 class="card-title mb-0">Nfts</h5>
              </div>
              <div class="flex-shrink-0 mt-4 mt-lg-0">
                <ul class="nav nav-pills filter-btns" role="tablist">
                  <li class="nav-item" role="presentation">
                    <BButton
                      variant="link"
                      class="nav-link fw-medium active"
                      data-filter="all"
                      >All Items</BButton
                    >
                  </li>
                  <li class="nav-item" role="presentation">
                    <BButton
                      variant="link"
                      class="nav-link fw-medium"
                      data-filter="upto-15"
                      >Up to 15%</BButton
                    >
                  </li>
                  <li class="nav-item" role="presentation">
                    <BButton
                      variant="link"
                      class="nav-link fw-medium"
                      data-filter="upto-30"
                      >Up to 30%</BButton
                    >
                  </li>
                  <li class="nav-item" role="presentation">
                    <BButton
                      variant="link"
                      class="nav-link fw-medium"
                      data-filter="upto-40"
                      >Up to 40%</BButton
                    >
                  </li>
                </ul>
              </div>
            </div>
          </BCardHeader>
        </BCard>
        <BRow>
          <BCol
            xxl="4"
            lg="4"
            md="6"
            class="product-item upto-15 cursor-pointer"
            v-for="nft in this.NFTs"
            v-bind:key="nft.id"
            @click="() => $router.push(`/nft/${nft.id}`)"
          >
            <BCard no-body class="explore-box card-animate">
              <div class="position-relative rounded overflow-hidden">
                <img
                  :src="nft.imageUrl"
                  alt=""
                  class="card-img-top explore-img"
                />
                <div class="discount-time">
                  <h5 id="auction-time-1" class="mb-0 text-white"></h5>
                </div>
              </div>
              <BCardBody>
                <p class="fw-medium mb-0 float-end"></p>
                <h5 class="text-success">
                  <i class="mdi mdi-ethereum"> {{ nft.price }}</i>
                </h5>
                <h6 class="fs-16 mb-3">
                  <router-link to="/apps/nft-item-detail">{{
                    nft.title
                  }}</router-link>
                </h6>
                <div>
                  <span class="text-muted">{{ nft.description }}</span>
                </div>
              </BCardBody>
            </BCard>
          </BCol>
        </BRow>
        <!-- <BRow>
          <BCol lg="12">
            <div class="text-center mb-3">
              <BButton variant="link" class="text-success mt-2"
                ><i
                  class="mdi mdi-loading mdi-spin fs-20 align-middle me-2"
                ></i>
                Load more
              </BButton>
            </div>
          </BCol>
        </BRow> -->
      </BCol>
      <BCol xxl="3">
        <BCard no-body>
          <BCardHeader class="d-flex align-items-center">
            <h6 class="card-title mb-0 flex-grow-1">Filter</h6>
          </BCardHeader>
          <BCardBody>
            <BRow>
              <BCol cols="7">
                <div>
                  <input
                    type="text"
                    class="form-control"
                    id="basiInput"
                    placeholder="Rechercher"
                    v-model="filter.search"
                  />
                </div>
              </BCol>

              <BCol cols="3" class="m-0 p-0 w-auto">
                <BButton
                  variant="danger"
                  style="background-color: #cd0f45"
                  @click="resetFilter"
                >
                  Reset
                </BButton>
              </BCol>
              <BCol cols="1">
                <BButton
                  variant="danger"
                  class=""
                  style="background-color: #cd0f45"
                  @click="updateFilter"
                >
                  Apply
                </BButton>
              </BCol>
            </BRow>
            <BRow class="mt-3">
              <BCol xxl="5" md="5">
                <div>
                  <label for="minPriceInput" class="form-label"
                    >Min Price</label
                  >
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    class="form-control"
                    id="minPriceInput"
                    v-model="filter.priceLower"
                  />
                </div>
              </BCol>
              <BCol xxl="5" md="5">
                <div>
                  <label for="maxPriceInput" class="form-label"
                    >Max Price</label
                  >
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    class="form-control"
                    id="maxPriceInput"
                    v-model="filter.priceUpper"
                  />
                </div>
              </BCol>
            </BRow>

            <BRow class="mt-3">
              <BCol xxl="3" md="5">
                <div class="form-check mt-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="endedCheckbox"
                    v-model="filter.isOnSale"
                  />
                  <label
                    class="form-check-label whitespace-pre"
                    for="endedCheckbox"
                  >
                    On Sale
                  </label>
                </div>
              </BCol>
              <BCol xxl="3" md="5">
                <div class="form-check mt-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="endedCheckbox"
                    v-model="filter.isOnAuction"
                  />
                  <label
                    class="form-check-label whitespace-pre"
                    for="endedCheckbox"
                  >
                    On Auction
                  </label>
                </div>
              </BCol>
            </BRow>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
    <BRow class="mt-4">
      <BCol class="d-flex justify-content-end">
        <BPagination
          v-if="this.total > 6"
          v-model="this.Page"
          pills
          :total-rows="this.total"
          :per-page="6"
          prev-text="Previous"
          next-text="Next"
          hide-goto-end-buttons="true"
          class="pagination-separated d-flex-wrap m-2"
        />
      </BCol>
    </BRow>
  </Layout>
</template>
