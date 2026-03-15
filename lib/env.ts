function normalizeUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getOptionalEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export function getRequiredEnv(name: string) {
  const value = getOptionalEnv(name);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getBaseUrl(fallbackOrigin?: string) {
  const configuredBaseUrl = getOptionalEnv("NEXT_PUBLIC_BASE_URL");

  if (configuredBaseUrl) {
    return normalizeUrl(configuredBaseUrl);
  }

  const vercelUrl = getOptionalEnv("VERCEL_URL");

  if (vercelUrl) {
    return normalizeUrl(`https://${vercelUrl}`);
  }

  if (fallbackOrigin) {
    return normalizeUrl(fallbackOrigin);
  }

  throw new Error(
    "Missing NEXT_PUBLIC_BASE_URL. Set it in Vercel and .env.local.",
  );
}
