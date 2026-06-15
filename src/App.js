import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import FeaturedTopicsCarousel from "./FeaturedTopicsCarousel";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FeaturedTopicsCarousel />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
