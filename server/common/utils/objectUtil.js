export default {
  assignValueToObject (objectReference, objectData) {
    if (typeof (objectReference) === 'object' && typeof (objectData) === 'object') {

      for (let i in objectData) {
        objectReference[i] = objectData[i]
      }

      return objectReference
    } else {
      return undefined
    }
  }
}
