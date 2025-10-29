import { useDeviceType } from "../../hooks/useDeviceType";
import ChatsMain from "./ChatsMain";
import ChatsMainMobile from "./ChatsMainMobile";

const MainChatLayout = () => {
  const {isMobile} = useDeviceType();
  
    return isMobile ? <ChatsMainMobile /> : <ChatsMain />
};

export default MainChatLayout;