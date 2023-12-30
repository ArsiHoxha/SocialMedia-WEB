import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pagesStyle/Home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate ();
  const [workDetails, setWorkDetails] = useState('');
  const [cityName, setCityName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [moreDetails, setMoreDetails] = useState('');
  const [data_Marre_Nga_id,setdata_Marre_Nga_id] = useState([])
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isMenuVisible, setMenuVisible] = useState(false);

  let tokeni;

  const handleProtectedRequest = async () => {
    try {
      const token = localStorage.getItem("authToken");
      tokeni = token

      console.log(token);
      const response = await axios.get("http://localhost:8080/protected", {
        headers: {
          Authorization: token,
        },
      });
      
      setData(response.data.user);
    } catch (error) {
      console.error(
        "Error accessing protected route:",
        error.response ? error.response.data : error.message
      );
        navigate('/login')
    }
  };



  const handleDataPost = () =>{
    axios.post('http://localhost:8080/home',{userId:data._id,workDetails:workDetails,cityName:cityName,schoolName:schoolName,moreDetails:moreDetails},{

    }).then(()=>{
      console.log('your intro data was sent succesfully')
    }).catch((err)=>{
        console.log('THere was an error senting your intro Data to the server',err)
    })
  }

  

  const sendId = () =>{
    axios.post('http://localhost:8080/homeId',{tokeni},{

    }).then(()=>{
      console.log('your intro data was sent succesfully')
    }).catch((err)=>{
        console.log('THere was an error senting your intro Data to the server',err)
    })
  }

  axios.get('http://localhost:8080/home').then(res=>{
    setdata_Marre_Nga_id(res.data)
  }).catch(err=>{
    console.log(err)
  })

  useEffect(() => {
    handleProtectedRequest();
    sendId()
  }, []);
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData);
      setUploadedFile(response.data.filename);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const handleFileUploadProfile = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/uploadProfile', formData);
      setUploadedFile(response.data.filename);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  // Function to close the pop-up menu
  const closeMenu = () => {
    setMenuVisible(false);
  };


  return (
    <div className="Profile-user">
<img id="banner" src={`http://localhost:8080/uploads/${data_Marre_Nga_id.bannerImage}`} alt="Banner" />
      <div className="container-pare">
        <img
          id="profilePhoto"
          src={`http://localhost:8080/uploads/${data_Marre_Nga_id.profileImage}`}        ></img>
        <div className="sectioni-pare">
          <button id="menuButton">About</button>
          <button id="menuButton">Friends</button>
          <button id="menuButton">Photos</button>
          <button id="menuButton">More</button>
          <button onClick={toggleMenu}>Customize</button>
          {isMenuVisible && (
        <div className="popup-menu">
          <div id="changeBanner">Change Banner</div>
          <form className="file-upload-form"
              action="http://localhost:8080/upload"
              method="post"
              enctype="multipart/form-data"
            >
              <input type="file" onChange={handleFileChange} name="file" />
              <button onClick={handleFileUpload}>Upload</button>


            </form>
            <div id="changeBanner">Change Profile Photo</div>
          <form className="file-upload-form"
              action="http://localhost:8080/uploadProfile"
              method="post"
              enctype="multipart/form-data"
            >
              <input type="file" onChange={handleFileChange} name="file" />
              <button onClick={handleFileUploadProfile}>Upload</button>


            </form>

            <div>
          </div>


          {/* Save and Close Buttons */}

          {/* Button to close the pop-up menu */}
          <button onClick={closeMenu}>Close</button>
        </div>
      )}

        </div>
      </div>
      <div className="intro">
      <div className="intro-1">
        <h2 className="section-title_Intro">Intro</h2>
        <h2 className="email">My email {data.username}</h2>
      </div>
      <div className="intro-posts">
      
      <div className="intro-2">
      <div className="tittle-input">
        <h2 className="section-title"> Work</h2>
        <input
          type="text"
          className="inputField"
          placeholder="Work details"
          value={data_Marre_Nga_id.workDetail}
          onChange={(e) => setWorkDetails(e.target.value)}
          
   />
      </div>

      <div className="tittle-input">
        <h2 className="section-title"> City</h2>
        <input
          type="text"
          className="inputField"
          placeholder="City Name"
          value={data_Marre_Nga_id.cityDetail}
          onChange={(e) => setCityName(e.target.value)}
        />
      </div>

      <div className="tittle-input">
        <h2 className="section-title"> School</h2>
        <input
          type="text"
          className="inputField"
          placeholder="School name"
          value={data_Marre_Nga_id.addSchool}
          onChange={(e) => setSchoolName(e.target.value)}
        />
      </div>

      <div className="tittle-input">
        <h2 className="section-title"> More</h2>
        <input
          type="text"
          className="inputField"
          placeholder="More Details"
          value={data_Marre_Nga_id.addMore}
          onChange={(e) => setMoreDetails(e.target.value)}
        />
      </div>
      
      <button onClick={handleDataPost}>Add your Data</button>
    </div>
    
      <div className="posts">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPZ735nU39ID7n7YKOF_rcLR1wS4UnYEsyzA0e6sIhsw&s" alt="Post Image" className="post-image" />
      <div className="description">
        <div>My name is Arsi Hoxha.I am 16 years old programmer. I live in Durres Albania
</div>
      </div>
      <div className="like-comments">
        <div className="like">0 Likes</div>
        <div className="comments">
          <div className="comment">Comment</div>
        </div>
      </div>
    </div>

    </div>
    </div>
    <div>

          </div>

    </div>
  );
};

export default Home;
