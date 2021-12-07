import { serialize } from 'next-mdx-remote/serialize';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useEffect } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { useMdxComponentsContext } from '../../context/mdxContext';
import Thumbnail from '../../components/Thumbnail';
import { IPost } from '../../types/post';
import { getPost, getAllPosts } from '../../utils/mdxUtils';
import Prerequisites from '../../components/Prerequisites';
import { ParsedUrlQuery } from 'querystring';
import Stacks from '../../components/Stacks';

// props type
type Props = {
    source: MDXRemoteSerializeResult,
    frontMatter: Omit<IPost, 'slug'>;
}

// components to render
const components = {
    Prerequisites,
    Stacks,
}

const PostPage: React.FC<Props> = ({ source, frontMatter }: Props) => {

    // get setters
    const { setPrerequisites, setStacks } = useMdxComponentsContext();

    useEffect(() => {
        // set prerequisites
        setPrerequisites(frontMatter.prerequisites);
        // set stacks
        setStacks(frontMatter.stacks);
    }, [
        setPrerequisites,
        setStacks,
        frontMatter.prerequisites,
        frontMatter.stacks
    ]);

    return (
        <div>

            <article className="prose prose-green">
                <div className="mb-4">
                    <Thumbnail title={frontMatter.title} src={frontMatter.thumbnail} />
                </div>

                <h1>{frontMatter.title}</h1>

                <p>{frontMatter.description}</p>

                <MDXRemote components={components} {...source} />
            </article>
        </div>
    )
}

export default PostPage;

interface Iparams extends ParsedUrlQuery {
    slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {

    const { slug } = context.params as Iparams;
    // get the slug
    const { content, data } = getPost(slug);
    // serialize the data on the server side
    const mdxSource = await serialize(content, { scope: data });
    return {
        props: {
            source: mdxSource,
            frontMatter: data
        }
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    //only get the slug from posts 
    const posts = getAllPosts(['slug']);

    // map through to return post paths
    const paths = posts.map((post) => ({
        params: {
            slug: post.slug
        }
    }));

    return {
        paths,
        fallback: false
    }
}