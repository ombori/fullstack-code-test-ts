import { useEffect, useState } from "react";
import { User, getUsers } from "../api/getUsers";
import Table from "../components/Table";
import loadingGif from "../pulse.gif"
import InfiniteScroll from "react-infinite-scroll-component";


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




  function infiniteScroll() {
    return (
      <InfiniteScroll
        dataLength={users.length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={()=>{}}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        <Table users={users}/>
      </InfiniteScroll>
    );
  }



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
        {infiniteScroll()}
      {/* <Table users={users}/> */}
      </div>
    </div>
  );
}
