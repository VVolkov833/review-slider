import { __ } from '@wordpress/i18n';
import Google from './components/Google';
import Jameda from './components/Jameda';
import { TextControl, Button, TextareaControl, RangeControl, SelectControl, PanelBody, DatePicker } from '@wordpress/components';
import {
	useBlockProps,
	InspectorControls,
	BlockEditProps,
} from '@wordpress/block-editor';

interface Fieldset {
	provider: string;
	title?: string;  // For Jameda
	text: string;
	rating: number;
	date: string;
}

interface BlockAttributes {
	fieldsets: Fieldset[];
	items: number;
}

export default function Edit( { attributes, setAttributes }: BlockEditProps<BlockAttributes> ) {

	// Add a new fieldset with Google as default
	const addFieldset = () => {
		const newFieldset = { provider: 'Google', text: '', rating: 5.0, date: new Date().toISOString() };
		setAttributes( { fieldsets: [ ...attributes.fieldsets, newFieldset ] } );
	};

	// Remove a fieldset
	const removeFieldset = ( index: number ) => {
		const updatedFieldsets = [ ...attributes.fieldsets ];
		updatedFieldsets.splice( index, 1 );
		setAttributes( { fieldsets: updatedFieldsets } );
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

	// Visual preview of the slider in the editor (read-only)
	const previewSlides = () => (
		<div { ...useBlockProps.save() }>
			<div className="flex gap-2">
				{ attributes.fieldsets.slice(0, Math.min(attributes.items, attributes.fieldsets.length)).map( ( fieldset, index ) => (
					<div key={ index } className="
						w-full p-3 relative box-border
						before:mr-[20px] before:absolute before:inset-0 before:-z-10 before:bg-[#fff]
					">
						{(() => {
							switch (fieldset.provider) {
								case 'Google':
									return <Google rating={fieldset.rating} date={fieldset.date} />;
								case 'Jameda':
									return <Jameda rating={fieldset.rating} date={fieldset.date} title={fieldset.title} />;
							}
						})()}
						<div>
							<div className={`
								whitespace-pre-line mt-10 mb-10 pr-7
								quote-mask before:bg-review-${fieldset.provider}
                            	before:w-[62px] before:h-[49px] before:-mt-7 before:mr-4 before:float-left before:content-['']
							`}>{ truncateText(fieldset.text, 430) }</div>
                            <div className="absolute right-12 bottom-7 text-right">
                                <button className="appearance-none border-none bg-[transparent] text-inherit underline pointer-events-none opacity-30">
                                    » { __( 'Read more', 'block-development-examples' ) }
                                </button>
                            </div>
						</div>
					</div>
				)) }
			</div>
		</div>
	);

	return (
		<div { ...useBlockProps() }>
			<InspectorControls key="settings">
				<PanelBody title={ __( 'Slider Settings', 'block-development-examples' ) }>
					<RangeControl
						label={ __( 'Items per row', 'block-development-examples' ) }
						value={ attributes.items }
						onChange={ ( val ) => setAttributes( { items: val } ) }
						min={ 1 }
						max={ 3 }
					/>
				</PanelBody>
				
				{ attributes.fieldsets.map( ( fieldset, index ) => (
					<PanelBody
						key={ index }
						title={ __( `Review ${index + 1}`, 'block-development-examples' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Review Provider', 'block-development-examples' ) }
							value={ fieldset.provider }
							options={ [
								{ label: 'Google', value: 'Google' },
								{ label: 'Jameda', value: 'Jameda' },
							] }
							onChange={ ( val ) => updateFieldset( index, 'provider', val ) }
						/>
						
						{ fieldset.provider === 'Jameda' && (
							<TextControl
								label={ __( 'Title', 'block-development-examples' ) }
								value={ fieldset.title || '' }
								onChange={ ( val ) => updateFieldset( index, 'title', val ) }
							/>
						)}
						<TextareaControl	
							label={ __( 'Text', 'block-development-examples' ) }
							value={ fieldset.text }
							onChange={ ( val ) => updateFieldset( index, 'text', val ) }
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
								placeholder="5.0"
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
							{ __( 'Remove Fieldset', 'block-development-examples' ) }
						</Button>
					</PanelBody>
				) )}
				<Button isPrimary onClick={ addFieldset }>
					{ __( 'Add Fieldset', 'block-development-examples' ) }
				</Button>
			</InspectorControls>

			{/* Visual preview */}
			{previewSlides()}
		</div>
	);
}
