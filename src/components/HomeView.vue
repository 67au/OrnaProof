<script setup>
import { store } from '@/store';
</script>

<template>
  <main>
    <div class="container">
      <var-card class="card">
        <template #description>
          <div class="card-description">
            <var-select size="small" variant="outlined" :placeholder="$t('material')" v-model="mat">
              <var-option v-for="(v, k) in store.materials" :label="v['name'][store.state.language]" :value="k">
                <var-icon class="append-icon" :size="24" :name="`${staticUrl}${v['icon']}`" />
                <span>
                  {{ v['name'][store.state.language] }}
                  <var-chip size="mini" type="warning" plain>{{ star + v['tier'] }}</var-chip>
                </span>
              </var-option>
              <template #prepend-icon>
                <var-icon class="append-icon" :size="24" :name="`${staticUrl}${store.materials[mat]['icon']}`" />
              </template>
            </var-select>
            <var-input size="small" type="number" :placeholder="$t('count')" v-model="input" clearable
              />
          </div>
          <div class="card-description">
            <var-input size="small" type="number" v-for="(id, index) in proofIds"
              :placeholder="store.proofs[id]['name'][store.state.language]" v-model="proof[index]"
              @change="updateCounter(index)">
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

<script>
const star = '★';
const staticUrl = 'https://playorna.com/static';
const calScale = 100;

export default {
  data() {
    return {
      input: 0,
    }
  },
  methods: {
    updateCounter(index) {
      this.input = Math.floor(this.proof[index] * calScale / this.exchangeRate[this.mat]['rate'][index]);
    },
  },
  computed: {
    mat: {
      get() {
        return store.state.mat;
      },
      set(newValue) {
        store.state.mat = newValue;
      }
    },
    exchangeRate() {
      return Object.fromEntries(
        Object.entries(store.materials).map(([key, m]) => {
          return [
            key,
            {
              'rate': this.proofIds.map(
                (id) => store.proofs[id]['rate'] * (m.tier * 10 + m.rarity * 5)
              ),
            },
          ];
        })
      )
    },
    proofIds() {
      return Object.keys(store.proofs);
    },
    proof: {
      get() {
        return this.proofIds.map((_, index) => {
          return Math.ceil(this.exchangeRate[this.mat]['rate'][index] * this.input / calScale);
        });
      }
    }
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