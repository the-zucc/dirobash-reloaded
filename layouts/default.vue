<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      disable-resize-watcher
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="toggleTheme()"
      >
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; 2021{{ new Date().getFullYear() == 2021 ? '' : '-'+new Date().getFullYear() }}, Laurier Lavoie-Giasson</span>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: 'DefaultLayout',

  css:['~/assets/main.css'],

  methods: {
    toggleTheme(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
  data () {
    return {
      drawer: false,
      clipped: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-comment-text-multiple-outline',
          title: 'Citations',
          to: '/'
        },
        {
          icon: 'mdi-comment-plus',
          title: 'nouvelle citation',
          to: '/new'
        }
      ],
      miniVariant: false,
      right: true,
      title: 'DIRO Bash - Reloaded'
    }
  }
}
</script>
