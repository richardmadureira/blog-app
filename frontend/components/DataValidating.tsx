import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckDouble} from '@fortawesome/free-solid-svg-icons';
import DataValidatingProps from '../lib/interfaces/DataValidatingProps';

export default function DataValidating({ isValidating }: DataValidatingProps){
    const icon = isValidating ? faCheck : faCheckDouble;
    const className = isValidating ? 'text-gray-300' : 'text-teal-500';
    return <FontAwesomeIcon icon={icon} className={className}/>
}