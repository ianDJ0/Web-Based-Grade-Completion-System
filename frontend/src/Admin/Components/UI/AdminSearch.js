import "./AdminSearch.css";

const AdminSearch = (props) => {
  return (
    <input
      id="admin-search"
      type="text"
      placeholder={`Search for ${props.entity} ...`}
      onChange={(event) => {
        props.change(event.target.value);
      }}
    />
  );
};

export default AdminSearch;
