"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { api } from "../api/api"
import { Users, Trash2, Loader2, Mail, Shield, User, Crown, CheckCircle, Calendar } from "lucide-react"

const AdminPanel = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState({})
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await api.getUsers()
      setUsers(data)
    } catch (err) {
      console.error("Error fetching users:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return

    try {
      setActionLoading({ ...actionLoading, [`delete_${userId}`]: true })
      await api.deleteUser(userId)
      setUsers(users.filter((user) => user.id !== userId))
      setSuccess("Đã xóa người dùng thành công")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      console.error("Error deleting user:", err)
    } finally {
      setActionLoading({ ...actionLoading, [`delete_${userId}`]: false })
    }
  }

  const handleUpdateRole = async (userId, newRole) => {
    try {
      setActionLoading({ ...actionLoading, [`role_${userId}`]: true })
      await api.updateUserRole(userId, newRole)
      setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
      setSuccess(`Đã cập nhật quyền người dùng thành ${newRole}`)
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      console.error("Error updating role:", err)
    } finally {
      setActionLoading({ ...actionLoading, [`role_${userId}`]: false })
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Crown className="w-4 h-4 text-yellow-500" />
      case "moderator":
        return <Shield className="w-4 h-4 text-blue-500" />
      default:
        return <User className="w-4 h-4 text-gray-500" />
    }
  }

  const getRoleBadge = (role) => {
    const variants = {
      admin: "default",
      moderator: "secondary",
      user: "outline",
    }

    const labels = {
      admin: "Admin",
      moderator: "Moderator",
      user: "User",
    }

    return (
      <Badge variant={variants[role]} className="flex items-center gap-1">
        {getRoleIcon(role)}
        {labels[role]}
      </Badge>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
        <Users className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <Badge variant="secondary">{users.length} người dùng</Badge>
      </div>

      {success && (
        <div className="flex items-center gap-2 p-4 border border-green-200 bg-green-50 text-green-700 rounded-lg">
          <CheckCircle className="h-4 w-4" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg">{user.username}</CardTitle>
                    {getRoleBadge(user.role)}
                  </div>
                  <div className="space-y-1">
                    <CardDescription className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </CardDescription>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Tham gia: {formatDate(user.joinDate)}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Quyền:</span>
                  <Select
                    value={user.role}
                    onValueChange={(newRole) => handleUpdateRole(user.id, newRole)}
                    disabled={actionLoading[`role_${user.id}`]}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  {actionLoading[`role_${user.id}`] && <Loader2 className="w-4 h-4 animate-spin" />}
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteUser(user.id)}
                  disabled={actionLoading[`delete_${user.id}`] || user.role === "admin"}
                  className="flex items-center gap-2"
                >
                  {actionLoading[`delete_${user.id}`] ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Xóa
                </Button>
              </div>

              {user.role === "admin" && <p className="text-xs text-gray-500 mt-2">* Không thể xóa tài khoản Admin</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AdminPanel
