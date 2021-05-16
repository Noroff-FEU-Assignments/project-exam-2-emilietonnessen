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
    lowestPrice: number;
    slug: string;
    reviews: number;
    street: string;
    coordinates: string;
    zipCode: string;
    city: string;
    amenities: string;
    phone: number;
    thumbnail: GalleryProps;
	imageOne: GalleryProps;
	imageTwo: GalleryProps;
}

export interface EstablishmentGalleryProps {
	thumbnail: GalleryProps;
	imageOne: GalleryProps;
	imageTwo: GalleryProps;
}

export interface GalleryProps {
    alternativeText: string;
    height: number;
    width: number;
    url: string;
    name: string;
}


export interface SearchProps {
    theme: 'white' | 'grey';
}


export interface InputProps {
    register: () => void;
    name: string;
    label: string;
    type: string;
    placeholder?: string; 
    error: JSX.Element | undefined;
    defaultValue?: any;
    cssClass?: string;
}

export interface FileProps {
    register?: () => void;
    name: string;
    label: string;
    fileError: JSX.Element | null;
    cssClass: string;
    onChange: any;
    added: string | null;
}

export interface RadioProps {
    register: () => void;
    name: string;
    label: string;
    error: JSX.Element | undefined;
    cssClass: string;
    defaultValue?: boolean | undefined | null;
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

export interface EstablishmentDetailsProps {
	est: Establishment;
}

export interface SearchBarProps {
    theme: 'white' | 'grey';
    search: any;
    value: any;
    clearSearch: any;
    iconType: any;
}

export interface SearchResultProps {
    name: string;
    thumbnail: string;
    stars: number;
    slug: any;
}

export interface EstablishmentsProps {
    est: Establishment[];
}

export interface FilterProps {
    activeHotels: any;
    activeBnBs: any;
    activeGuesthouses: any;
    activeExplore: any;
    onClickHotels: any;
    onClickBnBs: any;
    onClickGuesthouses: any;
    onClickAll: any;
}


export interface EstablishmentFormProps {
    register: () => void;
    selectedEstablishment?: Establishment;
    errors: any;

    changeThumbnailValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    thumbnailValue: GalleryProps;
    thumbnailValueError: string;

    changeImageOneValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    imageOneValue: GalleryProps;
    imageOneValueError: string;

    changeImageTwoValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    imageTwoValue: GalleryProps;
    imageTwoValueError: string;
}


export interface Auth {
    jwt: string;
    user: {
        blocked: boolean;
        confirmed: boolean;
        email: string;
        id: number;
        role: {
            type: string;
            name: string
            description: string;
            id: number;
        }
    }
}


// ICONS: ------------------------------------------------
export interface IconProps {
    color?: string;
}