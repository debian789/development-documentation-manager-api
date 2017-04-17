export default {
  assignValueToObject (objectReference, objectData) {
    if (typeof (objectReference) === 'object' && typeof (objectData) === 'object') {

      for (let i in objectData) {
        if (objectData[i] === '' || objectData[i]) {
          objectReference[i] = objectData[i]
        }
      }

      return objectReference
    } else {
      return undefined
    }
  }
}
