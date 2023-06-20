import { useEffect, useState } from "react";
import { User, getUsers } from "../api/getUsers";
import Table from "../components/Table";
import loadingGif from "../pulse.gif"

const renderRows = (users: User[]) => {
  return (
    <>
      {users.map((user) => (
        <tr id={user.id.toString()}>
          <td className="border px-4 py-2">
            <img
              className="object-contain h-5 w-5"
              src={user.avatar}
              alt={user.id.toString()}
            />
          </td>

          <td className="border px-4 py-2">
            {user.first_name + " " + user.last_name}
          </td>
          <td className="border px-4 py-2">{user.email}</td>
        </tr>
      ))}
    </>
  );
};

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([] as User[]);

  const fetchData = async () => {
    const responseData = await getUsers(1);
    const newUsers = responseData.data;
    setUsers((users) => [...users, ...newUsers]);
    setIsLoading(false);
  };

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      fetchData();
    }, 3000);

    return () => clearTimeout(delayTimeout);
  }, []);

  if (isLoading) return <div> 
    <img src={loadingGif} alt="loading" className="mx-auto" />
  </div>;



  return (
    <div>
      <div className="flex justify-center">
      <Table users={users}/>
      </div>
    </div>
  );
}
