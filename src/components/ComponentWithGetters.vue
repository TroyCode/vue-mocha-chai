<template>
  <div class="fullname">{{ fullname }}</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ComponentWithGetters",
  computed: {
    ...mapGetters(["fullname"])
  }
};
</script>
