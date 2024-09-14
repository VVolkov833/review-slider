import { useBlockProps } from '@wordpress/block-editor';
import './style.css';

interface Fieldset {
	title: string;
	content: string;
}

interface BlockAttributes {
	fieldsets: Fieldset[];
	items: number;
	bg_color: string;
	text_color: string;
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
				items={ attributes.items }
				class="flex flex-wrap justify-center"
			>
				{ attributes.fieldsets.map( ( fieldset, index ) => (
					<div key={ index } className="fieldset-slide">
						<h2>{ fieldset.title }</h2>
						<div>{ fieldset.content }</div>
						<button>Read more</button>
					</div>
				) ) }
			</tiny-slider>
		</div>
	);
}
