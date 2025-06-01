<script>
import NavBar from "@/components/nav-bar";
import RightBar from "@/components/right-bar";
import Footer from "@/components/footer";

export default {
  watch: {
    $route: {
      handler: "onRoutechange",
      immediate: true,
      deep: true,
    },
  },
  methods: {
    onRoutechange(ele) {
      this.initActiveMenu(ele.path);
    },
    initActiveMenu(ele) {
      setTimeout(() => {
        if (document.querySelector("#navbar-nav")) {
          let a = document
            .querySelector("#navbar-nav")
            .querySelector('[href="' + ele + '"]');

          if (a) {
            a.classList.add("active");
            let parentCollapseDiv = a.closest(".collapse.menu-dropdown");
            if (parentCollapseDiv) {
              parentCollapseDiv.classList.add("show");
              parentCollapseDiv.parentElement.children[0].classList.add(
                "active"
              );
              parentCollapseDiv.parentElement.children[0].setAttribute(
                "aria-expanded",
                "true"
              );
              if (
                parentCollapseDiv.parentElement.closest(
                  ".collapse.menu-dropdown"
                )
              ) {
                parentCollapseDiv.parentElement
                  .closest(".collapse")
                  .classList.add("show");
                if (
                  parentCollapseDiv.parentElement.closest(".collapse")
                    .previousElementSibling
                )
                  parentCollapseDiv.parentElement
                    .closest(".collapse")
                    .previousElementSibling.classList.add("active");
              }
            }
          }
        }
      }, 1000);
    },
  },
  mounted() {
    if (document.querySelectorAll(".navbar-nav .collapse")) {
      let collapses = document.querySelectorAll(".navbar-nav .collapse");
      collapses.forEach((collapse) => {
        // Hide sibling collapses on `show.bs.collapse`
        collapse.addEventListener("show.bs.collapse", (e) => {
          e.stopPropagation();
          let closestCollapse = collapse.parentElement.closest(".collapse");
          if (closestCollapse) {
            let siblingCollapses =
              closestCollapse.querySelectorAll(".collapse");
            siblingCollapses.forEach((siblingCollapse) => {
              if (siblingCollapse.classList.contains("show")) {
                siblingCollapse.classList.remove("show");
                siblingCollapse.parentElement.firstChild.setAttribute(
                  "aria-expanded",
                  "false"
                );
              }
            });
          } else {
            let getSiblings = (elem) => {
              // Setup siblings array and get the first sibling
              let siblings = [];
              let sibling = elem.parentNode.firstChild;
              // Loop through each sibling and push to the array
              while (sibling) {
                if (sibling.nodeType === 1 && sibling !== elem) {
                  siblings.push(sibling);
                }
                sibling = sibling.nextSibling;
              }
              return siblings;
            };
            let siblings = getSiblings(collapse.parentElement);
            siblings.forEach((item) => {
              if (item.childNodes.length > 2) {
                item.firstElementChild.setAttribute("aria-expanded", "false");
                item.firstElementChild.classList.remove("active");
              }
              let ids = item.querySelectorAll("*[id]");
              ids.forEach((item1) => {
                item1.classList.remove("show");
                item1.parentElement.firstChild.setAttribute(
                  "aria-expanded",
                  "false"
                );
                item1.parentElement.firstChild.classList.remove("active");
                if (item1.childNodes.length > 2) {
                  let val = item1.querySelectorAll("ul li a");
                  val.forEach((subitem) => {
                    if (subitem.hasAttribute("aria-expanded"))
                      subitem.setAttribute("aria-expanded", "false");
                  });
                }
              });
            });
          }
        });
        // Hide nested collapses on `hide.bs.collapse`
        collapse.addEventListener("hide.bs.collapse", (e) => {
          e.stopPropagation();
          let childCollapses = collapse.querySelectorAll(".collapse");
          childCollapses.forEach((childCollapse) => {
            let childCollapseInstance = childCollapse;
            childCollapseInstance.classList.remove("show");
            childCollapseInstance.parentElement.firstChild.setAttribute(
              "aria-expanded",
              "false"
            );
          });
        });
      });
    }
  },
  components: {
    NavBar,
    RightBar,
    Footer,
  },
};
</script>

<template>
  <div>
    <div id="layout-wrapper">
      <NavBar />
      <!-- ========== App Menu ========== -->
<!--      <div class="app-menu navbar-menu">-->
<!--        &lt;!&ndash; LOGO &ndash;&gt;-->
<!--        <div class="navbar-brand-box">-->
<!--          &lt;!&ndash; Dark Logo&ndash;&gt;-->
<!--          <router-link to="/" class="logo logo-dark">-->
<!--            <span class="logo-sm">-->
<!--              <img src="@/assets/images/logo-sm.png" alt="" height="22" />-->
<!--            </span>-->
<!--            <span class="logo-lg">-->
<!--              <img src="@/assets/images/logo-dark.png" alt="" height="17" />-->
<!--            </span>-->
<!--          </router-link>-->
<!--          &lt;!&ndash; Light Logo&ndash;&gt;-->
<!--          <router-link to="/" class="logo logo-light">-->
<!--            <span class="logo-sm">-->
<!--              <img src="@/assets/images/logo-sm.png" alt="" height="22" />-->
<!--            </span>-->
<!--            <span class="logo-lg">-->
<!--              <img src="@/assets/images/logo-light.png" alt="" height="17" />-->
<!--            </span>-->
<!--          </router-link>-->
<!--          <BButton-->
<!--            size="sm"-->
<!--            class="p-0 fs-20 header-item float-end btn-vertical-sm-hover"-->
<!--            id="vertical-hover"-->
<!--          >-->
<!--            <i class="ri-record-circle-line"></i>-->
<!--          </BButton>-->
<!--        </div>-->
<!--        <div id="scrollbar">-->
<!--          <BContainer fluid>-->
<!--            <ul class="navbar-nav h-100" id="navbar-nav">-->
<!--              <li class="menu-title">-->
<!--                <span data-key="t-menu"> {{ "t-menu" }}</span>-->
<!--              </li>-->
<!--              <li class="nav-item">-->
<!--                <BLink-->
<!--                  class="nav-link menu-link"-->
<!--                  href="#sidebarDashboards"-->
<!--                  data-bs-toggle="collapse"-->
<!--                  role="button"-->
<!--                  aria-expanded="false"-->
<!--                  aria-controls="sidebarDashboards"-->
<!--                >-->
<!--                  <i class="ri-dashboard-2-line"></i>-->
<!--                  <span data-key="t-dashboards"> {{ "t-dashboards" }}</span>-->
<!--                </BLink>-->
<!--                <div class="collapse menu-dropdown" id="sidebarDashboards">-->
<!--                  <ul class="nav nav-sm flex-column">-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/dashboard/analytics"-->
<!--                        class="nav-link custom-abc"-->
<!--                        data-key="t-analytics"-->
<!--                      >-->
<!--                        {{ "t-analytics" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/dashboard/crm"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-crm"-->
<!--                      >-->
<!--                        {{ "t-crm" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-ecommerce"-->
<!--                      >-->
<!--                        {{ "t-ecommerce" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/dashboard/crypto"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-crypto"-->
<!--                      >-->
<!--                        {{ "t-crypto" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/dashboard/projects"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-projects"-->
<!--                      >-->
<!--                        {{ "t-projects" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/dashboard/nft"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-nft"-->
<!--                      >-->
<!--                        {{ "t-nft" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/dashboard/job"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-job"-->
<!--                      >-->
<!--                        {{ "t-job" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/dashboard/blog"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-blog"-->
<!--                      >-->
<!--                        {{ "t-blog" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                </div>-->
<!--              </li>-->
<!--              &lt;!&ndash; end Dashboard Menu &ndash;&gt;-->
<!--              <li class="nav-item">-->
<!--                <BLink-->
<!--                  class="nav-link menu-link"-->
<!--                  href="#sidebarApps"-->
<!--                  data-bs-toggle="collapse"-->
<!--                  role="button"-->
<!--                  aria-expanded="false"-->
<!--                  aria-controls="sidebarApps"-->
<!--                >-->
<!--                  <i class="ri-apps-2-line"></i>-->
<!--                  <span data-key="t-apps"> {{ "t-apps" }}</span>-->
<!--                </BLink>-->
<!--                <div class="collapse menu-dropdown" id="sidebarApps">-->
<!--                  <ul class="nav nav-sm flex-column">-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link menu-link"-->
<!--                        href="#sidebarCalendar"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarCalendar"-->
<!--                        data-key="t-calendar"-->
<!--                      >-->
<!--                        {{ "t-calendar" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarCalendar">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/main-calendar"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-main-calender"-->
<!--                            >-->
<!--                              {{ "t-main-calender" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/month-grid"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-month-grid"-->
<!--                            >-->
<!--                              {{ "t-month-grid" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/chat"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-chat"-->
<!--                      >-->
<!--                        {{ "t-chat" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebaremail"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebaremail"-->
<!--                        data-key="t-projects"-->
<!--                      >-->
<!--                        {{ "t-email" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebaremail">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/mailbox"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-mailbox"-->
<!--                            >-->
<!--                              {{ "t-mailbox" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <BLink-->
<!--                              class="nav-link"-->
<!--                              href="#sidebarsubemail"-->
<!--                              data-bs-toggle="collapse"-->
<!--                              role="button"-->
<!--                              aria-expanded="false"-->
<!--                              aria-controls="sidebarsubemail"-->
<!--                              data-key="t-projects"-->
<!--                            >-->
<!--                              {{ "t-email-templates" }}-->
<!--                            </BLink>-->
<!--                            <div-->
<!--                              class="collapse menu-dropdown"-->
<!--                              id="sidebarsubemail"-->
<!--                            >-->
<!--                              <ul class="nav nav-sm flex-column">-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/email/email-basic"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-products"-->
<!--                                  >-->
<!--                                    {{ "t-basic-action" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/email/email-ecommerce"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-products"-->
<!--                                  >-->
<!--                                    {{ "t-ecommerce-action" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                              </ul>-->
<!--                            </div>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarEcommerce"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarEcommerce"-->
<!--                        data-key="t-ecommerce"-->
<!--                      >-->
<!--                        {{ "t-ecommerce" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarEcommerce">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/ecommerce/products"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-products"-->
<!--                            >-->
<!--                              {{ "t-products" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/ecommerce/product-details"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-product-Details"-->
<!--                            >-->
<!--                              {{ "t-product-Details" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/ecommerce/add-product"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-create-product"-->
<!--                            >-->
<!--                              {{ "t-create-product" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/ecommerce/orders"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-orders"-->
<!--                            >-->
<!--                              {{ "t-orders" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/ecommerce/order-details"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-order-details"-->
<!--                            >-->
<!--                              {{ "t-order-details" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/ecommerce/customers"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-customers"-->
<!--                            >-->
<!--                              {{ "t-customers" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/ecommerce/shopping-cart"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-shopping-cart"-->
<!--                            >-->
<!--                              {{ "t-shopping-cart" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/ecommerce/checkout"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-checkout"-->
<!--                            >-->
<!--                              {{ "t-checkout" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/ecommerce/sellers"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-sellers"-->
<!--                            >-->
<!--                              {{ "t-sellers" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/ecommerce/seller-details"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-sellers-details"-->
<!--                            >-->
<!--                              {{ "t-sellers-details" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarProjects"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarProjects"-->
<!--                        data-key="t-projects"-->
<!--                      >-->
<!--                        {{ "t-projects" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarProjects">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/projects-list"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-list"-->
<!--                            >-->
<!--                              {{ "t-list" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/projects-overview"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-overview"-->
<!--                            >-->
<!--                              {{ "t-overview" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/projects-create"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-create-project"-->
<!--                            >-->
<!--                              {{ "t-create-project" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarTasks"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarTasks"-->
<!--                        data-key="t-tasks"-->
<!--                      >-->
<!--                        {{ "t-tasks" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarTasks">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/tasks-kanban"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-kanbanboard"-->
<!--                            >-->
<!--                              {{ "t-kanbanboard" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/tasks-list-view"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-list-view"-->
<!--                            >-->
<!--                              {{ "t-list-view" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/tasks-details"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-task-details"-->
<!--                            >-->
<!--                              {{ "t-task-details" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarCRM"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarCRM"-->
<!--                        data-key="t-crm"-->
<!--                      >-->
<!--                        {{ "t-crm" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarCRM">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/crm-contacts"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-contacts"-->
<!--                            >-->
<!--                              {{ "t-contacts" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/crm-companies"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-companies"-->
<!--                            >-->
<!--                              {{ "t-companies" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/crm-deals"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-deals"-->
<!--                            >-->
<!--                              {{ "t-deals" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/crm-leads"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-leads"-->
<!--                            >-->
<!--                              {{ "t-leads" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarCrypto"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarCrypto"-->
<!--                        data-key="t-crypto"-->
<!--                      >-->
<!--                        {{ "t-crypto" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarCrypto">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/crypto/transactions"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-transactions"-->
<!--                            >-->
<!--                              {{ "t-transactions" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/crypto/buy-sell"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-buy-sell"-->
<!--                            >-->
<!--                              {{ "t-buy-sell" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/crypto/orders"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-orders"-->
<!--                            >-->
<!--                              {{ "t-orders" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/crypto/wallet"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-my-wallet"-->
<!--                            >-->
<!--                              {{ "t-my-wallet" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/crypto/ico"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-ico-list"-->
<!--                            >-->
<!--                              {{ "t-ico-list" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/crypto/kyc"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-kyc-application"-->
<!--                            >-->
<!--                              {{ "t-kyc-application" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarInvoices"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarInvoices"-->
<!--                        data-key="t-invoices"-->
<!--                      >-->
<!--                        {{ "t-invoices" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarInvoices">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/invoices/list"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-list-view"-->
<!--                            >-->
<!--                              {{ "t-list-view" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/invoices/detail"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-details"-->
<!--                            >-->
<!--                              {{ "t-details" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/invoices/create"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-create-invoice"-->
<!--                            >-->
<!--                              {{ "t-create-invoice" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarTickets"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarTickets"-->
<!--                        data-key="t-supprt-tickets"-->
<!--                      >-->
<!--                        {{ "t-supprt-tickets" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarTickets">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/tickets-list"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-list-view"-->
<!--                            >-->
<!--                              {{ "t-list-view" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/tickets-details"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-ticket-details"-->
<!--                            >-->
<!--                              {{ "t-ticket-details" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#nftmarketplace"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="nftmarketplace"-->
<!--                        data-key="t-supprt-tickets"-->
<!--                      >-->
<!--                        {{ "t-nft-marketplace" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="nftmarketplace">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/nft-marketplace"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-list-view"-->
<!--                            >-->
<!--                              {{ "t-marketplace" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/nft-explore"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-ticket-details"-->
<!--                            >-->
<!--                              {{ "t-explore-now" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/nft-auction"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-ticket-details"-->
<!--                            >-->
<!--                              {{ "t-live-auction" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/nft-item-detail"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-ticket-details"-->
<!--                            >-->
<!--                              {{ "t-item-details" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/nft-collection"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-ticket-details"-->
<!--                            >-->
<!--                              {{ "t-collections" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/nft-creators"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-ticket-details"-->
<!--                            >-->
<!--                              {{ "t-creators" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/nft-ranking"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-ticket-details"-->
<!--                            >-->
<!--                              {{ "t-ranking" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/nft-wallet"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-ticket-details"-->
<!--                            >-->
<!--                              {{ "t-wallet-connect" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/apps/nft-create"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-ticket-details"-->
<!--                            >-->
<!--                              {{ "t-create-nft" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/apps-file-manager"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-file-manager"-->
<!--                      >-->
<!--                        {{ "t-file-manager" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/apps-todo"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-to-do"-->
<!--                      >-->
<!--                        {{ "t-to-do" }}-->
<!--                      </router-link>-->
<!--                    </li>-->

<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarjobs"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarjobs"-->
<!--                        data-key="t-jobs"-->
<!--                      >-->
<!--                        {{ "t-jobs" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarjobs">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/jobs/statistics"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-statistics"-->
<!--                            >-->
<!--                              {{ "t-statistics" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <BLink-->
<!--                              class="nav-link"-->
<!--                              href="#sidebarjoblists"-->
<!--                              data-bs-toggle="collapse"-->
<!--                              role="button"-->
<!--                              aria-expanded="false"-->
<!--                              aria-controls="sidebarjoblists"-->
<!--                              data-key="t-projects"-->
<!--                            >-->
<!--                              {{ "t-job-lists" }}-->
<!--                            </BLink>-->
<!--                            <div-->
<!--                              class="collapse menu-dropdown"-->
<!--                              id="sidebarjoblists"-->
<!--                            >-->
<!--                              <ul class="nav nav-sm flex-column">-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/jobs/lists"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-list"-->
<!--                                  >-->
<!--                                    {{ "t-list" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/jobs/grid-lists"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-grid"-->
<!--                                  >-->
<!--                                    {{ "t-grid" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/jobs/details"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-overview"-->
<!--                                  >-->
<!--                                    {{ "t-overview" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                              </ul>-->
<!--                            </div>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <BLink-->
<!--                              class="nav-link"-->
<!--                              href="#sidebarcandidatelists"-->
<!--                              data-bs-toggle="collapse"-->
<!--                              role="button"-->
<!--                              aria-expanded="false"-->
<!--                              aria-controls="sidebarcandidatelists"-->
<!--                              data-key="t-projects"-->
<!--                            >-->
<!--                              {{ "t-candidate-lists" }}-->
<!--                            </BLink>-->
<!--                            <div-->
<!--                              class="collapse menu-dropdown"-->
<!--                              id="sidebarcandidatelists"-->
<!--                            >-->
<!--                              <ul class="nav nav-sm flex-column">-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/jobs/candidate-lists"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-list"-->
<!--                                  >-->
<!--                                    {{ "t-list-view" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/jobs/candidate-grid"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-grid"-->
<!--                                  >-->
<!--                                    {{ "t-grid-view" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                              </ul>-->
<!--                            </div>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/jobs/application"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-application"-->
<!--                            >-->
<!--                              {{ "t-application" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/jobs/new"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-new"-->
<!--                            >-->
<!--                              {{ "t-new-job" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/jobs/companies-list"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-companies-list"-->
<!--                            >-->
<!--                              {{ "t-companies-list" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/jobs/categories"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-categories"-->
<!--                            >-->
<!--                              {{ "t-job-categories" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->

<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/apps-api-key"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-api-key"-->
<!--                      >-->
<!--                        {{ "t-api-key" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                </div>-->
<!--              </li>-->

<!--              <li class="menu-title">-->
<!--                <i class="ri-more-fill"></i>-->
<!--                <span data-key="t-pages">{{ "t-pages" }}</span>-->
<!--              </li>-->

<!--              <li class="nav-item">-->
<!--                <BLink-->
<!--                  class="nav-link menu-link"-->
<!--                  href="#sidebarAuth"-->
<!--                  data-bs-toggle="collapse"-->
<!--                  role="button"-->
<!--                  aria-expanded="false"-->
<!--                  aria-controls="sidebarAuth"-->
<!--                >-->
<!--                  <i class="ri-account-circle-line"></i>-->
<!--                  <span data-key="t-authentication">{{-->
<!--                    "t-authentication"-->
<!--                  }}</span>-->
<!--                </BLink>-->
<!--                <div class="collapse menu-dropdown" id="sidebarAuth">-->
<!--                  <ul class="nav nav-sm flex-column">-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarSignIn"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarSignIn"-->
<!--                        data-key="t-signin"-->
<!--                        >{{ "t-signin" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarSignIn">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/signin-basic"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-basic"-->
<!--                              >{{ "t-basic" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/signin-cover"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-cover"-->
<!--                              >{{ "t-cover" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarSignUp"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarSignUp"-->
<!--                        data-key="t-signup"-->
<!--                        >{{ "t-signup" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarSignUp">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/signup-basic"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-basic"-->
<!--                              >{{ "t-basic" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/signup-cover"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-cover"-->
<!--                              >{{ "t-cover" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->

<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarResetPass"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarResetPass"-->
<!--                        data-key="t-password-reset"-->
<!--                      >-->
<!--                        {{ "t-password-reset" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarResetPass">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/reset-pwd-basic"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-basic"-->
<!--                            >-->
<!--                              {{ "t-basic" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/reset-pwd-cover"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-cover"-->
<!--                            >-->
<!--                              {{ "t-cover" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarcreatepass"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarcreatepass"-->
<!--                        data-key="t-password-reset"-->
<!--                      >-->
<!--                        {{ "t-password-create" }}-->
<!--                      </BLink>-->
<!--                      <div-->
<!--                        class="collapse menu-dropdown"-->
<!--                        id="sidebarcreatepass"-->
<!--                      >-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/create-pwd-basic"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-basic"-->
<!--                            >-->
<!--                              {{ "t-basic" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/create-pwd-cover"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-cover"-->
<!--                            >-->
<!--                              {{ "t-cover" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->

<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarLockScreen"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarLockScreen"-->
<!--                        data-key="t-lock-screen"-->
<!--                      >-->
<!--                        {{ "t-lock-screen" }}-->
<!--                      </BLink>-->
<!--                      <div-->
<!--                        class="collapse menu-dropdown"-->
<!--                        id="sidebarLockScreen"-->
<!--                      >-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/lockscreen-basic"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-basic"-->
<!--                            >-->
<!--                              {{ "t-basic" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/lockscreen-cover"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-cover"-->
<!--                            >-->
<!--                              {{ "t-cover" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->

<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarLogout"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarLogout"-->
<!--                        data-key="t-logout"-->
<!--                      >-->
<!--                        {{ "t-logout" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarLogout">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/logout-basic"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-basic"-->
<!--                            >-->
<!--                              {{ "t-basic" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/logout-cover"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-cover"-->
<!--                            >-->
<!--                              {{ "t-cover" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarSuccessMsg"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarSuccessMsg"-->
<!--                        data-key="t-success-message"-->
<!--                      >-->
<!--                        {{ "t-success-message" }}-->
<!--                      </BLink>-->
<!--                      <div-->
<!--                        class="collapse menu-dropdown"-->
<!--                        id="sidebarSuccessMsg"-->
<!--                      >-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/success-msg-basic"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-basic"-->
<!--                            >-->
<!--                              {{ "t-basic" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/success-msg-cover"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-cover"-->
<!--                            >-->
<!--                              {{ "t-cover" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarTwoStep"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarTwoStep"-->
<!--                        data-key="t-two-step-verification"-->
<!--                      >-->
<!--                        {{ "t-two-step-verification" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarTwoStep">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/twostep-basic"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-basic"-->
<!--                            >-->
<!--                              {{ "t-basic" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/twostep-cover"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-cover"-->
<!--                            >-->
<!--                              {{ "t-cover" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarErrors"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarErrors"-->
<!--                        data-key="t-errors"-->
<!--                      >-->
<!--                        {{ "t-errors" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarErrors">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/404-basic"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-404-basic"-->
<!--                            >-->
<!--                              {{ "t-404-basic" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/404-cover"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-404-cover"-->
<!--                            >-->
<!--                              {{ "t-404-cover" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/404"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-404-alt"-->
<!--                            >-->
<!--                              {{ "t-404-alt" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/500"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-500"-->
<!--                            >-->
<!--                              {{ "t-500" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/auth/ofline"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-ofline-page"-->
<!--                            >-->
<!--                              {{ "t-offline-page" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                </div>-->
<!--              </li>-->

<!--              <li class="nav-item">-->
<!--                <BLink-->
<!--                  class="nav-link menu-link"-->
<!--                  href="#sidebarPages"-->
<!--                  data-bs-toggle="collapse"-->
<!--                  role="button"-->
<!--                  aria-expanded="false"-->
<!--                  aria-controls="sidebarPages"-->
<!--                >-->
<!--                  <i class="ri-pages-line"></i>-->
<!--                  <span data-key="t-pages">{{ "t-pages" }}</span>-->
<!--                </BLink>-->
<!--                <div class="collapse menu-dropdown" id="sidebarPages">-->
<!--                  <ul class="nav nav-sm flex-column">-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/pages/starter"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-starter"-->
<!--                        >{{ "t-starter" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarProfile"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarProfile"-->
<!--                        data-key="t-profile"-->
<!--                        >{{ "t-profile" }}-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarProfile">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/pages/profile"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-simple-page"-->
<!--                            >-->
<!--                              {{ "t-simple-page" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/pages/profile-setting"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-settings"-->
<!--                            >-->
<!--                              {{ "t-settings" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/pages/team"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-team"-->
<!--                      >-->
<!--                        {{ "t-team" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/pages/timeline"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-timeline"-->
<!--                      >-->
<!--                        {{ "t-timeline" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/pages/faqs"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-faqs"-->
<!--                      >-->
<!--                        {{ "t-faqs" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/pages/pricing"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-pricing"-->
<!--                      >-->
<!--                        {{ "t-pricing" }}-->
<!--                      </router-link>-->
<!--                    </li>-->

<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/pages/maintenance"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-maintenance"-->
<!--                      >-->
<!--                        {{ "t-maintenance" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/pages/coming-soon"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-coming-soon"-->
<!--                      >-->
<!--                        {{ "t-coming-soon" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/pages/sitemap"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-sitemap"-->
<!--                      >-->
<!--                        {{ "t-sitemap" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/pages/search-results"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-search-results"-->
<!--                      >-->
<!--                        {{ "t-search-results" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/pages/privacy-policy"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-privacy-policy"-->
<!--                      >-->
<!--                        {{ "t-privacy-policy" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        to="/pages/term-conditions"-->
<!--                        class="nav-link"-->
<!--                        data-key="t-term-conditions"-->
<!--                      >-->
<!--                        {{ "t-term-conditions" }}-->
<!--                      </router-link>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <a-->
<!--                        class="nav-link"-->
<!--                        href="#sidebarBlogs"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarBlogs"-->
<!--                        data-key="t-blogs"-->
<!--                        >{{ "t-blogs" }}-->
<!--                      </a>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarBlogs">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/blogs/list-view"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-list-view"-->
<!--                            >-->
<!--                              {{ "t-list-view" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/blogs/grid-view"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-grid-view"-->
<!--                            >-->
<!--                              {{ "t-grid-view" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/blogs/overview"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-overview"-->
<!--                            >-->
<!--                              {{ "t-overview" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                </div>-->
<!--              </li>-->
<!--              <li class="nav-item">-->
<!--                <BLink-->
<!--                  class="nav-link"-->
<!--                  href="#sidebarlanding"-->
<!--                  data-bs-toggle="collapse"-->
<!--                  role="button"-->
<!--                  aria-expanded="false"-->
<!--                  aria-controls="sidebarlanding"-->
<!--                  data-key="t-projects"-->
<!--                >-->
<!--                  <i class="ri-rocket-line"></i>-->
<!--                  {{ "t-landing" }}-->
<!--                </BLink>-->
<!--                <div class="collapse menu-dropdown" id="sidebarlanding">-->
<!--                  <ul class="nav nav-sm flex-column">-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link menu-link"-->
<!--                        target="_blank"-->
<!--                        href="/landing"-->
<!--                      >-->
<!--                        <span data-key="t-landing">{{ "t-one-page" }}</span>-->
<!--                      </BLink>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link menu-link"-->
<!--                        target="_blank"-->
<!--                        href="/nft-landing"-->
<!--                      >-->
<!--                        <span data-key="t-landing">{{ "t-nft-landing" }}</span>-->
<!--                      </BLink>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link menu-link"-->
<!--                        target="_blank"-->
<!--                        href="/job-landing"-->
<!--                      >-->
<!--                        <span data-key="t-landing">{{ "t-job" }}</span>-->
<!--                      </BLink>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                </div>-->
<!--              </li>-->

<!--              <li class="menu-title">-->
<!--                <i class="ri-more-fill"></i>-->
<!--                <span data-key="t-components">{{ "t-components" }}</span>-->
<!--              </li>-->

<!--              <li class="nav-item">-->
<!--                <BLink-->
<!--                  class="nav-link menu-link"-->
<!--                  href="#sidebarUI"-->
<!--                  data-bs-toggle="collapse"-->
<!--                  role="button"-->
<!--                  aria-expanded="false"-->
<!--                  aria-controls="sidebarUI"-->
<!--                >-->
<!--                  <i class="ri-pencil-ruler-2-line"></i>-->
<!--                  <span data-key="t-base-ui">{{ "t-base-ui" }}</span>-->
<!--                </BLink>-->
<!--                <div-->
<!--                  class="collapse menu-dropdown mega-dropdown-menu"-->
<!--                  id="sidebarUI"-->
<!--                >-->
<!--                  <BRow>-->
<!--                    <BCol lg="4">-->
<!--                      <ul class="nav nav-sm flex-column">-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/alerts"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-alerts"-->
<!--                            >{{ "t-alerts" }}-->
<!--                          </router-link>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/badges"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-badges"-->
<!--                            >{{ "t-badges" }}-->
<!--                          </router-link>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/buttons"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-buttons"-->
<!--                            >{{ "t-buttons" }}-->
<!--                          </router-link>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/colors"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-colors"-->
<!--                            >{{ "t-colors" }}-->
<!--                          </router-link>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/cards"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-cards"-->
<!--                            >{{ "t-cards" }}-->
<!--                          </router-link>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/carousel"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-carousel"-->
<!--                            >{{ "t-carousel" }}-->
<!--                          </router-link>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/dropdowns"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-dropdowns"-->
<!--                          >-->
<!--                            {{ "t-dropdowns" }}</router-link-->
<!--                          >-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/grid"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-grid"-->
<!--                            >{{ "t-grid" }}</router-link-->
<!--                          >-->
<!--                        </li>-->
<!--                      </ul>-->
<!--                    </BCol>-->
<!--                    <BCol lg="4">-->
<!--                      <ul class="nav nav-sm flex-column">-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/images"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-images"-->
<!--                            >{{ "t-images" }}-->
<!--                          </router-link>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/tabs"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-tabs"-->
<!--                            >{{ "t-tabs" }}</router-link-->
<!--                          >-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/accordions"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-accordion-collapse"-->
<!--                          >-->
<!--                            {{ "t-accordion-collapse" }}</router-link-->
<!--                          >-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/modals"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-modals"-->
<!--                            >{{ "t-modals" }}-->
<!--                          </router-link>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/offcanvas"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-offcanvas"-->
<!--                          >-->
<!--                            {{ "t-offcanvas" }}</router-link-->
<!--                          >-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/placeholders"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-placeholders"-->
<!--                          >-->
<!--                            {{ "t-placeholders" }}</router-link-->
<!--                          >-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/progress"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-progress"-->
<!--                            >{{ "t-progress" }}-->
<!--                          </router-link>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/notifications"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-notifications"-->
<!--                          >-->
<!--                            {{ "t-notifications" }}</router-link-->
<!--                          >-->
<!--                        </li>-->
<!--                      </ul>-->
<!--                    </BCol>-->
<!--                    <BCol lg="4">-->
<!--                      <ul class="nav nav-sm flex-column">-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/media"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-media-object"-->
<!--                          >-->
<!--                            {{ "t-media-object" }}</router-link-->
<!--                          >-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/embed-video"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-embed-video"-->
<!--                          >-->
<!--                            {{ "t-embed-video" }}</router-link-->
<!--                          >-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/typography"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-typography"-->
<!--                          >-->
<!--                            {{ "t-typography" }}</router-link-->
<!--                          >-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/lists"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-lists"-->
<!--                            >{{ "t-lists" }}-->
<!--                          </router-link>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/links"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-links"-->
<!--                            >{{ "t-links" }}</router-link-->
<!--                          >-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/general"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-general"-->
<!--                            >{{ "t-general" }}-->
<!--                          </router-link>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/ribbons"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-ribbons"-->
<!--                            >{{ "t-ribbons" }}-->
<!--                          </router-link>-->
<!--                        </li>-->
<!--                        <li class="nav-item">-->
<!--                          <router-link-->
<!--                            to="/ui/utilities"-->
<!--                            class="nav-link"-->
<!--                            data-key="t-utilities"-->
<!--                          >-->
<!--                            {{ "t-utilities" }}</router-link-->
<!--                          >-->
<!--                        </li>-->
<!--                      </ul>-->
<!--                    </BCol>-->
<!--                  </BRow>-->
<!--                </div>-->
<!--              </li>-->

<!--              <li class="nav-item">-->
<!--                <BLink-->
<!--                  class="nav-link"-->
<!--                  href="#sidebarMore"-->
<!--                  data-bs-toggle="collapse"-->
<!--                  role="button"-->
<!--                  aria-expanded="false"-->
<!--                  aria-controls="sidebarMore"-->
<!--                >-->
<!--                  <i class="ri-briefcase-2-line"></i> More-->
<!--                </BLink>-->
<!--                <div class="collapse menu-dropdown show" id="sidebarMore">-->
<!--                  <ul class="nav nav-sm flex-column">-->
<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link menu-link"-->
<!--                        href="#sidebarAdvanceUI"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarAdvanceUI"-->
<!--                      >-->
<!--                        <i class="ri-stack-line"></i>-->
<!--                        <span data-key="t-advance-ui">{{-->
<!--                          "t-advance-ui"-->
<!--                        }}</span>-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarAdvanceUI">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/advance-ui/sweetalerts"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-sweet-alerts"-->
<!--                            >-->
<!--                              {{ "t-sweet-alerts" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/advance-ui/scrollbar"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-scrollbar"-->
<!--                            >-->
<!--                              {{ "t-scrollbar" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/advance-ui/animation"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-animation"-->
<!--                            >-->
<!--                              {{ "t-animation" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/advance-ui/swiper"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-swiper-slider"-->
<!--                            >-->
<!--                              {{ "t-swiper-slider" }}</router-link-->
<!--                            >-->
<!--                          </li>-->

<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/advance-ui/highlight"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-highlight"-->
<!--                            >-->
<!--                              {{ "t-highlight" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/advance-ui/scrollspy"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-scrollSpy"-->
<!--                            >-->
<!--                              {{ "t-scrollSpy" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->

<!--                    <li class="nav-item">-->
<!--                      <router-link-->
<!--                        class="nav-link menu-link"-->
<!--                        href="#"-->
<!--                        to="/widgets"-->
<!--                      >-->
<!--                        <i class="ri-honour-line"></i>-->
<!--                        <span data-key="t-widgets">{{ "t-widgets" }}</span>-->
<!--                      </router-link>-->
<!--                    </li>-->

<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link menu-link"-->
<!--                        href="#sidebarForms"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarForms"-->
<!--                      >-->
<!--                        <i class="ri-file-list-3-line"></i>-->
<!--                        <span data-key="t-forms">{{ "t-forms" }}</span>-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarForms">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/form/elements"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-basic-elements"-->
<!--                            >-->
<!--                              {{ "t-basic-elements" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/form/select"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-form-select"-->
<!--                            >-->
<!--                              {{ "t-form-select" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/form/checkboxs-radios"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-checkboxs-radios"-->
<!--                            >-->
<!--                              {{ "t-checkboxs-radios" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/form/pickers"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-pickers"-->
<!--                            >-->
<!--                              {{ "t-pickers" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/form/masks"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-input-masks"-->
<!--                            >-->
<!--                              {{ "t-input-masks" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/form/advanced"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-advanced"-->
<!--                            >-->
<!--                              {{ "t-advanced" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/form/range-sliders"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-range-slider"-->
<!--                            >-->
<!--                              {{ "t-range-slider" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/form/validation"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-validation"-->
<!--                            >-->
<!--                              {{ "t-validation" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/form/wizard"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-wizard"-->
<!--                              >{{ "t-wizard" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/form/editors"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-editors"-->
<!--                              >{{ "t-editors" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/form/file-uploads"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-file-uploads"-->
<!--                            >-->
<!--                              {{ "t-file-uploads" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/form/layouts"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-form-layouts"-->
<!--                            >-->
<!--                              {{ "t-form-layouts" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->

<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link menu-link"-->
<!--                        href="#sidebarTables"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarTables"-->
<!--                      >-->
<!--                        <i class="ri-layout-grid-line"></i>-->
<!--                        <span data-key="t-tables">{{ "t-tables" }}</span>-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarTables">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/tables/basic"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-basic-tables"-->
<!--                            >-->
<!--                              {{ "t-basic-tables" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/tables/gridjs"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-grid-js"-->
<!--                              >{{ "t-grid-js" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->

<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link menu-link"-->
<!--                        href="#sidebarCharts"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarCharts"-->
<!--                      >-->
<!--                        <i class="ri-pie-chart-line"></i>-->
<!--                        <span data-key="t-charts">{{ "t-charts" }}</span>-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarCharts">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <BLink-->
<!--                              class="nav-link"-->
<!--                              href="#sidebarApexcharts"-->
<!--                              data-bs-toggle="collapse"-->
<!--                              role="button"-->
<!--                              aria-expanded="false"-->
<!--                              aria-controls="sidebarApexcharts"-->
<!--                              data-key="t-apexcharts"-->
<!--                            >-->
<!--                              {{ "t-apexcharts" }}-->
<!--                            </BLink>-->
<!--                            <div-->
<!--                              class="collapse menu-dropdown"-->
<!--                              id="sidebarApexcharts"-->
<!--                            >-->
<!--                              <ul class="nav nav-sm flex-column">-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-line"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-line"-->
<!--                                  >-->
<!--                                    {{ "t-line" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-area"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-area"-->
<!--                                  >-->
<!--                                    {{ "t-area" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-column"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-column"-->
<!--                                  >-->
<!--                                    {{ "t-column" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-bar"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-bar"-->
<!--                                  >-->
<!--                                    {{ "t-bar" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-mixed"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-mixed"-->
<!--                                  >-->
<!--                                    {{ "t-mixed" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-range-area"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-range-area"-->
<!--                                    >{{ "t-range-area" }}</router-link-->
<!--                                  >-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-funnel"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-funnel"-->
<!--                                    >{{ "t-funnel" }}</router-link-->
<!--                                  >-->
<!--                                </li>-->

<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-candlestick"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-candlstick"-->
<!--                                  >-->
<!--                                    {{ "t-candlstick" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-boxplot"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-boxplot"-->
<!--                                  >-->
<!--                                    {{ "t-boxplot" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-bubble"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-bubble"-->
<!--                                  >-->
<!--                                    {{ "t-bubble" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-scatter"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-scatter"-->
<!--                                  >-->
<!--                                    {{ "t-scatter" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-heatmap"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-heatmap"-->
<!--                                  >-->
<!--                                    {{ "t-heatmap" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-treemap"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-treemap"-->
<!--                                  >-->
<!--                                    {{ "t-treemap" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-pie"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-pie"-->
<!--                                  >-->
<!--                                    {{ "t-pie" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-radialbar"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-radialbar"-->
<!--                                  >-->
<!--                                    {{ "t-radialbar" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-radar"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-radar"-->
<!--                                  >-->
<!--                                    {{ "t-radar" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-polararea"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-polar-area"-->
<!--                                  >-->
<!--                                    {{ "t-polar-area" }}-->
<!--                                  </router-link>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <router-link-->
<!--                                    to="/charts/apex-slope"-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-slope"-->
<!--                                    >{{ "t-slope" }}</router-link-->
<!--                                  >-->
<!--                                </li>-->
<!--                              </ul>-->
<!--                            </div>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/charts/chartjs"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-chartjs"-->
<!--                            >-->
<!--                              {{ "t-chartjs" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/charts/echart"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-echarts"-->
<!--                              >{{ "t-echarts" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->

<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link menu-link"-->
<!--                        href="#sidebarIcons"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarIcons"-->
<!--                      >-->
<!--                        <i class="ri-compasses-2-line"></i>-->
<!--                        <span data-key="t-icons">{{ "t-icons" }}</span>-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarIcons">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/icons/remix"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-remix"-->
<!--                              >{{ "t-remix" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/icons/boxicons"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-boxicons"-->
<!--                            >-->
<!--                              {{ "t-boxicons" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/icons/materialdesign"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-material-design"-->
<!--                            >-->
<!--                              {{ "t-material-design" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/icons/lineawesome"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-line-awesome"-->
<!--                            >-->
<!--                              {{ "t-line-awesome" }}</router-link-->
<!--                            >-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/icons/feather"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-feather"-->
<!--                              >{{ "t-feather" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/icons/crypto"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-feather"-->
<!--                              >{{ "t-crypto-svg" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->

<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link menu-link"-->
<!--                        href="#sidebarMaps"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarMaps"-->
<!--                      >-->
<!--                        <i class="ri-map-pin-line"></i>-->
<!--                        <span data-key="t-maps">{{ "t-maps" }}</span>-->
<!--                      </BLink>-->
<!--                      <div class="collapse menu-dropdown" id="sidebarMaps">-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/maps/google"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-google"-->
<!--                            >-->
<!--                              {{ "t-google" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <router-link-->
<!--                              to="/maps/amcharts"-->
<!--                              class="nav-link"-->
<!--                              data-key="t-amchart"-->
<!--                            >-->
<!--                              {{ "t-amchart" }}-->
<!--                            </router-link>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->

<!--                    <li class="nav-item">-->
<!--                      <BLink-->
<!--                        class="nav-link menu-link"-->
<!--                        href="#sidebarMultilevel"-->
<!--                        data-bs-toggle="collapse"-->
<!--                        role="button"-->
<!--                        aria-expanded="false"-->
<!--                        aria-controls="sidebarMultilevel"-->
<!--                      >-->
<!--                        <i class="ri-share-line"></i>-->
<!--                        <span data-key="t-multi-level">{{-->
<!--                          "t-multi-level"-->
<!--                        }}</span>-->
<!--                      </BLink>-->
<!--                      <div-->
<!--                        class="collapse menu-dropdown"-->
<!--                        id="sidebarMultilevel"-->
<!--                      >-->
<!--                        <ul class="nav nav-sm flex-column">-->
<!--                          <li class="nav-item">-->
<!--                            <BLink class="nav-link" data-key="t-level-1.1">-->
<!--                              {{ "t-level-1.1" }}-->
<!--                            </BLink>-->
<!--                          </li>-->
<!--                          <li class="nav-item">-->
<!--                            <BLink-->
<!--                              class="nav-link"-->
<!--                              href="#sidebarAccount"-->
<!--                              data-bs-toggle="collapse"-->
<!--                              role="button"-->
<!--                              aria-expanded="false"-->
<!--                              aria-controls="sidebarAccount"-->
<!--                              data-key="t-level-1.2"-->
<!--                            >-->
<!--                              {{ "t-level-1.2" }}-->
<!--                            </BLink>-->
<!--                            <div-->
<!--                              class="collapse menu-dropdown"-->
<!--                              id="sidebarAccount"-->
<!--                            >-->
<!--                              <ul class="nav nav-sm flex-column">-->
<!--                                <li class="nav-item">-->
<!--                                  <BLink-->
<!--                                    class="nav-link"-->
<!--                                    data-key="t-level-2.1"-->
<!--                                  >-->
<!--                                    {{ "t-level-2.1" }}-->
<!--                                  </BLink>-->
<!--                                </li>-->
<!--                                <li class="nav-item">-->
<!--                                  <BLink-->
<!--                                    class="nav-link"-->
<!--                                    href="#sidebarCrm"-->
<!--                                    data-bs-toggle="collapse"-->
<!--                                    role="button"-->
<!--                                    aria-expanded="false"-->
<!--                                    aria-controls="sidebarCrm"-->
<!--                                    data-key="t-level-2.2"-->
<!--                                  >-->
<!--                                    {{ "t-level-2.2" }}-->
<!--                                  </BLink>-->
<!--                                  <div-->
<!--                                    class="collapse menu-dropdown"-->
<!--                                    id="sidebarCrm"-->
<!--                                  >-->
<!--                                    <ul class="nav nav-sm flex-column">-->
<!--                                      <li class="nav-item">-->
<!--                                        <BLink-->
<!--                                          class="nav-link"-->
<!--                                          data-key="t-level-3.1"-->
<!--                                        >-->
<!--                                          {{ "t-level-3.1" }}-->
<!--                                        </BLink>-->
<!--                                      </li>-->
<!--                                      <li class="nav-item">-->
<!--                                        <BLink-->
<!--                                          class="nav-link"-->
<!--                                          data-key="t-level-3.2"-->
<!--                                        >-->
<!--                                          {{ "t-level-3.2" }}-->
<!--                                        </BLink>-->
<!--                                      </li>-->
<!--                                    </ul>-->
<!--                                  </div>-->
<!--                                </li>-->
<!--                              </ul>-->
<!--                            </div>-->
<!--                          </li>-->
<!--                        </ul>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                </div>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </BContainer>-->
<!--          &lt;!&ndash; Sidebar &ndash;&gt;-->
<!--        </div>-->
<!--        &lt;!&ndash; Left Sidebar End &ndash;&gt;-->
<!--        &lt;!&ndash; Vertical Overlay&ndash;&gt;-->
<!--        <div class="vertical-overlay"></div>-->
<!--      </div>-->
      <!-- ============================================================== -->
      <!-- Start Page Content here -->
      <!-- ============================================================== -->

      <div class="main-content">
        <div class="page-content">
          <!-- Start Content-->
          <BContainer fluid>
            <slot />
          </BContainer>
        </div>
        <Footer />
      </div>
      <RightBar />
    </div>
  </div>
</template>
