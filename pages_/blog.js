import React from 'react';
import fetch from 'node-fetch'
import Link from '../src/Link'
import useTranslation from "../src/useTranslation";


function postBlock({title, link, posts}) {
    return (
        <div>
            <div>{title}</div>
            <div>
                {posts.map(post => (
                    <Link href={`/${link}/[id]`} as={`/${link}/${post.id}`} key={post.id}>
                        <a style={{margin: 10, display: 'block', width: 'fit-content'}}>{post.id} - {post.title}</a>
                    </Link>)
                )}
            </div>
        </div>
    );
}

function Blog({ posts }) {
    const { t, lang } = useTranslation();
    return (
      <React.Fragment>
          <div style={{display: 'flex'}}>
              {postBlock({title: t('blog:ssr'), posts, link: 'ssrposts'})}
              {postBlock({title: t('blog:static'), posts, link: 'staticposts'})}
              {postBlock({title: t('blog:fallback'), posts, link: 'fallbackstaticposts'})}
          </div>
      </React.Fragment>
    );
}

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get staticposts
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()

    // By returning { props: staticposts }, the Blog component
    // will receive `staticposts` as a prop at build time
    return {
        props: {
            posts,
        },
    }
}

export default Blog