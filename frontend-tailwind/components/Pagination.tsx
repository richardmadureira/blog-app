import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import PaginationProps from '../lib/interfaces/PaginationProps';

export default function Pagination({ previousPost, nextPost }: PaginationProps) {
    return (
        <div className="w-full flex pt-6">
            <div className="w-1/2 bg-white shadow hover:shadow-md text-left p-6">
                <Link href="/posts/[id]" as={`/posts/${previousPost.id}`}>
                    <a>
                        <p className="text-lg text-blue-800 font-bold flex items-center"><FontAwesomeIcon icon={faArrowLeft} />&nbsp;Previous</p>
                        <p className="pt-2">{previousPost.title}</p>
                    </a>
                </Link>
            </div>
            <div className="w-1/2 bg-white shadow hover:shadow-md text-right p-6">
                <Link href="/posts/[id]" as={`/posts/${nextPost.id}`}>
                    <a>
                        <p className="text-lg text-blue-800 font-bold flex items-center justify-end">Next&nbsp;<FontAwesomeIcon icon={faArrowRight} /></p>
                        <p className="pt-2">{nextPost.title}</p>
                    </a>
                </Link>
            </div>
        </div>
    );
}