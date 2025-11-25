// import axios from "axios";
// import { useRef, useState, type FormEvent } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Container, Card, Form, Button, Image, Row, Col } from 'react-bootstrap';


// interface SignupErr {
//   first_name?: Array<string>;
//   last_name?: Array<string>;
//   user_name?: Array<string>; 
//   email?: Array<string>;
//   password?: Array<string>;
//   password_confirmation?: Array<string>;
//   profile_image?: Array<string>;
//   message?: string; 
// }

// const Signup = () => {
//   const navigate = useNavigate();

//   const first_nameRef = useRef<HTMLInputElement>(null);
//   const last_nameRef = useRef<HTMLInputElement>(null);

//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const password_confirmationRef = useRef<HTMLInputElement>(null);
//   const profile_imageRef = useRef<HTMLInputElement>(null);

//   const [errors, setErrors] = useState<SignupErr>({});
//   const [previewImage, setPreviewImage] = useState<string | null>(null);

//   const sendData = async (event: FormEvent) => {
//     event.preventDefault();
//     setErrors({});

//     const formData = new FormData();
//     if (first_nameRef.current?.value) formData.append('first_name', first_nameRef.current.value);
//     if (last_nameRef.current?.value) formData.append('last_name', last_nameRef.current.value);
//     formData.append("user_name",`${first_nameRef.current?.value}_${last_nameRef.current?.value}`)
//     if (emailRef.current?.value) formData.append('email', emailRef.current.value);
//     if (passwordRef.current?.value) formData.append('password', passwordRef.current.value);
//     if (password_confirmationRef.current?.value) formData.append('password_confirmation', password_confirmationRef.current.value);
//     if (profile_imageRef.current?.files?.[0]) {
//       formData.append('profile_image', profile_imageRef.current.files[0]);
//     }

//     try {
//       const res = await axios.post(
//         "https://web-production-3ca4c.up.railway.app/api/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             "Accept": "application/json",
//           },
//         }
//       );
//       console.log(res.data);
//       localStorage.setItem("token", res.data.data.token);
//       localStorage.setItem("profile_image_url", res.data.data.user.profile_image_url);
//       localStorage.setItem("user_name", res.data.data.user.user_name);
//       navigate("/dashboard/items");

//     } catch (err) {
//       console.error("Signup error:", err);
//       if (axios.isAxiosError(err) && err.response) {
//         if (err.response.data.errors) {
//           setErrors(err.response.data.errors);
//         } else if (err.response.data.message) {
//           setErrors({ message: err.response.data.message });
//         }
//       } else {
//         setErrors({ message: "An unexpected error occurred. Please try again." });
//       }
//     }
//   };

//   return (
//     <Container fluid className="d-flex flex-column justify-content-center align-items-center vh-100 m-linear">
//       <Card className=" rounded-4 logcard px-4">
//         <Card.Body className="d-flex flex-column align-items-center card-body py-4 px-2">
          
//           <Image src="/assets/Logo.png" alt="Logo" className="mb-1 mb-sm-4" />

//           <h3 className="text-center text-uppercase">SIGN UP</h3>

//           <p className="text-muted text-center mb-1">Fill in the following fields to create an account.</p>

//           {errors.message && (
//             <div className="alert alert-danger w-100 text-center" role="alert">
//               {errors.message}
//             </div>
//           )}

//           <Form onSubmit={sendData} className="w-100 d-flex flex-column gap-0 gap-sm-2">

//             <Form.Group >
//               <Form.Label>Name</Form.Label>
//               <Row className="row flex-column  flex-sm-row">
//                 <Col className="col mb-2">
//                   <Form.Control
//                     type="text"
//                     placeholder="First Name"
//                     ref={first_nameRef}
//                     className="rounded-3"
//                     style={{fontSize:"12px", fontWeight:"400", padding:"0.8rem"}}
                    
//                   />
//                   {errors?.first_name && (
//                     <Form.Text className="text-danger">
//                       {errors.first_name[0]}
//                     </Form.Text>
//                   )}
//                 </Col>
//                 <Col>
//                   <Form.Control
//                     type="text"
//                     placeholder="Last Name"
//                     ref={last_nameRef}
//                     className="rounded-3"
//                     style={{fontSize:"12px", fontWeight:"400", padding:"0.8rem"}}
                    
//                   />
//                   {errors?.last_name && (
//                     <Form.Text className="text-danger">
//                       {errors.last_name[0]}
//                     </Form.Text>
//                   )}
//                 </Col>
//               </Row>
//             </Form.Group>

//             <Form.Group controlId="formEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 ref={emailRef}
//                 className="rounded-3"
//                     style={{fontSize:"12px", fontWeight:"400", padding:"0.8rem"}}
                
//               />
//               {errors?.email && (
//                 <Form.Text className="text-danger">
//                   {errors.email[0]}
//                 </Form.Text>
//               )}
//             </Form.Group>


//             <Form.Group >
//               <Form.Label>Password</Form.Label>
//                 <Row className="row flex-column  flex-sm-row">
//                 <Col className="col mb-2">
//                   <Form.Control
//                     type="password"
//                     placeholder="Enter password"
//                     ref={passwordRef}
//                     className="rounded-3"
//                     style={{fontSize:"12px", fontWeight:"400", padding:"0.8rem"}}
                    
//                   />
//                   {errors?.password && (
//                     <Form.Text className="text-danger">
//                       {errors.password[0]}
//                     </Form.Text>
//                   )}
//                 </Col>
//                 <Col>
//                   <Form.Control
//                     type="password"
//                     placeholder="Re-enter your password"
//                     ref={password_confirmationRef}
//                     className="rounded-3"
//                     style={{fontSize:"12px", fontWeight:"400", padding:"0.8rem"}}
                    
//                   />
//                   {errors?.password_confirmation && (
//                     <Form.Text className="text-danger">
//                       {errors.password_confirmation[0]}
//                     </Form.Text>
//                   )}
//                 </Col>
//               </Row>
//             </Form.Group>

//             <Form.Group controlId="formProfileImage" className="mb-1 mb-sm-3">
//               <Form.Label>Profile Image</Form.Label>
//               <div
//                 className="d-flex flex-column align-items-center justify-content-center border border-2 rounded-3 p-3"
//                 style={{
//                   maxHeight: '100px',
//                   cursor: 'pointer',
//                   borderColor: '#FEAF00', 
//                   borderStyle: 'dashed',
//                   backgroundColor: '#FFF8EA' ,
//                   maxWidth:'100px'
//                 }}
//                 onClick={() => profile_imageRef.current?.click()} 
//               >
//                 {previewImage ? (
//                   <Image src={previewImage} alt="Preview" style={{ maxHeight: '90px', maxWidth: '90px', objectFit: 'cover' }} />
//                 ) : (
//                   <img src="/assets/uploadicon.png" className="w-100"></img> 
//                 )}
                
//                 <Form.Control
//                   type="file"
//                   ref={profile_imageRef}
//                   className="d-none" 
//                   onChange={(e) => {
//                     const file = (e.target as HTMLInputElement).files?.[0]; 
//                     if (file) {
//                       setPreviewImage(URL.createObjectURL(file));
//                     } else {
//                       setPreviewImage(null); 
//                     }
//                   }}
//                 />
//               </div>
//               {errors?.profile_image && (
//                 <Form.Text className="text-danger">
//                   {errors.profile_image[0]}
//                 </Form.Text>
//               )}
//             </Form.Group>

//             <Button
//               variant="primary"
//               type="submit"
//               className="w-100 rounded-3 py-2"
//               style={{ background: '#FEAF00', borderColor: '#FEAF00', color: 'white' }}
//             >
//               SIGN UP
//             </Button>
//           </Form>

//           <div className="mt-1 mt-sm-3 text-center">
//             <p className="mb-0 text-muted">
//               Do you have an account?{" "}
//               <Link to="/" style={{ color: '#FEAF00' }}>
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default Signup;

import axios from "axios";
import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Image, Row, Col } from 'react-bootstrap';
import './pages.css';

interface SignupErr {
  first_name?: Array<string>;
  last_name?: Array<string>;
  user_name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
  profile_image?: Array<string>;
  message?: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const first_nameRef = useRef<HTMLInputElement>(null);
  const last_nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password_confirmationRef = useRef<HTMLInputElement>(null);
  const profile_imageRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<SignupErr>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const sendData = async (event: FormEvent) => {
    event.preventDefault();
    setErrors({});

    const formData = new FormData();
    if (first_nameRef.current?.value) formData.append('first_name', first_nameRef.current.value);
    if (last_nameRef.current?.value) formData.append('last_name', last_nameRef.current.value);
    formData.append("user_name", `${first_nameRef.current?.value}_${last_nameRef.current?.value}`);
    if (emailRef.current?.value) formData.append('email', emailRef.current.value);
    if (passwordRef.current?.value) formData.append('password', passwordRef.current.value);
    if (password_confirmationRef.current?.value) formData.append('password_confirmation', password_confirmationRef.current.value);
    if (profile_imageRef.current?.files?.[0]) {
      formData.append('profile_image', profile_imageRef.current.files[0]);
    }

    try {
      const res = await axios.post(
       "https://dashboard-i552.onrender.com/api/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
          },
        }
      );
      console.log(res.data);
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("profile_image_url", res.data.data.user.profile_image_url);
      localStorage.setItem("user_name", res.data.data.user.user_name);
      navigate("/dashboard/items");

    } catch (err) {
      console.error("Signup error:", err);
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else if (err.response.data.message) {
          setErrors({ message: err.response.data.message });
        }
      } else {
        setErrors({ message: "An unexpected error occurred. Please try again." });
      }
    }
  };

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center vh-100 m-linear">
      <Card className="rounded-4 logcard px-4">
        <Card.Body className="d-flex flex-column align-items-center card-body py-4 px-2">
          <Image src={`${import.meta.env.BASE_URL}assets/Logo.png`}  alt="Logo" className="mb-1 mb-sm-4" />
          <h3 className="text-center text-uppercase">SIGN UP</h3>
          <p className="text-muted text-center mb-1">Fill in the following fields to create an account.</p>

          {errors.message && (
            <div className="alert alert-danger w-100 text-center" role="alert">
              {errors.message}
            </div>
          )}

          <Form onSubmit={sendData} className="w-100 d-flex flex-column gap-0 gap-sm-2">
            <Form.Group>
              <Form.Label className="form-heading">Name</Form.Label>
              <Row className="row flex-column flex-sm-row">
                <Col className="col mb-2">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    ref={first_nameRef}
                    className="rounded-3 signup-input"
                  />
                  {errors?.first_name && (
                    <Form.Text className="text-danger" style={{fontSize:"12px"}}>
                      {errors.first_name[0]}
                    </Form.Text>
                  )}
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    ref={last_nameRef}
                    className="rounded-3 signup-input"
                  />
                  {errors?.last_name && (
                    <Form.Text className="text-danger" style={{fontSize:"12px"}}>
                      {errors.last_name[0]}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="form-heading">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                ref={emailRef}
                className="rounded-3 signup-input"
              />
              {errors?.email && (
                <Form.Text className="text-danger" style={{fontSize:"12px"}}>
                  {errors.email[0]}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label className="form-heading">Password</Form.Label>
              <Row className="row flex-column flex-sm-row">
                <Col className="col mb-2">
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    ref={passwordRef}
                    className="rounded-3 signup-input"
                  />
                  {errors?.password && (
                    <Form.Text className="text-danger" style={{fontSize:"12px"}}>
                      {errors.password[0]}
                    </Form.Text>
                  )}
                </Col>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Re-enter your password"
                    ref={password_confirmationRef}
                    className="rounded-3 signup-input"
                  />
                  {errors?.password_confirmation && (
                    <Form.Text className="text-danger" style={{fontSize:"12px"}}>
                      {errors.password_confirmation[0]}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formProfileImage" className="mb-1 mb-sm-3">
              <Form.Label className="form-heading">Profile Image</Form.Label>
              <div
                className="d-flex flex-column align-items-center justify-content-center signup-upload-box"
                onClick={() => profile_imageRef.current?.click()}
              >
                {previewImage ? (
                  <Image src={previewImage} alt="Preview" className="signup-preview-image" />
                ) : (
                  <img src={`${import.meta.env.BASE_URL}assets/uploadicon.png`}  className="w-100" />
                )}
                <Form.Control
                  type="file"
                  ref={profile_imageRef}
                  className="d-none "
                  onChange={(e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      setPreviewImage(URL.createObjectURL(file));
                    } else {
                      setPreviewImage(null);
                    }
                  }}
                />
              </div>
              {errors?.profile_image && (
                <Form.Text className="text-danger" style={{fontSize:"12px"}}>
                  {errors.profile_image[0]}
                </Form.Text>
              )}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 rounded-3 py-2 signup-button"
            >
              SIGN UP
            </Button>
          </Form>

          <div className="mt-1 mt-sm-3 text-center">
            <p className="mb-0 text-muted">
              Do you have an account?{" "}
              <Link to="/" className="signup-link">
                Sign in
              </Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
