

// Array of Establishments
export interface Establishments {
    establishment: Establishment[];
    length: number;
}



// Single object of a Establishment
export interface Establishment {
    name: string;
    length: number;
    id: number;
    category: string;
    description: string;
    email: string;
    featured: boolean;
    rating: number;
    stars: number;
    lowestPrice: string;
    slug: string;
    reviews: string;
}