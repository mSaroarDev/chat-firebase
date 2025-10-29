import { useState } from "react";
import { FaUserLock } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoMailOpenOutline } from "react-icons/io5";
import { LuKeySquare, LuUserRoundPen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import HelmetProvider from "../../providers/HelmetProvider";
import { useAuth } from "../../hooks/useAuth";
import { showToast } from "../../utils/showToast";

const RegisterMain = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signUp } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formdata.name) {
      setError({ ...error, name: "Name is required" });
      return;
    };

    if (!formdata.email) {
      setError({ ...error, email: "Email is required" });
      return;
    };

    if (!formdata.password) {
      setError({ ...error, password: "Password is required" });
      return;
    };

    if (!formdata.confirmPassword) {
      setError({ ...error, confirmPassword: "Confirm Password is required" });
      return;
    };

    if (formdata.password !== formdata.confirmPassword) {
      setError({ ...error, confirmPassword: "Passwords do not match" });
      return;
    };

    if (formdata.password.length < 6) {
      setError({ ...error, password: "Password must be at least 6 characters" });
      return;
    };

    try {
      await signUp(formdata.email, formdata.password, formdata.name);

      showToast("success", "Registered Successfully");
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
        title="Register - Chat App"
        description="Register to Get Started"
      />

      <div className="bg-slate-50 flex w-full h-screen items-center justify-center">
        <Card className="w-[400px] flex flex-col items-center p-7">
          <div className="w-20 h-20 grid place-items-center bg-primary/10 rounded-md mb-10">
            <FaUserLock size={30} className="text-primary" />
          </div>

          <form onSubmit={handleSignup} className="w-full">
            <h3 className="text-center font-semibold text-2xl tracking-wide">
              Register with Email
            </h3>
            <p className="mb-10 text-center text-slate-500 w-3/4 mx-auto">
              Sign in to your account to continue to the dashboard
            </p>

            <div className="w-full mb-2">
              <div className="relative">
                <LuUserRoundPen
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-700"
                />
                <Input
                  className={`w-full pl-12 ${error.name ? "border-red-500" : ""}`}
                  placeholder="Name"
                  type="text"
                  value={formdata.name}
                  onChange={(e) => {
                    setFormdata({
                      ...formdata,
                      name: e.target.value
                    });
                    setError({ ...error, name: "" });
                  }}
                />
              </div>
              {error.name && (
                <p className="text-red-500 text-sm mt-1">{error.name}</p>
              )}
            </div>

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
                    });
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

            <div className="w-full mb-2">
              <div className="relative">
                <LuKeySquare
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-700"
                />
                <Input
                  className={`w-full pl-12 ${error.confirmPassword ? "border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={formdata.confirmPassword}
                  onChange={(e) => {
                    setFormdata({
                      ...formdata,
                      confirmPassword: e.target.value
                    });
                    setError({ ...error, confirmPassword: "" });
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
              {error.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 mb-3">{error.confirmPassword}</p>
              )}
            </div>

            <Button type="submit" className="mt-5 w-full">Register Now</Button>

            <p className="text-center my-5">Already have an account?</p>

          </form>

          <div className="text-center w-full">
            <Button
              className="w-full"
              color="light"
              onClick={() => navigate("/login")}
            >
              Login Here
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default RegisterMain;
