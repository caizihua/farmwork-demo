<template>
  <v-app>
    <v-main>
      <div style="background: rgb(250, 250, 250);height: 100vh" class="d-flex justify-center align-center">
        <v-btn class="mr-4" @click="toPage('/admin')" color="primary">admin</v-btn>
        <v-btn class="mr-4" @click="toPage('/roleA')" color="primary" outlined>roleA</v-btn>
        <v-btn class="mr-4" @click="toPage('/roleB')" color="primary" outlined>roleB</v-btn>
        <v-btn class="mr-4" @click="toPage('/roleC')" color="primary" outlined>roleC</v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    toPage (item) {
      localStorage.setItem('projectRole', item.slice(1))
      this.$router.push(item)
    }
  }
}
</script>
