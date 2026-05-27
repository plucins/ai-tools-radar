export interface SavedComparisonMeta {
  /** Filename without the `.json` extension — used as the resource ID. */
  id: string;
  tools: string[];
  model: string;
  generatedAt: string;
  /** First 200 characters of the comparison summary. */
  summary: string;
}
