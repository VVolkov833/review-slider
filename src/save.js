import { useBlockProps } from '@wordpress/block-editor';
import './style.css';


export default function save( { attributes } ) {
	return (
		<div
			{ ...useBlockProps.save() }
			style={ {
				backgroundColor: attributes.bg_color,
				color: attributes.text_color,
			} }
		>
			{ attributes.message }
			<div class="border-2 border-red-500">test</div>
		</div>
	);
}
