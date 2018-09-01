import Vue from 'vue';
import entry from './pages/index/index.vue';

export default new Vue({
    el: '#app',
    render: h => h(entry)
});
