<template>
  <v-app>
    <v-app-bar
      dense
      app
      clipped-left
      height="60">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title> {{role.name}} </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      clipped
      v-model="drawer"
      app
      width="220px"
    >
      <v-list dense>
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in roleItems"
            :key="i"
            @click="toPage(item)"
          >
            <v-list-item-icon>
              <v-icon> {{item.icon}} </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> {{item.name}} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main  style="background: rgb(250, 250, 250); height: 100%">
      <v-container class="pa-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as roleMenu from '../utils/roleMenu'

export default {
  data: () => ({
    role: {},
    drawer: null,
    selectedItem: 0,
    roleItems: [{
      name: 'itemH',
      value: 'itemH',
      icon: 'mdi-alpha-h-box',
      route: '/8'
    },
    {
      name: 'itemI',
      value: 'itemI',
      icon: 'mdi-alpha-i-box',
      route: '/9'
    }]
  }),
  methods: {
    toPage (item) {
      this.$router.replace(item.route)
    }
  },
  created () {
    const role = localStorage.getItem('projectRole')
    this.role = roleMenu.roleList.find(e => e.value === role)
    console.log(role)
  }
}
</script>
