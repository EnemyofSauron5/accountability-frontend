import React, { useState, useMemo, useCallback } from 'react';
import { Search, Settings, X, Filter } from 'lucide-react';

// Enhanced fuzzy search algorithm
const fuzzySearch = (query, text, options = {}) => {
  const {
    threshold = 0.4,
    caseSensitive = false,
    exactMatch = false
  } = options;

  if (!query) return { match: true, score: 1, indices: [] };
  
  const searchText = caseSensitive ? text : text.toLowerCase();
  const searchQuery = caseSensitive ? query : query.toLowerCase();
  
  // Handle exact match mode (quotes)
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

  // Fuzzy matching
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
      totalScore += consecutiveMatches; // Bonus for consecutive matches
    } else {
      consecutiveMatches = 0;
    }
    textIndex++;
  }

  // Calculate final score
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

// Text highlighting component
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

// Main SearchBar component
function SearchBar({ entries = [], onResults }) {
  const [query, setQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    threshold: 0.4,
    searchFields: ['title', 'summary', 'tags'],
    caseSensitive: false,
    showScores: false
  });

  // Memoized search function
  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return entries.map(entry => ({ item: entry, score: 1, highlights: {} }));
    }

    // Check for exact match mode (quotes)
    const isExactMatch = query.startsWith('"') && query.endsWith('"');
    const searchQuery = isExactMatch ? query.slice(1, -1) : query;
    
    if (!searchQuery.trim()) {
      return entries.map(entry => ({ item: entry, score: 1, highlights: {} }));
    }

    const results = entries.map(entry => {
      let bestScore = 0;
      const highlights = {};
      
      // Search across specified fields
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

    // Filter and sort results
    return results
      .filter(result => result.match)
      .sort((a, b) => b.score - a.score);
  }, [query, entries, settings]);

  // Handle search input
  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (onResults) {
      const filteredResults = value.trim() ? 
        searchResults.map(result => result.item) : 
        entries;
      onResults(filteredResults);
    }
  }, [searchResults, onResults, entries]);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    if (onResults) {
      onResults(entries);
    }
  }, [entries, onResults]);

  // Settings handlers
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
    <div className="w-full max-w-4xl mx-auto px-4 mt-6">
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder='Search your accountability entries... (use "quotes" for exact match)'
            className="w-full pl-10 pr-20 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {query && (
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-1 rounded transition-colors ${showSettings ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'}`}
              title="Search settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Settings Panel */}
      {showSettings && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-semibold mb-3 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Search Settings
          </h3>
          
          {/* Precision Threshold */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Search Precision: {settings.threshold.toFixed(2)}
              <span className="text-gray-500 ml-2">
                ({settings.threshold < 0.3 ? 'Very Loose' : 
                  settings.threshold < 0.5 ? 'Loose' : 
                  settings.threshold < 0.7 ? 'Moderate' : 'Strict'})
              </span>
            </label>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.1"
              value={settings.threshold}
              onChange={(e) => updateThreshold(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>More Results</span>
              <span>Exact Matches</span>
            </div>
          </div>

          {/* Search Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Search In:</label>
            <div className="flex flex-wrap gap-2">
              {['title', 'summary', 'tags', 'sources'].map(field => (
                <button
                  key={field}
                  onClick={() => toggleField(field)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    settings.searchFields.includes(field)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.caseSensitive}
                onChange={(e) => setSettings(prev => ({ ...prev, caseSensitive: e.target.checked }))}
                className="mr-2"
              />
              <span className="text-sm">Case sensitive</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.showScores}
                onChange={(e) => setSettings(prev => ({ ...prev, showScores: e.target.checked }))}
                className="mr-2"
              />
              <span className="text-sm">Show match scores</span>
            </label>
          </div>
        </div>
      )}

      {/* Search Tips */}
      <div className="mt-3 text-sm text-gray-600 text-center">
        <p>
          💡 <strong>Tips:</strong> Use <code className="bg-gray-100 px-1 rounded">"quotes"</code> for exact phrases, 
          adjust precision for broader/narrower results
        </p>
      </div>

      {/* Results Summary */}
      {query && (
        <div className="mt-4 text-sm text-gray-600">
          Found {searchResults.filter(r => r.match).length} result{searchResults.filter(r => r.match).length !== 1 ? 's' : ''} 
          {query && ` for "${query}"`}
        </div>
      )}

      {/* Sample Results Display (for demonstration) */}
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