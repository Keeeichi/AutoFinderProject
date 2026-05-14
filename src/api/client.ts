import Constants, { ExecutionEnvironment } from "expo-constants";
import { Platform } from "react-native";

const envUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

/** В бандл подставляется при сборке; если пусто — Railway URL не задан. */
export function hasRemoteApiUrl(): boolean {
  return Boolean(envUrl);
}

/** Установленное приложение (APK), а не Expo Go — без .env при сборке API не настроить. */
export function isStandaloneAppWithoutApiEnv(): boolean {
  if (hasRemoteApiUrl()) return false;
  const e = Constants.executionEnvironment;
  return e === ExecutionEnvironment.Bare || e === ExecutionEnvironment.Standalone;
}

function metroLanHost(): string | null {
  const raw =
    Constants.expoConfig?.hostUri ??
    (Constants as { expoGoConfig?: { debuggerHost?: string } }).expoGoConfig
      ?.debuggerHost;
  if (!raw) return null;
  const host = raw.replace(/^https?:\/\//, "").split(":")[0]?.trim();
  if (!host || host === "localhost" || host === "127.0.0.1") return null;
  return host;
}

export function getApiBaseUrl(): string {
  if (envUrl) return envUrl.replace(/\/$/, "");

  const lan = metroLanHost();
  if (lan) {
    return `http://${lan}:3000`;
  }

  if (
    Constants.executionEnvironment === ExecutionEnvironment.Bare ||
    Constants.executionEnvironment === ExecutionEnvironment.Standalone
  ) {
    return "https://missing-expo-public-api-url.localhost";
  }

  if (Platform.OS === "android") {
    return "http://10.0.2.2:3000";
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
