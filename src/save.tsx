import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './style.css';

interface Fieldset {
	provider: string;
	title?: string;
	text: string;
	rating: number;
	date: string;
}

interface BlockAttributes {
	fieldsets: Fieldset[];
	items: number;
}

export default function save( { attributes }: { attributes: BlockAttributes } ) {
	return (
		<div { ...useBlockProps.save() }>
			<tiny-slider
				autoplay="1"
				controls="false"
				autoplay-timeout="8000"
				autoplay-hover-pause="true"
				autoplay-button-output="false"
				nav-position="bottom"
				speed="1000"
				gutter="20"
				items="2"
				className="flex">
				{ attributes.fieldsets.map( ( fieldset, index ) => (
					<div key={ index } className="review">
						{ fieldset.provider === 'Jameda' && (
							<h3>{ fieldset.title }</h3>
						)}
						<p>{ __( 'Date:', 'block-development-examples' ) } { new Date( fieldset.date ).toLocaleDateString() }</p>
						<p>{ __( 'Rating:', 'block-development-examples' ) } { fieldset.rating }</p>
						<excerpt-readmore excerpt-length="430">
							<div>{ fieldset.text }</div>
							<div class="hidden"><button>readmore</button></div>
						</excerpt-readmore>
					</div>
				)) }
			</tiny-slider>
	</div>
	);
}
