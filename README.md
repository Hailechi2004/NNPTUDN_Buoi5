# User & Role Management API

Lê Chí Hải - 2280600798

## Cài đặt

```bash
npm install
```

## Cấu hình

Tạo file `.env` với nội dung:

```
MONGODB_URI=mongodb://localhost:27017/user-role-db
PORT=5000
NODE_ENV=development
```

## Chạy ứng dụng

```bash
npm start
```

Hoặc chế độ phát triển:

```bash
npm run dev
```

## API Endpoints

### Role Management

**1. Tạo role mới**

```
POST /api/roles
Body: {
  "name": "Admin",
  "description": "Administrator role"
}
```

**2. Lấy tất cả roles**

```
GET /api/roles
```

**3. Lấy role theo ID**

```
GET /api/roles/:id
```

**4. Cập nhật role**

```
PUT /api/roles/:id
Body: {
  "name": "Moderator",
  "description": "Moderator role"
}
```

**5. Xóa mềm role**

```
DELETE /api/roles/:id
```

### User Management

**1. Tạo user mới**

```
POST /api/users
Body: {
  "username": "john_doe",
  "password": "password123",
  "email": "john@example.com",
  "fullName": "John Doe",
  "avatarUrl": "https://...",
  "role": "64f1a2b3c4d5e6f7g8h9i0j1"
}
```

**2. Lấy tất cả users**

```
GET /api/users
```

**3. Lấy user theo ID**

```
GET /api/users/:id
```

**4. Cập nhật user**

```
PUT /api/users/:id
Body: {
  "fullName": "John Doe Updated",
  "status": true,
  ...
}
```

**5. Xóa mềm user**

```
DELETE /api/users/:id
```

**6. Enable user (set status = true)**

```
POST /api/users/enable
Body: {
  "email": "john@example.com",
  "username": "john_doe"
}
```

**7. Disable user (set status = false)**

```
POST /api/users/disable
Body: {
  "email": "john@example.com",
  "username": "john_doe"
}
```

## Cấu trúc dự án

```
.
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   └── Role.js
├── controllers/
│   ├── userController.js
│   └── roleController.js
├── routes/
│   ├── userRoutes.js
│   └── roleRoutes.js
├── server.js
├── package.json
├── .env
└── README.md
```

## Tính năng

✅ **CRUD Operations** cho User và Role
✅ **Soft Delete** - Xóa mềm (đánh dấu isDeleted = true)
✅ **Enable/Disable User** - Thay đổi status thông qua email và username
✅ **Validation** - Kiểm tra dữ liệu đầu vào
✅ **Unique Constraints** - username, email, role name
✅ **Populate** - Tự động load thông tin role khi lấy user
✅ **Timestamp** - Lưu createdAt và updatedAt

## Lưu ý

⚠️ **Bảo mật**: Hãy hash password trước khi lưu vào database (sử dụng bcrypt)
⚠️ **Xoá mềm**: Tất cả truy vấn tự động loại trừ các bản ghi có isDeleted = true
