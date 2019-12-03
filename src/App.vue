<template>
  <div id="app">
    <router-view/>
    <div v-if="imageLength !== 0" class="image-container">
      <image-view style="width: 100%; height: 100%;"></image-view>
    </div>
  </div>
</template>

<script>
import util from '@/libs/util'
import { mapGetters } from 'vuex'
import imageView from "@/components/d2-image-view/index"
export default {
  name: 'app',
  components: {
    imageView
  },
  computed: {
    ...mapGetters('d2admin', {
      imageLength: 'image/length'
    })
  },
  watch: {
    '$i18n.locale': 'i18nHandle'
  },
  created () {
    this.i18nHandle(this.$i18n.locale)
  },
  methods: {
    i18nHandle (val, oldVal) {
      util.cookies.set('lang', val)
      document.querySelector('html').setAttribute('lang', val)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
.image-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 199999;
}
</style>
