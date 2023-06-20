import { useEffect, useState } from "react";


type User = any



async function getUsers() {
    return[] as User[]
}

const renderRows = (users : User[]) => {
    return(<>
    {users.map((user) => (
            <tr>
            <td className="border px-4 py-2">joh does</td>
            <td className="border px-4 py-2">@johndoe</td>
            <td className="border px-4 py-2">
              <a href="mailto:dsfsd"> email</a>
            </td>
          </tr>
      ))}
    
    
    </>)
};

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([] as User[]);
  


  const fetchData = async () => {
    const newUsers= await getUsers()
    // const newUsers = responseData.data
    setUsers(users => [...users, ...newUsers]);
    setIsLoading(false);
  };


  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      fetchData();
    }, 3000);

    return () => clearTimeout(delayTimeout);
  }, []);

  if (isLoading) return <div>Loading...</div>;


  return (
    <div>
      <h1>Users</h1>
      <div className="flex justify-center">
        <div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>{renderRows(users)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
