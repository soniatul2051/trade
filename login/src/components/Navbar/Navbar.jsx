function Navbar(props) {
  return (
    <>
      <nav className="flex justify-between p-2 bg-[#1d2634] mb-3">
        <div>
          <h1>Logo</h1>
        </div>
        <div>
          <ul className="flex ">
            <p>{props.name}</p>
          </ul>
        </div>
        <div></div>
      </nav>
    </>
  );
}
export default Navbar;
