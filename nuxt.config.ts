// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css', '~/assets/fonts/fonts.css', 'primeicons/primeicons.css'],
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link: [
                {
                    rel: "icon",
                    type: "image/png",
                    href: "/favicon-48x48.png",
                    sizes: "48x48"
                },
                { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
                { rel: "shortcut icon", href: "/favicon.ico" },
                { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
                { rel: "apple-mobile-web-app-title", name: "GuideIT" },
                { rel: "manifest", href: "/site.webmanifest" }
            ]
        }
    },
    postcss: {
        plugins: {
            tailwindcss: {
            },
            autoprefixer: {},
        },
    },
    modules: ['@nuxt/icon', '@primevue/nuxt-module', "nuxt-svgo"],
    primevue: {
        autoImport: false,
        components: {
            include: ['Drawer', 'Menubar', 'ScrollTop']
        },
        options: {
            theme: {
                preset: Aura,
            }
        }
    },
    svgo: {
        autoImportPath: '~/assets/svg/',
    },
});