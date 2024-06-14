import React, { useState, useRef } from 'react';

export default function CVPage () {
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
      setDescription(description)
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
          <div className='w-full flex'>
            <div className='max-w-[370px] mx-auto text-center'>
              <p className='text-white text-3xl'>
                Add new candidates
              </p>
              <p className='pt-10 pb-6 text-white'>
                Choose a role for CV evaluation from current jobs:
              </p>
              <select className='p-4 text-black outline-none focus-visible:outline-none w-[240px] mt-2 mb-6 rounded-lg'>
                <option>Frontend Developer</option>
              </select>
              
              <button 
                className='w-full bg-white p-2 text-black outline-none focus-visible:outline-none rounded-md'
                onClick={() => onClickOpenModal("jd")}
              >
                {!description? '...or Paste a new Job description':'Job Description Pasted!'}
              </button>
              <button
                className={`mx-auto p-4 w-[240px] font-bold text-center bg-white text-black text-xl my-6`}
                onClick={() => onClickOpenModal("cv")}
              >
                {!file? 'Upload new CVs':'CV Uploaded!'}
              </button>
              <button className='py-[4px] w-[240px] bg-green text-xl my-6 text-white font-bold'>
                  Analyze
                <br></br>
                <span className='text-sm'>
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
