import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { ArrowUp, ArrowDown, MessageCircle, Clock, User } from "lucide-react"
import { Link } from "react-router"

const PostItem = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {post.category}
              </Badge>
            </div>
            <Link to={`/post/${post.id}`}>
              <h2 className="text-xl font-semibold text-gray-900 hover:text-primary cursor-pointer mb-2 line-clamp-2">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center text-xs text-gray-500 space-x-4">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="h-8 px-2 hover:bg-green-50 hover:text-green-600">
                <ArrowUp className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium text-gray-700 min-w-[2rem] text-center">{post.votes}</span>
              <Button variant="ghost" size="sm" className="h-8 px-2 hover:bg-red-50 hover:text-red-600">
                <ArrowDown className="w-4 h-4" />
              </Button>
            </div>
            <Link to={`/post/${post.id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments} bình luận</span>
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PostItem
