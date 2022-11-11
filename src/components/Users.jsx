import { useState, useEffect } from "react";
// import axios from "../api/axios";
// import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState();
  // const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users");

        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log("Error");
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
        //state: {from: ...} essentially store the location in history from where they came from
      }
    };

    getUsers();

    //cleanUp function
    return () => {
      isMounted = false;
      controller.abort(); //cancel any request if its pending when the component unmounts
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No User to Display</p>
      )}
      {/* <button onClick={() => refresh()}>Refresh</button>
      <br /> */}
    </article>
  );
};

export default Users;
