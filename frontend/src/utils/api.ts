import axios from "axios";
export async function getStreamToken() {
    const authUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;
    const id=authUser.id.toString()
    const res = await axios.get("http://localhost:8000/chat/token", {
        params: {
          id: id // or whatever your variable is
        }
    });
    return res.data;
}