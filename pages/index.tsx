import Thumbnail from '../components/Thumbnail';
import type { NextPage, GetStaticProps } from 'next'
import { IPost } from "../types/post";
import Link from 'next/link'
import { getAllPosts } from "../utils/mdxUtils";

// props type
type Props = {
  posts: [IPost]
}

// component render function
const Home: NextPage<Props> = ({ posts }: Props) => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Technical articles</h1>

      <div className="space-y-12">
        {posts.map((post) => (
          <div key={post.slug}>
            <div className="mb-4"> 
              <Thumbnail
                slug={post.slug}
                title={post.title}
                src={post.thumbnail}
              />
            </div>

            <h2 className="text-2xl font-bold mb-4">
              <Link href={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </h2>

            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home

// get posts from serverside at build time
export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts([
    'title',
    'slug',
    'date',
    'description',
    'thumbnail'
  ]);

  // retunr the posts props
  return { props: { posts } }
}