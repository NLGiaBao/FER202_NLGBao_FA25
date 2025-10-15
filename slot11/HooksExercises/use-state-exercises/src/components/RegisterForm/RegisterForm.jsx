import React, { useState } from "react";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirm: "",
};

function validateUsername(username) {
  return (
    /^[a-zA-Z0-9_.]{3,}$/.test(username.trim()) &&
    username === username.trim()
  );
}

function validateEmail(email) {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
}

function validatePassword(password) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

function RegisterForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validate = (field, value) => {
    switch (field) {
      case "username":
        if (!validateUsername(value)) {
          return "Username ≥ 3 ký tự, chỉ chữ, số, _ hoặc . và không khoảng trắng đầu/cuối";
        }
        break;
      case "email":
        if (!validateEmail(value)) {
          return "Email không hợp lệ";
        }
        break;
      case "password":
        if (!validatePassword(value)) {
          return "Password ≥ 8 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt";
        }
        break;
      case "confirm":
        if (value !== form.password) {
          return "Confirm password không khớp";
        }
        break;
      default:
        break;
    }
    return "";
  };

  // Kiểm tra toàn bộ form hợp lệ
  const isFormValid =
    validateUsername(form.username) &&
    validateEmail(form.email) &&
    validatePassword(form.password) &&
    form.confirm === form.password;

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate realtime
    setErrors((prev) => ({
      ...prev,
      [name]: validate(name, value),
      ...(name === "password"
        ? { confirm: form.confirm !== value ? "Confirm password không khớp" : "" }
        : {}),
    }));
  };

  // Xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setShowToast(true);
      setShowModal(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  // Xử lý cancel
  const handleCancel = () => {
    setForm(initialState);
    setErrors({});
    setShowToast(false);
    setShowModal(false);
  };

  return (
    <div className="container py-5" style={{ maxWidth: 500 }}>
      <h2 className="mb-4 text-center text-primary">Đăng ký tài khoản</h2>
      <form className="bg-white rounded shadow p-4" onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            name="username"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            value={form.username}
            onChange={handleChange}
            autoFocus
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            name="confirm"
            type="password"
            className={`form-control ${errors.confirm ? "is-invalid" : ""}`}
            value={form.confirm}
            onChange={handleChange}
          />
          {errors.confirm && <div className="invalid-feedback">{errors.confirm}</div>}
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Toast */}
      {showToast && (
        <div
          className="toast align-items-center text-bg-success border-0 show position-fixed bottom-0 end-0 m-4"
          role="alert"
          style={{ zIndex: 9999, minWidth: 220 }}
        >
          <div className="d-flex">
            <div className="toast-body">Submitted successfully!</div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", background: "rgba(0,0,0,0.3)" }}
          onClick={handleCancel}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thông tin đăng ký</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancel}
                ></button>
              </div>
              <div className="modal-body">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">{form.username}</h5>
                    <p className="card-text mb-1">
                      <strong>Email:</strong> {form.email}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Password:</strong> {form.password}
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;