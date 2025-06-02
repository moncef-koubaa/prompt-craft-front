<script>
import authService from '@/services/authService';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      togglePassword: false,
      username: '',
      password: '',
      error: null
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async handleLogin(event) {
      event.preventDefault();
      try {
        console.log('login');
        console.log(this.username);
        console.log(this.password);
        const token = await authService.login({
          email: this.username,
          password: this.password
        });

        if (token) {
          this.$router.push('/'); // Replace with your actual protected route
        }
      } catch (err) {
        this.error = 'Invalid username or password';
        console.error(err);
      }
    }
  }
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
                  <h5 class="text-primary">Welcome Back !</h5>
                </div>
                <div class="p-2 mt-4">
                  <form  @submit="handleLogin">

                    <div class="mb-3">
                      <label for="username" class="form-label">Username</label>
                      <input v-model="username" type="text" class="form-control" id="username" placeholder="Enter username">
                    </div>

                    <div class="mb-3">
                      <div class="float-end">
                        <router-link to="/auth/reset-pwd-basic" class="text-muted">Forgot
                          password?</router-link>
                      </div>
                      <label class="form-label" for="password-input">Password</label>
                      <div class="position-relative auth-pass-inputgroup mb-3">
                        <input  v-model="password" :type="togglePassword ? 'text' : 'password'"
                         class="form-control pe-5" placeholder="Enter password" id="password-input">
                        <BButton variant="link" class="position-absolute end-0 top-0 text-decoration-none text-muted"
                          type="button" id="password-addon" @click="togglePassword = !togglePassword">
                          <i class="ri-eye-fill align-middle"></i></BButton>
                      </div>
                    </div>

                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="auth-remember-check">
                      <label class="form-check-label" for="auth-remember-check">Remember
                        me</label>
                    </div>

                    <div class="mt-4">
                      <BButton variant="success" class="w-100" type="submit">Sign   In</BButton>
                    </div>
                  </form>
                </div>
              </BCardBody>
            </BCard>

            <div class="mt-4 text-center">
              <p class="mb-0">Don't have an account ? <router-link to="/auth/signup"
                  class="fw-semibold text-primary text-decoration-underline"> Signup </router-link>
              </p>
            </div>

          </BCol>
        </BRow>
      </BContainer>
    </div>


  </div>
</template>