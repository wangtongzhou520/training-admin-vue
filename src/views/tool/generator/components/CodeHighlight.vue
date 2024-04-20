<template>
  <div>
    <pre
      class="line-numbers copy-to-clipboard"
    ><code :class="languageClass" v-html="highlightedCode"></code></pre>
  </div>
</template>

<script setup>
import { defineProps, computed, onMounted } from 'vue'
import Prism from 'prismjs'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'
import 'prismjs/themes/prism.css'

/**
 * 父传子的参数
 */
const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  }
})

const languageClass = computed(() => {
  return `language-${props.language}`
})

const highlightedCode = computed(() => {
  return Prism.highlight(props.code, Prism.languages[props.language], props.language)
})

onMounted(() => {
  Prism.highlightAll()
})
</script>

<style lang="scss" scoped></style>
