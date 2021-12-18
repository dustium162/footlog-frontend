import React from "react";
import InfiniteScroll from "react-infinite-scroller"
import FormUserPostCard from './FormUserPostCard';

const PostCards = ({posts,loadMore,hasMore,loader}) => {
  return (
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore} loader={loader} pageStart={0}>
    {posts.length !== 0 ?
      posts.map((post) => {
        return (
          <div class="my-4">
            <FormUserPostCard key={post.id} post={post} />
          </div>
        )
      })
      :
      <div className="my-2 text-center bg-light rounded border py-3">
        この区分の観戦記録はありません
      </div>
    }
    </InfiniteScroll>
  )
}
export default PostCards