<template>
  <v-app>
    <v-app-bar
      dense
      app
      clipped-left
      height="60">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-breadcrumbs :items="bc">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :href="item.value"
          >
            {{ item.name }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-app-bar>
    <v-navigation-drawer
      clipped
      v-model="drawer"
      app
      width="200px"
    >
      <v-list dense class="ma-5">
        <v-list-item-group
          v-model="selectedItem"
          mandatory
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in roleItems"
            :key="i"
            @click="toPage(item,i)"
            class="mb-3"
          >
            <div class="mr-3">
              <v-icon> {{item.icon}}</v-icon>
            </div>
            <v-list-item-title> {{item.name}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main style="background: rgb(250, 250, 250); height: 100%">
      <v-container fluid>
        <router-view :wrapWidth="wrapWidth - 250" :wrapHeight="wrapHeight - 90"></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as roleMenu from '../utils/roleMenu'
import { mapState } from 'vuex'

export default {
  data: () => ({
    bc: [],
    role: {},
    drawer: null,
    selectedItem: 0,
    roleItems: []
  }),
  computed: { ...mapState(['wrapWidth', 'wrapHeight']) },
  methods: {
    toPage (item) {
      this.$router.push(`/${this.role.value}${item.route}`)
      this.changeBC(item)
    },
    changeBC (item) {
      const role = JSON.parse(sessionStorage.getItem('routerList')).slice(0, 1)
      role.push({ name: item.name, value: item.route.slice(1) })
      sessionStorage.setItem('routerList', JSON.stringify(role))
      this.bc = role
    }
  },
  created () {
    const role = JSON.parse(sessionStorage.getItem('routerList'))
    this.role = roleMenu.roleList.find(e => e.value === role[0].value)
    if (!role || !this.role) {
      alert('adminPage：未查询到角色！')
      return this.$router.push('/login')
    }
    this.roleItems = roleMenu[role[0].value]
    this.selectedItem = this.roleItems.findIndex(e =>
      e.route.slice(1) === this.$route.path.match(/(?<=\W)(\w+)/g)[1]
    )
    this.changeBC(this.roleItems[this.selectedItem])
  }
}
</script>
