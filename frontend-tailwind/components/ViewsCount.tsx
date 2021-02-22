import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import ViewsCountProps from '../lib/interfaces/ViewCountProps';

export default function ViewsCount({ value }: ViewsCountProps) {
    return (
        <span className="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
            <FontAwesomeIcon icon={faEye} />&nbsp;{value}
        </span>
    );
}