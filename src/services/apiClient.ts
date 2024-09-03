const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchApi<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`/api${endpoint}`, API_BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  return await response.json();
}