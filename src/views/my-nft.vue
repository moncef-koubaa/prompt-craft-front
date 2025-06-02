<script>
import PageHeader from '@/components/page-header';
import Horizontal from '@/layouts/horizontal.vue';
import NftService from '@/services/nft.service';

export default {
  props: ['id'],
  data() {
    return {
      nft: null,
      loading: true,
      error: null,
    };
  },
  components: {
    PageHeader,
    Horizontal,
  },
  methods: {},
  async created() {
    try {
      const nftId = parseInt(this.id);
      this.nft = await NftService.getNft(nftId);
    } catch (err) {
      console.error('Error loading NFT:', err);
      this.error = 'Failed to load NFT.';
    } finally {
      this.loading = false;
    }
  },
};
</script>

<template>
  <Horizontal />
  <PageHeader title="Item Details" pageTitle="NFT Marketplace" />
  <div>
    <div v-if="loading">Loading NFT...</div>

    <div v-else-if="error">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <div v-else>
      <BCard no-body>
        <BCardBody>
          <BRow class="g-4">
            <BCol lg="5">
              <div class="sticky-side-div">
                <BCard no-body class="ribbon-box border shadow-none right">
                  <img
                    src="@/assets/images/nft/img-05.jpg"
                    alt=""
                    class="img-fluid rounded"
                  />
                </BCard>
                <div class="hstack gap-2">
                  <BButton variant="success" class="w-100">Place Bid</BButton>
                </div>
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
                <h1>{{ this.nft.name }}</h1>
                <div class="hstack gap-3 flex-wrap text-base">
                  <div class="text-muted">
                    Creator :
                    <router-link to="#" class="text-primary fw-medium">{{
                      this.nft.creator.username
                    }}</router-link>
                  </div>
                  <div class="vr"></div>
                  <div class="text-muted">
                    Owner :
                    <span class="text-body fw-mediu">{{
                      this.nft.owner.username
                    }}</span>
                  </div>
                  <div class="vr"></div>
                </div>
                <BBadge
                  variant="info-subtle"
                  class="bg-info-subtle text-info my-3 fs-12"
                >
                  <i class="ri-eye-line me-1 align-bottom text-base"></i>
                  <span class="text-base">8,634 Views</span>
                </BBadge>

                <BBadge
                  variant="danger-subtle"
                  class="bg-danger-subtle text-danger ms-3 my-3 fs-12"
                >
                  <i class="ri-heart-line me-1 align-bottom text-base"></i>
                  <span class="text-base">5,500 Likes</span>
                </BBadge>

                <div class="mt-4 text-muted">
                  <h5 class="fs-14">Description :</h5>
                  <p>
                    {{ this.nft.description }}
                  </p>
                </div>
                <div class="product-content mt-5">
                  <h3 class="mb-3">Product Description :</h3>
                  <BTabs
                    nav-class="nav-tabs nav-tabs-custom nav-success text-lg"
                  >
                    <BTab
                      title="Activity"
                      class="nav-item border border-top-0 p-3"
                    >
                      <div class="table-responsive">
                        <table class="table mb-0 text-base">
                          <thead>
                            <tr>
                              <th scope="col">Event</th>
                              <th scope="col">Price</th>
                              <th scope="col">From</th>
                              <th scope="col">To</th>
                              <th scope="col">Date</th>
                            </tr>
                          </thead>
                          <tbody class="text-base">
                            <tr>
                              <td>
                                <i
                                  class="ri-shopping-cart-2-line text-success me-2"
                                ></i>
                                Sale
                              </td>
                              <td>0.25 ETH</td>
                              <td>
                                <router-link to="#" class="text-primary"
                                  >Nancy Martino</router-link
                                >
                              </td>
                              <td>
                                <router-link to="#" class="text-primary"
                                  >Rickey Teran</router-link
                                >
                              </td>
                              <td>29 April, 2022</td>
                            </tr>

                            <tr
                              v-for="auction in nft.auctions"
                              :key="auction.id"
                            >
                              <td>
                                <i
                                  class="ri-auction-line text-success me-2"
                                ></i>
                                Auction Sale
                              </td>
                              <td>{{ auction.maxBidAmount }} SC</td>
                              <td>
                                <router-link
                                  :to="'/user/' + auction.owner.id"
                                  class="text-primary"
                                >
                                  {{ auction.owner.username }}
                                </router-link>
                              </td>
                              <td>
                                <router-link
                                  :to="'/user/' + auction.winner.id"
                                  class="text-primary"
                                >
                                  {{ auction.winner.username }}
                                </router-link>
                              </td>
                              <td>
                                {{ new Date(auction.endTime).toDateString() }}
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <i class="ri-leaf-line text-success me-2"></i>
                                Mint
                              </td>
                              <td>10 Sigma Tokens</td>
                              <td>
                                <router-link to="#" class="text-primary"
                                  >Null@</router-link
                                >
                              </td>
                              <td>
                                <router-link to="#" class="text-primary">{{
                                  this.nft.creator.username
                                }}</router-link>
                              </td>
                              <td>
                                {{ new Date(this.nft.mintedAt).toDateString() }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </BTab>

                    <BTab
                      title="Details"
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
                              <th scope="row">Token</th>
                              <td>VLZ74516523</td>
                            </tr>
                            <tr>
                              <th scope="row">Blockchain</th>
                              <td>Ethereum</td>
                            </tr>
                            <tr>
                              <th scope="row">Contract Address</th>
                              <td>E545D145S5646544DS541SFDB213C5Z</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </BTab>

                    <BTab
                      title="Description"
                      class="nav-item border border-top-0 p-4"
                    >
                      <div>
                        <p class="text-base">
                          Cultural patterns are the similar behaviors within
                          similar situations we witness due to shared beliefs,
                          values, norms and social practices that are steady
                          over time. In art, a pattern is a repetition of
                          specific visual elements. The dictionary.com
                          definition of "pattern" is: an arrangement of repeated
                          or corresponding parts, decorative motifs, etc.
                        </p>
                        <h5>Tags :</h5>
                        <div class="d-flex flex-grow-1 gap-2 mb-3">
                          <BBadge
                            variant="dark-subtle"
                            class="bg-dark-subtle text-dark my-3 fs-12"
                          >
                            <span class="text-base">Smoke</span>
                          </BBadge>
                          <BBadge
                            variant="dark-subtle"
                            class="bg-dark-subtle text-dark my-3 fs-12"
                          >
                            <span class="text-base">Black</span>
                          </BBadge>
                          <BBadge
                            variant="dark-subtle"
                            class="bg-dark-subtle text-dark my-3 fs-12"
                          >
                            <span class="text-base">Heritage</span>
                          </BBadge>
                        </div>
                      </div>
                    </BTab>
                  </BTabs>
                </div>
              </div>
            </BCol>
          </BRow>
        </BCardBody>
      </BCard>
    </div>
  </div>
</template>
