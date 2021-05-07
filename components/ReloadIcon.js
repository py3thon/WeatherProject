import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function ReloadIcon({ load }) {
  return (
    <View style={styles.icon}>
      <Ionicons onPress={load} name="refresh-circle-outline" size={40} color="red" />
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    flex: 1
  },
})