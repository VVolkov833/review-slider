import { __ } from '@wordpress/i18n';

interface JamedaProps {
	title?: string;
	text: string;
	rating: number;
	date: string;
}

export default function Jameda({ title, text, rating, date }: JamedaProps) {
	return (
		<div>
			<h2>{ __( 'Jameda Review', 'block-development-examples' ) }</h2>
			{title && <h3>{ title }</h3>}
			<p>{ __( 'Date:', 'block-development-examples' ) } { new Date(date).toLocaleDateString() }</p>
			<p>{ __( 'Rating:', 'block-development-examples' ) } { rating }</p>
			<excerpt-readmore excerpt-length="430">
				<div>{ text }</div>
				<div className="hidden">
					<button>{ __( 'Read more', 'block-development-examples' ) }</button>
				</div>
			</excerpt-readmore>
		</div>
	);
}
