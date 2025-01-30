import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import Header from "./Header/Header";

const HEADER_HEIGHT = 250;

type ContentScrollViewProps = PropsWithChildren<{}>;

export default function ContentScrollView({
  children,
}: ContentScrollViewProps) {
  return (
    <ThemedView style={styles.container}>
      <Header />

      <ScrollView>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 16,
    overflow: "hidden",
  },
});
