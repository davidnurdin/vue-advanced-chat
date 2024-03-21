import { createApp, h } from 'vue'
import App from './App2.vue'

// console.log()
// App.props.height = { type: String, default: '300px' }

const app = createApp({
  render: () => h(App)
})

app.mount('#app')
