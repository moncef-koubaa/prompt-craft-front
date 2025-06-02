<script>

import axios from 'axios';
import Layout from "@/layouts/main.vue";

export default {

  data() {
    return {
      value: ['javascript'],
      date: null,
    };
  },
  components: {
    Layout
  },
  methods: {
    changepass() {
      var data = {
        password: document.getElementById('oldpasswordInput').value,
        new_password: document.getElementById('newpasswordInput').value,
        confirm_password: document.getElementById('confirmpasswordInput').value
      };
      axios.patch('https://api-node.themesbrand.website/updatepassword', data).then((data) => {
        console.log(data);
      }).catch((e) => {
        console.log(e);
      });
    },
    updatedata() {
      var userid = localStorage.getItem('userid');
      var data = {
        first_name: document.getElementById('firstnameInput').value,
        last_name: document.getElementById('lastnameInput').value,
        phone: document.getElementById('phonenumberInput').value,
        email: document.getElementById('emailInput').value,
        city: document.getElementById('cityInput').value,
        country: document.getElementById('countryInput').value,
        zipcode: document.getElementById('zipcodeInput').value,
      };
      axios.patch('https://api-node.themesbrand.website/user/' + userid, data).then((data) => {
        console.log(data);
      }).catch((e) => {
        console.log(e);
      });
    }
  },
};
</script>

<template>
  <Layout>
    <div class="position-relative mx-n4 mt-n4">
      <div class="profile-wid-bg profile-setting-img">
        <img src="@/assets/images/profile-bg.jpg" class="profile-wid-img" alt="" />
        <div class="overlay-content">
          <div class="text-end p-3">
            <div class="p-0 ms-auto rounded-circle profile-photo-edit">
              <input id="profile-foreground-img-file-input" type="file" class="profile-foreground-img-file-input" />
              <label for="profile-foreground-img-file-input" class="profile-photo-edit btn btn-light">
                <i class="ri-image-edit-line align-bottom me-1"></i> Change
                Cover
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BRow>
      <BCol xxl="3">
        <BCard no-body class="mt-n5">
          <BCardBody class="p-4">
            <div class="text-center">
              <div class="
                  profile-user
                  position-relative
                  d-inline-block
                  mx-auto
                  mb-4
                ">
                <img src="@/assets/images/users/avatar-1.jpg" class="
                    rounded-circle
                    avatar-xl
                    img-thumbnail
                    user-profile-image
                  " alt="user-profile-image" />
                <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                  <input id="profile-img-file-input" type="file" class="profile-img-file-input" />
                  <label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                    <span class="avatar-title rounded-circle bg-light text-body">
                      <i class="ri-camera-fill"></i>
                    </span>
                  </label>
                </div>
              </div>
              <h5 class="fs-16 mb-1">Anna Adame</h5>
              <p class="text-muted mb-0">Lead Designer / Developer</p>
            </div>
          </BCardBody>
        </BCard>
        <BCard no-body>
          <BCardBody>
            <div class="d-flex align-items-center mb-5">
              <div class="flex-grow-1">
                <h5 class="card-title mb-0">Complete Your Profile</h5>
              </div>
              <div class="flex-shrink-0">
                <BLink href="javascript:void(0);" class="badge bg-light text-primary fs-12"><i
                    class="ri-edit-box-line align-bottom me-1"></i> Edit</BLink>
              </div>
            </div>

            <BProgress class="animated-progress custom-progress progress-label">
              <BProgressBar :value="30" variant="danger">
                <div class="label">30%</div>
              </BProgressBar>
            </BProgress>
          </BCardBody>
        </BCard>
        <BCard no-body>
          <BCardBody>
            <div class="d-flex align-items-center mb-4">
              <div class="flex-grow-1">
                <h5 class="card-title mb-0">Portfolio</h5>
              </div>
              <div class="flex-shrink-0">
                <BLink href="javascript:void(0);" class="badge bg-light text-primary fs-12"><i
                    class="ri-add-fill align-bottom me-1"></i> Add</BLink>
              </div>
            </div>
            <div class="mb-3 d-flex">
              <div class="avatar-xs d-block flex-shrink-0 me-3">
                <span class="avatar-title rounded-circle fs-16 bg-body text-body">
                  <i class="ri-github-fill"></i>
                </span>
              </div>
              <input type="email" class="form-control" id="gitUsername" placeholder="Username" value="@daveadame" />
            </div>
            <div class="mb-3 d-flex">
              <div class="avatar-xs d-block flex-shrink-0 me-3">
                <span class="avatar-title rounded-circle fs-16 bg-primary">
                  <i class="ri-global-fill"></i>
                </span>
              </div>
              <input type="text" class="form-control" id="websiteInput" placeholder="www.example.com"
                value="www.velzon.com" />
            </div>
            <div class="mb-3 d-flex">
              <div class="avatar-xs d-block flex-shrink-0 me-3">
                <span class="avatar-title rounded-circle fs-16 bg-success">
                  <i class="ri-dribbble-fill"></i>
                </span>
              </div>
              <input type="text" class="form-control" id="dribbleName" placeholder="Username" value="@dave_adame" />
            </div>
            <div class="d-flex">
              <div class="avatar-xs d-block flex-shrink-0 me-3">
                <span class="avatar-title rounded-circle fs-16 bg-danger">
                  <i class="ri-pinterest-fill"></i>
                </span>
              </div>
              <input type="text" class="form-control" id="pinterestName" placeholder="Username" value="Advance Dave" />
            </div>
          </BCardBody>
        </BCard>
      </BCol>
      <BCol xxl="9">
        <BCard no-body class="mt-xxl-n5">
          <BCardBody class="p-4 pt-2">
            <BTabs nav-class="nav-tabs-custom rounded border-bottom-0" >
              <BTab class="nav-item" title="Personal Details" active>
                <form action="javascript:void(0);">
                  <BRow class="pt-4">
                    <BCol lg="6">
                      <div class="mb-3">
                        <label for="firstnameInput" class="form-label">First Name</label>
                        <input type="text" class="form-control" id="firstnameInput" placeholder="Enter your firstname"
                          value="Dave" />
                      </div>
                    </BCol>
                    <BCol lg="6">
                      <div class="mb-3">
                        <label for="lastnameInput" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="lastnameInput" placeholder="Enter your lastname"
                          value="Adame" />
                      </div>
                    </BCol>
                    <BCol lg="6">
                      <div class="mb-3">
                        <label for="phonenumberInput" class="form-label">Phone Number</label>
                        <input type="text" class="form-control" id="phonenumberInput"
                          placeholder="Enter your phone number" value="+(1) 987 6543" />
                      </div>
                    </BCol>
                    <BCol lg="6">
                      <div class="mb-3">
                        <label for="emailInput" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="emailInput" placeholder="Enter your email"
                          value="daveadame@velzon.com" />
                      </div>
                    </BCol>
                  
                    
                    
                    <BCol lg="4">
                      <div class="mb-3">
                        <label for="cityInput" class="form-label">City</label>
                        <input type="text" class="form-control" id="cityInput" placeholder="City" value="California" />
                      </div>
                    </BCol>
                    <BCol lg="4">
                      <div class="mb-3">
                        <label for="countryInput" class="form-label">Country</label>
                        <input type="text" class="form-control" id="countryInput" placeholder="Country"
                          value="United States" />
                      </div>
                    </BCol>
                    <BCol lg="4">
                      <div class="mb-3">
                        <label for="zipcodeInput" class="form-label">Zip Code</label>
                        <input type="text" class="form-control" minlength="5" maxlength="6" id="zipcodeInput"
                          placeholder="Enter zipcode" value="90011" />
                      </div>
                    </BCol>
                    <BCol lg="12">
                      <div class="hstack gap-2 justify-content-end">
                        <BButton type="submit" variant="primary" @click="updatedata">
                          Updates
                        </BButton>
                        <BButton type="button" variant="soft-success">
                          Cancel
                        </BButton>
                      </div>
                    </BCol>
                  </BRow>
                </form>
              </BTab>
              <BTab title="Change Password">
                <form action="javascript:void(0);">
                  <BRow class="g-2 pt-4">
                    <BCol lg="4">
                      <div>
                        <label for="oldpasswordInput" class="form-label">Old Password*</label>
                        <input type="password" class="form-control" id="oldpasswordInput"
                          placeholder="Enter current password" />
                      </div>
                    </BCol>
                    <BCol lg="4">
                      <div>
                        <label for="newpasswordInput" class="form-label">New Password*</label>
                        <input type="password" class="form-control" id="newpasswordInput"
                          placeholder="Enter new password" />
                      </div>
                    </BCol>
                    <BCol lg="4">
                      <div>
                        <label for="confirmpasswordInput" class="form-label">Confirm Password*</label>
                        <input type="password" class="form-control" id="confirmpasswordInput"
                          placeholder="Confirm password" />
                      </div>
                    </BCol>
                    <BCol lg="12">
                      <div class="mb-3">
                        <BLink href="javascript:void(0);" class="link-primary text-decoration-underline">Forgot
                          Password
                          ?</BLink>
                      </div>
                    </BCol>
                    <BCol lg="12">
                      <div class="text-end">
                        <BButton type="submit" variant="success" @click="changepass">
                          Change Password
                        </BButton>
                      </div>
                    </BCol>
                  </BRow>
                </form>
                <div class="mt-4 mb-3 border-bottom pb-2">
                  <div class="float-end">
                    <BLink href="javascript:void(0);" class="link-primary">All Logout</BLink>
                  </div>
                  <h5 class="card-title">Login History</h5>
                </div>
                <div class="d-flex align-items-center mb-3">
                  <div class="flex-shrink-0 avatar-sm">
                    <div class="avatar-title bg-light text-primary rounded-3 fs-18">
                      <i class="ri-smartphone-line"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6>iPhone 12 Pro</h6>
                    <p class="text-muted mb-0">
                      Los Angeles, United States - March 16 at 2:47PM
                    </p>
                  </div>
                  <div>
                    <BLink href="javascript:void(0);">Logout</BLink>
                  </div>
                </div>
                <div class="d-flex align-items-center mb-3">
                  <div class="flex-shrink-0 avatar-sm">
                    <div class="avatar-title bg-light text-primary rounded-3 fs-18">
                      <i class="ri-tablet-line"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6>Apple iPad Pro</h6>
                    <p class="text-muted mb-0">
                      Washington, United States - November 06 at 10:43AM
                    </p>
                  </div>
                  <div>
                    <BLink href="javascript:void(0);">Logout</BLink>
                  </div>
                </div>
                <div class="d-flex align-items-center mb-3">
                  <div class="flex-shrink-0 avatar-sm">
                    <div class="avatar-title bg-light text-primary rounded-3 fs-18">
                      <i class="ri-smartphone-line"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6>Galaxy S21 Ultra 5G</h6>
                    <p class="text-muted mb-0">
                      Conneticut, United States - June 12 at 3:24PM
                    </p>
                  </div>
                  <div>
                    <BLink href="javascript:void(0);">Logout</BLink>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0 avatar-sm">
                    <div class="avatar-title bg-light text-primary rounded-3 fs-18">
                      <i class="ri-macbook-line"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6>Dell Inspiron 14</h6>
                    <p class="text-muted mb-0">
                      Phoenix, United States - July 26 at 8:10AM
                    </p>
                  </div>
                  <div>
                    <BLink href="javascript:void(0);">Logout</BLink>
                  </div>
                </div>
              </BTab>
              <BTab title="Privacy Policy">
                
                <div class="mb-3">
                  <h5 class="card-title text-decoration-underline mb-3">
                    Application Notifications:
                  </h5>
                  <ul class="list-unstyled mb-0">
                    <li class="d-flex">
                      <div class="flex-grow-1">
                        <label for="directMessage" class="form-check-label fs-14">New bid on auction</label>
                        <p class="text-muted">
                          You will be notified when a new bid is placed on your own auction
                        </p>
                      </div>
                      <div class="flex-shrink-0">
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" role="switch" id="directMessage" checked />
                        </div>
                      </div>
                    </li>
                    <li class="d-flex mt-2">
                      <div class="flex-grow-1">
                        <label class="form-check-label fs-14" for="desktopNotification">
                          End of your auction
                        </label>
                        <p class="text-muted">
                          You will be notified when an auction you created has ended.
                        </p>
                      </div>
                      <div class="flex-shrink-0">
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" role="switch" id="desktopNotification"
                            checked />
                        </div>
                      </div>
                    </li>
                    <li class="d-flex mt-2">
                      <div class="flex-grow-1">
                        <label class="form-check-label fs-14" for="emailNotification">
                          Higher bid on auction
                        </label>
                        <p class="text-muted">
                          You will be notified when a higher bid is placed on an auction you are participating in.
                        </p>
                      </div>
                      <div class="flex-shrink-0">
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" role="switch" id="emailNotification" />
                        </div>
                      </div>
                    </li>
                    <li class="d-flex mt-2">
                      <div class="flex-grow-1">
                        <label class="form-check-label fs-14" for="chatNotification">
                          End of auction
                        </label>
                        <p class="text-muted">
                          You will be notified when an auction you are participating in has ended.
                        </p>
                      </div>
                      <div class="flex-shrink-0">
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" role="switch" id="chatNotification" />
                        </div>
                      </div>
                    </li>
                    <li class="d-flex mt-2">
                      <div class="flex-grow-1">
                        <label class="form-check-label fs-14" for="purchaesNotification">
                          Show purchase notifications
                        </label>
                        <p class="text-muted">
                          Get real-time purchase alerts to protect yourself from
                          fraudulent charges.
                        </p>
                      </div>
                      <div class="flex-shrink-0">
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" role="switch" id="purchaesNotification" />
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
                    You cannot undo this action. This will permanently delete your account and all of its data.
                  </p>
                  <div>
                    <input type="password" class="form-control" id="passwordInput" placeholder="Enter your password"
                      value="make@321654987" style="max-width: 265px" />
                  </div>
                  <div class="hstack gap-2 mt-3">
                    <BLink href="javascript:void(0);" class="btn btn-soft-danger">Close & Delete This Account</BLink>
                    <BLink href="javascript:void(0);" class="btn btn-light">Cancel</BLink>
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