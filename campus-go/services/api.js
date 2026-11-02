export async function fetchNotices() {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts?_limit=10`);
  if (!response.ok) {
    throw new Error('Falha ao carregar os avisos da API.');
  }
  return await response.json();
}