
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
    build: {
        transpile: ['vuetify', '@vuepic/vue-datepicker', 'chart.js', '@/server/typeorm/entity/User',
        '@/server/typeorm/entity/Note',
        '@/server/typeorm/entity/Patient',
        '@/server/typeorm/entity/Entry',]

    },
    
    plugins: [
        '~/plugins/firebaseAuth.ts', 
        '~/plugins/axios.ts', 
        '~/plugins/vuetify.ts', 
        '~/plugins/reflect-metadata.ts', 
        '~/plugins/chart.ts', 
        // '~/plugins/pdfmake.ts'
],
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL,
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
            FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
            FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
            FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
            FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
            DB_TYPE: process.env.DB_TYPE,
            DB_HOST: process.env.DB_HOST,
            DB_PORT: process.env.DB_PORT,
            DB_USERNAME: process.env.DB_USERNAME,
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_DATABASE: process.env.DB_DATABASE,
            DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE,
            DB_LOGGING: process.env.DB_LOGGING,
            PORT: process.env.PORT,
        }
    },
    
    modules: [
        '@pinia/nuxt',
        // '@nuxtus/nuxt-localtunnel',
        
    ],
    // localtunnel: {
    //     // subdomain: 'orange-planets-drum-98-116-78-133'
    // },

    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },
    

})
