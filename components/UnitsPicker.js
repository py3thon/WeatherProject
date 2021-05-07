import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-community/picker'
export default function UnitsPicker({ unitSystem, setUnitSystem }) {
    return (
        <View style={styles.unit}>
            <Picker style={{ height: 25, width: 75 }} selectedValue={unitSystem} onValueChange={(item) => setUnitSystem(item)}>
                <Picker.Item label="C°" value="metric" />
                <Picker.Item label="F°" value="imperial" />
            </Picker>
        </View>
    )

}
const styles = StyleSheet.create({
    unit: {
        flex: 1,
        marginLeft: 10
    },
})