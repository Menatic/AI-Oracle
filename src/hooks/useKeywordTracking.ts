
import { useState, useEffect } from 'react';

interface KeywordCounts {
  seventhGate: number;
  mirrorKey: number;
}

export const useKeywordTracking = () => {
  const [keywordCounts, setKeywordCounts] = useState<KeywordCounts>(() => {
    // Try to load from localStorage on init
    const savedCounts = localStorage.getItem('oracle_keyword_counts');
    return savedCounts ? JSON.parse(savedCounts) : { seventhGate: 0, mirrorKey: 0 };
  });

  // Persist to localStorage when counts change
  useEffect(() => {
    localStorage.setItem('oracle_keyword_counts', JSON.stringify(keywordCounts));
  }, [keywordCounts]);

  const trackKeyword = (input: string) => {
    const lowerInput = input.toLowerCase();
    let updatedCounts = { ...keywordCounts };
    let detected = false;

    // Check for Seventh Gate mentions
    if (lowerInput.includes('seventh gate') || lowerInput.includes('7th gate') || lowerInput.includes('⍙')) {
      updatedCounts.seventhGate += 1;
      detected = true;
    }

    // Check for Mirror Key mentions
    if (lowerInput.includes('mirror key') || lowerInput.includes('⚿')) {
      updatedCounts.mirrorKey += 1;
      detected = true;
    }

    if (detected) {
      setKeywordCounts(updatedCounts);
    }

    return {
      seventhGateCount: updatedCounts.seventhGate,
      mirrorKeyCount: updatedCounts.mirrorKey,
      detected
    };
  };

  const resetKeywordCounts = () => {
    setKeywordCounts({ seventhGate: 0, mirrorKey: 0 });
    localStorage.removeItem('oracle_keyword_counts');
  };

  return {
    keywordCounts,
    trackKeyword,
    resetKeywordCounts
  };
};
