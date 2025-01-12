import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import login from "../../assets/animation/login.json";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import AOS from 'aos';
import 'aos/dist/aos.css';
import PageTitle from "../../components/PageTitle";

const Login = () => {
  const [show, setShow] = useState(false);
  const { googleLogin, signIn, user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      navigate('/')
    }
  },[navigate, user])

  useEffect(() => {
    AOS.init();
  }, []);

  const handleLogin = async(e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state ? location.state : "/");
      })

      .catch((error) => {
        Swal.fire({
          title: "Something wrong!",
          text: `${error.message}`,
          icon: "error",
        });
      });
  };

  if(user || loading) return;

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      console.log(result.user);
      navigate(location?.state ? location.state : "/");
      Swal.fire({
        title: "Successfully Login!",
        text: "Welcome!",
        icon: "success",
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  
  return (
    <div className="relative flex flex-col md:flex-row items-center py-10 md:py-20 max-h-screen w-full" data-aos="fade-down">
      <PageTitle title={'Login page'}/>
      <div className="w-full md:w-2/5 h-full md:h-auto absolute md:relative top-0 left-0 md:top-auto md:left-auto">
        <Lottie
          animationData={login}
          className="w-full h-full md:h-auto"
          style={{ zIndex: -1 }}
        />
      </div>
      <div className="flex flex-col w-full md:w-3/5 z-10  p-5 md:p-0">
        <form onSubmit={handleLogin} className="w-full md:w-4/5 mx-auto">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={show ? "text" : "password"}
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
            <span
              className="absolute top-[52px] right-[10%] cursor-pointer"
              onClick={() => setShow(!show)}
              tabIndex={0}
              aria-label="Toggle password visibility"
              role="button"
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </span>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          <hr className="mt-5" />
        </form>
        <div className="text-center space-y-2 pt-4">
          <h1 className="text-xl font-bold">Or login with</h1>
          <ul className="flex gap-10 items-center justify-center">
            <li
              onClick={handleGoogleLogin}
              tabIndex={0}
              role="button"
              aria-label="Login with Google"
            >
              <FaGoogle size={30} />
            </li>
          </ul>
          <p>
            Do not have an account?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
