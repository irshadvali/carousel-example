import React, { useMemo, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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

export default function FeaturedTopicsCarousel() {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = useMemo(() => {
    const result = [];

    for (let i = 0; i < DATA.length; i += 3) {
      result.push(DATA.slice(i, i + 3));
    }
    console.log(result);
    return result;
  }, []);

  // Auto Scroll
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => {
        if (prev === pages.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [pages.length]);

  const goPrev = () => {
    setCurrentPage((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentPage((prev) => (prev === pages.length - 1 ? 0 : prev + 1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Featured Topics</Text>

      <View style={styles.page}>
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
      </View>

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
    marginBottom: 5,
  },
});
