import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const STICKY_POINT = 250;

export default function StickyLayout() {
  const [isSticky, setIsSticky] = useState(false);

  const onScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y;

    if (y >= STICKY_POINT && !isSticky) {
      setIsSticky(true);
    } else if (y < STICKY_POINT && isSticky) {
      setIsSticky(false);
    }
  };

  const PaymentView = () => (
    <View style={styles.paymentContainer}>
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payText}>PAY BALANCE NOW</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <Text style={styles.link}>VIEW PDF BILL</Text>
        <Text style={styles.link}>PAYMENT METHODS</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 180 }}
      >
        {/* Dummy Content */}
        {Array.from({ length: 8 }).map((_, i) => (
          <View key={i} style={styles.card}>
            <Text>Campaign Card {i + 1}</Text>
          </View>
        ))}

        {/* Original Payment Layout */}
        {!isSticky && <PaymentView />}

        {/* More Content */}
        {Array.from({ length: 20 }).map((_, i) => (
          <View key={`b${i}`} style={styles.card}>
            <Text>Item {i + 1}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Sticky Bottom */}
      {isSticky && (
        <View style={styles.stickyBottom}>
          <PaymentView />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 120,
    margin: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  stickyBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },

  paymentContainer: {
    backgroundColor: "#0A73FF",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  payButton: {
    backgroundColor: "#071B6D",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  payText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },

  link: {
    color: "#fff",
    fontWeight: "600",
  },
});
