import { registerBlockType } from '@wordpress/blocks';

import './assets/excerpt-readmore.ts';
import './assets/tiny-slider.ts';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
