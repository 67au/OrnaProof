<script setup>
import { store } from '@/store';
import { defineAsyncComponent } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppLocaleSwitch from '@/components/AppLocaleSwitch.vue';
import AppThemeSwitch from '@/components/AppThemeSwitch.vue';
import AppGithub from '@/components/AppGithub.vue';
</script>

<template>
  <div class="layout">
    <AppHeader :title="$t('title')">
      <template #right>
        <AppLocaleSwitch />
        <AppThemeSwitch />
        <AppGithub link="https://github.com/67au/OrnaProof" />
      </template>
    </AppHeader>
    <template v-if="!loading">
      <component is="HomeView" />
    </template>
  </div>
</template>

<script>
export default {
  components: {
    'HomeView': defineAsyncComponent(() => import('@/components/HomeView.vue')),
  },
  created() {
    import('@/assets/json/materials.json').then((module) => {
      store.materials = module.default;
      if (store.state.mat === undefined) {
        store.state.mat = Object.keys(store.materials)[0];
      }
      import('@/assets/json/proofs.json').then((module) => {
        store.proofs = module.default;
        this.loading = false;
      })
    })
  },
  data() {
    return {
      loading: true,
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  transition: background-color 0.25s, color 0.25s;
  color: var(--color-text);
  background-color: var(--color-body);
  overflow: hidden;
  margin: 0;
}

.layout {
  padding: 60px 16px;
  overflow-y: auto;
  height: 100vh;
}
</style>
