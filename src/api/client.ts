import { Platform } from "react-native";

const envUrl = process.env.EXPO_PUBLIC_API_URL;

export function getApiBaseUrl(): string {
  if (envUrl) return envUrl.replace(/\/$/, "");
  if (__DEV__) {
    if (Platform.OS === "android") return "http://10.0.2.2:3000";
    return "http://localhost:3000";
  }
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
