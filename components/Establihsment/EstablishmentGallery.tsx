import Image from 'next/image';

interface EstablishmentGalleryProps {
    gallery: Gallery[];
}

interface Gallery {
    alternativeText: string;
    height: number;
    width: number;
    url: string;
    id: string;
}

const EstablishmentGallery: React.FC<EstablishmentGalleryProps> = ({gallery}) => {

	const formattedGallery: JSX.Element[] = gallery.map(img => (
		<div className="establishment-gallery__box" key={img.id}>
			<Image 
				className="establishment-gallery__img"
				src={img.url} 
				alt={img.alternativeText} 
				layout="responsive" 
				width={img.width} 
				height={img.height}  />
		</div>
	)); 

    return (
        <section className="establishment-gallery">
			{formattedGallery} 
		</section>
    );
}

export default EstablishmentGallery;