import { __ } from '@wordpress/i18n';
import { TextControl, TextareaControl, RangeControl, PanelBody, Button, Panel } from '@wordpress/components';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

interface Fieldset {
	title: string;
	content: string;
}

interface BlockAttributes {
	fieldsets: Fieldset[];
	items: number;
}

export default function Edit({ attributes, setAttributes }: BlockEditProps<BlockAttributes>) {
	// Add a new fieldset
	const addFieldset = () => {
		const newFieldset = { title: '', content: '' };
		setAttributes({ fieldsets: [...attributes.fieldsets, newFieldset] });
	};

	// Remove a fieldset
	const removeFieldset = (index: number) => {
		const updatedFieldsets = [...attributes.fieldsets];
		updatedFieldsets.splice(index, 1);
		setAttributes({ fieldsets: updatedFieldsets });
	};

	// Update fieldset title or content
	const updateFieldset = (index: number, key: keyof Fieldset, value: string) => {
		const updatedFieldsets = [...attributes.fieldsets];
		updatedFieldsets[index][key] = value;
		setAttributes({ fieldsets: updatedFieldsets });
	};

	// Visual preview of the slider in the editor (read-only)
	const previewSlides = () => (
		<div className="flex">
			{attributes.fieldsets.map((fieldset, index) => (
				<div key={index} className="fieldset-slide border border-red-500 border-dotted">
					<h2>{fieldset.title}</h2>
					<div>{fieldset.content}</div>
				</div>
			))}
		</div>
	);

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__('Slider Settings', 'block-development-examples')}>
					<RangeControl
						label={__('Items per row', 'block-development-examples')}
						value={attributes.items}
						onChange={(val) => setAttributes({ items: val })}
						min={1}
						max={4}
					/>
				</PanelBody>

				<PanelBody title={__('Fieldsets', 'block-development-examples')} initialOpen={true}>
					{attributes.fieldsets.map((fieldset, index) => (
						<PanelBody
							key={index}
							title={fieldset.title || `${__('Fieldset', 'block-development-examples')} ${index + 1}`}
							initialOpen={false} // Fieldsets are collapsed by default
						>
							<TextControl
								label={__('Title', 'block-development-examples')}
								value={fieldset.title}
								onChange={(val) => updateFieldset(index, 'title', val)}
							/>
							<TextareaControl
								label={__('Content', 'block-development-examples')}
								value={fieldset.content}
								onChange={(val) => updateFieldset(index, 'content', val)}
							/>
							<Button
								isDestructive
								onClick={() => removeFieldset(index)}
							>
								{__('Remove Fieldset', 'block-development-examples')}
							</Button>
						</PanelBody>
					))}
					<Button isPrimary onClick={addFieldset}>
						{__('Add Fieldset', 'block-development-examples')}
					</Button>
				</PanelBody>
			</InspectorControls>

			{/* Visual preview */}
			{previewSlides()}
		</div>
	);
}
