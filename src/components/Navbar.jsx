import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    const { cart } = useCart();
    const { user, logout } = useAuth();

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="navbar bg-base-200 shadow-md px-4">

            {/* Left */}
            <div className="flex-1">
                <Link to="/" className="text-xl font-bold">
                    Nababi Mart 🛒
                </Link>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">

                {/* Cart */}
                <Link to="/cart" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <FaShoppingCart size={20} />
                        <span className="badge badge-sm badge-primary indicator-item">
                            {totalItems}
                        </span>
                    </div>
                </Link>

                {/* User */}
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                />
                            </div>
                        </label>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <p className="text-xs">{user.email}</p>
                            </li>

                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>

                            <li>
                                <Link to="/admin">Admin Panel</Link>
                            </li>

                            <li>
                                <button onClick={logout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary btn-sm">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
