import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PostProps from '../lib/interfaces/PostProps';

export default function PostFormDetail({ post }: PostProps) {
    return (
        <>
            <h1 className="text-xl text-blue-700 text-center">Detail Post</h1>
            <div className="px-1 py-4">
                <label id="labelTitle" className="block my-2" htmlFor="title">
                    <span className="text-gray-700">Title</span>
                    <input id="title" type="text" className="block w-full" placeholder="Ex.: How to cook with clay pot " defaultValue={post.title} readOnly disabled />
                </label>
                <label id="l hereabelAuthor" className="block my-2" htmlFor="author">
                    <span className="text-gray-700">Author</span>
                    <input id="author" type="text" className="block w-full" placeholder="Ex.: Mike Anderson" defaultValue={post.author} readOnly disabled />
                </label>
                <label id="labelContent" className="block my-2" htmlFor="content">
                    <span className="text-gray-700">Content</span>
                    <textarea id="content" className="block w-full h-24" rows={6} placeholder="Enter some long form content (MarkDown format)." defaultValue={post.content} readOnly disabled />
                </label>
                <div className="flex items-center justify-center my-2">
                    <button id="btnVoltar" type="reset" onClick={() => { }} className="mx-1 bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded" title="Click here to back the previows page"><FontAwesomeIcon icon={faArrowLeft} />&nbsp;Voltar</button>
                </div>
            </div>
        </>
    );
}