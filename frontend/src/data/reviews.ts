export type Review = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  project?: string;
  rating: number;
  review: string;
};

export const publishedReviews: Review[] = [];