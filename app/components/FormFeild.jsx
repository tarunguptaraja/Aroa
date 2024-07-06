import { Image, Text, TextInput, View, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'

import { icons } from "../../constants";

const FormFeild = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

    const [showPassword, setShowPassword] = useState(false)
    
    return (
        <View className={`space-y-2 ${otherStyles} mx-2`}>
            <Text className="text-base text-gray-100 font-pmedium" >{title}</Text>
            <View
                className={`border-2 flex-row border-black-200 w-full, h-[48px] px-4 bg-black-100 rounded-md focus:border-secondary items-center`}>
                <TextInput
                    className={`flex-1 text-white font-psemibold text-base`}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                />
                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
export default FormFeild