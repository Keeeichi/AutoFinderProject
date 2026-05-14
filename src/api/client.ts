import { Platform } from "react-native";

const envUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

export function getApiBaseUrl(): string {
  if (envUrl) return envUrl.replace(/\/$/, "");

  if (!envUrl && !__DEV__) {
    console.warn(
      "[AutoFinder] Задайте EXPO_PUBLIC_API_URL (URL API на Railway) и пересоберите приложение."
    );
    return "https://missing-expo-public-api-url.localhost";
  }

  if (Platform.OS === "android") return "http://10.0.2.2:3000";
  return "http://localhost:3000";
}

export async function apiGet<T>(path: string): Promise<T> {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}${path}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json() as Promise<T>;
}
