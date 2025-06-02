<script>
import Layout from "@/layouts/main.vue";
// import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

import userService from "@/services/userService";

export default {
  data() {
    return {
      Autoplay,
      Navigation,
      infos: {
        Name: "",
        Mobile: "+216 55 555 555", // Hardcoded or fetched elsewhere
        Email: "",
        Location: "Tunis, Tunisia", // Hardcoded or via user profile
        JoiningDate: "01 Jan 2021", // Placeholder
        Designation: "Lead Designer / Developer", // Placeholder
        Website: "www.mywebsite.com",
        Description: "",
        Skills: [],
      },
      ownedNfts: [],
    };
  },
  async mounted() {
    try {
      const [username, email, ownedNfts] = await Promise.all([
        userService.getUsername(),
        userService.getEmail(),
        userService.getOwnedNfts(),
      ]);

      this.infos.Name = username;
      this.infos.Email = email;
      this.infos.Description = `Hello I'm ${username}. Welcome to my profile.`;
      this.infos.Skills = ownedNfts.map((nft) => nft.name); // Example mapping*
      this.ownedNfts = ownedNfts;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  },
  components: {
    Layout,

  },
};
</script>


<template>
  <Layout>
  <div class="profile-foreground position-relative mx-n4 mt-n4">
    <div class="profile-wid-bg">
      <img src="@/assets/images/profile-bg.jpg" alt="" class="profile-wid-img" />
    </div>
  </div>
  <div class="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
    <BRow class="g-4">
      <BCol cols="auto">
        <div class="avatar-lg">
          <img src="@/assets/images/users/avatar-1.jpg" alt="user-img" class="img-thumbnail rounded-circle" />
        </div>
      </BCol>
      <BCol>
        <div class="p-2">
          <h3 class="text-white mb-1">{{ infos.Name }}</h3>
          <p class="text-white text-opacity-75">Owner & Founder</p>
          <div class="hstack text-white-50 gap-1">
            <div class="me-2">
              <i class="ri-map-pin-user-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>{{ infos.Location
              }}
            </div>
            <div>
              <i class="ri-building-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>Themesbrand
            </div>
          </div>
        </div>
      </BCol>
      <BCol cols="12" lg="auto" order-lg="0" class="order-last">
        <BRow class="text text-white-50 text-center">
          <BCol lg="6" cols="4">
            <div class="p-2">
              <h4 class="text-white mb-1">24.3K</h4>
              <p class="fs-14 mb-0">Followers</p>
            </div>
          </BCol>
          <BCol lg="6" cols="4">
            <div class="p-2">
              <h4 class="text-white mb-1">1.3K</h4>
              <p class="fs-14 mb-0">Following</p>
            </div>
          </BCol>
        </BRow>
      </BCol>
    </BRow>
  </div>

  <BRow>
    <BCol lg="12">
      <div>
        <div class="d-flex profile-wrapper" style="position: absolute; right: 13px; top: 26px">
          <div class="d-flex justify-content-end">
            <router-link to="/profile/settings" class="btn btn-success"><i
                class="ri-edit-box-line align-bottom"></i> Edit
              Profile</router-link>
          </div>
        </div>
        <BTabs nav-class=" animation-nav profile-nav gap-2 gap-lg-3  pt-4 text-muted" pills>
          <BTab title="Overview" class="nav-item pt-4">
            <template #title>
              <i class="ri-airplay-fill d-inline-block d-md-none"></i>
              <span class="d-none d-md-inline-block">Overview</span>
            </template>
            <BRow>
              <BCol xxl="3">
                <BCard no-body>
                  <BCardBody>
                    <h5 class="card-title mb-5">Complete Your Profile</h5>
                    <BProgress class="animated-progress custom-progress progress-label">
                      <BProgressBar :value="100" variant="danger">
                        <div class="label">100%</div>
                      </BProgressBar>
                    </BProgress>
                  </BCardBody>
                </BCard>

                <BCard no-body>
                  <BCardBody>
                    <h5 class="card-title mb-3">Info</h5>
                    <div class="table-responsive">
                      <table class="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <th class="ps-0" scope="row">Full Name :</th>
                            <td class="text-muted">{{ infos.Name }}</td>
                          </tr>
                          <tr>
                            <th class="ps-0" scope="row">Mobile :</th>
                            <td class="text-muted">{{ infos.Mobile }}</td>
                          </tr>
                          <tr>
                            <th class="ps-0" scope="row">E-mail :</th>
                            <td class="text-muted">{{ infos.Email }}</td>
                          </tr>
                          <tr>
                            <th class="ps-0" scope="row">Location :</th>
                            <td class="text-muted">
                              {{ infos.Location }}
                            </td>
                          </tr>
                          <tr>
                            <th class="ps-0" scope="row">Joining Date</th>
                            <td class="text-muted">{{ infos.JoiningDate }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </BCardBody>
                </BCard>

                <BCard no-body>
                  <BCardBody>
                    <h5 class="card-title mb-4">Portfolio</h5>
                    <div class="d-flex flex-wrap gap-2">
                      <div>
                        <BLink href="javascript:void(0);" class="avatar-xs d-block">
                          <span class="avatar-title rounded-circle fs-16 bg-body text-body">
                            <i class="ri-github-fill"></i>
                          </span>
                        </BLink>
                      </div>
                      <div>
                        <BLink href="javascript:void(0);" class="avatar-xs d-block">
                          <span class="avatar-title rounded-circle fs-16 bg-primary">
                            <i class="ri-global-fill"></i>
                          </span>
                        </BLink>
                      </div>
                      <div>
                        <BLink href="javascript:void(0);" class="avatar-xs d-block">
                          <span class="avatar-title rounded-circle fs-16 bg-success">
                            <i class="ri-dribbble-fill"></i>
                          </span>
                        </BLink>
                      </div>
                      <div>
                        <BLink href="javascript:void(0);" class="avatar-xs d-block">
                          <span class="avatar-title rounded-circle fs-16 bg-danger">
                            <i class="ri-pinterest-fill"></i>
                          </span>
                        </BLink>
                      </div>
                    </div>
                  </BCardBody>
                </BCard>

                

                <BCard no-body>
                  <BCardBody>
                    <div class="d-flex align-items-center mb-4">
                      <div class="flex-grow-1">
                        <h5 class="card-title mb-0">Suggestions</h5>
                      </div>
                      <div class="flex-shrink-0">
                        <BDropdown variant="link" right toggle-class="arrow-none p-0" no-caret>
                          <template #button-content><i class="ri-more-2-fill fs-14"></i>
                          </template>
                          <BDropdownItem href="#"> View </BDropdownItem>
                          <BDropdownItem href="#"> Download </BDropdownItem>
                          <BDropdownItem href="#"> Delete </BDropdownItem>
                        </BDropdown>
                      </div>
                    </div>
                    <div>
                      <div class="d-flex align-items-center py-3">
                        <div class="avatar-xs flex-shrink-0 me-3">
                          <img src="@/assets/images/users/avatar-3.jpg" alt="" class="img-fluid rounded-circle" />
                        </div>
                        <div class="flex-grow-1">
                          <div>
                            <h5 class="fs-14 mb-1">Esther James</h5>
                            <p class="fs-13 text-muted mb-0">
                              Frontend Developer
                            </p>
                          </div>
                        </div>
                        <div class="flex-shrink-0 ms-2">
                          <BButton type="button" variant="outline-success" size="sm">
                            <i class="ri-user-add-line align-middle"></i>
                          </BButton>
                        </div>
                      </div>
                      <div class="d-flex align-items-center py-3">
                        <div class="avatar-xs flex-shrink-0 me-3">
                          <img src="@/assets/images/users/avatar-4.jpg" alt="" class="img-fluid rounded-circle" />
                        </div>
                        <div class="flex-grow-1">
                          <div>
                            <h5 class="fs-14 mb-1">Jacqueline Steve</h5>
                            <p class="fs-13 text-muted mb-0">UI/UX Designer</p>
                          </div>
                        </div>
                        <div class="flex-shrink-0 ms-2">
                          <BButton type="button" variant="outline-success" size="sm">
                            <i class="ri-user-add-line align-middle"></i>
                          </BButton>
                        </div>
                      </div>
                      <div class="d-flex align-items-center py-3">
                        <div class="avatar-xs flex-shrink-0 me-3">
                          <img src="@/assets/images/users/avatar-5.jpg" alt="" class="img-fluid rounded-circle" />
                        </div>
                        <div class="flex-grow-1">
                          <div>
                            <h5 class="fs-14 mb-1">George Whalen</h5>
                            <p class="fs-13 text-muted mb-0">
                              Backend Developer
                            </p>
                          </div>
                        </div>
                        <div class="flex-shrink-0 ms-2">
                          <BButton type="button" variant="outline-success" size="sm">
                            <i class="ri-user-add-line align-middle"></i>
                          </BButton>
                        </div>
                      </div>
                    </div>
                  </BCardBody>
                </BCard>

                <!-- <BCard no-body>
                  <BCardBody>
                    <div class="d-flex align-items-center mb-4">
                      <div class="flex-grow-1">
                        <h5 class="card-title mb-0">Popular Posts</h5>
                      </div>
                      <div class="flex-shrink-0">
                        <BDropdown variant="link" right toggle-class="arrow-none p-0" no-caret>
                          <template #button-content><i class="ri-more-2-fill fs-14"></i>
                          </template>
                          <BDropdownItem href="#"> View </BDropdownItem>
                          <BDropdownItem href="#"> Download </BDropdownItem>
                          <BDropdownItem href="#"> Delete </BDropdownItem>
                        </BDropdown>
                      </div>
                    </div>
                    <div class="d-flex mb-4">
                      <div class="flex-shrink-0">
                        <img src="@/assets/images/small/img-4.jpg" alt="" height="50" class="rounded" />
                      </div>
                      <div class="flex-grow-1 ms-3 overflow-hidden">
                        <BLink href="javascript:void(0);">
                          <h6 class="text-truncate fs-14">
                            Design your apps in your own way
                          </h6>
                        </BLink>
                        <p class="text-muted mb-0">15 Dec 2021</p>
                      </div>
                    </div>
                    <div class="d-flex mb-4">
                      <div class="flex-shrink-0">
                        <img src="@/assets/images/small/img-5.jpg" alt="" height="50" class="rounded" />
                      </div>
                      <div class="flex-grow-1 ms-3 overflow-hidden">
                        <BLink href="javascript:void(0);">
                          <h6 class="text-truncate fs-14">
                            Smartest Applications for Business
                          </h6>
                        </BLink>
                        <p class="text-muted mb-0">28 Nov 2021</p>
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="flex-shrink-0">
                        <img src="@/assets/images/small/img-6.jpg" alt="" height="50" class="rounded" />
                      </div>
                      <div class="flex-grow-1 ms-3 overflow-hidden">
                        <BLink href="javascript:void(0);">
                          <h6 class="text-truncate fs-14">
                            How to get creative in your work
                          </h6>
                        </BLink>
                        <p class="text-muted mb-0">21 Nov 2021</p>
                      </div>
                    </div>
                  </BCardBody>
                </BCard> -->
              </BCol>
              <BCol xxl="9">
                <BCard no-body>
                  <BCardBody>
                    <h5 class="card-title mb-3">About</h5>
                    <p>
                      {{ infos.Description }}
                    </p>
                    <BRow>
                      <BCol cols="6" md="4">
                        <div class="d-flex mt-4">
                          <div class="flex-shrink-0 avatar-xs align-self-center me-3">
                            <div class="avatar-title bg-light rounded-circle fs-16 text-primary">
                              <i class="ri-user-2-fill"></i>
                            </div>
                          </div>
                          <div class="flex-grow-1 overflow-hidden">
                            <p class="mb-1">Designation :</p>
                            <h6 class="text-truncate mb-0">
                              {{ infos.Designation }}
                            </h6>
                          </div>
                        </div>
                      </BCol>
                      <BCol cols="6" md="4">
                        <div class="d-flex mt-4">
                          <div class="flex-shrink-0 avatar-xs align-self-center me-3">
                            <div class="avatar-title bg-light rounded-circle fs-16 text-primary">
                              <i class="ri-global-line"></i>
                            </div>
                          </div>
                          <div class="flex-grow-1 overflow-hidden">
                            <p class="mb-1">Website :</p>
                            <BLink href="#" class="fw-semibold">{{
                              infos.Website
                            }}</BLink>
                          </div>
                        </div>
                      </BCol>
                    </BRow>
                  </BCardBody>
                </BCard>

                <BRow>
                  <BCol lg="12">
                    <BCard no-body>
                      <BCardBody>
                        <div class="d-flex align-items-center mb-4">
                          <h5 class="card-title flex-grow-1 mb-0">My NFTs</h5>
                          <div class="flex-shrink-0">
                            <input class="form-control d-none" type="file" id="formFile" />
                            <label for="formFile" class="btn btn-danger"><i class="ri-bard-fill me-1 align-bottom"></i>
                              Generate New NFT</label>
                          </div>
                        </div>
<!--                        <BRow class="row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1">-->
<!--                          <BCol>-->
<!--                            <BCard no-body class="explore-box card-animate">-->
<!--                              <div class="explore-place-bid-img">-->
<!--                                <img src="https://img.themesbrand.com/velzon/images/img-3.gif" alt=""-->
<!--                                     class="card-img-top explore-img" />-->
<!--                                <div class="bg-overlay"></div>-->
<!--                                <div class="place-bid-btn d-flex flex-row with-100 justify-content-center">-->
<!--                                  <BLink href="#!" class="btn btn-secondary m-1 d-flex flex-row align-items-center"><i class="ri-information-fill align-bottom me-1"></i>-->
<!--                                    Details</BLink>-->
<!--                                  <BLink href="#!" class="btn btn-danger m-1 d-flex flex-row align-items-center"><i class="ri-delete-bin-5-line align-bottom me-1"></i>-->
<!--                                    Delete</BLink>-->
<!--                                </div>-->
<!--                              </div>-->

<!--                              <BCardBody>-->
<!--                                <p class="fw-medium mb-0 float-end"><i class="mdi mdi-heart text-danger align-middle"></i>-->
<!--                                  37.41k </p>-->
<!--                                <h5 class="mb-1">-->
<!--                                  <router-link to="/apps/nft-item-detail">Walking on air</router-link>-->
<!--                                </h5>-->
<!--                                <p class="text-muted mb-0">Artwork</p>-->
<!--                              </BCardBody>-->
<!--                              <BCardFooter class="border-top border-top-dashed">-->
<!--                                <div class="d-flex align-items-center">-->
<!--                                  <div class="flex-grow-1 fs-14">-->
<!--                                    <i class="ri-price-tag-3-fill text-warning align-bottom me-1"></i> Highest: <span-->
<!--                                      class="fw-medium">10.35ETH</span>-->
<!--                                  </div>-->
<!--                                  <h5 class="flex-shrink-0 fs-14 text-primary mb-0">14.167 ETH</h5>-->
<!--                                </div>-->
<!--                              </BCardFooter>-->
<!--                            </BCard>-->
<!--                          </BCol>-->
<!--                          <BCol>-->
<!--                            <BCard no-body class="explore-box card-animate">-->
<!--                              <div class="explore-place-bid-img">-->
<!--                                <img src="@/assets/images/nft/img-03.jpg" alt="" class="card-img-top explore-img" />-->
<!--                                <div class="bg-overlay"></div>-->
<!--                                <div class="place-bid-btn d-flex flex-row with-100 justify-content-center">-->
<!--                                  <BLink href="#!" class="btn btn-secondary m-1 d-flex flex-row align-items-center"><i class="ri-information-fill align-bottom me-1"></i>-->
<!--                                    Details</BLink>-->
<!--                                  <BLink href="#!" class="btn btn-danger m-1 d-flex flex-row align-items-center"><i class="ri-delete-bin-5-line align-bottom me-1"></i>-->
<!--                                    Delete</BLink>-->
<!--                                </div>-->
<!--                              </div>-->

<!--                              <BCardBody>-->
<!--                                <p class="fw-medium mb-0 float-end"><i class="mdi mdi-heart text-danger align-middle"></i>-->
<!--                                  19.29k </p>-->
<!--                                <h5 class="mb-1">-->
<!--                                  <router-link to="/apps/nft-item-detail">Creative filtered portrait</router-link>-->
<!--                                </h5>-->
<!--                                <p class="text-muted mb-0">Photography</p>-->
<!--                              </BCardBody>-->
<!--                              <BCardFooter class="border-top border-top-dashed">-->
<!--                                <div class="d-flex align-items-center">-->
<!--                                  <div class="flex-grow-1 fs-14">-->
<!--                                    <i class="ri-price-tag-3-fill text-warning align-bottom me-1"></i> Highest: <span-->
<!--                                      class="fw-medium">75.3ETH</span>-->
<!--                                  </div>-->
<!--                                  <h5 class="flex-shrink-0 fs-14 text-primary mb-0">67.36 ETH</h5>-->
<!--                                </div>-->
<!--                              </BCardFooter>-->
<!--                            </BCard>-->
<!--                          </BCol>-->
<!--                          <BCol>-->
<!--                            <BCard no-body class="explore-box card-animate">-->
<!--                              <div class="explore-place-bid-img">-->
<!--                                <img src="@/assets/images/nft/img-02.jpg" alt="" class="card-img-top explore-img" />-->
<!--                                <div class="bg-overlay"></div>-->
<!--                                <div class="place-bid-btn d-flex flex-row with-100 justify-content-center">-->
<!--                                  <BLink href="#!" class="btn btn-secondary m-1 d-flex flex-row align-items-center"><i class="ri-information-fill align-bottom me-1"></i>-->
<!--                                    Details</BLink>-->
<!--                                  <BLink href="#!" class="btn btn-danger m-1 d-flex flex-row align-items-center"><i class="ri-delete-bin-5-line align-bottom me-1"></i>-->
<!--                                    Delete</BLink>-->
<!--                                </div>-->
<!--                              </div>-->

<!--                              <BCardBody>-->
<!--                                <p class="fw-medium mb-0 float-end"><i class="mdi mdi-heart text-danger align-middle"></i>-->
<!--                                  23.63k </p>-->
<!--                                <h5 class="mb-1">-->
<!--                                  <router-link to="/apps/nft-item-detail">The Chirstoper</router-link>-->
<!--                                </h5>-->
<!--                                <p class="text-muted mb-0">Music</p>-->
<!--                              </BCardBody>-->
<!--                              <BCardFooter class="border-top border-top-dashed">-->
<!--                                <div class="d-flex align-items-center">-->
<!--                                  <div class="flex-grow-1 fs-14">-->
<!--                                    <i class="ri-price-tag-3-fill text-warning align-bottom me-1"></i> Highest: <span-->
<!--                                      class="fw-medium">412.30ETH</span>-->
<!--                                  </div>-->
<!--                                  <h5 class="flex-shrink-0 fs-14 text-primary mb-0">394.7 ETH</h5>-->
<!--                                </div>-->
<!--                              </BCardFooter>-->
<!--                            </BCard>-->
<!--                          </BCol>-->
<!--                          <BCol>-->
<!--                            <BCard no-body class="explore-box card-animate">-->
<!--                              <div class="explore-place-bid-img">-->
<!--                                <img src="https://img.themesbrand.com/velzon/images/img-4.gif" alt=""-->
<!--                                     class="card-img-top explore-img" />-->
<!--                                <div class="bg-overlay"></div>-->
<!--                                <div class="place-bid-btn d-flex flex-row with-100 justify-content-center">-->
<!--                                  <BLink href="#!" class="btn btn-secondary m-1 d-flex flex-row align-items-center"><i class="ri-information-fill align-bottom me-1"></i>-->
<!--                                    Details</BLink>-->
<!--                                  <BLink href="#!" class="btn btn-danger m-1 d-flex flex-row align-items-center"><i class="ri-delete-bin-5-line align-bottom me-1"></i>-->
<!--                                    Delete</BLink>-->
<!--                                </div>-->
<!--                              </div>-->

<!--                              <BCardBody>-->
<!--                                <p class="fw-medium mb-0 float-end"><i class="mdi mdi-heart text-danger align-middle"></i>-->
<!--                                  15.93k </p>-->
<!--                                <h5 class="mb-1">-->
<!--                                  <router-link to="/apps/nft-item-detail">Evolved Reality</router-link>-->
<!--                                </h5>-->
<!--                                <p class="text-muted mb-0">Video</p>-->
<!--                              </BCardBody>-->
<!--                              <BCardFooter class="border-top border-top-dashed">-->
<!--                                <div class="d-flex align-items-center">-->
<!--                                  <div class="flex-grow-1 fs-14">-->
<!--                                    <i class="ri-price-tag-3-fill text-warning align-bottom me-1"></i> Highest: <span-->
<!--                                      class="fw-medium">2.75ETH</span>-->
<!--                                  </div>-->
<!--                                  <h5 class="flex-shrink-0 fs-14 text-primary mb-0">3.167 ETH</h5>-->
<!--                                </div>-->
<!--                              </BCardFooter>-->
<!--                            </BCard>-->
<!--                          </BCol>-->
<!--                          <BCol>-->
<!--                            <BCard no-body class="explore-box card-animate">-->
<!--                              <div class="explore-place-bid-img">-->
<!--                                <img src="@/assets/images/nft/img-01.jpg" alt="" class="card-img-top explore-img" />-->
<!--                                <div class="bg-overlay"></div>-->
<!--                                <div class="place-bid-btn d-flex flex-row with-100 justify-content-center">-->
<!--                                  <BLink href="#!" class="btn btn-secondary m-1 d-flex flex-row align-items-center"><i class="ri-information-fill align-bottom me-1"></i>-->
<!--                                    Details</BLink>-->
<!--                                  <BLink href="#!" class="btn btn-danger m-1 d-flex flex-row align-items-center"><i class="ri-delete-bin-5-line align-bottom me-1"></i>-->
<!--                                    Delete</BLink>-->
<!--                                </div>-->
<!--                              </div>-->

<!--                              <BCardBody>-->
<!--                                <p class="fw-medium mb-0 float-end"><i class="mdi mdi-heart text-danger align-middle"></i>-->
<!--                                  14.85k </p>-->
<!--                                <h5 class="mb-1">-->
<!--                                  <router-link to="/apps/nft-item-detail">Abstract face painting</router-link>-->
<!--                                </h5>-->
<!--                                <p class="text-muted mb-0">Collectibles</p>-->
<!--                              </BCardBody>-->
<!--                              <BCardFooter class="border-top border-top-dashed">-->
<!--                                <div class="d-flex align-items-center">-->
<!--                                  <div class="flex-grow-1 fs-14">-->
<!--                                    <i class="ri-price-tag-3-fill text-warning align-bottom me-1"></i> Highest: <span-->
<!--                                      class="fw-medium">122.34ETH</span>-->
<!--                                  </div>-->
<!--                                  <h5 class="flex-shrink-0 fs-14 text-primary mb-0">97.8 ETH</h5>-->
<!--                                </div>-->
<!--                              </BCardFooter>-->
<!--                            </BCard>-->
<!--                          </BCol>-->
<!--                          <BCol>-->
<!--                            <BCard no-body class="explore-box card-animate">-->
<!--                              <div class="explore-place-bid-img">-->
<!--                                <img src="@/assets/images/nft/img-05.jpg" alt="" class="card-img-top explore-img" />-->
<!--                                <div class="bg-overlay"></div>-->
<!--                                <div class="place-bid-btn d-flex flex-row with-100 justify-content-center">-->
<!--                                  <BLink href="#!" class="btn btn-secondary m-1 d-flex flex-row align-items-center"><i class="ri-information-fill align-bottom me-1"></i>-->
<!--                                    Details</BLink>-->
<!--                                  <BLink href="#!" class="btn btn-danger m-1 d-flex flex-row align-items-center"><i class="ri-delete-bin-5-line align-bottom me-1"></i>-->
<!--                                    Delete</BLink>-->
<!--                                </div>-->
<!--                              </div>-->

<!--                              <BCardBody>-->
<!--                                <p class="fw-medium mb-0 float-end"><i class="mdi mdi-heart text-danger align-middle"></i>-->
<!--                                  64.10k </p>-->
<!--                                <h5 class="mb-1">-->
<!--                                  <router-link to="/apps/nft-item-detail">Long-tailed macaque</router-link>-->
<!--                                </h5>-->
<!--                                <p class="text-muted mb-0">Artwork</p>-->
<!--                              </BCardBody>-->
<!--                              <BCardFooter class="border-top border-top-dashed">-->
<!--                                <div class="d-flex align-items-center">-->
<!--                                  <div class="flex-grow-1 fs-14">-->
<!--                                    <i class="ri-price-tag-3-fill text-warning align-bottom me-1"></i> Highest: <span-->
<!--                                      class="fw-medium">874.01ETH</span>-->
<!--                                  </div>-->
<!--                                  <h5 class="flex-shrink-0 fs-14 text-primary mb-0">745.14 ETH</h5>-->
<!--                                </div>-->
<!--                              </BCardFooter>-->
<!--                            </BCard>-->
<!--                          </BCol>-->
<!--                          <BCol>-->
<!--                            <BCard no-body class="explore-box card-animate">-->
<!--                              <div class="explore-place-bid-img">-->
<!--                                <img src="@/assets/images/nft/img-06.jpg" alt="" class="card-img-top explore-img" />-->
<!--                                <div class="bg-overlay"></div>-->
<!--                                <div class="place-bid-btn d-flex flex-row with-100 justify-content-center">-->
<!--                                  <BLink href="#!" class="btn btn-secondary m-1 d-flex flex-row align-items-center"><i class="ri-information-fill align-bottom me-1"></i>-->
<!--                                    Details</BLink>-->
<!--                                  <BLink href="#!" class="btn btn-danger m-1 d-flex flex-row align-items-center"><i class="ri-delete-bin-5-line align-bottom me-1"></i>-->
<!--                                    Delete</BLink>-->
<!--                                </div>-->
<!--                              </div>-->

<!--                              <BCardBody>-->
<!--                                <p class="fw-medium mb-0 float-end"><i class="mdi mdi-heart text-danger align-middle"></i>-->
<!--                                  36.42k </p>-->
<!--                                <h5 class="mb-1">-->
<!--                                  <router-link to="/apps/nft-item-detail">Robotic Body Art</router-link>-->
<!--                                </h5>-->
<!--                                <p class="text-muted mb-0">Artwork</p>-->
<!--                              </BCardBody>-->
<!--                              <BCardFooter class="border-top border-top-dashed">-->
<!--                                <div class="d-flex align-items-center">-->
<!--                                  <div class="flex-grow-1 fs-14">-->
<!--                                    <i class="ri-price-tag-3-fill text-warning align-bottom me-1"></i> Highest: <span-->
<!--                                      class="fw-medium">41.658 ETH</span>-->
<!--                                  </div>-->
<!--                                  <h5 class="flex-shrink-0 fs-14 text-primary mb-0">34.81 ETH</h5>-->
<!--                                </div>-->
<!--                              </BCardFooter>-->
<!--                            </BCard>-->
<!--                          </BCol>-->
<!--                          <BCol>-->
<!--                            <BCard no-body class="explore-box card-animate">-->
<!--                              <div class="explore-place-bid-img">-->
<!--                                <img src="https://img.themesbrand.com/velzon/images/img-2.gif" alt=""-->
<!--                                     class="card-img-top explore-img" />-->
<!--                                <div class="bg-overlay"></div>-->
<!--                                <div class="place-bid-btn d-flex flex-row with-100 justify-content-center">-->
<!--                                  <BLink href="#!" class="btn btn-secondary m-1 d-flex flex-row align-items-center"><i class="ri-information-fill align-bottom me-1"></i>-->
<!--                                    Details</BLink>-->
<!--                                  <BLink href="#!" class="btn btn-danger m-1 d-flex flex-row align-items-center"><i class="ri-delete-bin-5-line align-bottom me-1"></i>-->
<!--                                    Delete</BLink>-->
<!--                                </div>-->
<!--                              </div>-->

<!--                              <BCardBody>-->
<!--                                <p class="fw-medium mb-0 float-end"><i class="mdi mdi-heart text-danger align-middle"></i> 94.1k-->
<!--                                </p>-->
<!--                                <h5 class="mb-1">-->
<!--                                  <router-link to="/apps/nft-item-detail">Trendy Fashion Portraits</router-link>-->
<!--                                </h5>-->
<!--                                <p class="text-muted mb-0">3d Style</p>-->
<!--                              </BCardBody>-->
<!--                              <BCardFooter class="border-top border-top-dashed">-->
<!--                                <div class="d-flex align-items-center">-->
<!--                                  <div class="flex-grow-1 fs-14">-->
<!--                                    <i class="ri-price-tag-3-fill text-warning align-bottom me-1"></i> Highest: <span-->
<!--                                      class="fw-medium">674.92 ETH</span>-->
<!--                                  </div>-->
<!--                                  <h5 class="flex-shrink-0 fs-14 text-primary mb-0">563.81 ETH</h5>-->
<!--                                </div>-->
<!--                              </BCardFooter>-->
<!--                            </BCard>-->
<!--                          </BCol>-->
<!--                          <BCol>-->
<!--                            <BCard no-body class="explore-box card-animate">-->
<!--                              <div class="explore-place-bid-img">-->
<!--                                <img src="@/assets/images/nft/img-04.jpg" alt="" class="card-img-top explore-img" />-->
<!--                                <div class="bg-overlay"></div>-->
<!--                                <div class="place-bid-btn d-flex flex-row with-100 justify-content-center">-->
<!--                                  <BLink href="#!" class="btn btn-secondary m-1 d-flex flex-row align-items-center"><i class="ri-information-fill align-bottom me-1"></i>-->
<!--                                    Details</BLink>-->
<!--                                  <BLink href="#!" class="btn btn-danger m-1 d-flex flex-row align-items-center"><i class="ri-delete-bin-5-line align-bottom me-1"></i>-->
<!--                                    Delete</BLink>-->
<!--                                </div>-->
<!--                              </div>-->

<!--                              <BCardBody>-->
<!--                                <p class="fw-medium mb-0 float-end"><i class="mdi mdi-heart text-danger align-middle"></i>-->
<!--                                  34.12k </p>-->
<!--                                <h5 class="mb-1">-->
<!--                                  <router-link to="/apps/nft-item-detail">Smillevers Crypto</router-link>-->
<!--                                </h5>-->
<!--                                <p class="text-muted mb-0">Crypto Card</p>-->
<!--                              </BCardBody>-->
<!--                              <BCardFooter class="border-top border-top-dashed">-->
<!--                                <div class="d-flex align-items-center">-->
<!--                                  <div class="flex-grow-1 fs-14">-->
<!--                                    <i class="ri-price-tag-3-fill text-warning align-bottom me-1"></i> Highest: <span-->
<!--                                      class="fw-medium">41.658 ETH</span>-->
<!--                                  </div>-->
<!--                                  <h5 class="flex-shrink-0 fs-14 text-primary mb-0">34.81 ETH</h5>-->
<!--                                </div>-->
<!--                              </BCardFooter>-->
<!--                            </BCard>-->
<!--                          </BCol>-->
<!--                          <BCol>-->
<!--                            <BCard no-body class="explore-box card-animate">-->
<!--                              <div class="explore-place-bid-img">-->
<!--                                <img src="https://img.themesbrand.com/velzon/images/img-1.gif" alt=""-->
<!--                                     class="card-img-top explore-img" />-->
<!--                                <div class="bg-overlay"></div>-->
<!--                                <div class="place-bid-btn d-flex flex-row with-100 justify-content-center">-->
<!--                                  <BLink href="#!" class="btn btn-secondary m-1 d-flex flex-row align-items-center"><i class="ri-information-fill align-bottom me-1"></i>-->
<!--                                    Details</BLink>-->
<!--                                  <BLink href="#!" class="btn btn-danger m-1 d-flex flex-row align-items-center"><i class="ri-delete-bin-5-line align-bottom me-1"></i>-->
<!--                                    Delete</BLink>-->
<!--                                </div>-->
<!--                              </div>-->
<!--                              <BCardBody>-->
<!--                                <p class="fw-medium mb-0 float-end"><i class="mdi mdi-heart text-danger align-middle"></i> 8.42k-->
<!--                                </p>-->
<!--                                <h5 class="mb-1">-->
<!--                                  <router-link to="/apps/nft-item-detail">Patterns arts & culture</router-link>-->
<!--                                </h5>-->
<!--                                <p class="text-muted mb-0">Artwork</p>-->
<!--                              </BCardBody>-->
<!--                              <BCardFooter class="border-top border-top-dashed">-->
<!--                                <div class="d-flex align-items-center">-->
<!--                                  <div class="flex-grow-1 fs-14">-->
<!--                                    <i class="ri-price-tag-3-fill text-warning align-bottom me-1"></i> Highest: <span-->
<!--                                      class="fw-medium">9.64ETH</span>-->
<!--                                  </div>-->
<!--                                  <h5 class="flex-shrink-0 fs-14 text-primary mb-0">14.167 ETH</h5>-->
<!--                                </div>-->
<!--                              </BCardFooter>-->
<!--                            </BCard>-->
<!--                          </BCol>-->
<!--                        </BRow>-->

                                                <BRow class="row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1">

                        <BCol
                            xxl="3"
                            lg="4"
                            md="6"
                            class="product-item upto-15 cursor-pointer"
                            v-for="nft in ownedNfts"
                            v-bind:key="nft.id"
                        >
                          <router-link to="/my-nft/{{ nft.id }}">

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
                                <i class="mdi mdi-ethereum"> {{ nft.description }}</i>
                              </h5>
                              <h6 class="fs-16 mb-3">
                               {{
                                    nft.name
                                  }}
                              </h6>
                            </BCardBody>
                          </BCard>
                          </router-link>
                        </BCol>
                                                </BRow>
                      </BCardBody>
                    </BCard>


                  </BCol>
                </BRow>


              </BCol>
            </BRow>
          </BTab>


        </BTabs>
      </div>
    </BCol>
  </BRow>

  </Layout>
</template>

<style>
.tamp {
  position: absolute;
  top: 17px;
  right: 16px;
}
</style>