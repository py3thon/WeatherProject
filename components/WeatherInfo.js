import React from 'react'
import { View, Text, StyleSheet, Image, useColorScheme } from 'react-native'
import { colors } from '../utils/index'

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors

export default function WeatherInfo({ currentWeather }) {
    const {
        main: { temp },
        weather: [details],
        name,
        timezone,
    } = currentWeather
    const { icon, main, description } = details
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

    const colorScheme = useColorScheme();
    const themeTextStyle =
        colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;

    const currentTime = (timezone) => {
        const current = new Date();
        const date = new Date((current.getTime() + (timezone * 1000)) - 28800000);
        const result = date.toLocaleString('en-US', { weekday: "long", hour: 'numeric', minute: 'numeric', hour12: true });
        return result
    }

    return (
        <View style={styles.weatherInfo}>
            <Text style={themeTextStyle}>{name}</Text>
            <Text style={styles.currentTimeText,themeTextStyle}>{currentTime(timezone)}</Text>
            <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
            <Text style={styles.textPrimary}>{temp}°</Text>
            <Text style={styles.weatherDescription,themeTextStyle}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
    },
    weatherDescription: {
        textTransform: "uppercase",
    },
    weatherIcon: {
        width: 150,
        height: 150,
    },
    textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOR,
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10,
    },
    currentTimeText: {
        marginTop: 30,
    },
    lightThemeText: {
        color: 'black',
    },
    darkThemeText: {
        color: 'white',
    },
})
