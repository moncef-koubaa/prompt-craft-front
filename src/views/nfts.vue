<template>
  <Layout>
    <PageHeader title="NFT Marketplace" pageTitle="Digital Assets" />
    <BRow>
      <BCol xxl="9">
        <BCard no-body>
          <BCardHeader class="border-0">
            <div class="d-lg-flex align-items-center">
              <div class="flex-grow-1">
                <h5 class="card-title mb-0">All NFTs</h5>
              </div>
              <div class="flex-shrink-0 mt-4 mt-lg-0">
                <ul class="nav nav-pills filter-btns" role="tablist">
                  <li class="nav-item" role="presentation">
                    <BButton
                        variant="link"
                        class="nav-link fw-medium active"
                        @click="applyCategoryFilter('all')"
                    >All Items</BButton>
                  </li>
                  <li class="nav-item" role="presentation">
                    <BButton
                        variant="link"
                        class="nav-link fw-medium"
                        @click="applyCategoryFilter('art')"
                    >Art</BButton>
                  </li>
                  <li class="nav-item" role="presentation">
                    <BButton
                        variant="link"
                        class="nav-link fw-medium"
                        @click="applyCategoryFilter('collectibles')"
                    >Collectibles</BButton>
                  </li>
                  <li class="nav-item" role="presentation">
                    <BButton
                        variant="link"
                        class="nav-link fw-medium"
                        @click="applyCategoryFilter('photography')"
                    >Photography</BButton>
                  </li>
                </ul>
              </div>
            </div>
          </BCardHeader>
        </BCard>
        <BRow v-if="loading">
          <BCol v-for="i in 8" :key="i" xxl="3" lg="4" md="6">
            <BCard no-body class="explore-box card-animate placeholder-glow">
              <div class="position-relative rounded overflow-hidden bg-light" style="height: 200px"></div>
              <BCardBody>
                <h5 class="card-title placeholder-wave">
                  <span class="placeholder col-8"></span>
                </h5>
                <p class="card-text placeholder-wave">
                  <span class="placeholder col-6"></span>
                </p>
                <div class="d-flex justify-content-between">
                  <span class="placeholder col-4"></span>
                  <span class="placeholder col-4"></span>
                </div>
              </BCardBody>
            </BCard>
          </BCol>
        </BRow>
        <BRow v-else>
          <BCol
              v-for="nft in nfts"
              :key="nft.id"
              xxl="3"
              lg="4"
              md="6"
              class="product-item"
          >
            <BCard no-body class="explore-box card-animate h-100">
              <div class="position-relative rounded overflow-hidden">
                <img
                    :src="nft.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'"
                    alt="NFT image"
                    class="card-img-top explore-img"
                    style="height: 200px; object-fit: cover;"
                />
                <div class="discount-time">
                  <span class="badge bg-info">{{ nft.category || 'Uncategorized' }}</span>
                </div>
                <div class="hover-overlay">
                  <BButton variant="primary" class="view-btn" @click="viewNFT(nft.id)">
                    <i class="ri-eye-line"></i> View
                  </BButton>
                </div>
              </div>
              <BCardBody>
                <h5 class="mb-1">
                  <router-link to="#" class="text-truncate d-block">{{ nft.title || 'Untitled NFT' }}</router-link>
                </h5>
                <p class="text-muted mb-2 text-truncate">{{ nft.description || 'No description available' }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 class="text-success mb-0">
                      <i class="mdi mdi-ethereum"></i> {{ nft.price || '0.00' }}
                    </h5>
                    <small class="text-muted">Price</small>
                  </div>
                  <div class="text-end">
                    <div class="d-flex align-items-center">
                      <i class="ri-heart-line text-danger me-1"></i>
                      <span>{{ nft.likes || 0 }}</span>
                    </div>
                    <small class="text-muted">Likes</small>
                  </div>
                </div>
                <div class="mt-3">
                  <div class="d-flex align-items-center">
                    <img :src="nft.creatorAvatar || 'https://via.placeholder.com/30'" alt="Creator" class="rounded-circle me-2" width="30" height="30">
                    <small class="text-truncate">{{ nft.creator || 'Unknown Creator' }}</small>
                  </div>
                </div>
              </BCardBody>
            </BCard>
          </BCol>
        </BRow>

        <BRow v-if="nfts.length === 0 && !loading">
          <BCol class="text-center py-5">
            <div class="empty-state">
              <i class="ri-image-line display-4 text-muted"></i>
              <h4 class="mt-3">No NFTs Found</h4>
              <p class="text-muted">Try adjusting your filters or search criteria</p>
              <BButton variant="primary" @click="resetFilter">Reset Filters</BButton>
            </div>
          </BCol>
        </BRow>

        <BRow v-if="nfts.length > 0">
          <BCol lg="12">
            <div class="text-center mt-4">
              <BButton
                  variant="primary"
                  @click="loadMore"
                  :disabled="loadingMore"
              >
                <span v-if="loadingMore">
                  <i class="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>
                  Loading...
                </span>
                <span v-else>Load More NFTs</span>
              </BButton>
            </div>
          </BCol>
        </BRow>
      </BCol>

      <BCol xxl="3">
        <BCard no-body>
          <BCardHeader class="d-flex align-items-center">
            <h6 class="card-title mb-0 flex-grow-1">Filter NFTs</h6>
          </BCardHeader>
          <BCardBody>
            <BRow>
              <BCol cols="8">
                <div>
                  <input
                      type="text"
                      class="form-control"
                      placeholder="Search NFTs..."
                      v-model="filter.search"
                  />
                </div>
              </BCol>
              <BCol cols="4" class="d-flex">
                <BButton
                    variant="danger"
                    class="me-2 flex-grow-1"
                    style="background-color: #cd0f45"
                    @click="resetFilter"
                >
                  Reset
                </BButton>
                <BButton
                    variant="primary"
                    class="flex-grow-1"
                    @click="updateFilter"
                >
                  Apply
                </BButton>
              </BCol>
            </BRow>

            <div class="mt-4">
              <h6 class="fs-14 mb-3">Price Range</h6>
              <div class="d-flex align-items-center mb-2">
                <input
                    type="number"
                    min="0"
                    placeholder="Min"
                    class="form-control me-2"
                    v-model="filter.priceLower"
                />
                <span class="mx-2">to</span>
                <input
                    type="number"
                    min="0"
                    placeholder="Max"
                    class="form-control ms-2"
                    v-model="filter.priceUpper"
                />
              </div>
              <div class="d-flex align-items-center">
                <input
                    type="range"
                    class="form-range me-2"
                    min="0"
                    max="10"
                    step="0.1"
                    v-model="priceRange[0]"
                    @input="updatePriceLower"
                />
                <input
                    type="range"
                    class="form-range ms-2"
                    min="0"
                    max="10"
                    step="0.1"
                    v-model="priceRange[1]"
                    @input="updatePriceUpper"
                />
              </div>
              <div class="d-flex justify-content-between mt-1">
                <small>{{ priceRange[0] }} ETH</small>
                <small>{{ priceRange[1] }} ETH</small>
              </div>
            </div>

            <div class="mt-4">
              <h6 class="fs-14 mb-3">Categories</h6>
              <div class="form-check mb-2">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="artCategory"
                    value="art"
                    v-model="filter.categories"
                />
                <label class="form-check-label" for="artCategory">Art</label>
              </div>
              <div class="form-check mb-2">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="collectiblesCategory"
                    value="collectibles"
                    v-model="filter.categories"
                />
                <label class="form-check-label" for="collectiblesCategory">Collectibles</label>
              </div>
              <div class="form-check mb-2">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="photographyCategory"
                    value="photography"
                    v-model="filter.categories"
                />
                <label class="form-check-label" for="photographyCategory">Photography</label>
              </div>
              <div class="form-check mb-2">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="musicCategory"
                    value="music"
                    v-model="filter.categories"
                />
                <label class="form-check-label" for="musicCategory">Music</label>
              </div>
            </div>

            <div class="mt-4">
              <h6 class="fs-14 mb-3">Sort By</h6>
              <select class="form-select" v-model="filter.sortBy">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            <div class="mt-4">
              <h6 class="fs-14 mb-3">Status</h6>
              <div class="form-check mb-2">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="buyNow"
                    value="buy-now"
                    v-model="filter.status"
                />
                <label class="form-check-label" for="buyNow">Buy Now</label>
              </div>
              <div class="form-check mb-2">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="onAuction"
                    value="on-auction"
                    v-model="filter.status"
                />
                <label class="form-check-label" for="onAuction">On Auction</label>
              </div>
              <div class="form-check mb-2">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="hasOffers"
                    value="has-offers"
                    v-model="filter.status"
                />
                <label class="form-check-label" for="hasOffers">Has Offers</label>
              </div>
            </div>
          </BCardBody>
        </BCard>

        <BCard no-body class="mt-4">
          <BCardHeader>
            <h6 class="mb-0">Top Creators</h6>
          </BCardHeader>
          <BCardBody>
            <div v-for="creator in topCreators" :key="creator.id" class="d-flex align-items-center mb-3">
              <img :src="creator.avatar" alt="creator" class="rounded-circle me-3" width="40" height="40">
              <div class="flex-grow-1">
                <h6 class="mb-0">{{ creator.name }}</h6>
                <small class="text-muted">{{ creator.sales }} sales</small>
              </div>
              <BButton variant="outline-primary" size="sm">Follow</BButton>
            </div>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
  </Layout>
</template>

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
      nfts: [],
      topCreators: [
        { id: 1, name: "Alexandra Smith", avatar: "https://via.placeholder.com/40", sales: 42 },
        { id: 2, name: "Johnny Depp", avatar: "https://via.placeholder.com/40", sales: 38 },
        { id: 3, name: "Emma Watson", avatar: "https://via.placeholder.com/40", sales: 35 },
        { id: 4, name: "Michael Jordan", avatar: "https://via.placeholder.com/40", sales: 28 },
        { id: 5, name: "Taylor Swift", avatar: "https://via.placeholder.com/40", sales: 25 }
      ],
      filter: {
        search: "",
        priceLower: null,
        priceUpper: null,
        categories: [],
        sortBy: "newest",
        status: []
      },
      priceRange: [0, 10],
      loading: true,
      loadingMore: false,
      currentPage: 1,
      totalPages: 1
    };
  },
  methods: {
    async fetchNfts(page = 1, filter = {}) {
      try {
        this.loading = page === 1;
        this.loadingMore = page > 1;

        const response = await NftService.getNfts({
          ...filter,
          page,
          perPage: 12
        });

        if (page === 1) {
          this.nfts = response.data;
        } else {
          this.nfts = [...this.nfts, ...response.data];
        }

        this.currentPage = page;
        this.totalPages = response.totalPages || 1;
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        this.$notify({
          title: 'Error',
          text: 'Failed to load NFTs. Please try again.',
          type: 'error'
        });
      } finally {
        this.loading = false;
        this.loadingMore = false;
      }
    },
    resetFilter() {
      this.filter = {
        search: "",
        priceLower: null,
        priceUpper: null,
        categories: [],
        sortBy: "newest",
        status: []
      };
      this.priceRange = [0, 10];
      this.fetchNfts(1, {});
    },
    async updateFilter() {
      const filterParams = {
        search: this.filter.search,
        priceLower: this.filter.priceLower || this.priceRange[0],
        priceUpper: this.filter.priceUpper || this.priceRange[1],
        categories: this.filter.categories.join(','),
        sortBy: this.filter.sortBy,
        status: this.filter.status.join(',')
      };
      this.fetchNfts(1, filterParams);
    },
    applyCategoryFilter(category) {
      if (category === 'all') {
        this.filter.categories = [];
      } else {
        this.filter.categories = [category];
      }
      this.updateFilter();
    },
    loadMore() {
      if (this.currentPage < this.totalPages) {
        const filterParams = {
          search: this.filter.search,
          priceLower: this.filter.priceLower,
          priceUpper: this.filter.priceUpper,
          categories: this.filter.categories.join(','),
          sortBy: this.filter.sortBy,
          status: this.filter.status.join(',')
        };
        this.fetchNfts(this.currentPage + 1, filterParams);
      }
    },
    viewNFT(id) {
      this.$router.push({ name: 'nft-detail', params: { id } });
    },
    updatePriceLower() {
      this.filter.priceLower = this.priceRange[0];
    },
    updatePriceUpper() {
      this.filter.priceUpper = this.priceRange[1];
    }
  },
  async mounted() {
    await this.fetchNfts(1, {});
  }
};
</script>

<style scoped>
.explore-box {
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
}

.explore-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.explore-img {
  transition: transform 0.5s;
}

.explore-box:hover .explore-img {
  transform: scale(1.05);
}

.discount-time {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.explore-box:hover .hover-overlay {
  opacity: 1;
}

.view-btn {
  padding: 8px 20px;
  border-radius: 30px;
  font-weight: 500;
}

.empty-state {
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.text-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.filter-btns .nav-link.active {
  color: #405189;
  position: relative;
}

.filter-btns .nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #405189;
}

.form-range::-webkit-slider-thumb {
  background: #405189;
}

.form-range::-moz-range-thumb {
  background: #405189;
}

.form-range::-ms-thumb {
  background: #405189;
}

@media (max-width: 768px) {
  .filter-btns {
    flex-wrap: wrap;
  }

  .filter-btns .nav-item {
    margin-bottom: 5px;
  }
}
</style>