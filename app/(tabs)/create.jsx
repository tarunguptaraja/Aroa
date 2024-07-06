import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormFeild from "../components/FormFeild";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import * as DocumentPicker from "expo-document-picker";
import CustomButton from "../components/CustomButton";
import { createVideoPost } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["video/mp4", "video/gif"],
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (!form.title || !form.prompt || !form.thumbnail || !form.video) {
      Alert.alert("Please Fill all the Fields.");
    } else {
      setUploading(true);
      try {
        await createVideoPost({ ...form, userId: user.$id });
        Alert.alert("Uploaded Successfully.");
      } catch (error) {
        Alert.alert(error.message);
      } finally {
        setUploading(false);
        setForm({
          title: "",
          video: null,
          thumbnail: null,
          prompt: "",
        });
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormFeild
          title="Video Title"
          value={form.title}
          placeholder="Your Video Title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10 px-4"
        />
        <View className="mt-7 space-y-2 px-6">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-md"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-md border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2 px-6">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Thumbnail
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-md border border-black-200 flex-row space-x-2 justify-center items-center">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormFeild
          title="Video Description"
          value={form.prompt}
          placeholder="Give Description here.."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-10 px-4"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-10 mx-6"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
