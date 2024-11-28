// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../PageStyle/profile.css";
// import { useNavigate } from "react-router-dom";

// const ProfilePage = () => {
//   const navigate=useNavigate()
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     address: "",
//     picture: "",
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/profile", {
//         headers: { token: localStorage.getItem("token") },
//       })
//       .then((response) => {
//         setLoading(false);

//         let email = localStorage.getItem("userEmail");
//         let filterData = response.data.filter((el, i) => el.email == email);

//         setProfile(response.data[1]);
//         console.log(filterData);
//       })
//       .catch((error) => {
//         console.error("Error fetching profile:", error);
//         setLoading(false);
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .put(`http://localhost:8080/profile/${profile._id}`, profile, {
//         headers: {
//           token: localStorage.getItem("tokenAgrofix"),
//         },
//       })
//       .then((response) => {
//         alert("Profile updated successfully!");
//       })
//       .catch((error) => {
//         console.error("Error updating profile:", error);
//         alert("Error updating profile.");
//       });
//   };

//   const hendleLogout=()=>{
//     localStorage.clear()
//     navigate("/login")
//   }
//   const myOrder=()=>{
//     navigate("/orders")
//   }

//   const Admin=()=>{
//     localStorage.clear()
//     navigate("/admin")
//   }
//   if (loading) return <p>Loading profile...</p>;

//   return (
//     <div className="profile-page">
//       <h1>Profile</h1>
//       <div className="profile-info">
//         <img
//           src={profile.picture || "https://via.placeholder.com/150"}
//           alt="Profile"
//           className="profile-picture"
//         />
//         <h2>{profile.name}</h2>
//         <p>{profile.email}</p>
//       </div>
// <button onClick={myOrder}style={{margin:"10px",background:"green"}}>myOrder</button>
// <button onClick={Admin}style={{margin:"10px",background:"green"}}>Admin</button>
//       <form className="profile-form" onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={profile.name}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={profile.email}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             value={profile.password}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           Phone Number:
//           <input
//             type="text"
//             name="phone"
//             value={profile.phone}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           Address:
//           <input
//             type="text"
//             name="address"
//             value={profile.address}
//             onChange={handleChange}
//           />
//         </label>

//         <button type="submit">Update Profile</button>
       
//       </form>
//       <button style={{borderRadius:"10px"}} onClick={hendleLogout} >LogOut</button>
//     </div>
//   );
// };

// export default ProfilePage;



import React, { useState, useEffect } from "react";
import axios from "axios";
import "../PageStyle/profile.css";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate=useNavigate()
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    picture: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/profile", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setLoading(false);

        let email = localStorage.getItem("userEmail");
        let filterData = response.data.filter((el, i) => el.email == email);

        setProfile(response.data[1]);
        console.log(filterData);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/profile/${profile._id}`, profile, {
        headers: {
          token: localStorage.getItem("tokenAgrofix"),
        },
      })
      .then((response) => {
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Error updating profile.");
      });
  };

  const hendleLogout=()=>{
    localStorage.clear()
    navigate("/login")
  }
  const myOrder=()=>{
    navigate("/status")
  }

  const Admin=()=>{
    localStorage.clear()
    navigate("/admin")
  }
  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-info">
        <img
          src={profile.picture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-picture"
        />
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>
      </div>
<button onClick={myOrder}style={{margin:"10px",background:"green"}}>myOrder</button>
<button onClick={Admin}style={{margin:"10px",background:"green"}}>Admin</button>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
          />
        </label>

        <label>
          Phone Number:
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Profile</button>
       
      </form>
      <button style={{borderRadius:"10px"}} onClick={hendleLogout} >LogOut</button>
    </div>
  );
};

export default ProfilePage;
