import { __ } from '@wordpress/i18n';
import Google from './components/Google';
import Jameda from './components/Jameda';
import { TextControl, Button, TextareaControl, RangeControl, SelectControl, PanelBody, DatePicker } from '@wordpress/components';
import { useState, useRef } from '@wordpress/element'; // Import useState and useRef
import { useBlockProps, InspectorControls, BlockEditProps } from '@wordpress/block-editor';

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

export default function Edit( { attributes, setAttributes }: BlockEditProps<BlockAttributes> ) {
	const [openPanelIndex, setOpenPanelIndex] = useState<number | null>(null); // Manage which panel is open
	const newFieldsetRef = useRef<HTMLTextAreaElement | null>(null); // Ref for focusing the textarea

	// Add a new fieldset with Google as default
	const addFieldset = () => {
		const newFieldset = { provider: 'Google', date: new Date().toISOString() };
		const updatedFieldsets = [ ...attributes.fieldsets, newFieldset ];

		setAttributes( { fieldsets: updatedFieldsets } );
		setOpenPanelIndex(updatedFieldsets.length - 1); // Open the new fieldset

		// Focus the textarea after rendering
		setTimeout(() => {
			if (newFieldsetRef.current) {
				newFieldsetRef.current.focus();
			}
		}, 100);
	};

	// Remove a fieldset
	const removeFieldset = ( index: number ) => {
		const updatedFieldsets = [ ...attributes.fieldsets ];
		updatedFieldsets.splice( index, 1 );
		setAttributes( { fieldsets: updatedFieldsets } );

		// Adjust the open panel if needed
		if (openPanelIndex === index) {
			setOpenPanelIndex(null);
		} else if (openPanelIndex !== null && openPanelIndex > index) {
			setOpenPanelIndex(openPanelIndex - 1);
		}
	};

	// Update fieldset values
	const updateFieldset = ( index: number, key: keyof Fieldset, value: any ) => {
		const updatedFieldsets = [ ...attributes.fieldsets ];
		updatedFieldsets[index][key] = value;
		setAttributes( { fieldsets: updatedFieldsets } );
	};

	const truncateText = (text: string, maxLength: number) => {
		if (text.length > maxLength) {
			return text.substring(0, maxLength) + '...'; // Add ellipsis
		}
		return text;
	};

	const previewSlides = () => (
		<div { ...useBlockProps.save() }>
			<div className="flex gap-2">
				{ attributes.fieldsets.slice(0, Math.min(attributes.items, attributes.fieldsets.length)).map( ( fieldset, index ) => (
					<div key={ index } className="w-full p-3 relative box-border">
						{fieldset.provider === 'Google' && <Google rating={fieldset.rating} date={fieldset.date} />}
						{fieldset.provider === 'Jameda' && <Jameda rating={fieldset.rating} date={fieldset.date} title={fieldset.title} />}
						<div className="whitespace-pre-line mt-10 mb-10 pr-7">{ truncateText(fieldset.text, 430) }</div>
					</div>
				))}
			</div>
		</div>
	);

	return (
		<div { ...useBlockProps() }>
			<InspectorControls key="settings">
				<PanelBody title={ __( 'Slider Settings', 'vv' ) }>
					<RangeControl
						label={ __( 'Items per row', 'vv' ) }
						value={ attributes.items }
						onChange={ ( val ) => setAttributes( { items: val } ) }
						min={ 1 }
						max={ 3 }
					/>
				</PanelBody>

				{ attributes.fieldsets.map( ( fieldset, index ) => (
					<PanelBody
						key={ index }
						title={ __( `Review ${index + 1}`, 'vv' ) }
						initialOpen={ index === openPanelIndex } // Control panel open state
						onToggle={ () => setOpenPanelIndex(openPanelIndex === index ? null : index) }
					>
						<SelectControl
							label={ __( 'Review Provider', 'vv' ) }
							value={ fieldset.provider }
							options={ [
								{ label: 'Google', value: 'Google' },
								{ label: 'Jameda', value: 'Jameda' },
							] }
							onChange={ ( val ) => updateFieldset( index, 'provider', val ) }
						/>
						
						{ fieldset.provider === 'Jameda' && (
							<TextControl
								label={ __( 'Title', 'vv' ) }
								value={ fieldset.title || '' }
								onChange={ ( val ) => updateFieldset( index, 'title', val ) }
							/>
						)}

						<TextareaControl	
							label={ __( 'Text', 'vv' ) }
							value={ fieldset.text }
							onChange={ ( val ) => updateFieldset( index, 'text', val ) }
							ref={index === attributes.fieldsets.length - 1 ? newFieldsetRef : undefined} // Ref for focusing new fieldset
						/>
						
						{ fieldset.provider === 'Google' && (
							<TextControl
								label={ __( 'Rating (1 to 5)', 'block-development-examples' ) }
								type="number"
								value={ fieldset.rating }
								onChange={ ( val ) => updateFieldset( index, 'rating', parseFloat(val) ) }
								min={ 1 }
								max={ 5 }
								step={ 1 }
								placeholder="5"
							/>
						)}
						{ fieldset.provider === 'Jameda' && (
							<TextControl
								label={ __( 'Rating (0.0 to 2.0)', 'block-development-examples' ) }
								type="number"
								value={ fieldset.rating }
								onChange={ ( val ) => updateFieldset( index, 'rating', parseFloat(val) ) }
								min={ 0.0 }
								max={ 2.0 }
								step={ 0.1 }
								placeholder="1.0"
							/>
						)}
						<DatePicker
							label={ __( 'Date', 'block-development-examples' ) }
							currentDate={ fieldset.date }
							onChange={ ( date ) => updateFieldset( index, 'date', date ) }
						/>

						<Button
							isDestructive
							onClick={ () => removeFieldset( index ) }
						>
							{ __( 'Remove Fieldset', 'vv' ) }
						</Button>
					</PanelBody>
				))}

				<Button isPrimary onClick={ addFieldset }>
					{ __( 'Add Fieldset', 'vv' ) }
				</Button>
			</InspectorControls>

			{/* Display this when there are no fieldsets */}
			{attributes.fieldsets.length === 0 ? (
				<div className="border border-dotted p-5 text-center">
					<h3>{ __( 'Add the first review', 'vv' ) }</h3>
					<Button isPrimary onClick={ addFieldset }>
						{ __( 'Add Fieldset', 'vv' ) }
					</Button>
				</div>
			) : (
				<>
					{/* Visual preview */}
					{previewSlides()}
				</>
			)}
		</div>
	);
}
