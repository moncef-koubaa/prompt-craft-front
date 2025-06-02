<script>
import { layoutMethods } from "@/state/helpers";

import simplebar from "simplebar-vue";

import i18n from "../i18n";
import { useNotificationStore } from "@/stores/notification";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted , ref} from "vue";
import { notificationService } from "@/services/notificationService";
import userService from "@/services/userService";
/**
 * Nav-bar Component
 */
export default {
  setup() {
    const myBalance = ref(0);
    const notificationStore = useNotificationStore();
    let { notifications, unreadCount, isConnected, error, notificationCount } =
      storeToRefs(notificationStore);

    // Fetch unread notifications after component mounts
    onMounted(async () => {
      try {
        const unread = await notificationService.getUnreadNotifications();
        notifications.value = notifications.value.concat(unread);
        console.log("notification filler", notifications.value);
        notificationCount.value += unread.length;
        console.log("notification count", notificationCount.value);
        myBalance.value = await userService.getBalance();
        console.log("my balance", this.myBalance);
      } catch (err) {
        console.error("Failed to fetch unread notifications", err);
      }
    });

    // Cleanup SSE connection on unmount
    onUnmounted(() => {
      setTimeout(() => notificationStore.disconnectSSE(), 0);
    });

    return {
      notificationStore,
      notifications,
      unreadCount,
      isConnected,
      error,
      notificationCount,
      myBalance,
    };
  },
  data() {
    return {
      username: null,
      useremail: null,
      lan: i18n.locale,
      text: null,
      flag: null,
      value: null,
      myVar: 1,

    };
  },
  components: {
    simplebar,
  },
  methods: {
    ...layoutMethods,
    isCustomDropdown() {
      //Search bar
    },
    toggleHamburgerMenu() {
      var windowSize = document.documentElement.clientWidth;
      let layoutType = document.documentElement.getAttribute("data-layout");

      document.documentElement.setAttribute("data-sidebar-visibility", "show");
      let visiblilityType = document.documentElement.getAttribute(
        "data-sidebar-visibility"
      );

      if (windowSize > 767)
        document.querySelector(".hamburger-icon").classList.toggle("open");

      //For collapse horizontal menu
      if (
        document.documentElement.getAttribute("data-layout") === "horizontal"
      ) {
        document.body.classList.contains("menu")
          ? document.body.classList.remove("menu")
          : document.body.classList.add("menu");
      }

      //For collapse vertical menu

      if (
        visiblilityType === "show" &&
        (layoutType === "vertical" || layoutType === "semibox")
      ) {
        if (windowSize < 1025 && windowSize > 767) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.documentElement.getAttribute("data-sidebar-size") == "sm"
            ? document.documentElement.setAttribute("data-sidebar-size", "")
            : document.documentElement.setAttribute("data-sidebar-size", "sm");
        } else if (windowSize > 1025) {
          document.body.classList.remove("vertical-sidebar-enable");
          document.documentElement.getAttribute("data-sidebar-size") == "lg"
            ? document.documentElement.setAttribute("data-sidebar-size", "sm")
            : document.documentElement.setAttribute("data-sidebar-size", "lg");
        } else if (windowSize <= 767) {
          document.body.classList.add("vertical-sidebar-enable");
          document.documentElement.setAttribute("data-sidebar-size", "lg");
        }
      }

      //Two column menu
      if (document.documentElement.getAttribute("data-layout") == "twocolumn") {
        document.body.classList.contains("twocolumn-panel")
          ? document.body.classList.remove("twocolumn-panel")
          : document.body.classList.add("twocolumn-panel");
      }
    },
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    toggleDarkMode() {
      if (document.documentElement.getAttribute("data-bs-theme") == "dark") {
        document.documentElement.setAttribute("data-bs-theme", "light");
      } else {
        document.documentElement.setAttribute("data-bs-theme", "dark");
      }

      const mode = document.documentElement.getAttribute("data-bs-theme");
      this.changeMode({
        mode: mode,
      });
    },

    markAllRead() {
      notificationService.markAllNotificationsAsRead();
      this.notifications = [];
      this.notificationCount = 0;
    },
    async markAsRead(notificationId) {
      this.slidingOut = notificationId;

      // Remove the notification after the animation completes
      setTimeout(() => {
        this.notifications = this.notifications.filter(
          (notification) => notification.id !== notificationId
        );
        this.slidingOut = null;
        this.notificationCount--;
      }, 500); // Match the animation duration
      await notificationService.markNotificationAsRead(notificationId);
    },
    isNotificationSlidingOut(id) {
      return this.slidingOut === id;
    },
  },

  computed: {
    calculateTotalPrice() {
      return this.cartItems
        .reduce((total, item) => total + parseFloat(item.itemPrice), 0)
        .toFixed(2);
    },
  },
  async mounted() {
    this.username = await userService.getUsername();
    this.useremail = await userService.getEmail();
    if (process.env.VUE_APP_I18N_LOCALE) {
      this.flag = process.env.VUE_APP_I18N_LOCALE;
      this.languages.forEach((item) => {
        if (item.language == this.flag) {
          document
            .getElementById("header-lang-img")
            .setAttribute("src", item.flag);
        }
      });
    }

    document.addEventListener("scroll", function () {
      var pageTopbar = document.getElementById("page-topbar");
      if (pageTopbar) {
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
          ? pageTopbar.classList.add("topbar-shadow")
          : pageTopbar.classList.remove("topbar-shadow");
      }
    });
    if (document.getElementById("topnav-hamburger-icon"))
      document
        .getElementById("topnav-hamburger-icon")
        .addEventListener("click", this.toggleHamburgerMenu);

    this.isCustomDropdown();
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="layout-width">
      <div class="navbar-header">
        <div class="d-flex">
          <!-- LOGO -->
          <div class="navbar-brand-box horizontal-logo">
            <router-link to="/" class="logo logo-dark">
              <!-- <span class="logo-sm">
                <img src="@/assets/images/logo-sm.png" alt="" height="22" />
              </span> -->
              <span class="logo-lg">
                <img src="@/assets/images/logo.png" class="h-20 w-20" />
              </span>
            </router-link>

            <!-- <router-link to="/" class="logo logo-light">
              <span class="logo-sm">
                <img src="@/assets/images/logo-sm.png" alt="" height="22" />
              </span>
              <span class="logo-lg">
                <img src="@/assets/images/logo-light.png" alt="" height="17" />
              </span>
            </router-link> -->
          </div>

          <BButton
            variant="white"
            class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
            id="topnav-hamburger-icon"
          >
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </BButton>

          <!-- App Search-->
          <form class="app-search d-none d-md-block">
            <div class="dropdown-menu dropdown-menu-lg" id="search-dropdown">
              <simplebar data-simplebar style="max-height: 320px">
                <div class="dropdown-header">
                  <h6 class="text-overflow text-muted mb-0 text-uppercase">
                    Recent Searches
                  </h6>
                </div>

                <div class="dropdown-item bg-transparent text-wrap">
                  <router-link
                    to="/"
                    class="btn btn-soft-secondary btn-sm rounded-pill"
                    >how to setup <i class="mdi mdi-magnify ms-1"></i
                  ></router-link>
                  <router-link
                    to="/"
                    class="btn btn-soft-secondary btn-sm rounded-pill"
                    >buttons <i class="mdi mdi-magnify ms-1"></i
                  ></router-link>
                </div>
                <div class="dropdown-header mt-2">
                  <h6 class="text-overflow text-muted mb-1 text-uppercase">
                    Pages
                  </h6>
                </div>

                <BLink
                  href="javascript:void(0);"
                  class="dropdown-item notify-item"
                >
                  <i
                    class="ri-bubble-chart-line align-middle fs-18 text-muted me-2"
                  ></i>
                  <span>Analytics Dashboard</span>
                </BLink>

                <BLink
                  href="javascript:void(0);"
                  class="dropdown-item notify-item"
                >
                  <i
                    class="ri-lifebuoy-line align-middle fs-18 text-muted me-2"
                  ></i>
                  <span>Help Center</span>
                </BLink>

                <BLink
                  href="javascript:void(0);"
                  class="dropdown-item notify-item"
                >
                  <i
                    class="ri-user-settings-line align-middle fs-18 text-muted me-2"
                  ></i>
                  <span>My account settings</span>
                </BLink>

                <div class="dropdown-header mt-2">
                  <h6 class="text-overflow text-muted mb-2 text-uppercase">
                    Members
                  </h6>
                </div>

                <div class="notification-list">
                  <BLink
                    href="javascript:void(0);"
                    class="d-flex dropdown-item notify-item py-2"
                  >
                    <img
                      src="@/assets/images/users/avatar-2.jpg"
                      class="me-3 rounded-circle avatar-xs"
                      alt="user-pic"
                    />
                    <div class="flex-grow-1">
                      <h6 class="m-0">Angela Bernier</h6>
                      <span class="fs-11 mb-0 text-muted">Manager</span>
                    </div>
                  </BLink>
                  <BLink
                    href="javascript:void(0);"
                    class="d-flex dropdown-item notify-item py-2"
                  >
                    <img
                      src="@/assets/images/users/avatar-3.jpg"
                      class="me-3 rounded-circle avatar-xs"
                      alt="user-pic"
                    />
                    <div class="flex-grow-1">
                      <h6 class="m-0">David Grasso</h6>
                      <span class="fs-11 mb-0 text-muted">Web Designer</span>
                    </div>
                  </BLink>
                  <BLink
                    href="javascript:void(0);"
                    class="d-flex dropdown-item notify-item py-2"
                  >
                    <img
                      src="@/assets/images/users/avatar-5.jpg"
                      class="me-3 rounded-circle avatar-xs"
                      alt="user-pic"
                    />
                    <div class="flex-grow-1">
                      <h6 class="m-0">Mike Bunch</h6>
                      <span class="fs-11 mb-0 text-muted">React Developer</span>
                    </div>
                  </BLink>
                </div>
              </simplebar>

              <div class="text-center pt-3 pb-1">
                <router-link
                  to="/pages/search-results"
                  class="btn btn-primary btn-sm"
                  >View All Results <i class="ri-arrow-right-line ms-1"></i
                ></router-link>
              </div>
            </div>
          </form>
        </div>

        <div class="d-flex align-items-center">
          <BDropdown
            class="dropdown d-md-none topbar-head-dropdown header-item"
            variant="ghost-secondary"
            dropstart
            :offset="{ alignmentAxis: 55, crossAxis: 15, mainAxis: 0 }"
            toggle-class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle show  arrow-none"
            menu-class="dropdown-menu-lg dropdown-menu-end p-0"
          >
            <template #button-content>
              <i class="bx bx-search fs-22"></i>
            </template>
            <BDropdownItem aria-labelledby="page-header-search-dropdown">
              <form class="p-3">
                <div class="form-group m-0">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search ..."
                      aria-label="Recipient's username"
                    />
                    <BButton variant="primary" type="submit">
                      <i class="mdi mdi-magnify"></i>
                    </BButton>
                  </div>
                </div>
              </form>
            </BDropdownItem>
          </BDropdown>

          <div class="ms-1 header-item d-none d-sm-flex">
            
            <i class="mdi mdi-circle online-pulse"></i>
            <router-link
              to="/auctions"
            >
            <div class="text-base mr-4 text-success">Live Auctions</div>
            </router-link>
          </div>

          <div class="ms-1 header-item d-none d-sm-flex">
            <BButton
              type="button"
              variant="ghost-secondary"
              class="btn-icon btn-topbar rounded-circle"
              data-toggle="fullscreen"
              @click="initFullScreen"
            >
              <i class="bx bx-fullscreen fs-22"></i>
            </BButton>
          </div>

          <div class="ms-1 header-item d-none d-sm-flex">
            <BButton
              type="button"
              variant="ghost-secondary"
              class="btn-icon btn-topbar rounded-circle light-dark-mode"
              @click="toggleDarkMode"
            >
              <i class="bx bx-moon fs-22"></i>
            </BButton>
          </div>

          <BDropdown
            variant="ghost-dark"
            dropstart
            class="ms-1 dropdown"
            :offset="{ alignmentAxis: 57, crossAxis: 0, mainAxis: -42 }"
            toggle-class="btn-icon btn-topbar rounded-circle arrow-none"
            id="page-header-notifications-dropdown"
            menu-class="dropdown-menu-lg dropdown-menu-end p-0"
            auto-close="outside"
          >
            <template #button-content>
              <i class="bx bx-bell fs-22"></i>
              <span
                class="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger"
                ><span class="notification-badge">{{ notificationCount }}</span
                ><span class="visually-hidden">unread messages </span>
              </span>
            </template>
            <div
              class="dropdown-head bg-primary bg-pattern rounded-top dropdown-menu-lg"
            >
              <div class="p-3">
                <BRow class="align-items-center">
                  <BCol>
                    <h6 class="m-0 fs-16 fw-semibold text-white">
                      Notifications
                    </h6>
                  </BCol>
                  <BCol cols="auto" class="dropdown-tabs">
                    <!--                    <BBadge variant="light-subtle" class="bg-light-subtle text-body fs-13"> 4 New</BBadge>-->
                  </BCol>
                </BRow>
              </div>
            </div>

            <!--           notification -->

            <BTabs
              nav-class="dropdown-tabs nav-tab-custom bg-primary px-2 pt-2"
            >
              <BTab
                title=" All "
                class="tab-pane fade py-2 ps-2 show"
                id="all-noti-tab"
                role="tabpanel"
              >
                <simplebar
                  data-simplebar
                  style="max-height: 300px"
                  class="pe-2"
                >
                  <!--                  <div class="notification-list">-->
                  <!--                    <div-->
                  <!--                        v-for="notification in notifications"-->
                  <!--                        :key="notification.id"-->
                  <!--                        class="text-reset notification-item d-block dropdown-item position-relative"-->
                  <!--                    >-->
                  <!--                      <div class="d-flex">-->
                  <!--                        <div class="avatar-xs me-3 flex-shrink-0">-->
                  <!--                          &lt;!&ndash; Dynamic icon and color based on notification type &ndash;&gt;-->
                  <!--                          <span-->
                  <!--                              :class="[-->
                  <!--            'avatar-title',-->
                  <!--            'rounded-circle',-->
                  <!--            'fs-16',-->

                  <!--          ]"-->
                  <!--                          >-->

                  <!--        </span>-->
                  <!--                        </div>-->

                  <!--                        <div class="flex-grow-1">-->
                  <!--                          <a href="#!" class="stretched-link">-->
                  <!--                            &lt;!&ndash; Notification message &ndash;&gt;-->
                  <!--                            <h6 class="mt-0 mb-2 lh-base" v-html="notification.userId+' '+notification.message"></h6>-->
                  <!--                          </a>-->

                  <!--                          &lt;!&ndash; Timestamp &ndash;&gt;-->
                  <!--                          &lt;!&ndash;                          <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">&ndash;&gt;-->
                  <!--                          &lt;!&ndash;                            <span><i class="mdi mdi-clock-outline"></i> {{ notification.timestamp.toLocaleTimeString() }}</span>&ndash;&gt;-->
                  <!--                          &lt;!&ndash;                          </p>&ndash;&gt;-->
                  <!--                        </div>-->

                  <!--                        &lt;!&ndash; Checkbox &ndash;&gt;-->
                  <!--                        <div class="px-2 fs-15">-->
                  <!--                          <input-->
                  <!--                              class="form-check-input"-->
                  <!--                              type="checkbox"-->
                  <!--                              v-model="notification.read"-->
                  <!--                              @change="markAsRead(notification.id)"-->
                  <!--                          />-->
                  <!--                        </div>-->
                  <!--                      </div>-->
                  <!--                    </div>-->
                  <!--                  </div>-->

                  <!--                  <div class="notification-list">-->

                  <div class="notification-list w-full max-w-md mx-auto">
                    <transition-group
                      name="notification-list"
                      tag="div"
                      class="space-y-3"
                    >
                      <div
                        v-for="notification in notifications"
                        :key="notification.id"
                        class=""
                        :class="{
                          'sliding-out': isNotificationSlidingOut(
                            notification.id
                          ),
                        }"
                      >
                        <div
                          class="bg-white border border-blue-200 rounded-lg hover:shadow-md transition-shadow duration-200 p-4"
                        >
                          <div class="flex items-start gap-3">
                            <!-- Arrow Button -->
                            <button
                              @click="markAsRead(notification.id)"
                              :disabled="
                                isNotificationSlidingOut(notification.id)
                              "
                              class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200 disabled:opacity-50"
                            >
                              <transition name="icon" mode="out-in">
                                <div
                                  v-if="
                                    isNotificationSlidingOut(notification.id)
                                  "
                                  key="check"
                                  class="check-icon"
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
                                    class="w-4 h-4 text-green-600"
                                  >
                                    <polyline
                                      points="20 6 9 17 4 12"
                                    ></polyline>
                                  </svg>
                                </div>
                                <div v-else key="arrow" class="arrow-icon">
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
                                    class="w-4 h-4"
                                  >
                                    <polyline
                                      points="9 18 15 12 9 6"
                                    ></polyline>
                                  </svg>
                                </div>
                              </transition>
                            </button>

                            <!-- Notification Content -->
                            <div class="flex-1 min-w-0">
                              <h3 class="font-medium text-sm text-gray-900">
                                {{ notification.user }}
                              </h3>
                              <p class="text-sm mt-1 text-gray-600">
                                {{ notification.message }}
                              </p>

                              <!-- "Marking as read" indicator -->
                              <transition name="fade">
                                <div
                                  v-if="
                                    isNotificationSlidingOut(notification.id)
                                  "
                                  class="mt-2 text-xs text-green-600 font-medium"
                                >
                                  ✓ Marking as read...
                                </div>
                              </transition>
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition-group>
                  </div>

                  <div class="my-3 text-center">
                    <BButton type="button" variant="soft-success">
                      View All Notifications
                      <i class="ri-arrow-right-line align-middle"></i>
                    </BButton>
                  </div>
                </simplebar>
              </BTab>

              <BTab
                title="Messages"
                class="tab-pane fade py-2 ps-2"
                id="messages-tab"
                role="tabpanel"
                aria-labelledby="messages-tab"
              >
                <simplebar
                  data-simplebar
                  style="max-height: 300px"
                  class="pe-2"
                >
                  <div
                    class="text-reset notification-item d-block dropdown-item"
                  >
                    <div class="d-flex">
                      <img
                        src="@/assets/images/users/avatar-3.jpg"
                        class="me-3 rounded-circle avatar-xs"
                        alt="user-pic"
                      />
                      <div class="flex-grow-1">
                        <BLink href="#!" class="stretched-link">
                          <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                            James Lemire
                          </h6>
                        </BLink>
                        <div class="fs-13 text-muted">
                          <p class="mb-1">
                            We talked about a project on linkedin.
                          </p>
                        </div>
                        <p
                          class="mb-0 fs-11 fw-medium text-uppercase text-muted"
                        >
                          <span
                            ><i class="mdi mdi-clock-outline"></i> 30 min
                            ago</span
                          >
                        </p>
                      </div>
                      <div class="px-2 fs-15">
                        <input class="form-check-input" type="checkbox" />
                      </div>
                    </div>
                  </div>

                  <div
                    class="text-reset notification-item d-block dropdown-item"
                  >
                    <div class="d-flex">
                      <img
                        src="@/assets/images/users/avatar-2.jpg"
                        class="me-3 rounded-circle avatar-xs"
                        alt="user-pic"
                      />
                      <div class="flex-grow-1">
                        <BLink href="#!" class="stretched-link">
                          <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                            Angela Bernier
                          </h6>
                        </BLink>
                        <div class="fs-13 text-muted">
                          <p class="mb-1">
                            Answered to your comment on the cash flow forecast's
                            graph 🔔.
                          </p>
                        </div>
                        <p
                          class="mb-0 fs-11 fw-medium text-uppercase text-muted"
                        >
                          <span
                            ><i class="mdi mdi-clock-outline"></i> 2 hrs
                            ago</span
                          >
                        </p>
                      </div>
                      <div class="px-2 fs-15">
                        <input class="form-check-input" type="checkbox" />
                      </div>
                    </div>
                  </div>

                  <div
                    class="text-reset notification-item d-block dropdown-item"
                  >
                    <div class="d-flex">
                      <img
                        src="@/assets/images/users/avatar-6.jpg"
                        class="me-3 rounded-circle avatar-xs"
                        alt="user-pic"
                      />
                      <div class="flex-grow-1">
                        <BLink href="#!" class="stretched-link">
                          <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                            Kenneth Brown
                          </h6>
                        </BLink>
                        <div class="fs-13 text-muted">
                          <p class="mb-1">
                            Mentionned you in his comment on 📃 invoice #12501.
                          </p>
                        </div>
                        <p
                          class="mb-0 fs-11 fw-medium text-uppercase text-muted"
                        >
                          <span
                            ><i class="mdi mdi-clock-outline"></i> 10 hrs
                            ago</span
                          >
                        </p>
                      </div>
                      <div class="px-2 fs-15">
                        <input class="form-check-input" type="checkbox" />
                      </div>
                    </div>
                  </div>

                  <div
                    class="text-reset notification-item d-block dropdown-item"
                  >
                    <div class="d-flex">
                      <img
                        src="@/assets/images/users/avatar-8.jpg"
                        class="me-3 rounded-circle avatar-xs"
                        alt="user-pic"
                      />
                      <div class="flex-grow-1">
                        <BLink href="#!" class="stretched-link">
                          <h6 class="mt-0 mb-1 fs-13 fw-semibold">
                            Maureen Gibson
                          </h6>
                        </BLink>
                        <div class="fs-13 text-muted">
                          <p class="mb-1">
                            We talked about a project on linkedin.
                          </p>
                        </div>
                        <p
                          class="mb-0 fs-11 fw-medium text-uppercase text-muted"
                        >
                          <span
                            ><i class="mdi mdi-clock-outline"></i> 3 days
                            ago</span
                          >
                        </p>
                      </div>
                      <div class="px-2 fs-15">
                        <input class="form-check-input" type="checkbox" />
                      </div>
                    </div>
                  </div>

                  <div class="my-3 text-center">
                    <BButton type="button" variant="soft-success">
                      View All Messages
                      <i class="ri-arrow-right-line align-middle"></i>
                    </BButton>
                  </div>
                </simplebar>
              </BTab>

              <BTab title="Alerts" class="p-4">
                <simplebar
                  data-simplebar
                  style="max-height: 300px"
                  class="pe-2"
                >
                  <div class="w-25 w-sm-50 pt-3 mx-auto">
                    <img
                      src="@/assets/images/svg/bell.svg"
                      class="img-fluid"
                      alt="user-pic"
                    />
                  </div>
                  <div class="text-center pb-5 mt-2">
                    <h6 class="fs-18 fw-semibold lh-base">
                      Hey! You have no any notifications
                    </h6>
                  </div>
                </simplebar>
              </BTab>
            </BTabs>
          </BDropdown>

          <BDropdown
            variant="link"
            class="ms-sm-3 header-item topbar-user"
            toggle-class="rounded-circle arrow-none"
            menu-class="dropdown-menu-end"
            :offset="{ alignmentAxis: -14, crossAxis: 0, mainAxis: 0 }"
          >
            <template #button-content>
              <span class="d-flex align-items-center">
                <img
                  class="rounded-circle header-profile-user"
                  src="@/assets/images/users/avatar-1.jpg"
                  alt="Header Avatar"
                />
                <span class="text-start ms-xl-2">
                  <span
                    class="d-none d-xl-inline-block ms-1 fw-medium user-name-text"
                    >{{ this.username }}</span
                  >
                  <span class="d-none d-xl-block ms-1 fs-12 user-name-sub-text"
                    >{{this.useremail}}</span
                  >
                </span>
              </span>
            </template>
            <h6 class="dropdown-header">Welcome !</h6>
            <router-link class="dropdown-item" to="/profile"
              ><i
                class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"
              ></i>
              <span class="align-middle"> Profile</span>
            </router-link>

            <div class="dropdown-divider"></div>

            <div class="dropdown-item" to="/profile">
              <i class="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>
              <span class="align-middle"> Balance</span>
              <br />
              <b>$5971.67</b>
            </div>
            <router-link class="dropdown-item" to="/pricing"
              ><i class="mdi mdi-currency-usd text-muted fs-16 align-middle me-1"></i>
              <span class="align-middle"> Shop</span>
            </router-link>
            <router-link class="dropdown-item" to="/auth/logout"
              ><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
              <span class="align-middle" data-key="t-logout"> Logout</span>
            </router-link>
          </BDropdown>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.notification-mark {
  display: inline-block;
  width: 80px; /* Adjust based on your content */
  min-height: 24px;
  position: relative;
  vertical-align: middle;
}

.arrow-icon {
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s;
  color: #666;
}

.arrow-icon:hover {
  color: #333;
  transform: translateX(3px);
}

.arrow-icon svg {
  vertical-align: middle;
}

.read-indicator {
  color: #28a745;
  font-size: 0.9em;
}

/* Slide transition */
.slide-leave-active {
  transition: all 0.4s ease;
  position: absolute;
  width: 100%;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-enter-active {
  transition: all 0.4s ease 0.2s; /* Delay to let leave finish */
}

.slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}
/* Notification list transitions */
.notification-list-enter-active,
.notification-list-leave-active {
  transition: all 0.5s ease;
}

.notification-list-enter-from {
  opacity: 0;
  transform: translateX(-50px) scale(0.9);
}

.notification-list-leave-to {
  opacity: 0;
  transform: translateX(300px) scale(0.8);
}

.notification-list-move {
  transition: transform 0.5s ease;
}

/* Sliding out state */
.sliding-out {
  pointer-events: none;
  opacity: 0;
  transform: translateX(300px) scale(0.8);
  transition: all 0.5s ease-in-out;
}

/* Icon transitions */
.icon-enter-active,
.icon-leave-active {
  transition: all 0.2s ease;
}

.icon-enter-from {
  opacity: 0;
  transform: scale(0) rotate(-90deg);
}

.icon-leave-to {
  opacity: 0;
  transform: scale(0) rotate(90deg);
}

/* Arrow hover effect */
.arrow-icon {
  transition: transform 0.2s ease;
}

button:hover .arrow-icon {
  transform: translateX(2px);
}

/* Check icon animation */
.check-icon {
  animation: check-pulse 0.2s ease;
}

.online-pulse {
  color: rgb(4, 87, 4);
  font-size: 14px;
  animation: pulse 1s infinite ease-in-out;
  
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.3);
  }
}

@keyframes check-pulse {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
