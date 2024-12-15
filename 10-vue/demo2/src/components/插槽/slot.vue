<template>
  <div>
    <!-- -->
    <slotNoName>
        <h1>hahahaha</h1>
        <span>莫欺少年穷</span>
    </slotNoName>
    <hr>
    <slot-name>
        <template slot="sunwuk">
            <h1>大白骨精</h1>
        </template>
        <template v-slot:tangseng>
            <h1>和女儿国国王结婚</h1>
        </template>
    </slot-name>
    <hr>
    <slot-scope v-slot="{ scope }">
        <p v-for="(item, index) in scope" :key="index">{{ item }}</p>
    </slot-scope>
  </div>
</template>

<script>
import slotNoName from './slotNoName.vue';
import slotName from './slotName.vue';
import slotScope from './slotScope.vue';
export default {


  data() {
    return {
      
    };
  },
  components: {
    slotNoName,
    slotName,
    slotScope
  },
  mounted() {
    
  },

  methods: {
    
  },
};
</script>