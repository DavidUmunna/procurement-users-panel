import User from "./components/user-navbar";

function App() {
  return (
    <div>
      <User />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to the Procurement App</h1>
        <p className="text-gray-600 mt-2">Manage your orders and suppliers efficiently.</p>
      </div>
    </div>
  );
}

export default App;