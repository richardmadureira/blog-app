import { FormEvent, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRecycle } from '@fortawesome/free-solid-svg-icons';
import Messages from "./Messages";
import Severity from "../lib/models/Severity";
import Message from "../lib/models/Message";
import { URL_BACKEND } from "../lib/utils/constants";

export default function PostForm() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const onChangeTitle = event => setTitle(event.target.value);
    const onchangeAuthor = event => setAuthor(event.target.value);
    const onchangeContent = event => setContent(event.target.value);

    const validateForm = (): Message[] => {
        const msgs: Message[] = [];
        if (!title) {
            msgs.push(new Message(Severity.error, 'Required Field', 'Title is required'));
        }
        if (!author) {
            msgs.push(new Message(Severity.error, 'Required Field', 'Author is required'));
        }
        if (!content) {
            msgs.push(new Message(Severity.error, 'Required Field', 'Content is required'));
        }
        return msgs;
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const msgs = validateForm();
        if (msgs.length > 0) {
            setMessages(msgs);
            return;
        }
        const post = { title, author, content };
        const response = await fetch(`${URL_BACKEND}/posts`, { method: 'POST', body: JSON.stringify(post) })
        if (response.ok) { //FIXME
            resetForm();
            setMessages([
                new Message(Severity.success, 'OK', 'Post criado com sucesso!'),
                new Message(Severity.success, 'Submitted', `Title: ${title}`),
                new Message(Severity.success, 'Submitted', `Author: ${title}`),
                new Message(Severity.success, 'Submitted', `Content: ${title}`)
            ]);
        } else {
            setMessages([new Message(Severity.error, 'Erro', 'Erro ao salvar post')]);
        }
    }

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setContent('');
        setMessages([]);
    }

    return (
        <>
            <h1 className="text-xl text-blue-700 text-center">New Post</h1>
            {(messages && messages.length > 0) && <Messages messages={messages} />}
            <form id="form-post" onSubmit={onSubmit}>
                <label id="labelTitle" className="block my-2" htmlFor="title">
                    <span className="text-gray-700">Title</span>
                    <input id="title" type="text" className="block w-full" placeholder="Ex.: How to cook with clay pot " defaultValue={title} onChange={onChangeTitle} title="Enter the title here" autoFocus />
                </label>
                <label id="l hereabelAuthor" className="block my-2" htmlFor="author">
                    <span className="text-gray-700">Author</span>
                    <input id="author" type="text" className="block w-full" placeholder="Ex.: Mike Anderson" defaultValue={author} onChange={onchangeAuthor} title="Enter the author here" />
                </label>
                <label id="labelContent" className="block my-2" htmlFor="content">
                    <span className="text-gray-700">Content</span>
                    <textarea id="content" className="block w-full h-24" rows={6} placeholder="Enter some long form content (MarkDown format)." defaultValue={content} onChange={onchangeContent} title="Enter the content heare (use markdown format)" />
                </label>
                <div className="flex items-center justify-center my-2">
                    <button id="btnSubmit" type="submit" className="mx-1 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" title="Click here to save the post"><FontAwesomeIcon icon={faCheck} />&nbsp;Salvar</button>
                    <button id="btnReset" type="reset" onClick={resetForm} className="mx-1 bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded" title="Click here to clear the form"><FontAwesomeIcon icon={faRecycle} />&nbsp;Limpar</button>
                </div>
            </form>
        </>
    );
}