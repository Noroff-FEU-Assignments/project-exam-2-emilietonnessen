import Image from 'next/image';
import * as interfaces from '../../constants/interfaces';

const EstablishmentGallery: React.FC<interfaces.EstablishmentGalleryProps> = ({thumbnail, imageOne, imageTwo}) => (
    <section className="establishment-gallery">
		<Image 
			className="establishment-gallery__img"
			src={thumbnail.url} 
			alt={thumbnail.alternativeText} 
			layout="responsive" 
			width={thumbnail.width} 
			height={thumbnail.height}  />

		<Image 
			className="establishment-gallery__img"
			src={imageOne.url} 
			alt={imageOne.alternativeText} 
			layout="responsive" 
			width={imageOne.width} 
			height={imageOne.height}  />

		<Image 
			className="establishment-gallery__img"
			src={imageTwo.url} 
			alt={imageTwo.alternativeText} 
			layout="responsive" 
			width={imageTwo.width} 
			height={imageTwo.height}  /> 
	</section>
);


export default EstablishmentGallery;