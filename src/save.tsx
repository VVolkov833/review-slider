import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import Google from './components/Google';
import Jameda from './components/Jameda';
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
						<h2>{fieldset.provider}</h2>
						{(() => {
							switch (fieldset.provider) {
								case 'Google':
									return <Google text={fieldset.text} rating={fieldset.rating} date={fieldset.date} />;
								case 'Jameda':
									return <Jameda title={fieldset.title} text={fieldset.text} rating={fieldset.rating} date={fieldset.date} />;
							}
						})()}
					</div>
				)) }
			</tiny-slider>
	</div>
	);
}
