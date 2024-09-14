import { useBlockProps } from '@wordpress/block-editor';
import './style.css';

interface BlockAttributes {
	bg_color: string;
	text_color: string;
	message: string;
}

export default function save( { attributes }: { attributes: BlockAttributes } ) {
	return (
		<div
			{ ...useBlockProps.save() }
			style={ {
				backgroundColor: attributes.bg_color,
				color: attributes.text_color,
			} }
		>
			{ attributes.message }
		</div>
	);
}
