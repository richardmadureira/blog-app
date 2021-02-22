import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import PostFormDetail from "../../../components/PostFormDetail";
import PostProps from "../../../lib/interfaces/PostProps";
import { fetcher } from "../../../lib/utils";
import { URL_BACKEND } from "../../../lib/utils/constants";

export default function DetailPost({ post }: PostProps) {
    const { query } = useRouter();
    const { id } = query;
    const { data, error } = useSWR(`${URL_BACKEND}/posts/${id}`, fetcher, { initialData: post });

    if (error) return <div>{"Error: " + error.message}</div>
    if (!data) return <div>Loading...</div>

    return (
        <>
            <section className="mx-auto text-gray-600 body-font">
                <div className="container px-5 mx-auto">
                    <PostFormDetail post={data} />
                </div>
            </section>
        </>
    );
}
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;
    const response = await fetch(`${URL_BACKEND}/posts/${id}`);
    const post = await response.json();
    return {
        props: {
            post
        },
        revalidate: 30
    }
}
