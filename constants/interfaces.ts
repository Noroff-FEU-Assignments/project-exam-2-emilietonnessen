

// Array of Establishments
export interface Establishments {
    establishment: Establishment[];
    length?: number;
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
    reviews: number;
    thumbnail: {
        url: string;
    };
}





export interface InputProps {
    register: () => void;
    name: string;
    label: string;
    type: string;
    placeholder?: string; 
    error: any;
    defaultValue?: any;
    cssClass?: string;
}

export interface FileProps {
    register?: () => void;
    name: string;
    label: string;
    error: any;
    cssClass?: string;
    onChange?: any;
}

export interface HomeProps {
    establishments: EstablishmentCardProps[];
}

export interface EstablishmentCardProps {
    id: number;
    slug: string;
    featured: boolean;
    reviews: number;
    name: string;
    lowestPrice: number;
    stars: number;
    thumbnail: {
        url: string;
    }
}