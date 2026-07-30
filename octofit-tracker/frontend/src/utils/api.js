export const getApiBaseUrl = () => {
  const explicitCodespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const inferredCodespaceName = hostname.match(/^(.*)-\d+\.app\.github\.dev$/)?.[1];
  const codespaceName = explicitCodespaceName || inferredCodespaceName;

  if (!codespaceName) {
    return 'http://localhost:8000';
  }

  return `https://${codespaceName}-8000.app.github.dev`;
};

export const normalizeCollectionResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
};
