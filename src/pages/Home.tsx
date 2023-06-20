import { useEffect, useState } from "react";
import { User, getUsers } from "../api/getUsers";
import Table from "../components/Table";
import loadingGif from "../pulse.gif";
import InfiniteScroll from "react-infinite-scroll-component";

export function Home() {
  const [users, setUsers] = useState([] as User[]);
  const [hasMore, setHasMore] = useState(true); // Track if there are more users to load
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(true); // Track if the page is loading

  const fetchData = async () => {
    console.log("fetching data", page, hasMore);
    const responseData = await getUsers(page);
    const newUsers = responseData.data;
    if (newUsers.length === 0) {
      setHasMore(false);
    }
    setUsers((prevUsers) => [...prevUsers, ...newUsers]);
  };

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    fetchData();
    return () => clearTimeout(delayTimeout);
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchData();
  };

  const refresh = () => {
    setPage(1);
    setUsers([]);
    setHasMore(true);
    fetchData();
  };

  if (loading)
    return <img src={loadingGif} alt="loading" className="mx-auto" />;
  return (
      <InfiniteScroll
        dataLength={users.length}
        next={handleLoadMore}
        hasMore={hasMore}
        refreshFunction={refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        loader={<p>...</p>}
        endMessage={
          <p className="text-sm font-semibold">No more users to load</p>
        }
      >
        <Table users={users} />
      </InfiniteScroll>
  );
}
