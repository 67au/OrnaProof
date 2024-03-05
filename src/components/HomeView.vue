<script setup lang="ts">
import { i18n } from '@/i18n';
import { store } from '@/store';
</script>

<template>
  <main>
    <div class="container">
      <var-card class="card">
        <template #description>
          <div class="card-description">
            <var-select size="small" variant="outlined" :placeholder="$t('material')" v-model="mat">
              <var-option v-for="(v, k) in store.materials" :label="v['name'][language]" :value="k" :key="k">
                <var-icon class="append-icon" :size="24" :name="`${staticUrl}${v['icon']}`" />
                <span>
                  {{ v['name'][language] }}
                  <var-chip size="mini" type="warning" plain>{{ star + v['tier'] }}</var-chip>
                </span>
              </var-option>
              <template #prepend-icon>
                <var-icon class="append-icon" :size="24" :name="`${staticUrl}${store.materials[mat]['icon']}`" />
              </template>
            </var-select>
            <var-input size="small" type="number" :placeholder="$t('count')" v-model="input" clearable />
          </div>
          <div class="card-description">
            <var-input size="small" type="number" v-for="(id, index) in proofIds"
              :placeholder="store.proofs[id]['name'][language]" v-model="proof[index]" @change="updateCounter(index)" :key="id">

              <template #append-icon>
                <var-icon class="append-icon" :size="24" :name="`${staticUrl}${store.proofs[id]['icon']}`" />
              </template>
            </var-input>
          </div>
        </template>
      </var-card>
    </div>
  </main>
</template>

<script lang="ts">
const star = '★';
const staticUrl = 'https://playorna.com/static';
const calScale = 100;

export default {
  data() {
    return {
      input: 0 as any,
      material: undefined,
    }
  },
  methods: {
    updateCounter(index: number) {
      this.input = Math.floor(this.proof[index] * calScale / this.exchangeRate[this.mat]['rate'][index]);
    },
  },
  computed: {
    language() {
      return i18n.global.locale.value;
    },
    mat: {
      get() {
        return store.mat;
      },
      set(newValue: string) {
        store.setMat(newValue);
      }
    },
    exchangeRate() {
      return Object.fromEntries(
        Object.entries(store.materials).map(([key, m]: [string, any]) => {
          return [
            key,
            {
              'rate': this.proofIds.map(
                (id: string) => store.proofs[id]['rate'] * (m.tier * 10 + m.rarity * 5)
              ),
            },
          ];
        })
      )
    },
    proofIds() {
      return Object.keys(store.proofs);
    },
    proof(): any {
      return this.proofIds.map((_: any, index: number) => {
        return Math.ceil(this.exchangeRate[this.mat]['rate'][index] * this.input / calScale);
      });
    },
  }
}
</script>

<style>
:root {
  --card-max-width: 375px;
  --card-min-width: 280px;
}

/* card */
.card {
  max-width: var(--card-max-width);
  min-width: var(--card-min-width);
  margin-bottom: 4px;
}

.card-description {
  color: var(--card-description-color);
  font-size: var(--card-description-font-size);
  padding: var(--card-description-padding);
  margin: var(--card-description-margin);
}

/* Append-icon*/
.append-icon {
  margin-right: 8px;
  image-rendering: pixelated;
}

.container {
  display: table;
  margin: 0 auto;
}

/* Card Layout */
.container>.var-card {
  break-inside: avoid;
  margin: 0 auto;
  margin-bottom: 4px;
  min-width: var(--card-min-width);
  width: 80vw;
  max-width: var(--card-max-width);
}
</style>