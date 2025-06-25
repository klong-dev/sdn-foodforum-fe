"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { ArrowUp, ArrowDown, ArrowLeft, User, Clock, Loader2, AlertCircle } from "lucide-react"
import { api } from "../api/api"
import CommentBox from "../components/CommentBox"

const PostDetail = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await api.getPost(id)
        setPost(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="flex items-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2">Đang tải bài viết...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="flex items-center gap-2 p-4 border border-red-200 bg-red-50 text-red-700 rounded-lg mb-4">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
          <Link to="/">
            <Button className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Quay lại trang chủ
          </Button>
        </Link>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">
                {post.category}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none mb-6">
              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-base">{post.content}</div>
            </div>

            <div className="flex items-center space-x-4 pt-4 border-t">
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="h-8 px-2 hover:bg-green-50 hover:text-green-600">
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium text-gray-700 min-w-[2rem] text-center">{post.votes}</span>
                <Button variant="ghost" size="sm" className="h-8 px-2 hover:bg-red-50 hover:text-red-600">
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <CommentBox postId={id} />
      </div>
    </div>
  )
}

export default PostDetail
