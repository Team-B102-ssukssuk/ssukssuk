import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const COLORS = {
  white: "#ffffff",
  lightGrey: "#CACACA",
  Grey: "#888888",
  Mint: "#2DD0AF",
  Coral: "#FF6C6C",
  Red: "#FF2E2E",
  lightYellow: "#FBFFE5",
  beige: "#F8F3EB",
  brown: "#4F3017",
  lightBrown: "#896A50",
};

export const SIZES = {
  h1: 28,
  h2: 24,
  h3: 20,
  h4: 16,
  h5: 14,
  h6: 11,

  width,
  height,
};
