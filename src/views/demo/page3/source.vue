<template>
  <d2-container better-scroll>
    <d2-markdown :source="doc" highlight/>
  </d2-container>
</template>

<script>
import { getContent } from "@api/content";
export default {
  data() {
    return {
      doc: ""
    };
  },
  methods: {
    getContentDoc() {
      getContent("5e03757b461ce14104481021").then(res => {
        let data = res.question;
        this.doc = data.description;
        console.log("获取markdown", data);
      });
    }
  },
  mounted() {
    this.getContentDoc();
  }
};
</script>

