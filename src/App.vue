<template>
  <div class="layout">
    <AppHeader title="Proof of Guild" />
    <var-space justify="space-around" size="large">
      <var-card title="Proof" class="card">
        <template #description>
          <div class="card-description">
            <var-select variant="outlined" placeholder="材料" v-model="mat"
              @change="updateMatCookie(mat)">
              <var-option v-for="(_, k) in materials" :label="exchange[k].name" :value="k" />
              <template #prepend-icon>
                <var-icon class="append-icon" :size="24" :name="`${static_url}${materials[mat].icon}`" />
              </template>
            </var-select>
            <var-input type="number" placeholder="数量" v-model="input" clearable @change="updateCounterCookie(input)" />
          </div>
          <div class="card-description">
            <var-input type="number" v-for="(g, index) in guilds" :placeholder="g" v-model="proof[index]"
              @change="updateCounter(index)">
              <template #append-icon>
                <var-icon class="append-icon" :size="24" :name="`${static_url}${proofs[index]}`" />
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
</script>

<script>
import Cookies from 'js-cookie';

const guilds = [
  '苦难之证', '塔之碎片', '珊瑚', 
  '纪念之证', '讨伐之证', '斗技之证',
  '深岩碎片', '试炼之证', '贡献之证',
  '追忆之证',
];
const proofs = [
  '/img/useables/proof_anguish.png', '/img/useables/tower_fragment.png', '/img/items/coral.png',
  '/img/useables/proof_monument1.png', '/img/useables/proof_monument2.png', '/img/useables/proof_blades1.png',
  '/img/items/dungeon_shard.png', '/img/useables/proof_trials1.png', '/img/useables/proof_adventure1.png',
  '/img/useables/proof_memory1.png',
]
const formula = [
  1, 200, 20,
  10, 20, 4,
  20, 2, 2,
  2,
];
const static_url = 'https://playorna.com/static'
const cal_scale = 100

export default {
  data() {
    return {
      exchange: Object.fromEntries(
        Object.entries(materials).map(([key, m]) => {
          return [
            key,
            {
              'name': `${m.name.hans}(${m.name.en})`,
              'rate': formula.map(
                (x) => x * (m.tier * 10 + m.rarity * 5)
              ),
            },
          ];
        })
      ),
      mat: Cookies.get('mat')==null?Object.keys(materials)[0]:Cookies.get('mat'),
      input: Cookies.get('input')==null?0:Cookies.get('input'),
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
        return guilds.map((_, index) => {
          return Math.floor(this.exchange[this.mat]['rate'][index] * this.input / cal_scale);
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