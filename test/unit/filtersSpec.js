'use strict';

describe('filter', function() {
  beforeEach(module('flickrSearchFilters'));
  describe('trim', function() {
    it('should reduce the length of any strings over the limit to that limit',
        inject(function(trimFilter) {
      expect(trimFilter('short', 5)).toBe('short');
      expect(trimFilter('shorter', 5)).toBe('short...');
    }));
  });
});

describe('filter', function() {
  beforeEach(module('flickrSearchFilters'));
  describe('subIfEmpty', function() {
    it('should substitute and empty term with the sub value',
        inject(function(subIfEmptyFilter) {
      expect(subIfEmptyFilter('show me', 'replaced')).toBe('show me');
      expect(subIfEmptyFilter('', 'replaced')).toBe('replaced');
      expect(subIfEmptyFilter(undefined, 'replaced')).toBe('replaced');
    }));
  });
});

describe('filter', function() {
  beforeEach(module('flickrSearchFilters'));
  describe('htmlToPlaintext', function() {
    it('should strip html characters',
        inject(function(htmlToPlaintextFilter) {
      expect(htmlToPlaintextFilter('show me', 'show me')).toBe('show me');
      expect(htmlToPlaintextFilter('<p>show me</p>', 'show me')).toBe('show me');
    }));
  });
});