<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </router-link>

      <div class="menu-icon" @click="toggleMenu">
        <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
      </div>

      <ul :class="['nav-menu', { active: isMenuOpen }]">
        <li class="nav-item">
          <router-link to="/" class="nav-links" @click="closeMobileMenu">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-links" @click="closeMobileMenu">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/news" class="nav-links" @click="closeMobileMenu"
            >Research Areas</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/publications" class="nav-links" @click="closeMobileMenu"
            >Publications</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/people" class="nav-links" @click="closeMobileMenu">Members</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/activities" class="nav-links" @click="closeMobileMenu"
            >News</router-link
          >
        </li>

        <li class="nav-item">
          <router-link to="/contact" class="nav-links" @click="closeMobileMenu"
            >Join Us</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMobileMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
/* 样式与之前类似，但增加了响应式部分 */
.navbar {
  background: #fff;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 24px;
}

.navbar-logo {
  color: #333;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  font-weight: bold;
}

.navbar-logo img {
  height: auto;
  max-width: 250px;
}

.nav-menu {
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
}

.nav-item {
  height: 80px;
}

.nav-links {
  color: #333;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1.5rem;
  height: 100%;
  transition: all 0.2s ease-out;
}

.nav-links:hover {
  color: #007bff;
  border-bottom: 3px solid #007bff;
}

.menu-icon {
  display: none; /* 默认隐藏汉堡菜单 */
}

/* 响应式设计的核心部分 */
@media screen and (max-width: 960px) {
  .nav-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 80px;
    left: -100%; /* 默认隐藏在左侧 */
    opacity: 1;
    transition: all 0.5s ease;
  }

  .nav-menu.active {
    background: #fff;
    left: 0; /* 点击后显示 */
    opacity: 1;
    transition: all 0.5s ease;
    z-index: 1;
  }

  .nav-item {
    width: 100%;
    height: 70px;
  }

  .nav-links {
    text-align: center;
    padding: 2rem;
    width: 100%;
    display: table;
  }

  .nav-links:hover {
    color: #007bff;
    border-radius: 0;
    border-bottom: none;
  }

  .navbar-logo {
    font-size: 1.2rem; /* 调整小屏幕下的Logo字体大小 */
  }

  .menu-icon {
    display: block; /* 在小屏幕上显示汉堡菜单图标 */
    font-size: 1.8rem;
    cursor: pointer;
  }
}
</style>
