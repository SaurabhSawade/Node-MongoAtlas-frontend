import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', number: '' });
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://node-mongo-atlas-backend.onrender.com/api/users');
      setUsers(res.data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://node-mongo-atlas-backend.onrender.com/api/users', formData);
      setMessage(res.data.message);
      setFormData({ name: '', email: '', number: '' });
      fetchUsers(); // Refresh user list after adding
    } catch (error) {
      setMessage('Error saving data');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mb-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="number"
            placeholder="Phone Number"
            value={formData.number}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
        {message && (
          <p className="text-center text-green-600 font-semibold mt-4">{message}</p>
        )}
      </div>

      {/* Registered Users Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Registered Users</h3>
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users registered yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2 text-left">Name</th>
                <th className="border-b p-2 text-left">Email</th>
                <th className="border-b p-2 text-left">Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id || idx}>
                  <td className="border-b p-2">{user.name}</td>
                  <td className="border-b p-2">{user.email}</td>
                  <td className="border-b p-2">{user.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [formData, setFormData] = useState({ name: '', email: '', number: '' });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('https://node-mongo-atlas-backend.onrender.com/api/users', formData);
//       setMessage(res.data.message);
//     } catch (error) {
//       setMessage('Error saving data');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Registration</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="name"
//             placeholder="Name"
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             type="email"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             name="number"
//             placeholder="Phone Number"
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Submit
//           </button>
//         </form>
//         {message && (
//           <p className="text-center text-green-600 font-semibold mt-4">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;