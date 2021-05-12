import React from 'react'
import { View } from 'react-native'
import { Picker } from '@react-native-community/picker'
export default function UnitsPicker({ unitSystem, setUnitSystem }) {
    return (
        <View>
            <Picker style={{ height: 25, width: 50 }} selectedValue={unitSystem} onValueChange={(item) => setUnitSystem(item)}>
                <Picker.Item label="C°" value="metric" />
                <Picker.Item label="F°" value="imperial" />
            </Picker>
        </View>
    )
}
