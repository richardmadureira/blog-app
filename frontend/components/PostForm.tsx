import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRecycle } from '@fortawesome/free-solid-svg-icons';
import Messages from "./Messages";
import Severity from "../lib/models/Severity";
import Message from "../lib/models/Message";
import { URL_BACKEND } from "../lib/utils/constants";
import api from '../lib/api';
import Category from "../lib/models/Category";
import { AxiosResponse } from "axios";
import Post from "../lib/models/Post";

export default function PostForm() {
    const [coverImage, setCoverImage] = useState();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [optionsCategories, setOptionsCategories] = useState<Category[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        async function fetchOptionsCategories() {
            const response = await api.post<any, AxiosResponse<Category[]>>('/categories/pesquisa');
            setOptionsCategories(response.data);
        }
        fetchOptionsCategories();
    }, []);

    const onChangeCoverImage = event => setCoverImage(event.target.files[0]);
    const onChangeTitle = event => setTitle(event.target.value);
    const onChangeAuthor = event => setAuthor(event.target.value);
    const onChangeExcerpt = event => setExcerpt(event.target.value);
    const onChangeContent = event => setContent(event.target.value);
    const onChangePublishDate = event => setPublishDate(event.target.value);
    const onChangeCategories = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategories: Category[] = [];
        for (let i = 0; i < event.target.options.length; i++) {
            const option = event.target.options[i];
            if (option.selected) {
                const selectedCategory:any = optionsCategories.find(c => c.id === option.value);
                selectedCategories.push(selectedCategory);
            }
        }
        setCategories(selectedCategories);
    }

    const validateForm = (): Message[] => {
        const msgs: Message[] = [];
        if (!coverImage) {
            msgs.push(new Message(Severity.error, 'Required Field', 'Cover Image is required'));
        }
        if (!title) {
            msgs.push(new Message(Severity.error, 'Required Field', 'Title is required'));
        }
        if (!author) {
            msgs.push(new Message(Severity.error, 'Required Field', 'Author is required'));
        }
        if (!excerpt) {
            msgs.push(new Message(Severity.error, 'Required Field', 'Excerpt is required'));
        }
        if (!content) {
            msgs.push(new Message(Severity.error, 'Required Field', 'Content is required'));
        }
        if (!publishDate) {
            msgs.push(new Message(Severity.error, 'Required Field', 'Publish Date is required'));
        }
        if (!categories || !categories.length) {
            msgs.push(new Message(Severity.error, 'Required Field', 'Categories is required'));
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
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Content-Type', 'multipart/form-data');
        const post = { coverImage, title, author, excerpt, publishDate, categories, content };
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('coverImage', post.coverImage);
        formData.append('excerpt', post.excerpt);
        formData.append('content', post.content);
        formData.append('publishDate', post.publishDate);
        formData.append('categories', JSON.stringify(categories));
        formData.append('author', post.author);
        const response = await api.post<FormData, AxiosResponse<Post>>(`${URL_BACKEND}/posts`, formData, { headers: myHeaders})
        if (response.status == 201) { //FIXME
            const msgs = JSON.parse(response.headers['messages']);
            resetForm();
            setMessages(msgs);
        } else {
            const msgs = JSON.parse(response.headers['messages']);
            setMessages([new Message(Severity.error, 'Erro', 'Erro ao salvar post'), ...msgs]);
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
                <label id="labelCoverImage" className="block my-2" htmlFor="coverImage">
                    <span className="text-gray-700">Title</span>
                    <input id="coverImage" type="file" multiple={false} accept="image/*" className="block w-full" onChange={onChangeCoverImage} title="Enter the cover image here" autoFocus />
                </label>
                <label id="labelTitle" className="block my-2" htmlFor="title">
                    <span className="text-gray-700">Title</span>
                    <input id="title" type="text" className="block w-full" placeholder="Ex.: How to cook with clay pot " defaultValue={title} onChange={onChangeTitle} title="Enter the title here" autoFocus />
                </label>
                <label id="labelAuthor" className="block my-2" htmlFor="author">
                    <span className="text-gray-700">Author</span>
                    <input id="author" type="text" className="block w-full" placeholder="Ex.: Mike Anderson" defaultValue={author} onChange={onChangeAuthor} title="Enter the author here" />
                </label>
                <label id="labelCategories" className="block my-2" htmlFor="categories">
                    <span className="text-gray-700">Author</span>
                    <select id="categories" multiple={true} className="block w-full" onChange={onChangeCategories} title="Enter the category(ies) here">
                        {optionsCategories.map((c, key) => <option key={key} value={c.id}>{c.name}</option>)}
                    </select>
                </label>
                <label id="labelExcerpt" className="block my-2" htmlFor="excerpt">
                    <span className="text-gray-700">Excerpt</span>
                    <input id="excerpt" type="text" className="block w-full" placeholder="Ex.: Anythinig with you to want..." defaultValue={excerpt} onChange={onChangeExcerpt} title="Enter the excerpt here" />
                </label>
                <label id="labelPublishDate" className="block my-2" htmlFor="publishDate">
                    <span className="text-gray-700">Publish Date</span>
                    <input id="publishDate" type="datetime-local" className="block w-full" placeholder="2020-01-01 00:00:00" defaultValue={publishDate} onChange={onChangePublishDate} title="Enter the publish date here" />
                </label>
                <label id="labelContent" className="block my-2" htmlFor="content">
                    <span className="text-gray-700">Content</span>
                    <textarea id="content" className="block w-full h-24" rows={6} placeholder="Enter some long form content (MarkDown format)." defaultValue={content} onChange={onChangeContent} title="Enter the content heare (use markdown format)" />
                </label>
                <div className="flex items-center justify-center my-2">
                    <button id="btnSubmit" type="submit" className="mx-1 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" title="Click here to save the post"><FontAwesomeIcon icon={faCheck} />&nbsp;Salvar</button>
                    <button id="btnReset" type="reset" onClick={resetForm} className="mx-1 bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded" title="Click here to clear the form"><FontAwesomeIcon icon={faRecycle} />&nbsp;Limpar</button>
                </div>
            </form>
        </>
    );
}