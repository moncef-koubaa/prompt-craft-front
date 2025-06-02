<script>
import PageHeader from "@/components/page-header";
import simplebar from "simplebar-vue";
import Layout from "@/layouts/main.vue";
import BidsService from "@/services/bids.service";
import AuctionService from "@/services/auction.service";

export default {
  components: {
    PageHeader,
    simplebar,
    Layout,
  },
  data() {
    return {
      auctionId: 0,
      auction: null,
      isOwner: false,
      currentBid: 0,
      nextBid: 0,
      bidIncrement: 0.1,
      showBidModal: false,
      bidAmount: "",
      timeLeft: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      showDetails: false,
      isPlacingBid: false,
      bidSuccess: false,
      watchCount: 0,
      isWatching: false,
      likeCount: 0,
      isLiked: false,
      tabs: [
        { label: "Bid History", value: "history" },
        { label: "Details", value: "details" },
        { label: "Activity", value: "activity" },
      ],
      activeTab: "history",
      bids: [],
      bidderInterval: null,
      timerInterval: null,
      auctionEnded: false,
      errorMessage: "",
    };
  },
  async mounted() {
    this.auctionId = this.$route.params.auctionId;
    console.log("Auction ID:", this.auctionId);
    this.auction = await AuctionService.getAuctionById(this.auctionId);
    this.auction = this.auction.getAuction;
    this.currentBid = this.auction.maxBidAmount;
    this.bids = this.auction.bids;
    console.log("Auction Data:", this.auction);
    this.initializeTimer(this.auction.endTime);
    try {
      const token = localStorage.getItem("token");
      await BidsService.connectToRoom(this.auctionId, token);
      console.log("Connected to auction room:", this.auctionId);
      const joined = await BidsService.isParticipant(this.auctionId);
      console.log("Is Participant:", joined.data);
      if (!joined.data) {
        const joinResponse = await BidsService.joinAuction(this.auctionId);
        console.log("Join Response:", joinResponse);
        console.log(`Joined auction ${this.auctionId} successfully`);
      }

      BidsService.on("newBid", this.handleNewBid);
      BidsService.on("auctionEnded", this.handleAuctionEnded);
      BidsService.on("error", this.handleSocketError);
    } catch (error) {
      this.errorMessage = "Failed to initialize auction";
      console.error(error);
    }
  },
  beforeUnmount() {
    clearInterval(this.bidderInterval);
    clearInterval(this.timerInterval);
    BidsService.disconnect();
    BidsService.off("newBid", this.handleNewBid);
    BidsService.off("auctionEnded", this.handleAuctionEnded);
    BidsService.off("error", this.handleSocketError);
  },
  methods: {
    initializeTimer(endTime) {
      const endDate = new Date(endTime).getTime();

      this.timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance <= 0) {
          clearInterval(this.timerInterval);
          this.auctionEnded = true;
          return;
        }

        this.timeLeft = {
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        };
      }, 1000);
    },

    startTimers() {
      // Optional: Remove this in production
      this.bidderInterval = setInterval(() => {
        if (Math.random() < 0.1 && !this.auctionEnded) {
          const randomIncrement =
            Math.random() < 0.7 ? this.bidIncrement : this.bidIncrement * 2;
          const newBid = parseFloat(
            (this.currentBid + randomIncrement).toFixed(2)
          );
          this.currentBid = newBid;
          this.nextBid = parseFloat((newBid + this.bidIncrement).toFixed(2));
        }
      }, 15000);
    },

    handleNewBid(bid) {
      console.log("New bid received:", bid);
      this.currentBid = bid.amount;

      this.bids = [bid, ...this.bids];

      this.bidSuccess = true;
      setTimeout(() => (this.bidSuccess = false), 3000);
    },

    handleAuctionEnded(data) {
      this.auctionEnded = true;
      clearInterval(this.timerInterval);
      this.errorMessage = `Auction ended! Winner: ${data.winnerId}`;
    },

    handleSocketError(error) {
      this.errorMessage = error.message || "Connection error";
    },

    async confirmBid() {
      if (!this.bidAmount || this.bidAmount <= this.currentBid) {
        this.errorMessage = "Bid must be higher than current bid";
        return;
      }

      this.isPlacingBid = true;
      this.errorMessage = "";

      try {
        BidsService.socket.emit("placeBid", {
          auctionId: this.auctionId,
          amount: parseFloat(this.bidAmount),
        });

        this.showBidModal = false;
        this.bidSuccess = true;
        setTimeout(() => (this.bidSuccess = false), 3000);
      } catch (error) {
        this.errorMessage = "Failed to place bid";
        console.error(error);
      } finally {
        this.isPlacingBid = false;
      }
    },
    replaceTime(date) {
      date = new Date(date);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    },
    replaceDate(date) {
      date = new Date(date);
      const day = date.getUTCDate();
      const month = date.toLocaleString("en-US", {
        month: "long",
      });
      const year = date.getUTCFullYear();
      return `${day} ${month} ${year}`;
    },

    openBidModal() {
      this.bidAmount = parseFloat(
        (this.currentBid + this.bidIncrement).toFixed(2)
      );
      this.showBidModal = true;
      this.errorMessage = "";
    },

    handlePresetBid(amount) {
      this.bidAmount = amount;
      this.confirmBid();
    },

    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
  },
};
</script>

<style scoped>
/* Additional styles can be added here if needed */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 500px;
  opacity: 1;
  overflow: hidden;
}
.more-details-btn {
  margin-bottom: 1rem;
  cursor: pointer;
  color: gray;
  font-weight: bold;
  background: none;
  border: none;
}
</style>

<template>
  <Layout>
    <PageHeader title="Item Details" pageTitle="NFT Marketplace" />
    <BCard no-body>
      <BCardBody>
        <BRow class="g-4">
          <BCol lg="5">
            <div class="sticky-side-div">
              <BCard no-body class="ribbon-box border shadow-none right">
                <div class="ribbon-two ribbon-two-danger">
                  <span><i class="ri-fire-fill align-bottom"></i> Hot</span>
                </div>
                <img
                  :src="this.auction?.nft.imageUrl"
                  alt=""
                  class="img-fluid rounded"
                />
                <div class="position-absolute bottom-0 p-3">
                  <div
                    class="position-absolute top-0 end-0 start-0 bottom-0 bg-white opacity-25"
                  ></div>
                </div>
              </BCard>
            </div>
          </BCol>
          <BCol lg="7">
            <div>
              <BDropdown
                class="float-end"
                variant="button"
                toggle-class="btn btn-ghost-primary btn-icon arrow-none"
                size="sm"
                no-caret
              >
                <template #button-content>
                  <i class="ri-more-fill align-middle fs-16"></i>
                </template>
                <BDropdownItem
                  ><i class="ri-eye-fill align-bottom me-2 text-muted"></i
                  >View</BDropdownItem
                >
                <BDropdownItem
                  ><i class="ri-pencil-fill align-bottom me-2 text-muted"></i>
                  Edit
                </BDropdownItem>
                <BDropdownItem
                  ><i
                    class="ri-delete-bin-fill align-bottom me-2 text-muted"
                  ></i>
                  Delete
                </BDropdownItem>
              </BDropdown>

              <BBadge
                variant="danger-subtle"
                class="bg-danger-subtle text-danger mb-3 fs-12"
                ><i class="ri-eye-line me-1 align-bottom"></i> 8,634 watching
                this</BBadge
              >
              <h4>{{ this.auction?.nft.title }}</h4>
              <div class="hstack gap-3 flex-wrap">
                <div class="text-muted">
                  Creator :
                  <router-link to="#" class="text-primary fw-medium">{{
                    this.auction?.nft.creator.username
                  }}</router-link>
                </div>
                <div class="vr"></div>
                <div class="text-muted">
                  Seller :
                  <span class="text-body fw-medium">{{
                    this.auction?.nft.owner.username
                  }}</span>
                </div>
                <div class="vr"></div>
                <div class="text-muted">
                  Published :
                  <span class="text-body fw-medium">{{
                    replaceDate(this.auction?.createdAt)
                  }}</span>
                </div>
              </div>
              <div class="d-flex flex-wrap gap-2 align-items-center mt-3">
                <div class="text-muted fs-16">
                  <span class="mdi mdi-star text-warning"></span>
                  <span class="mdi mdi-star text-warning"></span>
                  <span class="mdi mdi-star text-warning"></span>
                  <span class="mdi mdi-star text-warning"></span>
                  <span class="mdi mdi-star text-warning"></span>
                </div>
                <div class="text-muted">( 5.50k Customer Review )</div>
              </div>

              <BButton @click="toggleDetails" class="more-details-btn">
                {{ showDetails ? "Hide details" : "More details" }}
              </BButton>
              <transition name="slide-fade">
                <div v-show="showDetails" class="details-section">
                  <BRow class="mt-4">
                    <BCol lg="3" sm="6">
                      <div class="p-2 border border-dashed rounded text-center">
                        <div>
                          <p class="text-muted fw-medium mb-1">Price :</p>
                          <h5 class="fs-17 text-success mb-0">
                            <i class="mdi mdi-ethereum me-1"></i> 83.06 ETH
                          </h5>
                        </div>
                      </div>
                    </BCol>
                    <BCol lg="3" sm="6">
                      <div class="p-2 border border-dashed rounded text-center">
                        <div>
                          <p class="text-muted fw-medium mb-1">Highest bid</p>
                          <h5 class="fs-17 mb-0">104.63 ETH</h5>
                        </div>
                      </div>
                    </BCol>
                    <BCol lg="3" sm="6">
                      <div class="p-2 border border-dashed rounded text-center">
                        <div>
                          <p class="text-muted fw-medium mb-1">Stock</p>
                          <h5 class="fs-17 mb-0">12/58 Sale</h5>
                        </div>
                      </div>
                    </BCol>
                    <BCol lg="3" sm="6">
                      <div class="p-2 border border-dashed rounded text-center">
                        <div>
                          <p class="text-muted fw-medium mb-1">Auction Ends:</p>
                          <h5 id="auction-time-1" class="mb-0"></h5>
                        </div>
                      </div>
                    </BCol>
                  </BRow>
                  <div class="mt-4 text-muted">
                    <h5 class="fs-14">Description :</h5>
                    <p>
                      Cultural patterns are the similar behaviors within similar
                      situations we witness due to shared beliefs, values, norms
                      and social practices that are steady over time. In art, a
                      pattern is a repetition of specific visual elements. The
                      dictionary.com definition of "pattern" is: an arrangement
                      of repeated or corresponding parts, decorative motifs,
                      etc.
                    </p>
                  </div>
                  <div class="product-content mt-5">
                    <h5 class="fs-14 mb-3">Product Description :</h5>
                    <nav></nav>
                    <BTabs nav-class="nav-tabs nav-tabs-custom nav-success">
                      <BTab
                        title="Place Bids"
                        class="nav-item border border-top-0 p-4"
                      >
                        <div class="table-responsive">
                          <table class="table align-middle table-nowrap mb-0">
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="@/assets/images/nft/img-01.jpg"
                                      alt=""
                                      class="avatar-xs rounded object-fit-cover"
                                    />
                                    <router-link
                                      to="/apps/nft-item-detail"
                                      class="text-body"
                                    >
                                      <span class="mb-0 ms-2"
                                        >Brave Tigers NFT</span
                                      >
                                    </router-link>
                                  </div>
                                </th>
                                <td>0.235 ETH</td>
                                <td>
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="@/assets/images/users/avatar-1.jpg"
                                      alt=""
                                      class="avatar-xs rounded object-fit-cover"
                                    />
                                    <div class="ms-2">
                                      <BLink href="#!">
                                        <h6 class="mb-1">Alexis Clarke</h6>
                                      </BLink>
                                      <p class="text-muted mb-0">Creators</p>
                                    </div>
                                  </div>
                                </td>
                                <td>29 min ago</td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="@/assets/images/nft/img-03.jpg"
                                      alt=""
                                      class="avatar-xs rounded object-fit-cover"
                                    />
                                    <router-link
                                      to="/apps/nft-item-detail"
                                      class="text-body"
                                    >
                                      <span class="mb-0 ms-2"
                                        >Creative filtered portrait</span
                                      >
                                    </router-link>
                                  </div>
                                </th>
                                <td>571.24 ETH</td>
                                <td>
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="@/assets/images/users/avatar-3.jpg"
                                      alt=""
                                      class="avatar-xs rounded object-fit-cover"
                                    />
                                    <div class="ms-2">
                                      <BLink href="#!">
                                        <h6 class="mb-1">Glen Matney</h6>
                                      </BLink>
                                      <p class="text-muted mb-0">Creators</p>
                                    </div>
                                  </div>
                                </td>
                                <td>37 min ago</td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="https://img.themesbrand.com/velzon/images/img-4.gif"
                                      alt=""
                                      class="avatar-xs rounded object-fit-cover"
                                    />
                                    <router-link
                                      to="/apps/nft-item-detail"
                                      class="text-body"
                                    >
                                      <span class="mb-0 ms-2"
                                        >Evolved Reality</span
                                      >
                                    </router-link>
                                  </div>
                                </th>
                                <td>130.39 ETH</td>
                                <td>
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="@/assets/images/users/avatar-5.jpg"
                                      alt=""
                                      class="avatar-xs rounded object-fit-cover"
                                    />
                                    <div class="ms-2">
                                      <BLink href="#!">
                                        <h6 class="mb-1">Herbert Stokes</h6>
                                      </BLink>
                                      <p class="text-muted mb-0">Creators</p>
                                    </div>
                                  </div>
                                </td>
                                <td>1 hrs ago</td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="@/assets/images/nft/img-06.jpg"
                                      alt=""
                                      class="avatar-xs rounded object-fit-cover"
                                    />
                                    <router-link
                                      to="/apps/nft-item-detail"
                                      class="text-body"
                                    >
                                      <span class="mb-0 ms-2"
                                        >Robotic Body Art</span
                                      >
                                    </router-link>
                                  </div>
                                </th>
                                <td>81.72 ETH</td>
                                <td>
                                  <div class="d-flex align-items-center">
                                    <img
                                      src="@/assets/images/users/avatar-8.jpg"
                                      alt=""
                                      class="avatar-xs rounded object-fit-cover"
                                    />
                                    <div class="ms-2">
                                      <BLink href="#!">
                                        <h6 class="mb-1">Michael Morris</h6>
                                      </BLink>
                                      <p class="text-muted mb-0">Creators</p>
                                    </div>
                                  </div>
                                </td>
                                <td>1 hrs ago</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </BTab>
                      <BTab
                        title="Additional Information"
                        class="nav-item border border-top-0 p-4"
                      >
                        <div class="table-responsive">
                          <table class="table mb-0">
                            <tbody>
                              <tr>
                                <th scope="row" style="width: 200px">Size</th>
                                <td>650 x 650px (66.8 KB)</td>
                              </tr>
                              <tr>
                                <th scope="row">Brand</th>
                                <td>Patterns arts & culture</td>
                              </tr>
                              <tr>
                                <th scope="row">Formats</th>
                                <td>JPEG / PNG / PDF</td>
                              </tr>
                              <tr>
                                <th scope="row">Token</th>
                                <td>VLZ74516523</td>
                              </tr>
                              <tr>
                                <th scope="row">Blockchain</th>
                                <td>Ethereum</td>
                              </tr>
                              <tr>
                                <th scope="row">Contacts</th>
                                <td>E545D145S5646544DS541SFDB213C5Z</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </BTab>
                      <BTab
                        title="Details"
                        class="nav-item border border-top-0 p-4"
                      >
                        <div>
                          <h5 class="font-size-16 mb-3">
                            Patterns arts & culture
                          </h5>
                          <p>
                            Cultural patterns are the similar behaviors within
                            similar situations we witness due to shared beliefs,
                            values, norms and social practices that are steady
                            over time. In art, a pattern is a repetition of
                            specific visual elements. The dictionary.com
                            definition of "pattern" is: an arrangement of
                            repeated or corresponding parts, decorative motifs,
                            etc.
                          </p>
                          <div>
                            <p class="mb-2">
                              <i
                                class="mdi mdi-circle-medium me-1 text-muted align-middle"
                              ></i>
                              On digital or printed media
                            </p>
                            <p class="mb-2">
                              <i
                                class="mdi mdi-circle-medium me-1 text-muted align-middle"
                              ></i>
                              For commercial and personal projects
                            </p>
                            <p class="mb-2">
                              <i
                                class="mdi mdi-circle-medium me-1 text-muted align-middle"
                              ></i>
                              From anywhere in the world
                            </p>
                            <p class="mb-0">
                              <i
                                class="mdi mdi-circle-medium me-1 text-muted align-middle"
                              ></i>
                              Full copyrights sale
                            </p>
                          </div>
                        </div>
                      </BTab>
                    </BTabs>
                  </div>
                  <div class="mt-5">
                    <div>
                      <h5 class="fs-14 mb-3">Ratings & Reviews</h5>
                    </div>
                    <BRow class="gy-4 gx-0">
                      <BCol lg="4">
                        <div>
                          <div class="pb-3">
                            <div class="bg-light px-3 py-2 rounded-2 mb-2">
                              <div class="d-flex align-items-center">
                                <div class="flex-grow-1">
                                  <div class="fs-16 align-middle text-warning">
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-fill"></i>
                                    <i class="ri-star-half-fill"></i>
                                  </div>
                                </div>
                                <div class="flex-shrink-0">
                                  <h6 class="mb-0">4.8 out of 5</h6>
                                </div>
                              </div>
                            </div>
                            <div class="text-center">
                              <div class="text-muted">
                                Total <span class="fw-medium">7.32k</span>
                                reviews
                              </div>
                            </div>
                          </div>

                          <div class="mt-3">
                            <BRow class="align-items-center g-2">
                              <div class="col-auto">
                                <div class="p-2">
                                  <h6 class="mb-0">5 star</h6>
                                </div>
                              </div>
                              <BCol>
                                <div class="p-2">
                                  <BProgress
                                    variant="success"
                                    class="animated-progess progress-sm"
                                    :value="50.16"
                                  />
                                </div>
                              </BCol>
                              <div class="col-auto">
                                <div class="p-2">
                                  <h6 class="mb-0 text-muted">2758</h6>
                                </div>
                              </div>
                            </BRow>

                            <BRow class="align-items-center g-2">
                              <div class="col-auto">
                                <div class="p-2">
                                  <h6 class="mb-0">4 star</h6>
                                </div>
                              </div>
                              <BCol>
                                <div class="p-2">
                                  <BProgress
                                    variant="success"
                                    class="animated-progess progress-sm"
                                    :value="19.32"
                                  />
                                </div>
                              </BCol>
                              <div class="col-auto">
                                <div class="p-2">
                                  <h6 class="mb-0 text-muted">1063</h6>
                                </div>
                              </div>
                            </BRow>

                            <BRow class="align-items-center g-2">
                              <div class="col-auto">
                                <div class="p-2">
                                  <h6 class="mb-0">3 star</h6>
                                </div>
                              </div>
                              <BCol>
                                <div class="p-2">
                                  <BProgress
                                    variant="success"
                                    class="animated-progess progress-sm"
                                    :value="18.12"
                                  />
                                </div>
                              </BCol>
                              <div class="col-auto">
                                <div class="p-2">
                                  <h6 class="mb-0 text-muted">997</h6>
                                </div>
                              </div>
                            </BRow>

                            <BRow class="align-items-center g-2">
                              <div class="col-auto">
                                <div class="p-2">
                                  <h6 class="mb-0">2 star</h6>
                                </div>
                              </div>
                              <BCol>
                                <div class="p-2">
                                  <BProgress
                                    variant="warning"
                                    class="animated-progess progress-sm"
                                    :value="7.42"
                                  />
                                </div>
                              </BCol>

                              <div class="col-auto">
                                <div class="p-2">
                                  <h6 class="mb-0 text-muted">408</h6>
                                </div>
                              </div>
                            </BRow>

                            <BRow class="align-items-center g-2">
                              <div class="col-auto">
                                <div class="p-2">
                                  <h6 class="mb-0">1 star</h6>
                                </div>
                              </div>
                              <BCol>
                                <div class="p-2">
                                  <BProgress
                                    variant="danger"
                                    class="animated-progess progress-sm"
                                    :value="4.98"
                                  />
                                </div>
                              </BCol>
                              <div class="col-auto">
                                <div class="p-2">
                                  <h6 class="mb-0 text-muted">274</h6>
                                </div>
                              </div>
                            </BRow>
                          </div>
                        </div>
                      </BCol>

                      <BCol lg="8">
                        <div class="ps-lg-4">
                          <div class="d-flex flex-wrap align-items-start gap-3">
                            <h5 class="fs-14">Reviews:</h5>
                          </div>

                          <simplebar
                            class="me-lg-n3 pe-lg-4"
                            data-simplebar
                            style="max-height: 225px"
                          >
                            <ul class="list-unstyled mb-0">
                              <li class="py-2">
                                <div class="border border-dashed rounded p-3">
                                  <div class="d-flex align-items-start mb-3">
                                    <div class="hstack gap-3">
                                      <BBadge
                                        variant="success"
                                        tag="div"
                                        pill
                                        class="mb-0"
                                      >
                                        <i class="mdi mdi-star"></i> 4.2
                                      </BBadge>
                                      <div class="vr"></div>
                                      <div class="flex-grow-1">
                                        <p class="text-muted mb-0">
                                          Superb sweatshirt. I loved it. It is
                                          for winter.
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="d-flex flex-grow-1 gap-2 mb-3">
                                    <router-link to="#" class="d-block">
                                      <img
                                        src="@/assets/images/small/img-12.jpg"
                                        alt=""
                                        class="avatar-sm rounded object-fit-cover"
                                      />
                                    </router-link>
                                    <router-link to="#" class="d-block">
                                      <img
                                        src="@/assets/images/small/img-11.jpg"
                                        alt=""
                                        class="avatar-sm rounded object-fit-cover"
                                      />
                                    </router-link>
                                    <router-link to="#" class="d-block">
                                      <img
                                        src="@/assets/images/small/img-10.jpg"
                                        alt=""
                                        class="avatar-sm rounded object-fit-cover"
                                      />
                                    </router-link>
                                  </div>

                                  <div class="d-flex align-items-end">
                                    <div class="flex-grow-1">
                                      <h5 class="fs-14 mb-0">Henry</h5>
                                    </div>

                                    <div class="flex-shrink-0">
                                      <p class="text-muted fs-13 mb-0">
                                        12 Jul, 21
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li class="py-2">
                                <div class="border border-dashed rounded p-3">
                                  <div class="d-flex align-items-start mb-3">
                                    <div class="hstack gap-3">
                                      <BBadge
                                        variant="success"
                                        tag="div"
                                        pill
                                        class="mb-0"
                                      >
                                        <i class="mdi mdi-star"></i> 4.0
                                      </BBadge>
                                      <div class="vr"></div>
                                      <div class="flex-grow-1">
                                        <p class="text-muted mb-0">
                                          Great at this price, Product quality
                                          and look is awesome.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="d-flex align-items-end">
                                    <div class="flex-grow-1">
                                      <h5 class="fs-14 mb-0">Nancy</h5>
                                    </div>

                                    <div class="flex-shrink-0">
                                      <p class="text-muted fs-13 mb-0">
                                        06 Jul, 21
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li class="py-2">
                                <div class="border border-dashed rounded p-3">
                                  <div class="d-flex align-items-start mb-3">
                                    <div class="hstack gap-3">
                                      <BBadge
                                        variant="success"
                                        tag="div"
                                        pill
                                        class="mb-0"
                                      >
                                        <i class="mdi mdi-star"></i> 4.2
                                      </BBadge>
                                      <div class="vr"></div>
                                      <div class="flex-grow-1">
                                        <p class="text-muted mb-0">
                                          Good product. I am so happy.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="d-flex align-items-end">
                                    <div class="flex-grow-1">
                                      <h5 class="fs-14 mb-0">Joseph</h5>
                                    </div>

                                    <div class="flex-shrink-0">
                                      <p class="text-muted fs-13 mb-0">
                                        06 Jul, 21
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li class="py-2">
                                <div class="border border-dashed rounded p-3">
                                  <div class="d-flex align-items-start mb-3">
                                    <div class="hstack gap-3">
                                      <BBadge
                                        variant="success"
                                        tag="div"
                                        pill
                                        class="mb-0"
                                      >
                                        <i class="mdi mdi-star"></i> 4.1
                                      </BBadge>
                                      <div class="vr"></div>
                                      <div class="flex-grow-1">
                                        <p class="text-muted mb-0">
                                          Nice Product, Good Quality.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="d-flex align-items-end">
                                    <div class="flex-grow-1">
                                      <h5 class="fs-14 mb-0">Jimmy</h5>
                                    </div>

                                    <div class="flex-shrink-0">
                                      <p class="text-muted fs-13 mb-0">
                                        24 Jun, 21
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </simplebar>
                        </div>
                      </BCol>
                    </BRow>
                  </div>
                </div>
              </transition>

              <!-- Bidding Section -->
              <div class="bg-gray-100 rounded-xl p-6 space-y-4">
                <div class="flex justify-between items-center">
                  <div>
                    <h3 class="text-lg font-medium">Auction Ends In</h3>
                    <div class="flex items-center space-x-2 mt-1">
                      <span class="text-red-500">⏱</span>
                      <div class="flex items-center">
                        <div
                          class="bg-black text-white dark:bg-gray-900 rounded-md px-2 py-1 font-mono font-bold"
                        >
                          {{ String(timeLeft.hours).padStart(2, "0") }}
                        </div>
                        <span class="mx-1 text-lg font-bold">:</span>
                        <div
                          class="bg-black text-white dark:bg-gray-900 rounded-md px-2 py-1 font-mono font-bold"
                        >
                          {{ String(timeLeft.minutes).padStart(2, "0") }}
                        </div>
                        <span class="mx-1 text-lg font-bold">:</span>
                        <div
                          class="bg-black text-white dark:bg-gray-900 rounded-md px-2 py-1 font-mono font-bold"
                        >
                          {{ String(timeLeft.seconds).padStart(2, "0") }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center space-x-2">
                    <span class="text-amber-500">👤</span>
                    <span class="text-sm font-medium">24 active bidders</span>
                  </div>
                </div>

                <div>
                  <h3
                    class="text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Current Bid
                  </h3>
                  <div class="flex items-baseline">
                    <span class="text-4xl font-bold"
                      >{{ this.currentBid }} ETH</span
                    >
                    <span class="ml-2 text-sm text-gray-500 dark:text-gray-400"
                      >≈ ${{ (currentBid * 3450).toLocaleString() }}</span
                    >
                  </div>
                </div>

                <!-- Success Message -->
                <transition
                  enter-active-class="transition duration-300 ease-out"
                  enter-from-class="transform opacity-0 translate-y-2"
                  enter-to-class="transform opacity-100 translate-y-0"
                  leave-active-class="transition duration-200 ease-in"
                  leave-from-class="transform opacity-100"
                  leave-to-class="transform opacity-0"
                >
                  <div
                    v-if="bidSuccess"
                    class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-2 rounded-md text-sm"
                  >
                    Your bid has been placed successfully!
                  </div>
                </transition>

                <!-- Bid Increment Buttons -->
                <div class="grid grid-cols-3 gap-3" v-if="!this.isOwner">
                  <button
                    class="inline-flex items-center justify-center rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 h-12"
                    @click="
                      handlePresetBid(parseFloat((currentBid + 1).toFixed(2)))
                    "
                  >
                    +1 ETH
                  </button>
                  <button
                    class="inline-flex items-center justify-center rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 h-12"
                    @click="
                      handlePresetBid(parseFloat((currentBid + 2).toFixed(2)))
                    "
                  >
                    +2 ETH
                  </button>
                  <button
                    class="inline-flex items-center justify-center rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 h-12"
                    @click="
                      handlePresetBid(parseFloat((currentBid + 5).toFixed(2)))
                    "
                  >
                    +5 ETH
                  </button>
                </div>

                <!-- Main Bid Button -->
                <div class="relative">
                  <!-- <button-->
                  <!--                            class="w-full py-6 text-xl font-bold bg-amber-500 hover:bg-amber-600 text-white h-14 rounded-md transition-transform hover:scale-[1.02] active:scale-[0.98]"-->
                  <!--                            @click="handlePlaceBid"-->
                  <!--                            :disabled="isPlacingBid"-->
                  <!--                        >-->
                  <!--                          <div v-if="isPlacingBid" class="flex items-center justify-center">-->
                  <!--                            <div class="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>-->
                  <!--                            Processing...-->
                  <!--                          </div>-->
                  <!--                          <template v-else>-->
                  <!--                            BID NOW: {{ nextBid }} ETH-->
                  <!--                          </template> -->
                  <BButton variant="primary" class="w-100" @click="openBidModal"
                    >Place Bid</BButton
                  >
                  <!--                        </button>-->

                  <transition
                    enter-active-class="transition duration-300 ease-out"
                    enter-from-class="transform opacity-0"
                    enter-to-class="transform opacity-100"
                    leave-active-class="transition duration-200 ease-in"
                    leave-from-class="transform opacity-100"
                    leave-to-class="transform opacity-0"
                  >
                    <div
                      v-if="!isPlacingBid"
                      class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 shadow-md"
                    >
                      BID NOW!
                    </div>
                  </transition>
                </div>
              </div>

              <!-- Tabs -->
              <div>
                <div class="flex border-b border-gray-200 dark:border-gray-700">
                  <button
                    v-for="tab in tabs"
                    :key="tab.value"
                    class="flex-1 px-4 py-2 text-center"
                    :class="[
                      activeTab === tab.value
                        ? 'border-b-2 border-primary font-medium text-primary'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                    ]"
                    @click="activeTab = tab.value"
                  >
                    {{ tab.label }}
                  </button>
                </div>

                <!-- Tab Content -->
                <div class="pt-4">
                  <!-- Bid History Tab -->
                  <div
                    v-if="activeTab === 'history'"
                    class="border rounded-lg p-4 shadow-sm"
                  >
                    <div class="space-y-4">
                      <div
                        v-for="bid in bids"
                        :key="bid.id"
                        class="flex items-center justify-between"
                      >
                        <div class="flex items-center gap-3">
                          <div
                            class="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center text-xs font-medium"
                          >
                            {{ bid.avatar }}
                          </div>
                          <div>
                            <div class="font-medium">
                              {{ bid.bidder.username }}
                            </div>
                            <div
                              class="text-xs text-gray-500 dark:text-gray-400"
                            >
                              {{ replaceTime(bid.createdAt) }}
                            </div>
                          </div>
                        </div>
                        <div class="font-bold">{{ bid.amount }} ETH</div>
                      </div>
                    </div>
                  </div>

                  <!-- Details Tab -->
                  <div
                    v-if="activeTab === 'details'"
                    class="border rounded-lg p-4 shadow-sm"
                  >
                    <div class="space-y-3">
                      <div class="flex justify-between">
                        <span class="text-gray-500 dark:text-gray-400"
                          >Contract Address</span
                        >
                        <span class="font-mono text-sm">0x7a23...45e9</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-500 dark:text-gray-400"
                          >Token ID</span
                        >
                        <span>1342</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-500 dark:text-gray-400"
                          >Token Standard</span
                        >
                        <span>ERC-721</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-500 dark:text-gray-400"
                          >Blockchain</span
                        >
                        <span>Ethereum</span>
                      </div>
                    </div>
                  </div>

                  <!-- Activity Tab -->
                  <div
                    v-if="activeTab === 'activity'"
                    class="border rounded-lg p-4 shadow-sm"
                  >
                    <div class="space-y-4">
                      <div class="flex items-start gap-3">
                        <div
                          class="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-4 w-4 text-purple-500"
                          >
                            <path d="M3 3v5h5" />
                            <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
                          </svg>
                        </div>
                        <div>
                          <div class="font-medium">
                            Listed by
                            <span class="text-purple-500">Rickey Teran</span>
                          </div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">
                            29 April, 2022 at 12:34 PM
                          </div>
                        </div>
                      </div>
                      <div class="flex items-start gap-3">
                        <div
                          class="bg-green-100 dark:bg-green-900/30 p-2 rounded-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-4 w-4 text-green-500"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </svg>
                        </div>
                        <div>
                          <div class="font-medium">
                            Created by
                            <span class="text-purple-500">Nancy Martino</span>
                          </div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">
                            28 April, 2022 at 09:23 AM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div
                  v-if="this.showBidModal"
                  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                >
                  <transition
                    enter-active-class="transition duration-300 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-200 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <div
                      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative"
                    >
                      <!-- Close button -->
                      <button
                        @click="showBidModal = false"
                        class="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </button>

                      <div class="text-center mb-6">
                        <h2 class="text-2xl font-bold">Place Your Bid</h2>
                        <p class="text-gray-500 dark:text-gray-400 mt-1">
                          You're about to place a bid on Patterns Arts & Culture
                        </p>
                      </div>

                      <div class="space-y-4">
                        <!-- Current Bid Info -->
                        <div class="bg-gray-100 p-3 rounded-lg">
                          <div class="flex justify-between items-center">
                            <span class="text-gray-500 dark:text-gray-400"
                              >Current Bid</span
                            >
                            <span class="font-bold">{{ currentBid }} ETH</span>
                          </div>
                          <div class="flex justify-between items-center mt-1">
                            <span class="dark:text-gray-400">Minimum Bid</span>
                            <span class="font-medium"
                              >{{
                                parseFloat((currentBid + 0.01).toFixed(2))
                              }}
                              ETH</span
                            >
                          </div>
                        </div>

                        <!-- Bid Amount Input -->
                        <div>
                          <label
                            for="bidAmount"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Your Bid Amount
                          </label>
                          <div class="relative">
                            <input
                              id="bidAmount"
                              v-model="bidAmount"
                              type="number"
                              step="0.01"
                              :min="currentBid + 0.01"
                              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 pr-16"
                              placeholder="Enter amount"
                            />
                            <div
                              class="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-gray-500"
                            >
                              ETH
                            </div>
                          </div>
                          <p class="text-sm text-gray-500 mt-1">
                            ≈ ${{
                              bidAmount
                                ? (bidAmount * 3450).toLocaleString()
                                : "0"
                            }}
                          </p>
                        </div>

                        <!-- Gas Fee -->
                        <div class="flex justify-between items-center text-sm">
                          <span class="text-gray-500 dark:text-gray-400"
                            >Estimated Gas Fee</span
                          >
                          <span>0.005 ETH</span>
                        </div>

                        <!-- Service Fee -->
                        <div class="flex justify-between items-center text-sm">
                          <span class="text-gray-500 dark:text-gray-400"
                            >Service Fee (2.5%)</span
                          >
                          <span
                            >{{
                              bidAmount ? (bidAmount * 0.025).toFixed(3) : "0"
                            }}
                            ETH</span
                          >
                        </div>

                        <hr class="border-gray-200" />

                        <!-- Total -->
                        <div
                          class="flex justify-between items-center font-medium"
                        >
                          <span>You will pay</span>
                          <span
                            >{{
                              bidAmount
                                ? (
                                    parseFloat(bidAmount) +
                                    0.005 +
                                    parseFloat(bidAmount) * 0.025
                                  ).toFixed(3)
                                : "0"
                            }}
                            ETH</span
                          >
                        </div>

                        <!-- Wallet Balance -->
                        <div
                          class="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
                        >
                          <span class="text-gray-500 dark:text-gray-400"
                            >Your Wallet Balance</span
                          >
                          <span class="font-bold">5.243 ETH</span>
                        </div>

                        <!-- Bid Button -->
                        <button
                          @click="confirmBid"
                          :disabled="
                            !bidAmount ||
                            bidAmount <= currentBid ||
                            isPlacingBid
                          "
                          :class="[
                            'w-full py-3 text-white font-bold rounded-md transition-colors',
                            !bidAmount ||
                            bidAmount <= currentBid ||
                            isPlacingBid
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-rose-600 hover:bg-rose-700',
                          ]"
                        >
                          <div
                            v-if="isPlacingBid"
                            class="flex items-center justify-center"
                          >
                            <div
                              class="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"
                            ></div>
                            Processing...
                          </div>
                          <template v-else> Confirm Bid </template>
                        </button>

                        <!-- Terms -->
                        <p
                          class="text-xs text-gray-500 dark:text-gray-400 text-center"
                        >
                          By confirming this bid, you agree to the
                          <a href="#" class="text-rose-600 hover:underline"
                            >Terms of Service</a
                          >
                          and acknowledge this is a binding financial
                          transaction.
                        </p>
                      </div>
                    </div>
                  </transition>
                </div>
              </transition>
            </div>
          </BCol>
        </BRow>
      </BCardBody>
    </BCard>
  </Layout>
</template>
