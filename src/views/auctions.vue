<script>
import PageHeader from '@/components/page-header';
import Layout from '@/layouts/main.vue';
import AuctionService from '@/services/auction.service';

export default {
  components: {
    PageHeader,
    Layout,
  },
  data() {
    return {
      auctions: [],
      filter: {
        limit: 6,
        isEnded: false,
      },
      total: 0,
      Page: 1,
    };
  },
  methods: {
    async fetchAuctions(filter) {
      try {
        const response = await AuctionService.getAuctions(filter);
        this.auctions = response.data.getAuctions.data;
        this.total = response.data.getAuctions.metadata.total;
        console.log(this.total);
        console.log(this.auctions);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    },
    resetFilter() {
      this.filter = {
        limit: 6,
        isEnded: false,
      };
      this.fetchAuctions(this.filter);
    },
    async updateFilter() {
      await this.fetchAuctions(this.filter);
    },
  },
  async mounted() {
    await this.fetchAuctions(this.filter);
  },
};
</script>

<template>
  <Layout>
    <PageHeader title="Live Auction" pageTitle="NFT Marketplace" />
    <BRow>
      <BCol xxl="9">
        <BCard no-body>
          <BCardHeader class="border-0">
            <div class="d-lg-flex align-items-center">
              <div class="flex-grow-1">
                <h5 class="card-title mb-0">Live Auction</h5>
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
                </ul>
              </div>
            </div>
          </BCardHeader>
        </BCard>
        <BRow>
          <BCol
            xxl="3"
            lg="4"
            md="6"
            class="product-item upto-15 cursor-pointer"
            v-for="auction in auctions"
            v-bind:key="auction.id"
            @click="() => $router.push(`/auction/${auction.id}`)"
          >
            <BCard no-body class="explore-box card-animate">
              <div class="position-relative rounded overflow-hidden">
                <img
                  :src="auction.nft.imageUrl"
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
                  <i class="mdi"> {{ auction.currentPrice }}</i>
                </h5>
                <div
                  class="d-flex justify-content-between align-items-center mb-3"
                >
                  <h6 class="fs-16 mb-0">
                    <router-link to="/apps/nft-item-detail">
                      {{ auction.nft.name || auction.nft.title }}
                    </router-link>
                  </h6>
                  <h5 class="text-success mb-0">
                    <i class="mdi mdi-ethereum"></i> {{ auction.maxBidAmount }}
                  </h5>
                </div>
                <span class="text-muted"
                  >{{ new Date(auction.createdAt).toDateString() }} -
                  {{ new Date(auction.endTime).toDateString() }}</span
                >
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
                    :value="filter.search"
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
                    v-model="filter.startingPriceLower"
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
                    v-model="filter.startingPriceUpper"
                  />
                </div>
              </BCol>
            </BRow>
            <BRow class="mt-3">
              <BCol xxl="5" md="5">
                <div>
                  <label for="minDurationInput" class="form-label"
                    >Min Duration</label
                  >
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    class="form-control"
                    id="minDurationInput"
                    v-model="filter.durationLower"
                  />
                </div>
              </BCol>
              <BCol xxl="5" md="5">
                <div>
                  <label for="maxDurationInput" class="form-label"
                    >Max Duration</label
                  >
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    class="form-control"
                    id="maxDurationInput"
                    v-model="filter.durationUpper"
                  />
                </div>
              </BCol>
            </BRow>
            <BRow class="mt-3">
              <BCol xxl="10" md="10">
                <div>
                  <label for="endTime" class="form-label">end time</label>
                  <input
                    type="datetime-local"
                    class="form-control"
                    id="endTime"
                    v-model="filter.endTime"
                  />
                </div>
              </BCol>
            </BRow>
            <BRow class="mt-3">
              <BCol xxl="8" md="5">
                <div>
                  <label for="minPriceInput" class="form-label"
                    >Current Price</label
                  >
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    class="form-control"
                    id="minPriceInput"
                    v-model="filter.maxBidAmount"
                  />
                </div>
              </BCol>
              <!-- i want checkbox to initially be checked -->
              <BCol xxl="3" md="5">
                <div class="form-check mt-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="endedCheckbox"
                    v-model="filter.isEnded"
                  />
                  <label
                    class="form-check-label whitespace-pre"
                    for="endedCheckbox"
                  >
                    Ended
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
