<template>
	<header class="app-header" safe-area-top>
		<var-app-bar :title="title" elevation>
			<template #right>
				<var-space justify="flex-end" size="small">
					<var-menu close-on-click-reference placement="bottom" offset-y="2vmin" v-model:show="langShow">
						<var-button class="app-locale-switch" text round>
							<var-icon class="app-locale-switch-icon" name="translate" />
						</var-button>
						<template #menu>
							<var-cell ripple :style="getActiveStyles('zh-hans')" @click="() => handleCellClick('zh-hans')">
								简体中文
							</var-cell>
							<var-cell ripple :style="getActiveStyles('zh-hant')" @click="() => handleCellClick('zh-hant')">
								繁體中文
							</var-cell>
							<var-cell ripple :style="getActiveStyles('en')" @click="() => handleCellClick('en')">
								English 
							</var-cell>
						</template>
					</var-menu>
					<var-button color="transparent" text-color="#fff" text @click="toggleTheme" round>
						<var-icon :name="themeIcon" animation-class="fade" :transition="300" @click="toggleIcon" />
					</var-button>
				</var-space>
			</template>
		</var-app-bar>
	</header>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { Context, Locale } from '@varlet/ui'
import { StyleProvider, Themes } from '@varlet/ui'
import Cookies from 'js-cookie'

let langShow = ref(false);

export default defineComponent({
	props: ['title'],
	setup() {
		let theme = Cookies.get('theme') == 'dark';
		let currentTheme = theme ? Themes.dark : null;
		StyleProvider(currentTheme);
		let themeIcon = ref(currentTheme ? 'weather-night' : 'white-balance-sunny');
		function toggleTheme() {
			currentTheme = currentTheme ? null : Themes.dark;
			StyleProvider(currentTheme);
			Cookies.set('theme', currentTheme ? 'dark' : null)
		}
		function toggleIcon() {
			themeIcon.value = themeIcon.value === 'white-balance-sunny' ? 'weather-night' : 'white-balance-sunny';
		}
		return {
			Context,
			currentTheme,
			themeIcon,
			toggleTheme,
			toggleIcon,
			langShow,
		}
	},
	methods: {
		getActiveStyles(locale) {
			return {
				color: this.$i18n.locale === locale ? 'var(--color-primary)' : undefined,
				backgroundColor: this.$i18n.locale === locale ? 'var(--app-cell-active-background)' : undefined
			}
		},
		handleCellClick(locale) {
			Locale.use(locale);
			this.$i18n.locale = locale;
			this.langShow = false;
		},
	}
})
</script>

<style scoped>
.app-header {
	width: 100%;
	top: 0;
	left: 0;
	position: fixed;
	z-index: 100;
}

.fade {
	opacity: 0;
	transition-property: opacity;
}

.app-locale-switch {
	&-icon {
		font-size: 22px;
	}
}</style>