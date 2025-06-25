import PostList from "../components/PostList"

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🍜 Diễn đàn ẩm thực</h1>
          <p className="text-gray-600">Khám phá và chia sẻ những món ăn ngon nhất</p>
        </div>
        <PostList />
      </div>
    </div>
  )
}

export default Home
