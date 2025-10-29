import { useState } from "react";
import { FaUserLock } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoMailOpenOutline } from "react-icons/io5";
import { LuKeySquare } from "react-icons/lu";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import HelmetProvider from "../../providers/HelmetProvider";
import { useAuth } from "../../hooks/useAuth";
import { showToast } from "../../utils/showToast";

const HomeMain = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formdata.email) {
      setError({ ...error, email: "Email is required" });
      return;
    };

    if (!formdata.password) {
      setError({ ...error, password: "Password is required" });
      return;
    };

    try {
      const res = await login(formdata.email, formdata.password);
      console.log(res);
      navigate("/dashboard/chats", {
        replace: true,
      });
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <>
      <HelmetProvider
        title="Login - Chat App"
        description="Login to your Chat App account to access your dashboard and start chatting with your friends and colleagues."
      />

      <div className="bg-slate-50 flex w-full h-screen items-center justify-center">
        <Card className="w-[400px] flex flex-col items-center p-7">
          <div className="w-20 h-20 grid place-items-center bg-primary/10 rounded-md mb-10">
            <FaUserLock size={30} className="text-primary" />
          </div>

          <form onSubmit={handleLogin} className="w-full">
            <h3 className="text-center font-semibold text-2xl tracking-wide">
              Sign in with Email
            </h3>
            <p className="mb-10 text-center text-slate-500 w-3/4 mx-auto">
              Sign in to your account to continue to the dashboard
            </p>

            <div className="w-full mb-2">
              <div className="relative">
                <IoMailOpenOutline
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-700"
                />
                <Input
                  className={`w-full pl-12 ${error.email ? "border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="example@mail.com"
                  type="email"
                  value={formdata.email}
                  onChange={(e) => {
                    setFormdata({
                      ...formdata,
                      email: e.target.value
                    });
                    setError({ ...error, email: "" });
                  }}
                />
              </div>
              {error.email && (
                <p className="text-red-500 text-sm mt-1 mb-3">{error.email}</p>
              )}
            </div>

            <div className="w-full mb-2">
              <div className="relative">
                <LuKeySquare
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-700"
                />
                <Input
                  className={`w-full pl-12 ${error.password ? "border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={formdata.password}
                  onChange={(e) => {
                    setFormdata({
                      ...formdata,
                      password: e.target.value
                    })
                    setError({ ...error, password: "" });
                  }}
                />
                {showPassword ? (
                  <FiEyeOff
                    onClick={toggleShowPassword}
                    size={20}
                    className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-700"
                  />
                ) : (
                  <FiEye
                    onClick={toggleShowPassword}
                    size={20}
                    className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-700"
                  />
                )}
              </div>

              {error.password && (
                <p className="text-red-500 text-sm mt-1 mb-3">{error.password}</p>
              )}
            </div>

            <div className="text-right">
              <Link to="/forgot-pass">
                <span className="text-slate-600 hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </Link>
            </div>

            <Button type="submit" className="mt-5 w-full">Sign In</Button>

            <p className="text-center my-5">Dont have an account?</p>
          </form>

          <div className="text-center w-full">
            <Button
              type="button"
              className="w-full"
              color="light"
              onClick={() => navigate("/register")}
            >
              Create Account
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default HomeMain;
