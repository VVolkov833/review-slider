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
				class="flex"
			>
				{ attributes.fieldsets.map( ( fieldset, index ) => (
					<div key={ index } className="justify-between p-7 relative before:mr-[20px] before:absolute before:inset-0 before:-z-10 before:bg-[#fff]">
						{(() => {
							switch (fieldset.provider) {
								case 'Google':
									return <Google rating={fieldset.rating} date={fieldset.date} />;
								case 'Jameda':
									return <Jameda rating={fieldset.rating} date={fieldset.date} title={fieldset.title} />;
							}
						})()}
						<excerpt-readmore excerpt-length="430">
							<div className={`
								whitespace-pre-line mt-3 mb-6 pr-7
								quote-mask before:bg-review-${fieldset.provider}
                            	before:w-[62px] before:h-[49px] before:mr-4 before:float-left before:content-['']
							`}>{ fieldset.text }</div>
                            <div className="absolute right-12 bottom-7 hidden text-right">
                                <button className="underline">
                                    » { __( 'Read more', 'block-development-examples' ) }
                                </button>
                            </div>
						</excerpt-readmore>
					</div>
				)) }
			</tiny-slider>
		</div>
	);
}
