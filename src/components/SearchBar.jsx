import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Search, Settings, X, Filter } from 'lucide-react';

const fuzzySearch = (query, text, options = {}) => {
  const {
    threshold = 0.4,
    caseSensitive = false,
    exactMatch = false
  } = options;

  if (!query) return { match: true, score: 1, indices: [] };
  
  const searchText = caseSensitive ? text : text.toLowerCase();
  const searchQuery = caseSensitive ? query : query.toLowerCase();
  
  if (exactMatch) {
    const index = searchText.indexOf(searchQuery);
    if (index !== -1) {
      return {
        match: true,
        score: 1,
        indices: Array.from({ length: query.length }, (_, i) => index + i)
      };
    }
    return { match: false, score: 0, indices: [] };
  }

  let queryIndex = 0;
  let textIndex = 0;
  const matchedIndices = [];
  let consecutiveMatches = 0;
  let totalScore = 0;

  while (queryIndex < searchQuery.length && textIndex < searchText.length) {
    if (searchQuery[queryIndex] === searchText[textIndex]) {
      matchedIndices.push(textIndex);
      queryIndex++;
      consecutiveMatches++;
      totalScore += consecutiveMatches;
    } else {
      consecutiveMatches = 0;
    }
    textIndex++;
  }

  const matchedAll = queryIndex === searchQuery.length;
  const baseScore = matchedAll ? matchedIndices.length / searchQuery.length : 0;
  const lengthBonus = searchQuery.length / searchText.length;
  const finalScore = (baseScore + totalScore * 0.1) * (1 + lengthBonus * 0.5);

  return {
    match: matchedAll && finalScore >= threshold,
    score: Math.min(finalScore, 1),
    indices: matchedIndices
  };
};

const HighlightedText = ({ text, indices, className = "bg-yellow-200 px-0.5 rounded" }) => {
  if (!indices || indices.length === 0) return <span>{text}</span>;
  
  const result = [];
  let lastIndex = 0;
  
  indices.forEach((index, i) => {
    if (index > lastIndex) {
      result.push(<span key={`text-${i}`}>{text.slice(lastIndex, index)}</span>);
    }
    result.push(
      <span key={`highlight-${i}`} className={className}>
        {text[index]}
      </span>
    );
    lastIndex = index + 1;
  });
  
  if (lastIndex < text.length) {
    result.push(<span key="text-end">{text.slice(lastIndex)}</span>);
  }
  
  return <span>{result}</span>;
};

function SearchBar({ entries = [], onResults }) {
  const [query, setQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    threshold: 0.4,
    searchFields: ['title', 'summary', 'tags'],
    caseSensitive: false,
    showScores: false
  });

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return entries.map(entry => ({ item: entry, score: 1, highlights: {} }));
    }

    const isExactMatch = query.startsWith('"') && query.endsWith('"');
    const searchQuery = isExactMatch ? query.slice(1, -1) : query;
    
    if (!searchQuery.trim()) {
      return entries.map(entry => ({ item: entry, score: 1, highlights: {} }));
    }

    const results = entries.map(entry => {
      let bestScore = 0;
      const highlights = {};
      
      settings.searchFields.forEach(field => {
        const fieldValue = entry[field];
        if (fieldValue) {
          const searchText = Array.isArray(fieldValue) ? fieldValue.join(' ') : String(fieldValue);
          const result = fuzzySearch(searchQuery, searchText, {
            threshold: isExactMatch ? 0 : settings.threshold,
            caseSensitive: settings.caseSensitive,
            exactMatch: isExactMatch
          });
          
          if (result.match && result.score > bestScore) {
            bestScore = result.score;
          }
          
          if (result.match && result.indices.length > 0) {
            highlights[field] = result.indices;
          }
        }
      });

      return {
        item: entry,
        score: bestScore,
        highlights,
        match: bestScore > 0
      };
    });

    return results
      .filter(result => result.match)
      .sort((a, b) => b.score - a.score);
  }, [query, entries, settings]);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
  }, []);

  useEffect(() => {
    if (onResults) {
      const filteredResults = query.trim() ? 
        searchResults.map(result => result.item) : 
        entries;
      onResults(filteredResults);
    }
  }, [searchResults, onResults, entries, query]);

  const clearSearch = useCallback(() => {
    setQuery('');
    if (onResults) {
      onResults(entries);
    }
  }, [entries, onResults]);

  const updateThreshold = (value) => {
    setSettings(prev => ({ ...prev, threshold: parseFloat(value) }));
  };

  const toggleField = (field) => {
    setSettings(prev => ({
      ...prev,
      searchFields: prev.searchFields.includes(field)
        ? prev.searchFields.filter(f => f !== field)
        : [...prev.searchFields, field]
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mb-4">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder='Search entries... (use "quotes" for exact phrases)'
            className="w-full pl-9 pr-16 py-2 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-sm bg-gray-50"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {query && (
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                title="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-1 rounded transition-colors ${showSettings ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'}`}
              title="Search options"
            >
              <Settings className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium mb-2 flex items-center text-gray-700">
            <Filter className="w-3 h-3 mr-1" />
            Search Options
          </h3>
          
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1 text-gray-600">
              Search Sensitivity: {settings.threshold.toFixed(1)}
              <span className="text-gray-400 ml-1">
                ({settings.threshold < 0.3 ? 'Broad' : 
                  settings.threshold < 0.5 ? 'Balanced' : 
                  settings.threshold < 0.7 ? 'Focused' : 'Exact'})
              </span>
            </label>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.1"
              value={settings.threshold}
              onChange={(e) => updateThreshold(e.target.value)}
              className="w-full h-1"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>More results</span>
              <span>Fewer, exact results</span>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-xs font-medium mb-1 text-gray-600">Search in:</label>
            <div className="flex flex-wrap gap-1">
              {['title', 'summary', 'tags', 'sources'].map(field => (
                <button
                  key={field}
                  onClick={() => toggleField(field)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    settings.searchFields.includes(field)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.caseSensitive}
                onChange={(e) => setSettings(prev => ({ ...prev, caseSensitive: e.target.checked }))}
                className="mr-1 scale-75"
              />
              <span className="text-gray-600">Case sensitive</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.showScores}
                onChange={(e) => setSettings(prev => ({ ...prev, showScores: e.target.checked }))}
                className="mr-1 scale-75"
              />
              <span className="text-gray-600">Show match scores</span>
            </label>
          </div>
        </div>
      )}

      {query && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          {searchResults.filter(r => r.match).length} result{searchResults.filter(r => r.match).length !== 1 ? 's' : ''} found
        </div>
      )}

      {searchResults.length > 0 && settings.showScores && query && (
        <div className="mt-4 space-y-2">
          <h4 className="font-semibold text-gray-700">Search Results Preview:</h4>
          {searchResults.filter(r => r.match).slice(0, 3).map((result, index) => (
            <div key={result.item.date || index} className="p-3 bg-white rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium">
                  <HighlightedText 
                    text={result.item.title || 'Untitled'} 
                    indices={result.highlights.title} 
                  />
                </h5>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {(result.score * 100).toFixed(0)}% match
                </span>
              </div>
              {result.item.summary && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  <HighlightedText 
                    text={result.item.summary.slice(0, 150) + (result.item.summary.length > 150 ? '...' : '')} 
                    indices={result.highlights.summary} 
                  />
                </p>
              )}
              {result.item.tags && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {result.item.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      <HighlightedText 
                        text={tag} 
                        indices={result.highlights.tags} 
                      />
                    </span>
                  ))}
                  {result.item.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{result.item.tags.length - 3} more</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;