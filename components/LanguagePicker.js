import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-community/picker'

export default function UnitsPicker({ language, setLanguage }) {
    return (
        <View style={styles.unit}>
            <Picker style={{ height: 25, width: 75 }} selectedValue={language} onValueChange={(item) => setLanguage(item)}>
                <Picker.Item label="en" value="en" />
                <Picker.Item label="中文" value="cn" />
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