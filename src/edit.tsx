import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import {
	useBlockProps,
	ColorPalette,
	InspectorControls,
	BlockEditProps,
} from '@wordpress/block-editor';

interface BlockAttributes {
	bg_color: string;
	text_color: string;
	message: string;
}

export default function Edit( { attributes, setAttributes }: BlockEditProps<BlockAttributes> ) {
	const onChangeBGColor = ( hexColor: string ) => {
		setAttributes( { bg_color: hexColor } );
	};

	const onChangeTextColor = ( hexColor: string ) => {
		setAttributes( { text_color: hexColor } );
	};

	return (
		<div { ...useBlockProps() }>
			<InspectorControls key="setting">
				<div className="border-2 border-green-700">
					<fieldset>
						<legend className="blocks-base-control__label">
							{ __( 'Background color', 'block-development-examples' ) }
						</legend>
						<ColorPalette
							onChange={ onChangeBGColor }
						/>
					</fieldset>
					<fieldset>
						<legend className="blocks-base-control__label">
							{ __( 'Text color', 'block-development-examples' ) }
						</legend>
						<ColorPalette
							onChange={ onChangeTextColor }
						/>
					</fieldset>
				</div>
			</InspectorControls>
			<TextControl
				value={ attributes.message }
				onChange={ ( val ) => setAttributes( { message: val } ) }
				style={ {
					backgroundColor: attributes.bg_color,
					color: attributes.text_color,
				} }
			/>
		</div>
	);
}
