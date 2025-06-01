<script>
import PageHeader from '@/components/page-header';
import Horizontal from '@/layouts/horizontal.vue';

export default {
  components: {
    PageHeader,
    Horizontal,
  },
  methods: {
    startCountDownDate(dateVal) {
      var countDownDate = new Date(dateVal).getTime();
      return countDownDate;
    },
  },
  mounted() {
    var setEndDate1 = 'March 19, 2024 6:0:0';
    var cdd1 = this.startCountDownDate(setEndDate1);

    setInterval(function () {
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = cdd1 - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // add 0 at the beginning if days, hours, minutes, seconds values are less than 10
      days = days < 10 ? '0' + days : days;
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      console.log(days + ' : ' + hours + ' : ' + minutes + ' : ' + seconds);

      // Output the result in an element with auction-item-x"
      //   document.querySelector("#" + "auction-time-1")
      //     ? (document.querySelector("#" + "auction-time-1").textContent =
      //         days + " : " + hours + " : " + minutes + " : " + seconds)
      //     : "";

      // If the count down is over, write some text
      //   if (distance < 0) {
      //     // clearInterval();
      //     document.querySelector("#" + "auction-time-1").textContent =
      //       "00 : 00 : 00 : 00";
      //   }
    }, 1000);
  },
};
</script>

<template>
  <Horizontal />
  <PageHeader title="Item Details" pageTitle="NFT Marketplace" />
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
                ><i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                Delete
              </BDropdownItem>
            </BDropdown>
            <h1>Patterns Arts & Culture</h1>
            <div class="hstack gap-3 flex-wrap text-base">
              <div class="text-muted">
                Creator :
                <router-link to="#" class="text-primary fw-medium"
                  >Nancy Martino</router-link
                >
              </div>
              <div class="vr"></div>
              <div class="text-muted">
                Owner :
                <span class="text-body fw-mediu">Rickey Teran</span>
              </div>
              <div class="vr"></div>
              <div class="text-muted">
                Created On :
                <span class="text-body fw-medium">29 April, 2022</span>
              </div>
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
                Cultural patterns are the similar behaviors within similar
                situations we witness due to shared beliefs, values, norms and
                social practices that are steady over time. In art, a pattern is
                a repetition of specific visual elements. The dictionary.com
                definition of "pattern" is: an arrangement of repeated or
                corresponding parts, decorative motifs, etc.
              </p>
            </div>
            <div class="product-content mt-5">
              <h3 class="mb-3">Product Description :</h3>
              <BTabs nav-class="nav-tabs nav-tabs-custom nav-success text-lg">
                <BTab title="Activity" class="nav-item border border-top-0 p-3">
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

                        <tr>
                          <td>
                            <i class="ri-auction-line text-success me-2"></i>
                            Auction Sale
                          </td>
                          <td>0.5 ETH</td>
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

                        <tr>
                          <td>
                            <i class="ri-leaf-line text-success me-2"></i>
                            Mint
                          </td>
                          <td>0.1 ETH</td>
                          <td>
                            <router-link to="#" class="text-primary"
                              >Null@</router-link
                            >
                          </td>
                          <td>
                            <router-link to="#" class="text-primary"
                              >Rickey Teran</router-link
                            >
                          </td>
                          <td>29 April, 2022</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </BTab>

                <BTab title="Details" class="nav-item border border-top-0 p-4">
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
                      Cultural patterns are the similar behaviors within similar
                      situations we witness due to shared beliefs, values, norms
                      and social practices that are steady over time. In art, a
                      pattern is a repetition of specific visual elements. The
                      dictionary.com definition of "pattern" is: an arrangement
                      of repeated or corresponding parts, decorative motifs,
                      etc.
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
</template>
