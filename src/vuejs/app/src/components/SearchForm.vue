<template>
  <b-form @submit="submit">
    <b-input-group>
      <b-form-input v-model="searchQuery"
                    :disabled="disabled"
                    :placeholder="placeholder">
      </b-form-input>
      <b-input-group-append>
        <b-btn type="submit"
               variant="primary">Search</b-btn>
      </b-input-group-append>
    </b-input-group>
  </b-form>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    disabled: Boolean,
    placeholder: String
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    submit(e) {
      e.preventDefault()
      this.emit()
    },

    setSearchQuery(q) {
      this.searchQuery = q
      this.emit()
    },

    emit() {
      this.$emit('submit', this.searchQuery)
    }
  }
}
</script>
