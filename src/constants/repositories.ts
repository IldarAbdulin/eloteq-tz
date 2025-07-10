export const VISIBILITY_PARAMS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
} as const;

export type VisibilityType =
  (typeof VISIBILITY_PARAMS)[keyof typeof VISIBILITY_PARAMS];
