import { __ } from '@wordpress/i18n';
import { dateI18n } from '@wordpress/date';

interface JamedaProps {
	title?: string;
	rating: number;
	date: string;
}

export default function Jameda({ title, rating, date }: JamedaProps) {
	return (
        <div class="flex items-start gap-4 pr-7">
            <div class="aspect-square px-2 py-1 text-center leading-[1.2] bg-review-Jameda before:bg-review-Jameda text-on-secondary">
                Note
                <div class="text-[22px] font-bold">{ rating || '1.0' }</div>
            </div>
            <div>
                { date && <div>{  __( 'Jameda Review from', 'block-development-examples' ) } { dateI18n( 'j. F Y', date ) }</div> }
                { title && <div class="text-[1.4rem] font-bold leading-[1.3]">{ title }</div> }
            </div>
        </div>
	);
}
