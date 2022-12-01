<template>
  <v-app>
    <v-main>
      <div style="background: rgb(250, 250, 250);height: 100vh" class="d-flex justify-center align-center">
        <v-btn class="mr-4" @click="toPage('admin')" color="primary">admin</v-btn>
        <v-btn class="mr-4" @click="toPage('roleA')" color="primary" outlined>roleA</v-btn>
        <v-btn class="mr-4" @click="toPage('roleB')" color="primary" outlined>roleB</v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import * as routerList from '../utils/roleMenu'

export default {
  data () {
    return {}
  },
  methods: {
    toPage (item) {
      const index = routerList.roleList.findIndex(i => i.value === item)
      sessionStorage.setItem('routerList', JSON.stringify([routerList.roleList[index]]))
      this.$router.push('/' + item)
    }
  }
}
</script>
