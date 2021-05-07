import React from 'react'
import { View, Text, StyleSheet, Button, ScrollView, SafeAreaView } from 'react-native'
import { colors } from '../utils/index'
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons'
const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors
export default function WeatherDetails({ currentWeather, unitSystem }) {

	const {
		main: { feels_like, humidity, pressure, temp_min, temp_max },
		wind: { speed },
		visibility,
		sys: { sunrise, sunset },
		timezone
	} = currentWeather
	const convertTime = (utc, timezone) => {
		//const time = utc;
		//const date = new Date(time * 1000);
		const date = new Date(((utc * 1000) + (timezone * 1000)) - 28800000);
		const timestr = date.toLocaleTimeString();
		return timestr
	}

	const windSpeed = unitSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/hour`
	return (
		<ScrollView>
			<View style={styles.weatherDetailsRow}>
				<View style={styles.weatherDetailsBox}>
					<Feather name="sunrise" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> Sunrise time : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{convertTime(sunrise, timezone)}</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View style={styles.weatherDetailsRow}>
				<View style={styles.weatherDetailsBox}>
					<Feather name="sunset" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> Sunset time : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{convertTime(sunset, timezone)}</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View style={styles.weatherDetailsRow}>
				<View style={styles.weatherDetailsBox}>
					<Ionicons name="body" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> Feels like : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{feels_like}°</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View style={styles.weatherDetailsRow}>
				<View style={styles.weatherDetailsBox}>
					<FontAwesome5 name="temperature-high" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> Max temp : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{temp_max}°</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View style={styles.weatherDetailsRow}>
				<View style={styles.weatherDetailsBox}>
					<FontAwesome5 name="temperature-low" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> Min temp : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{temp_min}°</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View style={styles.weatherDetailsRow}>
				<View style={styles.weatherDetailsBox}>
					<MaterialIcons name="visibility" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> Visibility : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{visibility / 1000} Km</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View>
				<View style={styles.weatherDetailsBox}>
					<MaterialCommunityIcons name="water" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> Humidity : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{humidity}%</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View style={styles.weatherDetailsBox}>
				<MaterialCommunityIcons name="weather-windy" size={30} color={PRIMARY_COLOR} />
				<Text style={styles.textSecond}> Wind Speed : </Text>
			</View>
			<View>
				<View>
					<Text style={styles.detailText}>{windSpeed} </Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
			<View>
				<View style={styles.weatherDetailsBox}>
					<MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOR} />
					<Text style={styles.textSecond}> Pressure : </Text>
				</View>
				<View>
					<Text style={styles.detailText}>{pressure} hpa</Text>
					<Text style={styles.line}>─────────────────────────</Text>
				</View>
			</View>
		</ScrollView>
	)
}
const styles = StyleSheet.create({
	weatherDetails: {
		marginTop: 'auto',
		borderWidth: 1,
		margin: 20,
		borderColor: BORDER_COLOR,
		borderRadius: 0,
	},
	line: {
		color: 'lightgrey',
		margin: 5
	},

	weatherDetailsBox: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'

	},
	textSecond: {
		fontSize: 15,
		margin: 1,
		fontWeight: "700",
		color: SECONDARY_COLOR
	},
	detailText: {
		fontSize: 25,
		marginLeft: 35,
		color: 'dimgray'
	},
})
