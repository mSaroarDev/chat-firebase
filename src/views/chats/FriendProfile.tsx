import { MdCall, MdOutlineBlock } from "react-icons/md";
import Avatar from "../../components/Avatar";
import Button from "../../components/ui/Button";
import { BsEnvelopePaper } from "react-icons/bs";
import { IoVideocamOutline } from "react-icons/io5";

const FriendProfile = ({
  activeChatUserData
}) => {
  return (
    <>
      <div className="w-full h-screen flex flex-col border-l border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5 flex items-center justify-between bg-white">
          <h2 className="text-lg font-semibold">User Profile</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex items-center justify-center">
            <Avatar name={activeChatUserData?.displayName} size={96} />
          </div>

          <div className="mt-5">
            <h3 className="text-lg font-medium text-center">{activeChatUserData?.displayName}</h3>
            <div className="text-sm text-slate-500 flex items-center justify-center gap-1">
              <div className="bg-green-700 w-2 h-2 rounded-full"></div>
              <span>online</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-5 mt-5">
            <Button color="light" className="rounded-full text-primary"><MdCall size={20} /></Button>
            <Button color="light" className="rounded-full text-primary"><BsEnvelopePaper size={20} /></Button>
            <Button color="light" className="rounded-full text-primary"><IoVideocamOutline size={20} /></Button>
          </div>

          <div className="mt-5">
            <h4 className="font-medium text-slate-700 mb-2">About</h4>
            <p className="text-sm text-slate-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="mt-5">
              <h4 className="font-medium text-slate-700 mb-2">Contact Information</h4>
              <p className="text-sm text-slate-500"><span className="font-medium">Email:</span> {activeChatUserData?.email}</p>
              <p className="text-sm text-slate-500"><span className="font-medium">Phone:</span> +1 234 567 8901</p>
            </div>
          </div>
        </div>

        <div className="p-10 flex items-center justify-center">
          <Button color="danger" className="w-full" startContent={<MdOutlineBlock size={18} />}>Block User</Button>
        </div>
      </div>
    </>
  );
};

export default FriendProfile;