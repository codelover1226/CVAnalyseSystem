import React, { useState, useRef } from 'react';

export const Home = () => {
  const [progress, setProgress] = useState(0);
  const [isJDModalOpen, setIsJDModalOpen] = useState(false)
  const [isCVModalOpen, setIsCVModalOpen] =  useState(false)
  const [description, setDescription] = useState("")
  const [tempDescription, setTempDescription] = useState("")
  const [tempFile, setTempFile] = useState(null)
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})

  const setUploadFile = () => {
    if (!file) {
      setErrors(prevErrors => ({
      ...prevErrors,
        fileMustBeSelected: true,
      }));
    } else {
      setErrors({});
      setIsCVModalOpen(false)
    }
  }
  const setDescriptionText = () => {
    if (tempDescription.length < 300) {
      setErrors(prevErrors => ({
      ...prevErrors,
        descriptionTooLong: true,
      }));
    } else {
      setErrors({});
      setIsJDModalOpen(false)
      setDescription(tempDescription)
    }
  }

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };
  const fileInputRef = useRef(null);
  const onChangeText = (e) => {
    setTempDescription(e.target.value)
  }
  const onClickOpenModal = (id) =>{
    if(id === "jd"){
      setIsJDModalOpen(true)
      setIsCVModalOpen(false)
      setErrors({})
    } else {
      setIsJDModalOpen(false)
      setIsCVModalOpen(true)
      setErrors({})
    }
    console.log(description.length)
  }
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <>
      {isJDModalOpen? 
        <div className='absolute top-0 right-0 left-0 bottom-0 z-10 bg-secondBg'>
          <div className='mt-[150px] w-full flex'>
            <div className='max-w-[737px] w-full bg-white relative mx-auto'>
              <div className='w-full h-[699px] relative px-12 pt-48'>
                <textarea 
                  type='text'
                  onChange={onChangeText}
                  value={tempDescription}
                  placeholder={`Insert your job description here. You don't need to worry about the layout or structure. Just include the essence of the job, tasks, deliverables, requirements, qualifications, skills, etc.`}
                  className='outline-none w-full h-[350px]'
                />
                {errors?.descriptionTooLong ? 
                  <p className='text-red-600'>
                    Job description should be more than 300 letters.
                  </p>
                :
                  <></>
                }
                <div className='absolute bottom-0 left-0 right-0 h-[100px] flex py-6'>
                  <div className='max-w-[440px] mx-auto flex space-x-6'>
                    <button className='bg-black text-white w-[174px] py-2' onClick={setDescriptionText}>
                      OK
                    </button>
                    <button className='bg-secondBg text-white w-[174px] py-2' onClick={() => setIsJDModalOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <>
        </>
      }
      {isCVModalOpen? 
        <div className='absolute top-0 right-0 left-0 bottom-0 z-10 bg-secondBg'>
          <div className='mt-[150px] w-full flex'>
            <div className='max-w-[737px] w-full bg-white relative mx-auto'>
              <div className='w-full h-[699px] relative px-12 pt-48'>
                
                <div className='my-6'>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    style={{ display: 'none' }} // Hide the file input
                  />
                </div>
                <div className='w-full flex'>
                  <button
                    onClick={handleButtonClick}
                    className='border-[1px] border-black px-4 py-1 mx-auto'
                  >
                    Open Files
                  </button>
                </div>
                {errors?.fileMustBeSelected ? 
                  <p className='text-red-600 w-full text-center pt-[28px]'>
                    Please select File
                  </p>
                :
                  <></>
                }
                <div className='absolute bottom-0 left-0 right-0 h-[100px] flex py-6'>
                  <div className='max-w-[440px] mx-auto flex space-x-6'>
                    <button className='bg-black text-white w-[174px] py-2' onClick={setUploadFile}>
                      OK
                    </button>
                    <button className='bg-secondBg text-white w-[174px] py-2' onClick={() => setIsCVModalOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <>
        </>
      }
      <div className='w-full flex relative z-0'>
        <div className='max-w-[1440px] md:flex mx-auto'>
          <div className='w-full pt-[140px]'>
            <p className='text-6xl font-bold text-white'>
              Evaluate a CV of a candidate with AI
            </p>
          </div>
          <div className='w-full flex'>
            <div className='max-w-[250px] mx-auto'>
              <button 
                className={`mx-auto py-[17.5px] px-[16px] w-[240px] h-[107px] ${description === "" ? "bg-secondBg" : "bg-gradient-to-b from-darkgreen to-green"}  text-white text-3xl my-6`}
                onClick={() => onClickOpenModal("jd")}
              >
                {!description? 'Paste your job description':'Job Description Pasted!'}
              </button>
              <button
                className={`mx-auto py-[17.5px] px-[16px] w-[240px] h-[107px] items-center ${!file ? "bg-secondBg" : "bg-gradient-to-b from-darkgreen to-green"}  text-white text-3xl my-6`}
                onClick={() => onClickOpenModal("cv")}
              >
                {!file? 'Upload Some CV':'CV Uploaded!'}
              </button>
              <button className='py-[4px] w-[240px] bg-green text-3xl my-6 text-white h-[107px]'>
                  Analyze
                <br></br>
                <span className='text-xl'>
                  (10 tokens)
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
