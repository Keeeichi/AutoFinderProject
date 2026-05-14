import type { NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Aggregated: undefined;
  Catalog: undefined;
  Platforms: undefined;
  VehicleDetail: { scope: "aggregated" | "listing"; id: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootNavParams = NavigatorScreenParams<RootStackParamList>;
