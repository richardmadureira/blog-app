import Link from "next/link";
import { useState } from "react";
import Layout from "../../components/Layout";
import Messages from '../../components/messages';
import { savePost, updatePost } from "../../lib/posts";
import { agruparMensagens } from "../../lib/utils";
import { FaCheck, FaTimes, FaArrowLeft } from "react-icons/fa";

export default function PostForm({ postData }) {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [messages, setMessages] = useState([]);

    const onChangeTitle = e => setTitle(e.target.value);
    const onChangeAuthor = e => setAuthor(e.target.value);
    const onChangeSummary = e => setSummary(e.target.value);
    const onChangeContent = e => setContent(e.target.value);

    const validateForm = () => {
        const msgs = [];
        if (!title) {
            msgs.push({ severity: 'error', summary: 'Campo Obrigatório', detail: 'É necessário informar o título' });
        }
        if (!author) {
            msgs.push({ severity: 'error', summary: 'Campo Obrigatório', detail: 'É necessário informar o autor' });
        }
        if (!summary) {
            msgs.push({ severity: 'error', summary: 'Campo Obrigatório', detail: 'É necessário informar o resumo' });
        }
        if (!content) {
            msgs.push({ severity: 'error', summary: 'Campo Obrigatório', detail: 'É necessário informar o conteúdo' });
        }
        return msgs;
    }
    const submitPost = async (event) => {
        event.preventDefault();
        const msgs = validateForm();
        console.log(agruparMensagens(msgs));
        if (msgs.length > 0) {
            setMessages(msgs);
            return;
        }
        const post = { title, author, summary, content };
        let savedOrUpdatedPost;
        if (!id) {
            savedOrUpdatedPost = await savePost(post);
            setMessages({ severity: 'success', summary: "Post Salvo", detail: 'O post foi salvo com sucesso' });
        } else {
            savedOrUpdatedPost = await updatePost(id, post);
            setMessages({ severity: 'success', summary: "Post Atualizado", detail: 'O post foi atualizado com sucesso' });
        }
        setPublishDate(savedOrUpdatedPost.publishDate);
        setLastUpdate(savedOrUpdatedPost.lastUpdate);
    }

    const resetForm = e => {
        e.preventDefault();
        setTitle('');
        setAuthor('');
        setPublishDate('');
        setLastUpdate('');
        setSummary('');
        setContent('');
        setMessages([]);
    }


    return (
        <Layout>
            <div className="container">
                <h2 className="text-primary">Novo Post</h2>
                <Messages value={messages} />
                <form id="form-post" onSubmit={submitPost} noValidate>
                    <div className="form-floating mb-1">
                        <input id="title" type="text" className="form-control" value={title} onChange={onChangeTitle} placeholder="Título" title="Informe o título do post"/>
                        <label id="labelTitle" htmlFor="title" className="form-label">Título</label>
                    </div>
                    <div className="row g-2 mb-1">
                        <div className="col">
                            <div className="form-floating">
                                <input id="publishDate" type="text" className="form-control " value={postData?.publishDate} placeholder="01/01/2021 00:00" disabled readOnly />
                                <label id="labelPublishDate" htmlFor="publishDate" className="form-label">Publicado em</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating">
                                <input id="lastUpdate" type="text" className="form-control" value={postData?.lastUpdate} placeholder="01/01/2021 00:00" disabled readOnly />
                                <label id="labelLastUpdate" htmlFor="lastUpdate" className="form-label">Última Atualização</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-floating mb-1">
                        <input id="author" type="text" className="form-control" value={author} onChange={onChangeAuthor} placeholder="Autor"  title="Informe o autor do post"/>
                        <label id="labelAuthor" htmlFor="author" className="form-label">Autor</label>
                    </div>
                    <div className="form-floating mb-1">
                        <input id="summary" type="text" className="form-control" value={summary} onChange={onChangeSummary} placeholder="Resumo" title="Informe um breve resumo do post"/>
                        <label id="labelSummary" htmlFor="summary" className="form-label">Resumo</label>
                    </div>
                    <div className="form-floating mb-1">
                        <textarea style={{ height: '200px' }} id="content" type="text" className="form-control" defaultValue={postData?.content} value={content} onChange={onChangeContent} placeholder="Conteúdo" title="Informe o conteudo do post, no formato markdown"/>
                        <label id="labelContent" htmlFor="content" className="form-label">Conteúdo</label>
                    </div>
                    <div className="row my-2">
                        <div className="col text-center">
                            <button id="btn-submit" type="submit" className="btn btn-success mx-1" title="Clique aqui para salvar ou atualizar o post"><FaCheck/>&nbsp;Salvar/Atualizar</button>
                            <button id="btn-reset" type="reset" onClick={resetForm} className="btn btn-outline-primary mx-1" title="Clique aqui para limpar os campos do formulário"><FaTimes/>&nbsp;Limpar</button>
                            <Link href="/">
                                <a id="btn-cancelar" className="btn btn-outline-danger mx-1" role="button" title="Clique aqui para cancelar"><FaArrowLeft/>&nbsp;Voltar</a>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export async function getStaticProps({ params }) {
    let retorno = { props: {} };
    if (params) {
        const { id } = params;
        if (id) {
            const postData = await getPostData(id);
            retorno = {
                props: {
                    postData
                }
            }
        }
    }
    return retorno;
}