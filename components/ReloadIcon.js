import React from 'react'
import { View,TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function ReloadIcon({ load }) {
  return (
    <View>
      <TouchableOpacity>
      <Ionicons onPress={load} name="refresh-circle-outline" size={40} color="green" />
      </TouchableOpacity>
    </View>
  )
}
