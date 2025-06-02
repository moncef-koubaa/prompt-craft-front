<script>
import Layout from '@/layouts/main.vue';
import PageHeader from '@/components/page-header';
import PlansService from '@/services/plans.service';

export default {
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      plans: [],
    };
  },
  methods: {
    async buyPlan(planId) {
      try {
        const checkoutUrl = await PlansService.goToCheckout(planId);
        if (checkoutUrl) {
          window.location.href = checkoutUrl; // redirect to Stripe
        } else {
          console.error('No checkout URL returned');
        }
      } catch (error) {
        console.error('Checkout failed:', error);
      }
    },
  },
  computed: {
    tokenPlans() {
      return this.plans.filter((plan) => plan.resource === 'TOKEN');
    },
    currencyPlans() {
      return this.plans.filter((plan) => plan.resource === 'CURRENCY');
    },
  },
  async mounted() {
    this.plans = await PlansService.getPlans();
    console.log(this.plans);
  },
};
</script>

<template>
  <Layout>
    <PageHeader title="Pricing" pageTitle="Pages" />

    <!-- Intro Title -->
    <BRow class="justify-content-center mt-4 text-center">
      <BCol lg="6">
        <div class="mb-4">
          <h4 class="fw-semibold fs-22">Choose Your Plan</h4>
          <p class="text-muted mb-4 fs-15">
            Simple pricing. No hidden fees. Buy tokens or currency to get
            started.
          </p>
        </div>
      </BCol>
    </BRow>

    <!-- TOKEN SECTION -->
    <BRow class="justify-content-center text-center mb-5">
      <BCol cols="12">
        <h2 class="fw-bold display-6 mb-4 text-primary">💎 Buy Tokens</h2>
      </BCol>
      <BCol
        v-for="plan in tokenPlans"
        :key="plan.id"
        xxl="3"
        lg="4"
        md="6"
        class="d-flex justify-content-center mb-4"
      >
        <BCard no-body class="pricing-box w-100" style="max-width: 320px">
          <BCardBody class="bg-light p-4">
            <h5 class="fw-semibold mb-2">{{ plan.name }}</h5>
            <h2 class="text-success mb-3">${{ plan.price }}</h2>
            <p class="text-muted">{{ plan.description }}</p>
            <h3 class="mb-3">{{ plan.quantity }} Tokens</h3>
            <BButton @click="buyPlan(plan.id)" class="btn btn-info w-100">
              Buy Tokens
            </BButton>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>

    <!-- CURRENCY SECTION -->
    <BRow class="justify-content-center text-center">
      <BCol cols="12">
        <h2 class="fw-bold display-6 mb-4 text-success">💰 Buy Currency</h2>
      </BCol>
      <BCol
        v-for="plan in currencyPlans"
        :key="plan.id"
        xxl="3"
        lg="4"
        md="6"
        class="d-flex justify-content-center mb-4"
      >
        <BCard no-body class="pricing-box w-100" style="max-width: 320px">
          <BCardBody class="bg-light p-4">
            <h5 class="fw-semibold mb-2">{{ plan.name }}</h5>
            <h2 class="text-primary mb-3">${{ plan.price }}</h2>
            <p class="text-muted">{{ plan.description }}</p>
            <h3 class="mb-3">{{ plan.quantity }} Sigma Coins (SC)</h3>
            <BButton @click="buyPlan(plan.id)" class="btn btn-success w-100">
              Buy Currency
            </BButton>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
  </Layout>
</template>
