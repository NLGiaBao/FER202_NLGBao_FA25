import React, { useState } from "react";

const accounts = [
  {
    id: 1,
    username: "naruto",
    password: "naruto123",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSocErq1QEBqh8nni6H9Kfxa9teMfXSpg0jzQ&s",
  },
  {
    id: 2,
    username: "luffy",
    password: "luffy123",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSftLGIGHot6gngUh0v-Ykx0U1wkDKRO-cO9w&s",
  },
  {
    id: 3,
    username: "songoku",
    password: "songoku123",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQalC4bFnp3P_z567AHD30kJfjiYsXovAoVvg&s",
  },
  {
    id: 4,
    username: "doraemon",
    password: "doraemon123",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRKcSr0UE_m-6vWmlguwVdZbKsC7ldJpAbPg&s",
  },
  {
    id: 5,
    username: "sasuke",
    password: "sasuke123",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJsp50YsWnHDHR4rFpC4ZS2-QXhsOLIFWjg&s",
  },
  {
    id: 6,
    username: "zoro",
    password: "zoro123",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQivxS_Jr_sR8vv1SyAfqZsMNmFQKqN2L2q6Q&s",
  },
  {
    id: 7,
    username: "vegeta",
    password: "vegeta123",
    avatar: "https://i.pinimg.com/736x/6d/94/00/6d9400257a3514341ed6df9de77d976e.jpg",
  },
  {
    id: 8,
    username: "nobita",
    password: "nobita123",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU17gtujuppigEMcn6joVthUn1QWib-f96gw&s",
  },
  {
    id: 9,
    username: "sakura",
    password: "sakura123",
    avatar: "https://ik.imagekit.io/x2dirkim6/images/avatars/characters/character_avatar_HUyTZ29uR.webp?tr=w-3840",
  },
];

function AccountSearch() {
  const [search, setSearch] = useState("");

  const filteredAccounts = accounts.filter((acc) =>
    acc.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5" style={{ maxWidth: 1000 }}>
      <div className="bg-white rounded shadow p-4 mb-4">
        <h2 className="mb-3 text-center text-primary fw-bold">Tìm kiếm Account</h2>
        <div className="row justify-content-center mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {filteredAccounts.length === 0 ? (
          <div className="alert alert-warning text-center">Không tìm thấy kết quả</div>
        ) : (
          <div className="row g-4">
            {filteredAccounts.map((acc) => (
              <div className="col-12 col-sm-6 col-md-4" key={acc.id}>
                <div className="card h-100 border-0 shadow-sm text-center p-3">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={acc.avatar}
                      alt={acc.username}
                      className="rounded-circle mb-3 border border-3 border-primary"
                      style={{
                        width: 90,
                        height: 90,
                        objectFit: "cover",
                        background: "#f8f9fa",
                      }}
                    />
                    <h5 className="mb-1 text-capitalize">{acc.username}</h5>
                    <span className="badge bg-secondary mb-2">ID: {acc.id}</span>
                    <div className="text-muted small">
                      <strong>Password:</strong> {acc.password}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountSearch;