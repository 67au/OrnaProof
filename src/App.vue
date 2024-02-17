<template>
  <div class="layout">
    <AppHeader :title="$t('title')" />
    <var-space justify="space-around" size="large">
      <var-card class="card">
        <template #description>
          <div class="card-description">
            <var-select variant="outlined" :placeholder="$t('material')" v-model="mat" @change="updateMatCookie(mat)">
              <var-option v-for="(v, k) in materials" :label="v['name'][lang]" :value="k">
                
                <var-icon class="append-icon" :size="24" :name="`${static_url}${v['icon']}`" />
                <span>
                {{ v['name'][lang] }}
                <var-chip size="mini" plain>{{ star + v['tier'] }}</var-chip>
                </span>
              </var-option>
              <template #prepend-icon>
                <var-icon class="append-icon" :size="24" :name="`${static_url}${materials[mat]['icon']}`" />
              </template>
            </var-select>
            <var-input type="number" :placeholder="$t('count')" v-model="input" clearable @change="updateCounterCookie(input)" />
          </div>
          <div class="card-description">
            <var-input type="number" v-for="(id, index) in proofIds" :placeholder="proofs[id]['name'][lang]" v-model="proof[index]"
              @change="updateCounter(index)">
              <template #append-icon>
                <var-icon class="append-icon" :size="24" :name="`${static_url}${proofs[id]['icon']}`" />
              </template>
            </var-input>
          </div>
        </template>
      </var-card>
    </var-space>
  </div>
</template>

<script setup>
import materials from './assets/json/materials.json';
import proofs from './assets/json/proofs.json';
import { watch } from 'vue';
</script>

<script>
import Cookies from 'js-cookie';

const proofIds = [
  'proof-of-anguish', 'tower-shard', 'coral',
  'proof-of-monument', 'proof-of-felling', 'proof-of-sparring',
  'deepshard', 'proof-of-trials', 'proof-of-effort',
  'proof-of-remembrance'
];

const star = '★';
const static_url = 'https://playorna.com/static'
const cal_scale = 100

export default {
  mounted() {
    watch(() => this.$i18n.locale, (newVal, oldVal) => {
      this.lang = newVal;
    });
  },
  data() {
    return {
      lang: this.$i18n.locale,
      exchangeRate: Object.fromEntries(
        Object.entries(materials).map(([key, m]) => {
          return [
            key,
            {
              'rate': proofIds.map(
                (id) => proofs[id]['rate'] * (m.tier * 10 + m.rarity * 5)
              ),
            },
          ];
        })
      ),
      mat: Cookies.get('mat') == null ? Object.keys(materials)[0] : Cookies.get('mat'),
      input: Cookies.get('input') == null ? 0 : Cookies.get('input'),
    }
  },
  methods: {
    updateMatCookie(mat) {
      Cookies.set('mat', mat);
    },
    updateCounterCookie(input) {
      Cookies.set('input', input);
    },
    updateCounter(index) {
      this.input = Math.floor(this.proof[index] * cal_scale / this.exchange[this.mat]['rate'][index]);
      this.updateCounterCookie(this.input);
    },
  },
  computed: {
    proof: {
      get() {
        return proofIds.map((_, index) => {
          return Math.ceil(this.exchangeRate[this.mat]['rate'][index] * this.input / cal_scale);
        });
      }
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
  padding: 70px 16px;
  overflow-y: auto;
  height: 100vh;
}

.card {
  width: 300px;
  --card-footer-bottom: 50px;
  --card-footer-right: 9px;
}

.card-description {
  color: var(--card-description-color);
  font-size: var(--card-description-font-size);
  padding: var(--card-description-padding);
  margin: var(--card-description-margin);
}

.append-icon {
  margin-right: 6px;
  image-rendering: pixelated;
}
</style>
