<template>
  <div>
    <header-app></header-app>
    <coffee></coffee>
    <footer-app></footer-app>
  </div>
</template>

<script>
import HeaderApp from '@/components/Header'
import FooterApp from '@/components/Footer'
import Coffee from '@/components/Coffee'

export default {
  name: 'about',
  components: {
    HeaderApp,
    FooterApp,
    Coffee
  }
}
</script>
