import { __ } from '@wordpress/i18n';

interface GoogleProps {
	rating: number;
	date: string;
}

export default function Google({ rating, date }: GoogleProps) {
	return (
		<>
			<h2>{ __( 'Google Review', 'block-development-examples' ) }</h2>
			<p>{ __( 'Date:', 'block-development-examples' ) } { new Date(date).toLocaleDateString() }</p>
			<p>{ __( 'Rating:', 'block-development-examples' ) } { rating }</p>
		</>
	);
}
