# 🍜 FoodForum - Diễn đàn ẩm thực

Một diễn đàn ẩm thực hiện đại với giao diện giống Reddit, hỗ trợ phân quyền người dùng.

## 🚀 Cài đặt

### 1. Tạo project với Vite
\`\`\`bash
npm create vite@latest foodforum
cd foodforum
\`\`\`

### 2. Cài đặt dependencies
\`\`\`bash
npm install
npm install react-router-dom lucide-react class-variance-authority clsx tailwind-merge tailwindcss-animate
\`\`\`

### 3. Cài đặt Tailwind CSS
\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

### 4. Cài đặt ShadCN UI
\`\`\`bash
npx shadcn@latest init
npx shadcn@latest add button card input label textarea badge select
\`\`\`

### 5. Chạy project
\`\`\`bash
npm run dev
\`\`\`

## 🎯 Tính năng

- ✅ Đăng ký/Đăng nhập với phân quyền
- ✅ Xem danh sách bài viết
- ✅ Chi tiết bài viết và bình luận
- ✅ Panel Moderator (ẩn/xóa bài viết bị báo cáo)
- ✅ Panel Admin (quản lý người dùng)
- ✅ Giao diện responsive
- ✅ UI hiện đại với ShadCN

## 👥 Tài khoản demo

- **Admin**: admin@foodforum.com / admin123
- **Moderator**: mod@foodforum.com / mod123
- **User**: user@foodforum.com / user123

## 🛠 Tech Stack

- ReactJS (JavaScript)
- Vite
- Tailwind CSS
- ShadCN UI
- React Router v6
- Context API + LocalStorage
- Lucide React Icons

## 📁 Cấu trúc thư mục

\`\`\`
foodforum/
├── src/
│   ├── api/           # API layer
│   ├── components/    # React components
│   ├── context/       # Context API
│   ├── hooks/         # Custom hooks
│   ├── layout/        # Layout components
│   ├── pages/         # Page components
│   ├── routes/        # Routing logic
│   ├── utils/         # Utility functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
\`\`\`

## 🔐 Phân quyền

- **User**: Xem bài viết, bình luận
- **Moderator**: Quản lý bài viết bị báo cáo
- **Admin**: Quản lý người dùng và quyền

## 🎨 Giao diện

- Thiết kế hiện đại, responsive
- Dark/Light mode support (có thể mở rộng)
- Icons từ Lucide React
- Components từ ShadCN UI
