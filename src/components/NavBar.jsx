"use client"

import { Link, useNavigate, useLocation } from "react-router"
import { Button } from "@/src/components/ui/button"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"
import { Menu, X, Home, Shield, Settings, LogIn, UserPlus, LogOut, User } from "lucide-react"

const NavBar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-bold text-primary">🍜 FoodForum</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/">
              <Button variant={isActive("/") ? "default" : "ghost"} className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Trang chủ
              </Button>
            </Link>

            {isAuthenticated && user?.role === "moderator" && (
              <Link to="/moderator">
                <Button variant={isActive("/moderator") ? "default" : "ghost"} className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Moderator
                </Button>
              </Link>
            )}

            {isAuthenticated && user?.role === "admin" && (
              <>
                <Link to="/moderator">
                  <Button variant={isActive("/moderator") ? "default" : "ghost"} className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Moderator
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button variant={isActive("/admin") ? "default" : "ghost"} className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Admin
                  </Button>
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <User className="w-4 h-4" />
                  <span className="font-semibold">{user.username}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{user.role}</span>
                </div>
                <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Đăng ký
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link to="/" onClick={closeMenu}>
                <Button
                  variant={isActive("/") ? "default" : "ghost"}
                  className="w-full justify-start flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Trang chủ
                </Button>
              </Link>

              {isAuthenticated && user?.role === "moderator" && (
                <Link to="/moderator" onClick={closeMenu}>
                  <Button
                    variant={isActive("/moderator") ? "default" : "ghost"}
                    className="w-full justify-start flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Moderator
                  </Button>
                </Link>
              )}

              {isAuthenticated && user?.role === "admin" && (
                <>
                  <Link to="/moderator" onClick={closeMenu}>
                    <Button
                      variant={isActive("/moderator") ? "default" : "ghost"}
                      className="w-full justify-start flex items-center gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      Moderator
                    </Button>
                  </Link>
                  <Link to="/admin" onClick={closeMenu}>
                    <Button
                      variant={isActive("/admin") ? "default" : "ghost"}
                      className="w-full justify-start flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Admin
                    </Button>
                  </Link>
                </>
              )}

              {isAuthenticated ? (
                <div className="pt-4 border-t">
                  <div className="px-3 py-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-semibold">{user.username}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{user.role}</span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full justify-start flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t space-y-2">
                  <Link to="/login" onClick={closeMenu}>
                    <Button variant="outline" className="w-full justify-start flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMenu}>
                    <Button className="w-full justify-start flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Đăng ký
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
