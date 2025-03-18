/*
This file implements the semantic scholar graph API. This API has allready indexed how the papers are connected.
We use this to expose the user to the paper discovery and then they can add the papers they wish to analyze to their own library.
*/

/*

{
    "matches": [
            {
            "id": "649def34f8be52c8b66281af98ae884c09aef38b",
            "title": "SciBERT: A Pretrained Language Model for Scientific Text",
            "authorsYear": "Beltagy et al., 2019"
            }
        ]
    }
*/
export interface SuggestionsResponse {
  matches: {
    id: string;
    title: string;
    authorsYear: string;
  }[];
}

export class SemanticScholarPapersGraph {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "https://api.semanticscholar.org/graph/v1";
  }

  async getSuggestions(query: string): Promise<SuggestionsResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/paper/autocomplete?query=${query}`
      );
      const data: SuggestionsResponse = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // TODO: add types
  async relevanceSearch(query: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/paper/relevance-search?query=${query}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // TODO: add types
  async getPaperDetails(paperId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/paper/${paperId}?fields=referenceCount,title,tldr,abstract,authors.name`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
