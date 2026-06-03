function Navbar({ username, logout }) {
    return (
        <div style={{
            padding: "10px",
            background: "#222",
            color: "white",
            display: "flex",
            justifyContent: "space-between"
        }}>
            <span>{username}</span>

            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
}

export default Navbar;