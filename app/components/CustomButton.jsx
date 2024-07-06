import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, textStyle, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.8}
            className={`bg-secondary rounded-md mx-4 min-h-[48px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''} `}>
            <Text className={`text-primary min-w-full text-center ${textStyle}`}>{title}</Text>
        </TouchableOpacity>
    )
}
export default CustomButton