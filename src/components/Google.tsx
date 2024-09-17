import { __ } from '@wordpress/i18n';

interface GoogleProps {
	text: string;
	rating: number;
	date: string;
}

export default function Google({ text, rating, date }: GoogleProps) {
	return (
		<div>
			<h2>{ __( 'Google Review', 'block-development-examples' ) }</h2>
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
