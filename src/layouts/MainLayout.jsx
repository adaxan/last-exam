import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/shape.svg";
import animegirl from "../assets/images/anime_girl.jpg";
import { IoMoonSharp } from "react-icons/io5";

function MainLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8F8FB]">
      <div className="w-20 h-full bg-[#373B53] flex flex-col justify-between items-center">
        <div className="relative w-full">
          <div
            className="bg-[#7C5DFA] w-full h-20 rounded-b-2xl flex items-center justify-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img src={Logo} alt="Logo" className="w-7 h-7" />
          </div>
          <div className="absolute top-0 left-0 w-full h-6 bg-[#9277FF] opacity-50 rounded-b-2xl"></div>
        </div>
        <div className="flex flex-col items-center pb-4">
          <IoMoonSharp className="w-6 h-6 text-[#7C5DFA] cursor-pointer mt-6" />
          <hr className="my-5 w-10 border-[#494E6E]" />
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#494E6E]">
            <img src={animegirl} alt="User Avatar" className="w-full h-full" />
          </div>
        </div>
      </div>
      <div className="flex-1 h-full p-10">{children}</div>
    </div>
  );
}

export default MainLayout;