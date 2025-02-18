function Layout({ handleSectionChange, fade, renderSection, user, setUser }) {
  const location = useLocation();
  const isAdminPage = location.pathname === "/adminDashboard";
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="wrapper">
      {isAdminPage || isLoginPage ? (
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute user={user}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <div className="container">
          <Navbar setActiveSection={handleSectionChange} />
          <Routes>
            <Route
              path="/"
              element={
                <main className={`body-content ${fade ? "hidden" : ""}`}>
                  {renderSection()}
                </main>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default Layout;
