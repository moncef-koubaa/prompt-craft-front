<script>
import authService from "@/services/authService";

export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
    methods: {
      async register() {
        try {
          const response = await authService.signUp({
            email: this.email,
            username: this.username,
            password: this.password,
          });
          console.log("Registered:", response);
          this.$router.push("/auth/signin");
        } catch (error) {
          console.error("Signup error:", error);
          alert("Signup failed");
        }
      },
    },
    mounted() {
        var password = document.getElementById("password-input");
        password.onchange = this.validatePassword;
        document.querySelectorAll("form .auth-pass-inputgroup")
            .forEach(function (item) {
                item.querySelectorAll(".password-addon").forEach(function (subitem) {
                    subitem.addEventListener("click", function () {
                        var passwordInput = item.querySelector(".password-input");
                        if (passwordInput.type === "password") {
                            passwordInput.type = "text";
                        } else {
                            passwordInput.type = "password";
                        }
                    });
                });
            });



        var myInput = document.getElementById("password-input");
        var letter = document.getElementById("pass-lower");
        var capital = document.getElementById("pass-upper");
        var number = document.getElementById("pass-number");
        var length = document.getElementById("pass-length");

        // When the user clicks on the password field, show the message box
        myInput.onfocus = function () {
            document.getElementById("password-contain").style.display = "block";
        };

        // When the user clicks outside of the password field, hide the password-contain box
        myInput.onblur = function () {
            document.getElementById("password-contain").style.display = "none";
        };

        // When the user starts to type something inside the password field
        myInput.onkeyup = function () {
            // Validate lowercase letters
            var lowerCaseLetters = /[a-z]/g;
            if (myInput.value.match(lowerCaseLetters)) {
                letter.classList.remove("invalid");
                letter.classList.add("valid");
            } else {
                letter.classList.remove("valid");
                letter.classList.add("invalid");
            }

            // Validate capital letters
            var upperCaseLetters = /[A-Z]/g;
            if (myInput.value.match(upperCaseLetters)) {
                capital.classList.remove("invalid");
                capital.classList.add("valid");
            } else {
                capital.classList.remove("valid");
                capital.classList.add("invalid");
            }

            // Validate numbers
            var numbers = /[0-9]/g;
            if (myInput.value.match(numbers)) {
                number.classList.remove("invalid");
                number.classList.add("valid");
            } else {
                number.classList.remove("valid");
                number.classList.add("invalid");
            }

            // Validate length
            if (myInput.value.length >= 8) {
                length.classList.remove("invalid");
                length.classList.add("valid");
            } else {
                length.classList.remove("valid");
                length.classList.add("invalid");
            }
        };
    },

};
</script>

<template>
    <div class="auth-page-wrapper pt-5">
        <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div class="bg-overlay"></div>

            <div class="shape">

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1440 120">
                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                </svg>
            </div>
        </div>

        <div class="auth-page-content">
            <BContainer>
              <BRow>
                <BCol lg="12">
                  <div class="text-center mt-sm-5 mb-4 text-white-50">
                    <div>
                      <!--                <router-link to="/" class="d-inline-block auth-logo">-->
                      <!--                  <img src="@/assets/images/ai-generated-red-hard-background-free-photo.jpg" alt="" height="20">-->
                      <!--                </router-link>-->
                    </div>
                    <h1 class="text-light">Prompt Craft</h1>
                    <p class="mt-3 fs-15 fw-medium">Prompt and make funds</p>
                  </div>
                </BCol>
              </BRow>

                <BRow class="justify-content-center">
                    <BCol md="8" lg="6" xl="5">
                        <BCard no-body class="mt-4">

                            <BCardBody class="p-4">
                                <div class="text-center mt-2">
                                    <h5 class="text-primary">Create New Account</h5>
                                    <p class="text-muted">Get your free velzon account now</p>
                                </div>
                                <div class="p-2 mt-4">
                                    <form class="needs-validation" novalidate>

                                        <div class="mb-3">
                                            <label for="useremail" class="form-label">Email <span
                                                    class="text-danger">*</span></label>
                                            <input  v-model="email" type="email" class="form-control" id="useremail"
                                                placeholder="Enter email address" required>
                                            <div class="invalid-feedback">
                                                Please enter email
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="username" class="form-label">Username <span
                                                    class="text-danger">*</span></label>
                                            <input v-model="username" type="text" class="form-control" id="username"
                                                placeholder="Enter username" required>
                                            <div class="invalid-feedback">
                                                Please enter username
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label" for="password-input">Password</label>
                                            <div class="position-relative auth-pass-inputgroup">
                                                <input v-model="password" type="password" class="form-control pe-5 password-input"
                                                    onpaste="return false" placeholder="Enter password" id="password-input"
                                                    aria-describedby="passwordInput"
                                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required>
                                                <BButton variant="link"
                                                    class="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                    type="button" id="password-addon"><i
                                                        class="ri-eye-fill align-middle"></i></BButton>
                                                <div class="invalid-feedback">
                                                    Please enter password
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mb-4">
                                            <p class="mb-0 fs-12 text-muted fst-italic">By registering you agree to the
                                                Velzon <BLink href="#"
                                                    class="text-primary text-decoration-underline fst-normal fw-medium">
                                                    Terms
                                                    of Use</BLink>
                                            </p>
                                        </div>
                                        <div id="password-contain" class="p-3 bg-light mb-2 rounded">
                                            <h5 class="fs-13">Password must contain:</h5>
                                            <p id="pass-length" class="invalid fs-12 mb-2">Minimum <b>8 characters</b>
                                            </p>
                                            <p id="pass-lower" class="invalid fs-12 mb-2">At <b>lowercase</b> letter
                                                (a-z)</p>
                                            <p id="pass-upper" class="invalid fs-12 mb-2">At least <b>uppercase</b>
                                                letter (A-Z)</p>
                                            <p id="pass-number" class="invalid fs-12 mb-0">A least <b>number</b> (0-9)
                                            </p>
                                        </div>
                                        <div class="mt-4">
                                            <BButton variant="success" class="w-100" type="button" @click="register">Sign
                                                Up</BButton>
                                        </div>

                                        <div class="mt-4 text-center">
                                            <div class="signin-other-title">
                                                <h5 class="fs-13 mb-4 title text-muted">Create account with</h5>
                                            </div>

                                            <div>
                                                <BButton type="button" variant="primary" class="btn-icon"><i
                                                        class="ri-facebook-fill fs-16"></i></BButton>
                                                <BButton type="button" variant="danger" class="btn-icon ms-1"><i
                                                        class="ri-google-fill fs-16"></i></BButton>
                                                <BButton type="button" variant="dark" class="btn-icon ms-1"><i
                                                        class="ri-github-fill fs-16"></i></BButton>
                                                <BButton type="button" variant="info" class="btn-icon ms-1"><i
                                                        class="ri-twitter-fill fs-16"></i></BButton>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </BCardBody>
                        </BCard>

                        <div class="mt-4 text-center">
                            <p class="mb-0">Already have an account ? <router-link to="/auth/signin"
                                    class="fw-semibold text-primary text-decoration-underline"> Signin </router-link>
                            </p>
                        </div>
                    </BCol>
                </BRow>
            </BContainer>
        </div>

    </div>
</template>