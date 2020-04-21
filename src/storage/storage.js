export class Storage {
    constructor(storageName = 'gameScorecard', initialValue = '[]') {
      this.storageName = storageName
  
      if (!localStorage.getItem(storageName)) {
        localStorage.setItem(storageName, initialValue)
      }
    }
  
    getData() {
      return JSON.parse(localStorage.getItem(this.storageName))
    }
  
    update(data) {
      localStorage.setItem(this.storageName, JSON.stringify(data))
    }

    remove() {
      localStorage.removeItem(this.storageName)
    }
  }
  