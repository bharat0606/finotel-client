import CabForm from "./CabForm";
import CabsList from "./CabsList";

const CabContainer = () => { 

  const notConnected = () => (
    <div className="payment-container">
      <CabForm/>
      <CabsList/>
    </div>
  );

  return (
      
    <>
    <div className="container-fluid bg-secondary p-5 cab-banner">
    </div>
      
         {notConnected()}

    </>
  );
};

export default CabContainer;
