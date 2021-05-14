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

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function hour(hours) {
        if (hours > 12) {
            return hours = hours - 12;
        } else if (hours == 0) {
            return hours = 12;
        } else if (hours < 10) {
            return hours = "0" + hours;
        } else {
            return hours;
        }
    }

    const currentTime = (timezone, key) => {
        const current = new Date();
        const date = new Date((current.getTime() + (timezone * 1000)) + (current.getTimezoneOffset() * 1000 * 60));
        /* var localTime = current.getTime()
         var localOffset = current.getTimezoneOffset() * 60000
         var utc = localTime + localOffset
         var atlanta = utc + (1000 * timezone)
         var date = new Date(atlanta)*/

        //console.log(current.toLocaleString())
        //console.log(date.toLocaleString())
        //console.log(current.getTimezoneOffset())
        
        let result = "@@@";
        if (key == "week") {
            result = weekday[date.getDay()]
        } else if (key == "time") {
            result = (hour(date.getHours())) + " : " + ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()) + " " + ((date.getHours() >= 12) ? "PM" : "AM");
        }
        return result
    }


    return (
        <View style={styles.weatherInfo}>
            <Text style={themeTextStyle}>{name}</Text>
            <Text style={styles.currentTimeText, themeTextStyle}>{currentTime(timezone, "week")}</Text>
            <Text style={styles.currentTimeText, themeTextStyle}>{currentTime(timezone, "time")}</Text>
            <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
            <Text style={styles.textPrimary}> {temp}°</Text>
            <Text style={styles.weatherDescription, themeTextStyle}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
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
