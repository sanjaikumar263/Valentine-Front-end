import React, { useEffect, useState } from 'react'

const ViewPage = () => {
  const [data, setData] = useState<any>(null);
  const [yesClicked, setYesClicked] = useState(false);
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noClickCount, setNoClickCount] = useState(0);
 
  const id = window.location.pathname.split("/").pop();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/valentine/${id}`);
        const result = await response.json();
        setData(result);
        console.log("Fetched data:", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1);
    
    // Decrease No button size
    setNoButtonSize(prev => Math.max(prev - 0.1, 0.4));
    
    // Increase Yes button size
    setYesButtonSize(prev => prev + 0.15);
    
    // Move No button to random position
    const randomTop = Math.random() * 80 - 40;
    const randomLeft = Math.random() * 80 - 40;
    setNoButtonPosition({ top: randomTop, left: randomLeft });
  };

  const handleYesClick = () => {
    setYesClicked(true);
  };

  if (yesClicked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-red-200 flex items-center justify-center p-4">
        <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h1 className="text-4xl font-bold text-pink-600 mb-4">Yay! 💕</h1>
          <p className="text-2xl text-gray-700 mb-4">I knew you'd say yes!</p>
          <div className="text-6xl mb-4">❤️</div>
          <p className="text-lg text-gray-600">Happy Valentine's Day{data?.name ? `, ${data.name}` : ''}! 💖</p>
          {data?.image && (
            <div className="mt-6">
              <img 
                src={data.image} 
                alt="Valentine" 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-red-200 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">  
        <h1 className="text-3xl font-bold text-pink-600 mb-2">
          💖 Hi {data?.name || 'Beautiful'} 💖
        </h1>
        <h1 className="text-3xl font-bold text-pink-600 mb-6">
          💖 A Valentine for You 💖
        </h1>
        
        
        {data?.description && (
          <div className="mb-6">
            <p className="text-lg text-gray-700 leading-relaxed">{data.description}</p>
          </div>
        )}
        
        <p className="text-2xl text-gray-800 mb-8 font-semibold">
          Will you be my Valentine? 💝
        </p>
        
       {/* Buttons Container */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-8 w-full relative">
          
          {/* YES BUTTON */}
          <div
            style={{
              transform: `scale(${yesButtonSize})`,
              transition: "transform 0.3s ease",
              zIndex: 20
            }}
          >
            <button
              onClick={handleYesClick}
              className="bg-pink-500 hover:bg-pink-600 text-white
                        font-bold py-3 px-8 rounded-full
                        focus:outline-none focus:ring-4
                        focus:ring-pink-300 shadow-lg hover:shadow-xl transition-colors"
            >
              Yes 💕
            </button>
          </div>

          {/* NO BUTTON */}
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800
                      font-bold py-3 px-8 rounded-full shadow-md
                      transition-all duration-300 ease-in-out"
            onClick={handleNoClick}
            style={{
              // We remove 'absolute', 'top', and 'left' so it starts in the flow.
              // We use translate to move it away from its natural position.
              transform: `scale(${noButtonSize}) translate(${noButtonPosition.left}px, ${noButtonPosition.top}px)`,
            }}
          >
            No
          </button>
          
        </div>
      
        
        
        {/* Fun Messages */}
        {noClickCount > 0 && noClickCount < 3 && (
          <p className="text-sm text-pink-500 mt-6 italic animate-pulse">
            Are you sure? 🥺
          </p>
        )}
        {noClickCount >= 3 && noClickCount < 5 && (
          <p className="text-sm text-pink-500 mt-6 italic animate-pulse">
            The "No" button is running away! 😄
          </p>
        )}
        {noClickCount >= 5 && (
          <p className="text-sm text-pink-500 mt-6 italic animate-pulse">
            Just click "Yes" already! 😊💕
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewPage;  