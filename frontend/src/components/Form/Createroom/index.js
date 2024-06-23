import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Createroom = ({ uuid, socket, setUser }) => {
    const [roomid, setRoomid] = useState(uuid());
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleCreateroom = (e) => {
        e.preventDefault();
        const roomdata = {
            name,
            roomid,
            userid: uuid(),
            host: true,
            presenter: true  
        };
        setUser(roomdata);
        navigate(`/${roomid}`);
        socket.emit("userjoined", roomdata);
    };

    const handleCopyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Room Code copied");
        } catch (error) {
            toast.error("Failed to copy Room Code");
            console.error("Failed to copy:", error);
        }
    };

    return (
        <form className="form col-md-12 mt-5">
            <div className="form-grp">
                <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Name here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-grp border">
                <div className="form-grp">
                    <div className="input-group d-flex align-items-center justify-content-center">
                        <input
                            type="text"
                            className="form-control my-2 border-0"
                            value={roomid}
                            placeholder="Generate room code"
                            disabled
                        />
                    </div>
                    <div className="input-group-append">
                        <button className="btn btn-primary btn-sm me-1" type="button" onClick={() => setRoomid(uuid)}>
                            Generate
                        </button>
                        <button className="btn btn-outline-danger btn-sm me-2" type="button" onClick={() => handleCopyText(roomid)}>
                            Copy
                        </button>
                    </div>
                </div>
            </div>
            <button type="submit" className="mt-4 btn border-primary" onClick={handleCreateroom}>
                Generate Room
            </button>
        </form>
    );
};

export default Createroom;
