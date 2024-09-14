import { __ } from '@wordpress/i18n';
import { TextControl, Button, TextareaControl, RangeControl } from '@wordpress/components';
import {
	useBlockProps,
	InspectorControls,
	BlockEditProps,
} from '@wordpress/block-editor';

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

export default function Edit( { attributes, setAttributes }: BlockEditProps<BlockAttributes> ) {

	// Add a new fieldset
	const addFieldset = () => {
		const newFieldset = { title: '', content: '' };
		setAttributes( { fieldsets: [ ...attributes.fieldsets, newFieldset ] } );
	};

	// Remove a fieldset
	const removeFieldset = ( index: number ) => {
		const updatedFieldsets = [ ...attributes.fieldsets ];
		updatedFieldsets.splice( index, 1 );
		setAttributes( { fieldsets: updatedFieldsets } );
	};

	// Update fieldset title or content
	const updateFieldset = ( index: number, key: keyof Fieldset, value: string ) => {
		const updatedFieldsets = [ ...attributes.fieldsets ];
		updatedFieldsets[index][key] = value;
		setAttributes( { fieldsets: updatedFieldsets } );
	};

	return (
		<div { ...useBlockProps() }>
			<InspectorControls key="settings">
				<div className="block-editor-block-settings">
					<fieldset>
						<legend>{ __( 'Slider Settings', 'block-development-examples' ) }</legend>
						<RangeControl
							label={ __( 'Items per row', 'block-development-examples' ) }
							value={ attributes.items }
							onChange={ ( val ) => setAttributes( { items: val } ) }
							min={ 1 }
							max={ 4 }
						/>
					</fieldset>
				</div>
			</InspectorControls>

			{/* Render the fieldsets */}
			<div className="block-editor-fieldsets">
				{ attributes.fieldsets.map( ( fieldset, index ) => (
					<div key={ index } className="fieldset">
						<TextControl
							label={ __( 'Title', 'block-development-examples' ) }
							value={ fieldset.title }
							onChange={ ( val ) => updateFieldset( index, 'title', val ) }
						/>
						<TextareaControl
							label={ __( 'Content', 'block-development-examples' ) }
							value={ fieldset.content }
							onChange={ ( val ) => updateFieldset( index, 'content', val ) }
						/>
						<Button
							isDestructive
							onClick={ () => removeFieldset( index ) }
						>
							{ __( 'Remove Fieldset', 'block-development-examples' ) }
						</Button>
					</div>
				) ) }
				<Button isPrimary onClick={ addFieldset }>
					{ __( 'Add Fieldset', 'block-development-examples' ) }
				</Button>
			</div>
		</div>
	);
}
