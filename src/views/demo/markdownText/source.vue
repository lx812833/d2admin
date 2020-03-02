<template>
  <d2-container better-scroll>
    <d2-markdown v-if="isShow" :source="doc" highlight/>
  </d2-container>
</template>

<script>
import { getContent } from "@api/content";
export default {
  name: "markdownText",
  data() {
    return {
      doc: "",
      isShow: true
    };
  },
  methods: {
    getContentDoc() {
      this.isShow = false;
      getContent("5e03757b461ce14104481021").then(res => {
        this.$nextTick(() => {
          this.isShow = true;
          this.doc = res.question.description;
        })
      });
    }
  },
  mounted() {
    this.getContentDoc();
  }
};
</script>

