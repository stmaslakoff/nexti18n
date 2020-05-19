import React from 'react';
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import useTranslation from "../../src/useTranslation";

const Post = ({post}) => {
    const router = useRouter()
    const { id } = router.query;
    const { t, lang } = useTranslation();

    return (
        <React.Fragment>
            <div>{t('common:query')} ID: {id}</div>
            <div>{t('common:post')} ID: {post.id}</div>
            <div>{t('common:title')}: {post.title}</div>
            <div>{t('common:body')}: {post.body}</div>
        </React.Fragment>
    );
}

// This gets called on every request
export async function getServerSideProps({ params }) {
    // Fetch data from external API
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const post = await res.json()

    // Pass data to the page via props
    return { props: { post } }
}

export default Post;