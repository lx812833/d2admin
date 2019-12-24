<template>
  <d2-container better-scroll>
    <d2-markdown :source="doc" highlight/>
  </d2-container>
</template>

<script>
import doc from './md/doc.md'
export default {
  data () {
    return {
      doc
    }
  }
}
</script>

