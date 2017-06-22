module.exports = {
  data() {
    return {
      typeAheadPointer: -1,
      typeAheadOptions: []
    }
  },

    watch: {
        filteredOptions() {
            this.typeAheadOptions = []
            this.filteredOptions.forEach((option) => {
                if(typeof(option) === 'object') {
                    if(option.hasOwnProperty("options")) {
                        option.options.forEach((option) => { this.typeAheadOptions.push(option) })
                    } else this.typeAheadOptions.push(option)
                } else this.typeAheadOptions.push(option)
            })
            this.typeAheadPointer = 0
        }
    },

  methods: {
    /**
     * Move the typeAheadPointer visually up the list by
     * subtracting the current index by one.
     * @return {void}
     */
    typeAheadUp() {
      if (this.typeAheadPointer > 0) {
        this.typeAheadPointer--
        if( this.maybeAdjustScroll ) {
          this.maybeAdjustScroll()
        }
      }
    },

    /**
     * Move the typeAheadPointer visually down the list by
     * adding the current index by one.
     * @return {void}
     */
    typeAheadDown() {
      if (this.typeAheadPointer < this.typeAheadOptions.length - 1) {
        this.typeAheadPointer++
        if( this.maybeAdjustScroll ) {
          this.maybeAdjustScroll()
        }
      }
    },

    /**
     * Select the option at the current typeAheadPointer position.
     * Optionally clear the search input on selection.
     * @return {void}
     */
    typeAheadSelect() {
      if( this.typeAheadOptions[ this.typeAheadPointer ] ) {
        this.select( this.typeAheadOptions[ this.typeAheadPointer ] );
      } else if (this.taggable && this.search.length){
        this.select(this.search)
      }

      if( this.clearSearchOnSelect ) {
        this.search = "";
      }
    },
  }
}