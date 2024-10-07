import { __ } from '@wordpress/i18n';
import { dateI18n } from '@wordpress/date';
import googleIcon from '../assets/images/google.svg';

interface GoogleProps {
	rating: number;
	date: string;
}

export default function Google({ rating, date }: GoogleProps) {

    const roundedRating = rating ? Math.round(rating) : 5;

	return (
        <div className="flex items-start gap-4 pr-7">
            <div className="w-fit text-review-Google before:bg-review-Google whitespace-nowrap">
                <div title={`${__( 'Rating', 'vv833' )} ${rating}`}>{ '★'.repeat(roundedRating) || '' }</div>
                <img src={googleIcon} alt="Google Review" className="w-[85px] min-w-[85px] h-auto" />
            </div>
            <div className="text-[1.4rem] font-bold leading-[1.3]">
                { date && <div>{  __( 'Review', 'vv833' ) } <span>{ dateI18n( 'F Y', date ) }</span></div> }
            </div>
        </div>
	);
}
