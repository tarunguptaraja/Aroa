import { Image, ScrollView, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Redirect, router } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../constants'
import CustomButton from './components/CustomButton'
import { useGlobalContext } from "../context/GlobalProvider";

function App() {

  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView contentContainerStyle={{ height: '100%' }} >
        <View className="w-full h-full items-center px-4 mt-12">
          <Image source={images.logo} resizeMode='contain' className="w-[111px] h-[80px]" />
          <Image source={images.cards} resizeMode='contain' className="max-w-[380px] w-full  max-h-[300px]" />
          <View className="relative">
            <Text className="text-3xl text-white text-center font-psemibold mt-2" >Discover Endless Possiblities with <Text className="text-secondary-200">Aora</Text></Text>
            <Image source={images.path} className="w-[65px] h-[12px] absolute -right-0 -bottom-0" resizeMode='contain' />
          </View>
          <Text className="text-gray-100 font-pregular text-center px-[13px] mt-4" > Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text>
          <CustomButton
            title="Continue with Email"
            containerStyles="mt-7"
            textStyle="font-psemibold text-base"
            handlePress={()=> router.push('./sign-in')}
          ></CustomButton>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  )
}

export default App