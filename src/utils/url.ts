export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Fallback for server-side rendering
  return 'http://localhost:58961';
};