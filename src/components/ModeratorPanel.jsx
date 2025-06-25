"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { api } from "../api/api"
import { AlertTriangle, EyeOff, Trash2, Loader2, User, Clock, CheckCircle } from "lucide-react"

const ModeratorPanel = () => {
  const [reportedPosts, setReportedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState({})
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchReportedPosts()
  }, [])

  const fetchReportedPosts = async () => {
    try {
      setLoading(true)
      const data = await api.getReportedPosts()
      setReportedPosts(data)
    } catch (err) {
      console.error("Error fetching reported posts:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleHidePost = async (postId) => {
    try {
      setActionLoading({ ...actionLoading, [`hide_${postId}`]: true })
      await api.hidePost(postId)
      setReportedPosts(reportedPosts.filter((post) => post.id !== postId))
      setSuccess("Đã ẩn bài viết thành công")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      console.error("Error hiding post:", err)
    } finally {
      setActionLoading({ ...actionLoading, [`hide_${postId}`]: false })
    }
  }

  const handleDeletePost = async (postId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return

    try {
      setActionLoading({ ...actionLoading, [`delete_${postId}`]: true })
      await api.deletePost(postId)
      setReportedPosts(reportedPosts.filter((post) => post.id !== postId))
      setSuccess("Đã xóa bài viết thành công")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      console.error("Error deleting post:", err)
    } finally {
      setActionLoading({ ...actionLoading, [`delete_${postId}`]: false })
    }
  }

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
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Đang tải dữ liệu...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-orange-500" />
        <h1 className="text-2xl font-bold">Bài viết bị báo cáo</h1>
        <Badge variant="secondary">{reportedPosts.length}</Badge>
      </div>

      {success && (
        <div className="flex items-center gap-2 p-4 border border-green-200 bg-green-50 text-green-700 rounded-lg">
          <CheckCircle className="h-4 w-4" />
          <span>{success}</span>
        </div>
      )}

      {reportedPosts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Không có bài viết nào bị báo cáo.</p>
            <p className="text-gray-500 text-sm mt-2">Tuyệt vời! Cộng đồng đang hoạt động tích cực.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reportedPosts.map((post) => (
            <Card key={post.id} className="border-orange-200 bg-orange-50/30">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Bị báo cáo
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-red-700">{post.title}</CardTitle>
                    <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                    <div className="flex items-center text-sm text-gray-500 space-x-4 mt-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="font-medium">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{post.votes} votes</span>
                        <span>•</span>
                        <span>{post.comments} comments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleHidePost(post.id)}
                    disabled={actionLoading[`hide_${post.id}`]}
                    className="flex items-center gap-2"
                  >
                    {actionLoading[`hide_${post.id}`] ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                    Ẩn bài viết
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                    disabled={actionLoading[`delete_${post.id}`]}
                    className="flex items-center gap-2"
                  >
                    {actionLoading[`delete_${post.id}`] ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Xóa bài viết
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ModeratorPanel
