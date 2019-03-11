import looseEqual from '../../../utils/lose-equal'
import { isArray } from '../../../utils/array'
import sanitizeRow from './sanitize-row'

export default {
  props: {
    selectable: {
      type: Boolean,
      default: false
    },
    selectMode: {
      type: String,
      default: 'multi'
    },
    selectedVariant: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {
      selectedRows: [],
      selectedLastClicked: -1
    }
  },
  computed: {
    computedRowSelectedClass() {
      if (this.selectedVariant) {
        return `${this.dark ? 'bg' : 'table'}-${this.selectedVariant}`
      } else {
        return ''
      }
    }
  },
  watch: {
    computedItems(newVal, oldVal) {
      // Reset for selectable
      // TODO: Should selectedLastClicked be reset here?
      //       As changes to _showDetails would trigger it to reset
      this.selectedLastClicked = -1
      let equal = false
      if (this.selectable && this.selectedRows.length > 0) {
        // Quick check against array length
        equal = isArray(newVal) && isArray(oldVal) && newVal.length === oldVal.length
        for (let i = 0; equal && i < newVal.length; i++) {
          // Look for the first non-loosely equal row, after ignoring reserved fields
          equal = looseEqual(sanitizeRow(newVal[i]), sanitizeRow(oldVal[i]))
        }
      }
      if (!equal) {
        this.clearSelected()
      }
    },
    context(newVal, oldVal) {
      this.clearSelected()
    },
    selectable(newVal, oldVal) {
      this.clearSelected()
      this.setSelectionHandlers(newVal)
    },
    selectMode(newVal, oldVal) {
      this.clearSelected()
    },
    selectedRows(selectedRows, oldVal) {
      if (this.selectable) {
        let items = []
        selectedRows.forEach((v, idx) => {
          if (v) {
            items.push(this.computedItems[idx])
          }
        })
        this.$emit('row-selected', items)
      }
    }
  },
  mounted() {
    // Set up handlers
    if (this.selectable) {
      this.setSelectionHandlers(true)
    }
  },
  methods: {
    isRowSelected(idx) {
      return this.selectedRows[idx]
    },
    clearSelected() {
      let hasSelection = this.selectedRows.reduce((prev, v) => {
        return prev || v
      }, false)
      if (hasSelection) {
        this.selectedLastClicked = -1
        this.selectedRows = []
      }
    },
    setSelectionHandlers(on) {
      const method = on ? '$on' : '$off'
      this[method]('row-clicked', this.selectionHandler)
      this[method]('filtered', this.clearSelected)
      this[method]('sort-changed', this.clearSelected)
    },
    selectionHandler(item, index, evt) {
      if (!this.selectable) {
        // Don't do anything if table is not in selectable mode
        this.clearSelected()
        return
      }
      let selected = !this.selectedRows[index]
      let mode = this.selectMode
      // Note 'multi' mode needs no special handling
      if (mode === 'single') {
        this.selectedRows = []
      } else if (mode === 'range') {
        if (this.selectedLastClicked >= 0 && evt.shiftKey) {
          // range
          for (
            let idx = Math.min(this.selectedLastClicked, index);
            idx <= Math.max(this.selectedLastClicked, index);
            idx++
          ) {
            // this.selectedRows[idx] = true
            this.$set(this.selectedRows, index, true)
          }
          selected = true
        } else {
          if (!(evt.ctrlKey || evt.metaKey)) {
            // clear range selection if any
            this.selectedRows = []
            selected = true
          }
          this.selectedLastClicked = selected ? index : -1
        }
      }
      this.$set(this.selectedRows, index, selected)
    }
  }
}
