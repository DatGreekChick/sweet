import { collection, getDocs, getFirestore } from 'firebase/firestore'

import { app } from './app'

const DB = getFirestore(app)

export const fetchData = async path => {
  try {
    const querySnapshot = await getDocs(collection(DB, path))
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    return { data }
  } catch (error) {
    return { error }
  }
}
