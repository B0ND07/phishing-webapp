import { useState } from "react";
import "./PrimaryBody.css";
import PhishGif from "../../assets/Phishing-account.gif";
import { useNavigate } from "react-router-dom";
const axios = require("axios");

//-------------------------------------------------------------------------

// Send post request and returns probability value
function get_Prediction(url, showProgress, navigate) {

  if (url.length <= 5) {
    console.log("URL provided is less than 5 characters !");
    return;
  }

  // Lowercase the string
  url = url.toLowerCase();

  // Make progressbar visible
  showProgress(true);

  const api_url = "https://phishr-api.up.railway.app/predict";

  // No need to convert to json string
  var data = { url: url };

  console.log("Sending post request !");

  axios
    .post(api_url, data)
    .then((response) => {
      // handle success
      const data = response.data;
      console.log("Request is Sucessful !");
      console.log(data);
      const proba = data["prediction"];
      if (proba > 60) {
        console.log("Proba > 60 !");
      }

      // Make progressbar invisible
      showProgress(false);

      // Navigate to /result
      navigate("/result", { state: { inputUrl: url, url_score: proba } });
    })
    .catch((error) => {
      // handle error
      console.log("Request is NOT Sucessful !");
      console.log(error);
      // Make progressbar invisible
      showProgress(false);
      window.alert("Network Error Occured ! Try again.");
    });
}

//-------------------------------------------------------------------------

export function PrimaryBody(props) {
  const [input_Url, setUrl] = useState("");
  const showProgress = props.showProgress;
  const navigate = useNavigate();

  return (
    <>
      <p className="font-light max-sm:mx-3 max-sm:text-xl sm:text-2xl md:text-4xl mt-8 text-center">
      Stay vigilant against phishing attacks to avoid getting hooked again. ! 👮‍♂️
      </p>

      <p className="font-normal mt-1 text-center text-gray-500 text-sm sm:text-lg mx-7">
        Prevent yourself from falling into a phishing trap that affects millions every year. Safeguard your digital life with our app for foolproof protection.
      </p>

      <img src={PhishGif} alt="Phishing Gif"
        className="max-sm:w-[50%] sm:w-[40%] md:w-[27%] max-md:ml-[30%] md:ml-[40%] lg:w-[24%] mt-3"/>

      <div className="flex max-md:flex-col md:flex-row mt-5">

        <input type="text" placeholder="Enter website address or URL (eg- www.Facebook.com)" onChange={(event) => setUrl(event.target.value)}
        className="border-2 border-gray-600 rounded-sm text-xs min-[550px]:text-sm  md:text-lg  px-1 py-3 md:px-3 md:py-3 
       mx-10 md:mx-3 min-[550px]:mx-20 md:w-[60%] lg:w-[50%] md:ml-[12%] lg:ml-[20%]"/>

        <button
          onClick={() => get_Prediction(input_Url, showProgress, navigate)}
          className="px-4 py-3 text-center w-fit bg-amber-400 hover:bg-amber-500 active:bg-amber-300 max-md:mt-5 max-sm:ml-[38%] sm:max-md:ml-[40%]
          text-white font-extrabold text-roboto rounded">
          PREDICT
        </button>

      </div>
    </>
  );
}
