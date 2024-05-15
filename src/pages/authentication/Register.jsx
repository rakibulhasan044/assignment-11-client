import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import register from '../../assets/animation/register.json'
import Lottie from "lottie-react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const [show, setShow] = useState(false);
  const { user, createUser, profileUpdate, setUser } = useAuth()
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photourl = form.photourl.value;
    const password = form.password.value;
    console.log(name, email, photourl, password);

    createUser(email, password)
    .then(res => {
        console.log(res.user);
        profileUpdate(name, photourl)
      .then(() => {
        setUser({...user, displplayName: name, photoURL: photourl})
      })
      Swal.fire({
        title: "Successfully Register!",
        text: "Welcome!",
        icon: "success"
      });
    })
    .catch(error => {
        Swal.fire({
            title: "Please Try Again!",
            text: `${error.message}`,
            icon: "error"
          });
    })

  };
  return (
    <div className="relative flex flex-col md:flex-row items-center py-10 md:py-20 max-h-screen w-full">
      <div className="w-full md:w-2/5 h-full md:h-auto absolute md:relative top-0 left-0 md:top-auto md:left-auto">
        <Lottie
          animationData={register}
          loop={true}
          className="w-full h-full md:h-auto"
          style={{ zIndex: -1 }}
        />
      </div>
      <div className="flex flex-col w-full md:w-3/5 z-10  p-5 md:p-0">
        <form onSubmit={handleRegister} className="w-full md:w-4/5 mx-auto">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              className="input input-bordered"
              required
            />
          </div>
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              placeholder="photo url"
              name="photourl"
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
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          <hr className="mt-5" />
        </form>
        <div className="text-center space-y-2 pt-4">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold">
              login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
