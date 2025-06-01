<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from "axios";
import Layout from "@/layouts/main.vue";

export default {
  data() {
    return {
      value: ["javascript"],
      date: null,
    };
  },
  components: {
    Layout,
    Multiselect,
    flatPickr,
  },
  methods: {
    changepass() {
      var data = {
        password: document.getElementById("oldpasswordInput").value,
        new_password: document.getElementById("newpasswordInput").value,
        confirm_password: document.getElementById("confirmpasswordInput").value,
      };
      axios
        .patch("https://api-node.themesbrand.website/updatepassword", data)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updatedata() {
      var userid = localStorage.getItem("userid");
      var data = {
        first_name: document.getElementById("firstnameInput").value,
        last_name: document.getElementById("lastnameInput").value,
        phone: document.getElementById("phonenumberInput").value,
        email: document.getElementById("emailInput").value,
        joining_date: document.getElementById("dateinput").value,
        skills: document.getElementById("skillsinput").value,
        designation: document.getElementById("designationInput").value,
        website: document.getElementById("websiteInput1").value,
        city: document.getElementById("cityInput").value,
        country: document.getElementById("countryInput").value,
        zipcode: document.getElementById("zipcodeInput").value,
        Description: document.getElementById("exampleFormControlTextarea")
          .value,
      };
      axios
        .patch("https://api-node.themesbrand.website/user/" + userid, data)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<template>
  <Layout>
    <div class="position-relative mx-n4 mt-n4">
      <div class="profile-wid-bg profile-setting-img">
        <img
          src="@/assets/images/profile-bg.jpg"
          class="profile-wid-img"
          alt=""
        />
        <div class="overlay-content">
          <div class="text-end p-3">
            <div class="p-0 ms-auto rounded-circle profile-photo-edit">
              <input
                id="profile-foreground-img-file-input"
                type="file"
                class="profile-foreground-img-file-input"
              />
              <label
                for="profile-foreground-img-file-input"
                class="profile-photo-edit btn btn-light"
              >
                <i class="ri-image-edit-line align-bottom me-1"></i> Change
                Cover
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

  <BRow>
    <BCol lg="12">
      <div>
        <div class="d-flex profile-wrapper" style="position: absolute; right: 13px; top: 26px">
          <div class="d-flex justify-content-end">
            <router-link to="/pages/profile-setting" class="btn btn-success"><i
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
                    <h5 class="card-title mb-4">Skills</h5>
                    <div class="d-flex flex-wrap gap-2 fs-15">
                      <BLink v-for="(skill, index) in infos.Skills" :key="index" href="javascript:void(0);"
                        class="badge bg-primary-subtle text-primary">
                        {{ skill }}
                      </BLink>
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
                      <BCardHeader class="align-items-center d-flex">
                        <BCardTitle class="mb-0 me-2">Recent Activity</BCardTitle>
                        <div class="flex-shrink-0 ms-auto">
                          <!-- <ul class="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0"
                              role="tablist">
                              <li class="nav-item">
                                <BLink class="nav-link active" data-bs-toggle="tab" href="#today" role="tab">
                                  Today
                                </BLink>
                              </li>
                              <li class="nav-item">
                                <BLink class="nav-link" data-bs-toggle="tab" href="#weekly" role="tab">
                                  Weekly
                                </BLink>
                              </li>
                              <li class="nav-item">
                                <BLink class="nav-link" data-bs-toggle="tab" href="#monthly" role="tab">
                                  Monthly
                                </BLink>
                              </li>
                            </ul> -->
                        </div>
                      </BCardHeader>
                      <BCardBody>
                        <BTabs nav-class="text-muted nav-tabs-custom rounded card-header-tabs border-bottom-0 tamp">
                          <BTab title="Today">
                            <div class="profile-timeline">
                              <div class="accordion accordion-flush" id="todayExample">
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="headingOne">
                                    <BLink class="accordion-button p-2 shadow-none" v-b-toggle.collapseOne>
                                      <div class="d-flex">
                                        <div class="flex-shrink-0">
                                          <img src="@/assets/images/users/avatar-2.jpg" alt=""
                                            class="avatar-xs rounded-circle" />
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            Jacqueline Steve
                                          </h6>
                                          <small class="text-muted">We has changed 2 attributes on
                                            05:16PM</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>

                                  <BCollapse id="collapseOne" visible>
                                    <div class="accordion-body ms-2 ps-5">
                                      In an awareness campaign, it is vital for
                                      people to begin put 2 and 2 together and
                                      begin to recognize your cause. Too much or
                                      too little spacing, as in the example
                                      below, can make things unpleasant for the
                                      reader. The goal is to make your text as
                                      comfortable to read as possible. A
                                      wonderful serenity has taken possession of
                                      my entire soul, like these sweet mornings
                                      of spring which I enjoy with my whole
                                      heart.
                                    </div>
                                  </BCollapse>
                                </div>
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="headingTwo">
                                    <BLink class="accordion-button p-2 shadow-none" v-b-toggle.collapseTwo>
                                      <div class="d-flex">
                                        <div class="flex-shrink-0 avatar-xs">
                                          <div class="avatar-title bg-light text-success rounded-circle">
                                            M
                                          </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            Megan Elmore
                                          </h6>
                                          <small class="text-muted">Adding a new event with attachments
                                            - 04:45PM</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>
                                  <BCollapse id="collapseTwo" visible>
                                    <div class="accordion-body ms-2 ps-5">
                                      <BRow class="g-2">
                                        <BCol cols="auto">
                                          <div class="d-flex border border-dashed p-2 rounded position-relative">
                                            <div class="flex-shrink-0">
                                              <i class="ri-image-2-line fs-17 text-danger"></i>
                                            </div>
                                            <div class="flex-grow-1 ms-2">
                                              <h6 class="mb-0">
                                                <BLink href="javascript:void(0);" class="stretched-link">Business
                                                  Template - UI/UX
                                                  design</BLink>
                                              </h6>
                                              <small>685 KB</small>
                                            </div>
                                          </div>
                                        </BCol>
                                        <BCol cols="auto">
                                          <div class="d-flex border border-dashed p-2 rounded position-relative">
                                            <div class="flex-shrink-0">
                                              <i class="ri-file-zip-line fs-17 text-info"></i>
                                            </div>
                                            <div class="flex-grow-1 ms-2">
                                              <h6>
                                                <BLink href="javascript:void(0);" class="stretched-link">Bank Management
                                                  System -
                                                  PSD</BLink>
                                              </h6>
                                              <small>8.78 MB</small>
                                            </div>
                                          </div>
                                        </BCol>
                                      </BRow>
                                    </div>
                                  </BCollapse>
                                </div>
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="headingThree">
                                    <BLink class="accordion-button p-2 shadow-none" data-bs-toggle="collapse"
                                      href="#collapsethree" aria-expanded="false">
                                      <div class="d-flex">
                                        <div class="flex-shrink-0">
                                          <img src="@/assets/images/users/avatar-5.jpg" alt=""
                                            class="avatar-xs rounded-circle" />
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            New ticket received
                                          </h6>
                                          <small class="text-muted mb-2">User
                                            <span class="text-secondary">Erica245</span>
                                            submitted a ticket - 02:33PM</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>
                                </div>
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="headingFour">
                                    <BLink class="accordion-button p-2 shadow-none" v-b-toggle.collapseFour>
                                      <div class="d-flex">
                                        <div class="flex-shrink-0 avatar-xs">
                                          <div class="avatar-title bg-light text-muted rounded-circle">
                                            <i class="ri-user-3-fill"></i>
                                          </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            Nancy Martino
                                          </h6>
                                          <small class="text-muted">Commented on 12:57PM</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>
                                  <BCollapse id="collapseFour" visible>
                                    <div class="accordion-body ms-2 ps-5 fst-italic">
                                      " A wonderful serenity has taken
                                      possession of my entire soul, like these
                                      sweet mornings of spring which I enjoy
                                      with my whole heart. Each design is a new,
                                      unique piece of art birthed into this
                                      world, and while you have the opportunity
                                      to be creative and make your own style
                                      choices. "
                                    </div>
                                  </BCollapse>
                                </div>
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="headingFive">
                                    <BLink class="accordion-button p-2 shadow-none" v-b-toggle.collapseFive>
                                      <div class="d-flex">
                                        <div class="flex-shrink-0">
                                          <img src="@/assets/images/users/avatar-7.jpg" alt=""
                                            class="avatar-xs rounded-circle" />
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            Lewis Arnold
                                          </h6>
                                          <small class="text-muted">Create new project Building product
                                            - 10:05AM</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>

                                  <BCollapse id="collapseFive" visible>
                                    <div class="accordion-body ms-2 ps-5">
                                      <p class="text-muted mb-2">
                                        Every team project can have a velzon.
                                        Use the velzon to share information with
                                        your team to understand and contribute
                                        to your project.
                                      </p>
                                      <div class="avatar-group">
                                        <BLink href="javascript: void(0);" class="avatar-group-item" v-b-tooltip.hover
                                          title="Christi">
                                          <img src="@/assets/images/users/avatar-4.jpg" alt=""
                                            class="rounded-circle avatar-xs" />
                                        </BLink>
                                        <BLink href="javascript: void(0);" class="avatar-group-item" v-b-tooltip.hover
                                          title="Frank Hook">
                                          <img src="@/assets/images/users/avatar-3.jpg" alt=""
                                            class="rounded-circle avatar-xs" />
                                        </BLink>
                                        <BLink href="javascript: void(0);" class="avatar-group-item" v-b-tooltip.hover
                                          title="Ruby">
                                          <div class="avatar-xs">
                                            <div class="avatar-title rounded-circle bg-light text-primary">
                                              R
                                            </div>
                                          </div>
                                        </BLink>
                                        <BLink href="javascript: void(0);" class="avatar-group-item" v-b-tooltip.hover
                                          title="more">
                                          <div class="avatar-xs">
                                            <div class="avatar-title rounded-circle">
                                              2+
                                            </div>
                                          </div>
                                        </BLink>
                                      </div>
                                    </div>
                                  </BCollapse>
                                </div>
                              </div>
                            </div>
                          </BTab>
                          <BTab title="Weekly">
                            <div class="profile-timeline">
                              <div class="accordion accordion-flush" id="weeklyExample">
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="heading6">
                                    <BLink class="accordion-button p-2 shadow-none" v-b-toggle.collapse6>
                                      <div class="d-flex">
                                        <div class="flex-shrink-0">
                                          <img src="@/assets/images/users/avatar-3.jpg" alt=""
                                            class="avatar-xs rounded-circle" />
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            Joseph Parker
                                          </h6>
                                          <small class="text-muted">New people joined with our company
                                            - Yesterday</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>
                                  <BCollapse id="collapse6" visible>
                                    <div class="accordion-body ms-2 ps-5">
                                      It makes a statement, it’s impressive
                                      graphic design. Increase or decrease the
                                      letter spacing depending on the situation
                                      and try, try again until it looks right,
                                      and each letter has the perfect spot of
                                      its own.
                                    </div>
                                  </BCollapse>
                                </div>
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="heading7">
                                    <BLink class="accordion-button p-2 shadow-none" data-bs-toggle="collapse"
                                      href="#collapse7" aria-expanded="false">
                                      <div class="d-flex">
                                        <div class="avatar-xs">
                                          <div class="avatar-title rounded-circle bg-light text-danger">
                                            <i class="ri-shopping-bag-line"></i>
                                          </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            Your order is placed
                                            <BBadge variant="success-subtle"
                                              class="bg-success-subtle text-success align-middle">
                                              Completed</BBadge>
                                          </h6>
                                          <small class="text-muted">These customers can rest assured
                                            their order has been placed - 1 week
                                            Ago</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>
                                </div>
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="heading8">
                                    <BLink class="accordion-button p-2 shadow-none" v-b-toggle.collapse8>
                                      <div class="d-flex">
                                        <div class="flex-shrink-0 avatar-xs">
                                          <div class="avatar-title bg-light text-success rounded-circle">
                                            <i class="ri-home-3-line"></i>
                                          </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            Velzon admin dashboard templates
                                            layout upload
                                          </h6>
                                          <small class="text-muted">We talked about a project on
                                            linkedin - 1 week Ago</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>

                                  <BCollapse id="collapse8" visible>
                                    <div class="accordion-body ms-2 ps-5 fst-italic">
                                      Powerful, clean & modern responsive
                                      bootstrap 5 admin template. The maximum
                                      file size for uploads in this demo :
                                      <BRow class="mt-2">
                                        <BCol xxl="6">
                                          <BRow class="border border-dashed gx-2 p-2">
                                            <BCol cols="3">
                                              <img src="@/assets/images/small/img-3.jpg" alt=""
                                                class="img-fluid rounded" />
                                            </BCol>
                                            <BCol cols="3">
                                              <img src="@/assets/images/small/img-5.jpg" alt=""
                                                class="img-fluid rounded" />
                                            </BCol>
                                            <BCol cols="3">
                                              <img src="@/assets/images/small/img-7.jpg" alt=""
                                                class="img-fluid rounded" />
                                            </BCol>
                                            <BCol cols="3">
                                              <img src="@/assets/images/small/img-9.jpg" alt=""
                                                class="img-fluid rounded" />
                                            </BCol>
                                          </BRow>
                                        </BCol>
                                      </BRow>
                                    </div>
                                  </BCollapse>
                                </div>
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="heading9">
                                    <BLink class="accordion-button p-2 shadow-none">
                                      <div class="d-flex">
                                        <div class="flex-shrink-0">
                                          <img src="@/assets/images/users/avatar-6.jpg" alt=""
                                            class="avatar-xs rounded-circle" />
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            New ticket created
                                            <BBadge class="bg-info-subtle text-info align-middle">Inprogress</BBadge>
                                          </h6>
                                          <small class="text-muted mb-2">User
                                            <span class="text-secondary">Jack365</span>
                                            submitted a ticket - 2 week
                                            Ago</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>
                                </div>
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="heading10">
                                    <BLink class="accordion-button p-2 shadow-none" v-b-toggle.collapse10>
                                      <div class="d-flex">
                                        <div class="flex-shrink-0">
                                          <img src="@/assets/images/users/avatar-5.jpg" alt=""
                                            class="avatar-xs rounded-circle" />
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            Jennifer Carter
                                          </h6>
                                          <small class="text-muted">Commented - 4 week Ago</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>
                                  <BCollapse id="collapse10" visible>
                                    <div class="accordion-body ms-2 ps-5">
                                      <p class="text-muted fst-italic mb-2">
                                        " This is an awesome admin dashboard
                                        template. It is extremely well
                                        structured and uses state of the art
                                        components (e.g. one of the only
                                        templates using bootstrap 5.1.3 so far).
                                        I integrated it into a Rails 6 project.
                                        Needs manual integration work of course
                                        but the template structure made it easy.
                                        "
                                      </p>
                                    </div>
                                  </BCollapse>
                                </div>
                              </div>
                            </div>
                          </BTab>
                          <BTab title="Monthly">
                            <div class="profile-timeline">
                              <div class="accordion accordion-flush" id="monthlyExample">
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="heading11">
                                    <BLink class="accordion-button p-2 shadow-none" v-b-toggle.collapse11>
                                      <div class="d-flex">
                                        <div class="flex-shrink-0 avatar-xs">
                                          <div class="avatar-title bg-light text-success rounded-circle">
                                            M
                                          </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            Megan Elmore
                                          </h6>
                                          <small class="text-muted">Adding a new event with attachments
                                            - 1 month Ago.</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>

                                  <BCollapse id="collapse11" visible>
                                    <div class="accordion-body ms-2 ps-5">
                                      <BRow class="g-2">
                                        <BCol cols="auto">
                                          <div class="d-flex border border-dashed p-2 rounded position-relative">
                                            <div class="flex-shrink-0">
                                              <i class="ri-image-2-line fs-17 text-danger"></i>
                                            </div>
                                            <div class="flex-grow-1 ms-2">
                                              <h6 class="mb-0">
                                                <BLink href="javascript:void(0);" class="stretched-link">Business
                                                  Template - UI/UX
                                                  design</BLink>
                                              </h6>
                                              <small>685 KB</small>
                                            </div>
                                          </div>
                                        </BCol>
                                        <BCol cols="auto">
                                          <div class="d-flex border border-dashed p-2 rounded position-relative">
                                            <div class="flex-shrink-0">
                                              <i class="ri-file-zip-line fs-17 text-info"></i>
                                            </div>
                                            <div class="flex-grow-1 ms-2">
                                              <h6 class="mb-0">
                                                <BLink href="javascript:void(0);" class="stretched-link">Bank Management
                                                  System -
                                                  PSD</BLink>
                                              </h6>
                                              <small>8.78 MB</small>
                                            </div>
                                          </div>
                                        </BCol>
                                        <BCol cols="auto">
                                          <div class="d-flex border border-dashed p-2 rounded position-relative">
                                            <div class="flex-shrink-0">
                                              <i class="ri-file-zip-line fs-17 text-info"></i>
                                            </div>
                                            <div class="flex-grow-1 ms-2">
                                              <h6 class="mb-0">
                                                <BLink href="javascript:void(0);" class="stretched-link">Bank Management
                                                  System -
                                                  PSD</BLink>
                                              </h6>
                                              <small>8.78 MB</small>
                                            </div>
                                          </div>
                                        </BCol>
                                      </BRow>
                                    </div>
                                  </BCollapse>
                                </div>
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="heading12">
                                    <BLink class="accordion-button p-2 shadow-none" v-b-toggle.collapse12>
                                      <div class="d-flex">
                                        <div class="flex-shrink-0">
                                          <img src="@/assets/images/users/avatar-2.jpg" alt=""
                                            class="avatar-xs rounded-circle" />
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            Jacqueline Steve
                                          </h6>
                                          <small class="text-muted">We has changed 2 attributes on 3
                                            month Ago</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>

                                  <BCollapse id="collapse12" visible>
                                    <div class="accordion-body ms-2 ps-5">
                                      In an awareness campaign, it is vital for
                                      people to begin put 2 and 2 together and
                                      begin to recognize your cause. Too much or
                                      too little spacing, as in the example
                                      below, can make things unpleasant for the
                                      reader. The goal is to make your text as
                                      comfortable to read as possible. A
                                      wonderful serenity has taken possession of
                                      my entire soul, like these sweet mornings
                                      of spring which I enjoy with my whole
                                      heart.
                                    </div>
                                  </BCollapse>
                                </div>
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="heading13">
                                    <BLink class="accordion-button p-2 shadow-none" v-b-toggle.collapse14>
                                      <div class="d-flex">
                                        <div class="flex-shrink-0">
                                          <img src="@/assets/images/users/avatar-5.jpg" alt=""
                                            class="avatar-xs rounded-circle" />
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            New ticket received
                                          </h6>
                                          <small class="text-muted mb-2">User
                                            <span class="text-secondary">Erica245</span>
                                            submitted a ticket - 5 month
                                            Ago</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>
                                </div>
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="heading14">
                                    <BLink class="accordion-button p-2 shadow-none" data-bs-toggle="collapse"
                                      href="#collapse14" aria-expanded="true">
                                      <div class="d-flex">
                                        <div class="flex-shrink-0 avatar-xs">
                                          <div class="avatar-title bg-light text-muted rounded-circle">
                                            <i class="ri-user-3-fill"></i>
                                          </div>
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            Nancy Martino
                                          </h6>
                                          <small class="text-muted">Commented on 24 Nov, 2021.</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>

                                  <BCollapse id="collapse14" visible>
                                    <div class="accordion-body ms-2 ps-5 fst-italic">
                                      " A wonderful serenity has taken
                                      possession of my entire soul, like these
                                      sweet mornings of spring which I enjoy
                                      with my whole heart. Each design is a new,
                                      unique piece of art birthed into this
                                      world, and while you have the opportunity
                                      to be creative and make your own style
                                      choices. "
                                    </div>
                                  </BCollapse>
                                </div>
                                <div class="accordion-item border-0">
                                  <div class="accordion-header" id="heading15">
                                    <BLink class="accordion-button p-2 shadow-none" v-b-toggle.collapse15>
                                      <div class="d-flex">
                                        <div class="flex-shrink-0">
                                          <img src="@/assets/images/users/avatar-7.jpg" alt=""
                                            class="avatar-xs rounded-circle" />
                                        </div>
                                        <div class="flex-grow-1 ms-3">
                                          <h6 class="fs-14 mb-1">
                                            Lewis Arnold
                                          </h6>
                                          <small class="text-muted">Create new project Building product
                                            - 8 month Ago</small>
                                        </div>
                                      </div>
                                    </BLink>
                                  </div>

                                  <BCollapse id="collapse15" visible>
                                    <div class="accordion-body ms-2 ps-5">
                                      <p class="text-muted mb-2">
                                        Every team project can have a velzon.
                                        Use the velzon to share information with
                                        your team to understand and contribute
                                        to your project.
                                      </p>
                                      <div class="avatar-group">
                                        <BLink href="javascript: void(0);" class="avatar-group-item" v-b-tooltip.hover
                                          title="Christi">
                                          <img src="@/assets/images/users/avatar-4.jpg" alt=""
                                            class="rounded-circle avatar-xs" />
                                        </BLink>
                                        <BLink href="javascript: void(0);" class="avatar-group-item" v-b-tooltip.hover
                                          title="Frank Hook">
                                          <img src="@/assets/images/users/avatar-3.jpg" alt=""
                                            class="rounded-circle avatar-xs" />
                                        </BLink>
                                        <BLink href="javascript: void(0);" class="avatar-group-item" v-b-tooltip.hover
                                          title=" Ruby">
                                          <div class="avatar-xs">
                                            <div class="avatar-title rounded-circle bg-light text-primary">
                                              R
                                            </div>
                                          </div>
                                        </BLink>
                                        <BLink href="javascript: void(0);" class="avatar-group-item" v-b-tooltip.hover
                                          title="more">
                                          <div class="avatar-xs">
                                            <div class="avatar-title rounded-circle">
                                              2+
                                            </div>
                                          </div>
                                        </BLink>
                                      </div>
                                    </div>
                                  </BCollapse>
                                </div>
                              </div>
                            </div>
                          </BTab>
                        </BTabs>
                      </BCardBody>
                    </BCard>
                  </BCol>
                </BRow>

                <BCard no-body>
                  <BCardBody>
                    <h5 class="card-title mb-3">Projects</h5>
                    <div class="swiper project-swiper">
                      <swiper :slides-per-view="3" :space-between="50">
                        <swiper-slide>
                          <div class="swiper-slide">
                            <BCard no-body class="profile-project-card shadow-none profile-project-success mb-0">
                              <BCardBody class="p-4">
                                <div class="d-flex">
                                  <div class="flex-grow-1 text-muted overflow-hidden">
                                    <h5 class="fs-14 text-truncate mb-1">
                                      <BLink href="#" class="text-body">ABC Project Customization</BLink>
                                    </h5>
                                    <p class="text-muted text-truncate mb-0">
                                      Last Update :
                                      <span class="fw-semibold text-body">4 hr Ago</span>
                                    </p>
                                  </div>
                                  <div class="flex-shrink-0 ms-2">
                                    <BBadge variant="warning-subtle" class="bg-warning-subtle text-warning fs-10">
                                      Inprogress
                                    </BBadge>
                                  </div>
                                </div>
                                <div class="d-flex mt-4">
                                  <div class="flex-grow-1">
                                    <div class="d-flex align-items-center gap-2">
                                      <div>
                                        <h5 class="fs-12 text-muted mb-0">
                                          Members :
                                        </h5>
                                      </div>
                                      <div class="avatar-group">
                                        <div class="avatar-group-item">
                                          <div class="avatar-xs">
                                            <img src="@/assets/images/users/avatar-4.jpg" alt=""
                                              class="rounded-circle img-fluid" />
                                          </div>
                                        </div>
                                        <div class="avatar-group-item">
                                          <div class="avatar-xs">
                                            <img src="@/assets/images/users/avatar-5.jpg" alt=""
                                              class="rounded-circle img-fluid" />
                                          </div>
                                        </div>
                                        <div class="avatar-group-item">
                                          <div class="avatar-xs">
                                            <div class="avatar-title rounded-circle bg-light text-primary">
                                              A
                                            </div>
                                          </div>
                                        </div>
                                        <div class="avatar-group-item">
                                          <div class="avatar-xs">
                                            <img src="@/assets/images/users/avatar-2.jpg" alt=""
                                              class="rounded-circle img-fluid" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </BCardBody>
                            </BCard>
                          </div>
                        </swiper-slide>
                        <swiper-slide>
                          <div class="swiper-slide">
                            <BCard no-body class="profile-project-card shadow-none profile-project-danger mb-0">
                              <BCardBody class="p-4">
                                <div class="d-flex">
                                  <div class="flex-grow-1 text-muted overflow-hidden">
                                    <h5 class="fs-14 text-truncate mb-1">
                                      <BLink href="#" class="text-body">Client - John</BLink>
                                    </h5>
                                    <p class="text-muted text-truncate mb-0">
                                      Last Update :
                                      <span class="fw-semibold text-body">1 hr Ago</span>
                                    </p>
                                  </div>
                                  <div class="flex-shrink-0 ms-2">
                                    <BBadge variant="success-subtle" class="bg-success-subtle text-success fs-10">
                                      Completed
                                    </BBadge>
                                  </div>
                                </div>
                                <div class="d-flex mt-4">
                                  <div class="flex-grow-1">
                                    <div class="d-flex align-items-center gap-2">
                                      <div>
                                        <h5 class="fs-12 text-muted mb-0">
                                          Members :
                                        </h5>
                                      </div>
                                      <div class="avatar-group">
                                        <div class="avatar-group-item">
                                          <div class="avatar-xs">
                                            <img src="@/assets/images/users/avatar-2.jpg" alt=""
                                              class="rounded-circle img-fluid" />
                                          </div>
                                        </div>
                                        <div class="avatar-group-item">
                                          <div class="avatar-xs">
                                            <div class="avatar-title rounded-circle bg-light text-primary">
                                              C
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </BCardBody>
                            </BCard>
                          </div>
                        </swiper-slide>
                        <swiper-slide>
                          <div class="swiper-slide">
                            <BCard no-body class="profile-project-card shadow-none profile-project-info mb-0">
                              <BCardBody class="p-4">
                                <div class="d-flex">
                                  <div class="flex-grow-1 text-muted overflow-hidden">
                                    <h5 class="fs-14 text-truncate mb-1">
                                      <BLink href="#" class="text-body">Brand logo Design</BLink>
                                    </h5>
                                    <p class="text-muted text-truncate mb-0">
                                      Last Update :
                                      <span class="fw-semibold text-body">2 hr Ago</span>
                                    </p>
                                  </div>
                                  <div class="flex-shrink-0 ms-2">
                                    <BBadge variant="warning-subtle" class="bg-warning-subtle text-warning fs-10">
                                      Inprogress
                                    </BBadge>
                                  </div>
                                </div>
                                <div class="d-flex mt-4">
                                  <div class="flex-grow-1">
                                    <div class="d-flex align-items-center gap-2">
                                      <div>
                                        <h5 class="fs-12 text-muted mb-0">
                                          Members :
                                        </h5>
                                      </div>
                                      <div class="avatar-group">
                                        <div class="avatar-group-item">
                                          <div class="avatar-xs">
                                            <img src="@/assets/images/users/avatar-5.jpg" alt=""
                                              class="rounded-circle img-fluid" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </BCardBody>
                            </BCard>
                          </div>
                        </swiper-slide>

                        <swiper-slide>
                          <div class="swiper-slide">
                            <BCard no-body class="profile-project-card shadow-none profile-project-danger mb-0">
                              <BCardBody class="p-4">
                                <div class="d-flex">
                                  <div class="flex-grow-1 text-muted overflow-hidden">
                                    <h5 class="fs-14 text-truncate mb-1">
                                      <BLink href="#" class="text-body">Project update</BLink>
                                    </h5>
                                    <p class="text-muted text-truncate mb-0">
                                      Last Update :
                                      <span class="fw-semibold text-body">4 hr Ago</span>
                                    </p>
                                  </div>
                                  <div class="flex-shrink-0 ms-2">
                                    <BBadge variant="success-subtle" class="bg-success-subtle text-success fs-10">
                                      Completed
                                    </BBadge>
                                  </div>
                                </div>

                                <div class="d-flex mt-4">
                                  <div class="flex-grow-1">
                                    <div class="d-flex align-items-center gap-2">
                                      <div>
                                        <h5 class="fs-12 text-muted mb-0">
                                          Members :
                                        </h5>
                                      </div>
                                      <div class="avatar-group">
                                        <div class="avatar-group-item">
                                          <div class="avatar-xs">
                                            <img src="@/assets/images/users/avatar-4.jpg" alt=""
                                              class="rounded-circle img-fluid" />
                                          </div>
                                        </div>
                                        <div class="avatar-group-item">
                                          <div class="avatar-xs">
                                            <img src="@/assets/images/users/avatar-5.jpg" alt=""
                                              class="rounded-circle img-fluid" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </BCardBody>
                            </BCard>
                          </div>
                        </swiper-slide>
                        <swiper-slide>
                          <div class="swiper-slide">
                            <BCard no-body class="profile-project-card shadow-none profile-project-warning mb-0">
                              <BCardBody class="p-4">
                                <div class="d-flex">
                                  <div class="flex-grow-1 text-muted overflow-hidden">
                                    <h5 class="fs-14 text-truncate mb-1">
                                      <BLink href="#" class="text-body">Chat App</BLink>
                                    </h5>
                                    <p class="text-muted text-truncate mb-0">
                                      Last Update :
                                      <span class="fw-semibold text-body">1 hr Ago</span>
                                    </p>
                                  </div>
                                  <div class="flex-shrink-0 ms-2">
                                    <BBadge variant="warning-subtle" class="bg-warning-subtle text-warning fs-10">
                                      Inprogress
                                    </BBadge>
                                  </div>
                                </div>

                                <div class="d-flex mt-4">
                                  <div class="flex-grow-1">
                                    <div class="d-flex align-items-center gap-2">
                                      <div>
                                        <h5 class="fs-12 text-muted mb-0">
                                          Members :
                                        </h5>
                                      </div>
                                      <div class="avatar-group">
                                        <div class="avatar-group-item">
                                          <div class="avatar-xs">
                                            <img src="@/assets/images/users/avatar-4.jpg" alt=""
                                              class="rounded-circle img-fluid" />
                                          </div>
                                        </div>
                                        <div class="avatar-group-item">
                                          <div class="avatar-xs">
                                            <img src="@/assets/images/users/avatar-5.jpg" alt=""
                                              class="rounded-circle img-fluid" />
                                          </div>
                                        </div>
                                        <div class="avatar-group-item">
                                          <div class="avatar-xs">
                                            <div class="avatar-title rounded-circle bg-light text-primary">
                                              A
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </BCardBody>
                            </BCard>
                          </div>
                        </swiper-slide>
                      </swiper>
                    </div>
                  </BCardBody>
                </BCard>
              </BCol>
            </BRow>
          </BTab>
          <BTab class="nav-item pt-4">
            <template #title>
              <i class="ri-list-unordered d-inline-block d-md-none"></i>
              <span class="d-none d-md-inline-block">Activities</span>
            </template>
            <BCard no-body>
              <BCardBody>
                <h5 class="card-title mb-3">Activities</h5>
                <div class="acitivity-timeline">
                  <div class="acitivity-item d-flex">
                    <div class="flex-shrink-0">
                      <img src="@/assets/images/users/avatar-1.jpg" alt=""
                        class="avatar-xs rounded-circle acitivity-avatar" />
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="mb-1">
                        Oliver Phillips
                        <BBadge variant="primary-subtle" class="text-primary align-middle">New</BBadge>
                      </h6>
                      <p class="text-muted mb-2">
                        We talked about a project on linkedin.
                      </p>
                      <small class="mb-0 text-muted">Today</small>
                    </div>
                  </div>
                  <div class="acitivity-item py-3 d-flex">
                    <div class="flex-shrink-0 avatar-xs acitivity-avatar">
                      <div class="avatar-title bg-success-subtle text-success rounded-circle">
                        N
                      </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="mb-1">
                        Nancy Martino
                        <BBadge variant="secondary-subtle" class="text-secondary align-middle">In Progress</BBadge>
                      </h6>
                      <p class="text-muted mb-2">
                        <i class="ri-file-text-line align-middle ms-2"></i>
                        Create new project Building product
                      </p>
                      <div class="avatar-group mb-2">
                        <BLink href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip"
                          data-bs-placement="top" title="" data-bs-original-title="Christi">
                          <img src="@/assets/images/users/avatar-4.jpg" alt="" class="rounded-circle avatar-xs" />
                        </BLink>
                        <BLink href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip"
                          data-bs-placement="top" title="" data-bs-original-title="Frank Hook">
                          <img src="@/assets/images/users/avatar-3.jpg" alt="" class="rounded-circle avatar-xs" />
                        </BLink>
                        <BLink href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip"
                          data-bs-placement="top" title="" data-bs-original-title=" Ruby">
                          <div class="avatar-xs">
                            <div class="avatar-title rounded-circle bg-light text-primary">
                              R
                            </div>
                          </div>
                        </BLink>
                        <BLink href="javascript: void(0);" class="avatar-group-item" data-bs-toggle="tooltip"
                          data-bs-placement="top" title="" data-bs-original-title="more">
                          <div class="avatar-xs">
                            <div class="avatar-title rounded-circle">2+</div>
                          </div>
                        </BLink>
                      </div>
                      <small class="mb-0 text-muted">Yesterday</small>
                    </div>
                  </div>
                  <div class="acitivity-item py-3 d-flex">
                    <div class="flex-shrink-0">
                      <img src="@/assets/images/users/avatar-2.jpg" alt=""
                        class="avatar-xs rounded-circle acitivity-avatar" />
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="mb-1">
                        Natasha Carey
                        <BBadge variant="success-subtle" class="text-success align-middle">Completed</BBadge>
                      </h6>
                      <p class="text-muted mb-2">
                        Adding a new event with attachments
                      </p>
                      <BRow>
                        <BCol xxl="4">
                          <BRow class="border border-dashed gx-2 p-2 mb-2">
                            <BCol cols="4">
                              <img src="@/assets/images/small/img-2.jpg" alt="" class="img-fluid rounded" />
                            </BCol>
                            <BCol cols="4">
                              <img src="@/assets/images/small/img-3.jpg" alt="" class="img-fluid rounded" />
                            </BCol>
                            <BCol cols="4">
                              <img src="@/assets/images/small/img-4.jpg" alt="" class="img-fluid rounded" />
                            </BCol>
                          </BRow>
                        </BCol>
                        <BCol lg="12">
                          <div class="mb-3">
                            <label for="jobDescription" class="form-label"
                              >Job Description</label
                            >
                            <textarea
                              class="form-control"
                              id="jobDescription"
                              rows="3"
                              placeholder="Enter description"
                            >
You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites. </textarea
                            >
                          </div>
                        </BCol>
                        <div class="hstack gap-2 justify-content-end">
                          <BLink
                            class="btn btn-success"
                            href="javascript:void(0);"
                            >Delete</BLink
                          >
                        </div>
                      </BRow>
                    </div>
                  </div>
                  <div id="newForm" style="display: none"></div>
                  <BCol lg="12">
                    <div class="hstack gap-2">
                      <BButton type="button" variant="success">
                        Update
                      </BButton>
                      <BLink href="javascript:void(0);" class="btn btn-primary"
                        >Add New</BLink
                      >
                    </div>
                  </BCol>
                </form>
              </BTab>
              <BTab title="Privacy Policy">
                <div class="mb-4 pb-2 pt-4">
                  <h5 class="card-title text-decoration-underline mb-3">
                    Security:
                  </h5>
                  <div class="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                    <div class="flex-grow-1">
                      <h6 class="fs-14 mb-1">Two-factor Authentication</h6>
                      <p class="text-muted">
                        Two-factor authentication is an enhanced security
                        meansur. Once enabled, you'll be required to give two
                        types of identification when you log into Google
                        Authentication and SMS are Supported.
                      </p>
                    </div>
                    <div class="flex-shrink-0 ms-sm-3">
                      <BLink
                        href="javascript:void(0);"
                        class="btn btn-sm btn-primary"
                        >Enable Two-facor Authentication
                      </BLink>
                    </div>
                  </div>
                  <div class="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                    <div class="flex-grow-1">
                      <h6 class="fs-14 mb-1">Secondary Verification</h6>
                      <p class="text-muted">
                        The first factor is a password and the second commonly
                        includes a text with a code sent to your smartphone, or
                        biometrics using your fingerprint, face, or retina.
                      </p>
                    </div>
                    <div class="flex-shrink-0 ms-sm-3">
                      <BLink
                        href="javascript:void(0);"
                        class="btn btn-sm btn-primary"
                        >Set up secondary method</BLink
                      >
                    </div>
                  </div>
                  <div class="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                    <div class="flex-grow-1">
                      <h6 class="fs-14 mb-1">Backup Codes</h6>
                      <p class="text-muted mb-sm-0">
                        A backup code is automatically generated for you when
                        you turn on two-factor authentication through your iOS
                        or Android Twitter app. You can also generate a backup
                        code on twitter.com.
                      </p>
                    </div>
                    <div class="flex-shrink-0 ms-sm-3">
                      <BLink
                        href="javascript:void(0);"
                        class="btn btn-sm btn-primary"
                        >Generate backup codes</BLink
                      >
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <h5 class="card-title text-decoration-underline mb-3">
                    Application Notifications:
                  </h5>
                  <ul class="list-unstyled mb-0">
                    <li class="d-flex">
                      <div class="flex-grow-1">
                        <label
                          for="directMessage"
                          class="form-check-label fs-14"
                          >Direct messages</label
                        >
                        <p class="text-muted">
                          Messages from people you follow
                        </p>
                      </div>
                      <div class="flex-shrink-0">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="directMessage"
                            checked
                          />
                        </div>
                      </div>
                    </li>
                    <li class="d-flex mt-2">
                      <div class="flex-grow-1">
                        <label
                          class="form-check-label fs-14"
                          for="desktopNotification"
                        >
                          Show desktop notifications
                        </label>
                        <p class="text-muted">
                          Choose the option you want as your default setting.
                          Block a site: Next to "Not allowed to send
                          notifications," click Add.
                        </p>
                      </div>
                      <div class="flex-shrink-0">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="desktopNotification"
                            checked
                          />
                        </div>
                      </div>
                    </li>
                    <li class="d-flex mt-2">
                      <div class="flex-grow-1">
                        <label
                          class="form-check-label fs-14"
                          for="emailNotification"
                        >
                          Show email notifications
                        </label>
                        <p class="text-muted">
                          Under Settings, choose Notifications. Under Select an
                          account, choose the account to enable notifications
                          for.
                        </p>
                      </div>
                      <div class="flex-shrink-0">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="emailNotification"
                          />
                        </div>
                      </div>
                    </li>
                    <li class="d-flex mt-2">
                      <div class="flex-grow-1">
                        <label
                          class="form-check-label fs-14"
                          for="chatNotification"
                        >
                          Show chat notifications
                        </label>
                        <p class="text-muted">
                          To prevent duplicate mobile notifications from the
                          Gmail and Chat apps, in settings, turn off Chat
                          notifications.
                        </p>
                      </div>
                      <div class="flex-shrink-0">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="chatNotification"
                          />
                        </div>
                      </div>
                    </li>
                    <li class="d-flex mt-2">
                      <div class="flex-grow-1">
                        <label
                          class="form-check-label fs-14"
                          for="purchaesNotification"
                        >
                          Show purchase notifications
                        </label>
                        <p class="text-muted">
                          Get real-time purchase alerts to protect yourself from
                          fraudulent charges.
                        </p>
                      </div>
                      <div class="flex-shrink-0">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="purchaesNotification"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 class="card-title text-decoration-underline mb-3">
                    Delete This Account:
                  </h5>
                  <p class="text-muted">
                    Go to the Data & Privacy section of your profile Account.
                    Scroll to "Your data & privacy options." Delete your Profile
                    Account. Follow the instructions to delete your account :
                  </p>
                  <div>
                    <input
                      type="password"
                      class="form-control"
                      id="passwordInput"
                      placeholder="Enter your password"
                      value="make@321654987"
                      style="max-width: 265px"
                    />
                  </div>
                  <div class="hstack gap-2 mt-3">
                    <BLink
                      href="javascript:void(0);"
                      class="btn btn-soft-danger"
                      >Close & Delete This Account</BLink
                    >
                    <BLink href="javascript:void(0);" class="btn btn-light"
                      >Cancel</BLink
                    >
                  </div>
                </div>
              </BTab>
            </BTabs>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
  </Layout>
</template>
