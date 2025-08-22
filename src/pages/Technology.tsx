import "../App.css";


const Electronic = () => {
  return (
    <>
      <div className="imgconstructor min-h-screen flex items-center justify-center">
        <div className="flex card flex-col container sm:w-100 md:w-120 lg:w-140 gap-3">
          <div className="card-body bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <h2 className="card-title text-2xl text-gray-800 mb-6 text-center">
              Tecnología
            </h2>
            
                <img
                  src="src/assets/it_icon.png"
                  className="w-24 h-24"
                  alt="it_icon"
                />
                <p className="text-2xl text-gray-800 mt-2">Tecnología</p>
             
         
          </div>
        </div>
      </div>
    </>
  );
};
export default Electronic;