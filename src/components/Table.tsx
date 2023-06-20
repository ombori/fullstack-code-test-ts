import { User } from "../api/getUsers";

interface Props {
  users: User[];
}

const renderRows = (user: User, i:any) => {
  return (
    <li className="py-3 my-3 sm:py-4" key={i.toString()}>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src={user.avatar}
            alt={user.last_name.toString()}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {user.first_name + " " + user.last_name}
          </p>
        </div>
      </div>
    </li>
  );
};



const Table = ({ ...props }: Props) => {
  return (
    <div className="w-full lg:max-w-xl  xl:max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Users
        </h5>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {props.users.map((user, i) => renderRows(user, i))}
        </ul>
      </div>
    </div>
  );
};
export default Table;
