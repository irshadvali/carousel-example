import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

const DATA = [
  { id: "1", title: "Topic 1" },
  { id: "2", title: "Topic 2" },
  { id: "3", title: "Topic 3" },
  { id: "4", title: "Topic 4" },
  { id: "5", title: "Topic 5" },
  { id: "6", title: "Topic 6" },
  { id: "7", title: "Topic 7" },
  { id: "8", title: "Topic 8" },
  { id: "9", title: "Topic 9" },
  { id: "10", title: "Topic 10" },
];

export default function FeaturedTopicAnimation() {
  const [currentPage, setCurrentPage] = useState(0);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const pages = useMemo(() => {
    const result = [];

    for (let i = 0; i < DATA.length; i += 3) {
      result.push(DATA.slice(i, i + 3));
    }

    return result;
  }, []);

  const animateToPage = (nextPage, direction = "next") => {
    Animated.timing(slideAnim, {
      toValue: direction === "next" ? -300 : 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentPage(nextPage);

      slideAnim.setValue(direction === "next" ? 300 : -300);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const goNext = () => {
    const nextPage = currentPage === pages.length - 1 ? 0 : currentPage + 1;

    animateToPage(nextPage, "next");
  };

  const goPrev = () => {
    const prevPage = currentPage === 0 ? pages.length - 1 : currentPage - 1;

    animateToPage(prevPage, "prev");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Featured Topics</Text>

      <Animated.View
        style={[
          styles.page,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {pages[currentPage].map((topic) => (
          <View key={topic.id} style={styles.card}>
            <View style={styles.imagePlaceholder} />

            <View style={styles.content}>
              <Text style={styles.title}>{topic.title}</Text>

              <Text style={styles.description}>
                Description for {topic.title}
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </View>
        ))}
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentPage === index && styles.activeDot]}
            />
          ))}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={goPrev}>
            <Text style={styles.buttonText}>‹</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={goNext}>
            <Text style={styles.buttonText}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    margin: 16,
    overflow: "hidden",
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  page: {
    minHeight: 320,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#d9d9d9",
  },

  content: {
    flex: 1,
    marginHorizontal: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  arrow: {
    fontSize: 28,
    fontWeight: "bold",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  pagination: {
    flexDirection: "row",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d1d1d1",
    marginHorizontal: 4,
  },

  activeDot: {
    width: 24,
    backgroundColor: "#002f6c",
  },

  actions: {
    flexDirection: "row",
  },

  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#002f6c",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
});
