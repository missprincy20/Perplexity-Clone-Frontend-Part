import { useState } from "react";
import { searchWeb } from "../services/searchService";
import type { SearchType } from "../services/searchService";
import type { ChatSource } from "../types/chat";
import { normalizeSource } from "../types/chat";

export default function useSearch() {
  const [results, setResults] = useState<ChatSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  async function search(type: SearchType = "web") {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const data = await searchWeb({
        query,
        type,
      });

      const normalized = data.map((item) => normalizeSource(item));
      setResults(normalized);
    } catch (error) {
      console.error("Search failed", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setQuery("");
    setResults([]);
  }

  return {
    query,
    setQuery,
    results,
    loading,
    search,
    clearSearch,
  };
}