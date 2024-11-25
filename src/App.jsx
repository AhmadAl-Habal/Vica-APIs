import React, { useState } from "react";
import "./index.css";
function App() {
  const [loginResponse, setLoginResponse] = useState(null);
  const [registerResponse, setRegisterResponse] = useState(null);
  const [itemsResponse, setItemsResponse] = useState(null);
  const [addItemResponse, setAddItemResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file); // Store the selected file
  };
  const registerEndpoint = async () => {
    const formData = new FormData();
    formData.append("first_name", "next");
    formData.append("last_name", "js");
    formData.append("user_name", "next_js");
    formData.append("email", "nextjs@gmail.com");
    formData.append("password", "123123123");
    formData.append("password_confirmation", "123123123");

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://vica.website/api/register", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.text();
      setRegisterResponse(result || "Registration Successful!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append("email", "mohammed.alkordy2@gmail.com");
    formData.append("password", "123123123");

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://vica.website/api/login", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();

      // token = ahmad.token;

      setLoginResponse(result || "Login Successful!");
      const parsedResult = JSON.parse(result);
      const tokenVaule = parsedResult.token;
      setToken(tokenVaule);
      console.log(tokenVaule);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const showAllItems = async () => {
    if (!token) {
      alert("Token not found. Please log in first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://vica.website/api/items", {
        method: "GET",
        headers: {
          Accept: "application/json", // Add Accept header
          Authorization: `Bearer ${token}`, // Use token for authentication
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setItemsResponse(data); // Save the items response
      console.log("Items Response:", data); // Log the response
    } catch (error) {
      setError(error.message);
      alert(`Error during fetching items: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    if (!token) {
      alert("Token not found. Please log in first.");
      return;
    }

    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append("name", "iphone x");
      formData.append("price", "500");
      formData.append("image", selectedImage); // Append the user-selected image

      // Make the API request
      const apiResponse = await fetch("https://vica.website/api/items", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const result = await apiResponse.json();
      setAddItemResponse(result);
      console.log("Add Item Response:", result);
    } catch (error) {
      setError(error.message);
      alert(`Error during adding item: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center my-10">
        Vica Task
      </h1>

      {/* Register Section */}
      <div className="endpoint register ml-10 my-10">
        <h1>Register POST Method</h1>
        <h2>Endpoint: https://vica.website/api/register</h2>
        <div className="flex">
          <div className="request-body">
            {/* <img src={image} alt="" /> */}
            <h1>Request Body:</h1>
            <div className="flex">
              <h3>first_name: </h3> <p>next</p>
            </div>
            <div className="flex">
              <h3>last_name: </h3> <p>js</p>
            </div>
            <div className="flex">
              <h3>user_name: </h3> <p>next_js</p>
            </div>
            <div className="flex">
              <h3>email: </h3> <p>nextjs@gmail.com</p>
            </div>
            <div className="flex">
              <h3>password: </h3> <p>123123123</p>
            </div>
            <div className="flex">
              <h3>password_confirmation: </h3> <p>123123123</p>
            </div>
          </div>
          <div className="mr-10">
            <button
              onClick={registerEndpoint}
              className="border p-3 rounded bg-white"
            >
              Send register request
            </button>
          </div>
          <div className="bg-black text-white p-3">
            <h1 className="mb-5">Response</h1>
            {loading ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>Error: {error}</h2>
            ) : (
              <h2>{JSON.stringify(registerResponse)}</h2>
            )}
          </div>
        </div>
      </div>

      <div className="endpoint login ml-10 my-10">
        <h1>Login POST Method</h1>
        <h2>Endpoint: https://vica.website/api/login</h2>
        <div className="flex">
          <div className="request-body">
            <h1>Request Body:</h1>
            <div className="flex">
              <h3>email: </h3> <p>mohammed.alkordy2@gmail.com</p>
            </div>
            <div className="flex">
              <h3>password: </h3> <p>123123123</p>
            </div>
          </div>
          <div className="mr-10">
            <button
              onClick={handleLogin}
              className="border p-3 rounded bg-white"
            >
              Send login request
            </button>
          </div>
          <div className="bg-black text-white p-3">
            <h1 className="mb-5">Response</h1>
            {loading ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>Error: {error}</h2>
            ) : (
              <h2>{JSON.stringify(loginResponse)}</h2>
            )}
          </div>
        </div>
      </div>
      {/* Get items Section */}
      <div className="endpoint show ml-10 my-10">
        <h1>Show all items GET Method</h1>
        <h2>Endpoint: https://vica.website/api/items</h2>
        <div className="flex">
          <div className="request-body">
            <h1>AUTHORIZATION Bearer Token</h1>
            <div className="flex">
              <h3>Token: </h3> <p>{token}</p>
            </div>
            <h1>Request HEADERS:</h1>
            <div className="flex">
              <h3>Accept: </h3> <p>application/json</p>
            </div>
          </div>
          <div className="mr-10">
            <button
              onClick={showAllItems}
              className="border p-3 rounded bg-white"
            >
              Send getItems request
            </button>
          </div>
          <div className="bg-black text-white p-3">
            <h1 className="mb-5">Response</h1>
            {loading ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>Error: {error}</h2>
            ) : (
              <h2>
                {itemsResponse ? JSON.stringify(itemsResponse) : "No items yet"}
              </h2>
            )}
          </div>
        </div>
      </div>
      <div className="endpoint add ml-10 my-10">
        <h1>Add item POST Method</h1>
        <h2>Endpoint: https://vica.website/api/items</h2>
        <div className="flex">
          <div className="request-body">
            <h1>AUTHORIZATION Bearer Token</h1>
            <div className="flex">
              <h3>Token: </h3> <p>{token}</p>
            </div>
            <h1>Request HEADERS:</h1>
            <div className="flex">
              <h3>Accept: </h3> <p>application/json</p>
            </div>
            <h1>Request Body:</h1>
            <div className="flex">
              <h3>name: </h3> <p>samsung s20</p>
            </div>
            <div className="flex">
              <h3>price: </h3> <p>2451</p>
            </div>

            <div className="flex">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange} // Handle image file selection
              />
            </div>
          </div>
          <div className="mr-10">
            <button onClick={addItem} className="border p-3 rounded bg-white">
              Send getItems request
            </button>
          </div>
          <div className="bg-black text-white p-3">
            <h1 className="mb-5">Response</h1>
            {loading ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>Error: {error}</h2>
            ) : (
              <h2>
                {addItemResponse
                  ? JSON.stringify(addItemResponse)
                  : "No response yet"}
              </h2>
            )}{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
