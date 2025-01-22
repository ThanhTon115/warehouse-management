import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  setup() {
    console.log('crm')
    return () => <RouterView />
  },
})
