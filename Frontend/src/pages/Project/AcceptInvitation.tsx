import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/Redux/Hook"
import { acceptInvitation } from "@/Redux/Project/Action";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AcceptInvitation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has("token"))
    {
      setToken(urlParams.get("token"));
      console.log("token : ", token);
    }
  }, [location.search]);

  if (!token) {
    return <div>No token found in the URL</div>;
  }


  const handleAcceptInvitation = () => {
    if(token && token!==undefined)
    {
      dispatch(acceptInvitation({token,navigate}))
    }
  }
  return (
    <div className="h-[85vh] flex flex-col justify-center items-center">
        <h1 className="py-5 font-semibold text-xl">You are invited to join the project</h1>
        <Button onClick={handleAcceptInvitation} >Accept Invitation</Button>
    </div>
  )
}

export default AcceptInvitation