import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import CommentsCountProps from '../lib/interfaces/CommentsCountProps';

export default function CommentsCount({ value }: CommentsCountProps) {
    return (
        <span className="text-gray-500 inline-flex items-center leading-none text-sm">
            <FontAwesomeIcon icon={faComment} />&nbsp;{value}
        </span>
    );
}