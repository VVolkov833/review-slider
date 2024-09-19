import { __ } from '@wordpress/i18n';
import { dateI18n } from '@wordpress/date';

interface JamedaProps {
	title?: string;
	rating: number;
	date: string;
}

export default function Jameda({ title, rating, date }: JamedaProps) {
	return (
        <div className="flex items-start gap-4 pr-7">
            <div className="aspect-square px-2 py-1 text-center leading-[1.2] bg-review-Jameda before:bg-review-Jameda">
                Note
                <div className="text-[22px] font-bold">{ rating || '1.0' }</div>
            </div>
            <div>
                { date && <div>{  __( 'Jameda Review from', 'vv' ) } <span className="whitespace-nowrap">{ dateI18n( 'j. F Y', date ) }</span></div> }
                { title && <div className="text-[1.4rem] font-bold leading-[1.3]">{ title }</div> }
            </div>
        </div>
	);
}
