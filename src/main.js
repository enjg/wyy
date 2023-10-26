import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';

import 'element-plus/dist/index.css'; // 修改样式导入方式

const app = createApp(App);
const pinia = createPinia();

app.use(router)
   .use(pinia)
   .use(ElementPlus)
   .mount('#app');