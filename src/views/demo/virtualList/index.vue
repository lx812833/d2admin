<template>
  <d2-container>
    <VirtualList :listData="data" :estimatedItemSize="100" v-slot="slotProps">
      <Item :item="slotProps.item" />
    </VirtualList>
  </d2-container>
</template>

<script>
import VirtualList from "./virtual";
import Item from "./item";

import faker from "faker";

let data = [];
for (let id = 0; id < 1000; id++) {
  data.push({
    id,
    value: faker.lorem.sentences() // 长文本
  });
}

export default {
  name: "virtualList",
  data() {
    return {
      data
    };
  },
  components: {
    VirtualList,
    Item
  }
};
</script>
