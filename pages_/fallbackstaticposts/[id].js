import React from 'react';
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import useTranslation from "../../src/useTranslation";

const Post = ({post}) => {
    const router = useRouter()
    const { id } = router.query;
    const { t, lang } = useTranslation();

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <React.Fragment>
            <div>{t('common:query')} ID: {id}</div>
            <div>{t('common:post')} ID: {post.id}</div>
            <div>{t('common:title')}: {post.title}</div>
            <div>{t('common:body')}: {post.body}</div>
        </React.Fragment>
    );
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// This function gets called at build time
export async function getStaticPaths({ lang }) {
    // Call an external API endpoint to get staticposts
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    let posts = await res.json()

    posts = posts.slice(0, 2);

    // Get the paths we want to pre-render based on staticposts
    const paths = posts.map(post => ({ params: { id: `${post.id}` } }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: true }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    await sleep(200);
    // params contains the post `id`.
    // If the route is like /staticposts/1, then params.id is 1
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const post = await res.json()

    // Pass post data to the page via props
    return { props: { post } }
}

export default Post;