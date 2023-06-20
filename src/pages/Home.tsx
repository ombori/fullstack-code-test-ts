import { useEffect, useState } from "react";
import { User, getUsers } from "../api/getUsers";
import Table from "../components/Table";
import loadingGif from "../pulse.gif";
import InfiniteScroll from "react-infinite-scroll-component";

export function Home() {
  const [users, setUsers] = useState([] as User[]);
  const [hasMore, setHasMore] = useState(true); // Track if there are more users to load
  const [page, setPage] = useState(1); // Track the current page

  const fetchData = async () => {
    const responseData = await getUsers(page);
    const newUsers = responseData.data;
    if (newUsers.length === 0) {
      setHasMore(false);
    }
    setUsers((prevUsers) => [...prevUsers, ...newUsers]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      fetchData();
    }, 3000);

    return () => clearTimeout(delayTimeout);
  }, []);

  const handleLoadMore = () => {
    fetchData();
  };

  return (
    <div>
      <div className="flex justify-center">
        <InfiniteScroll
          dataLength={users.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={
            <div>
              <img src={loadingGif} alt="loading" className="mx-auto h-30	w-30" />
            </div>
          }
          endMessage={<p>No more users to load</p>}
        >
          <Table users={users} />
        </InfiniteScroll>
      </div>
    </div>
  );
}
