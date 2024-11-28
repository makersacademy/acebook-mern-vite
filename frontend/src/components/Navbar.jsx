function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid d-flex justify-content-between align-items-center">
    <h1 className="navbar-brand mb-0">BeanScene</h1>

    {/* Directly adding navigation links */}
    <div className="d-flex">
      <a href="/posts" className="nav-link mx-5">Feed</a>
      <a href="/profile" className="nav-link mx-5">Profile</a>
      <a href="/" className="nav-link mx-5">Log Out</a>
    </div>

    {/* Search Form */}
    <form className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>

    );
}

export default Navbar;