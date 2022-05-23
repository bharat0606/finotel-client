import { Modal } from "antd";
import { currencyFormatter } from "../../actions/stripe";

const OrderModal = ({ session, orderedBy, showModal, setShowModal,bookingDetails }) => {
  return (
    <Modal
      visible={showModal}
      title="Order payment info"
      onCancel={() => setShowModal(!showModal)}

    >
      <p>Beds: {bookingDetails?.bed}</p>
      <p>From: {bookingDetails?.from}</p>
      <p>To: {bookingDetails?.to}</p>
      <p>Payment status: {session.payment_status}</p>
      <p>
        Amount total: { currencyFormatter({
                    amount: session.amount_total || 0,
                    currency: session.currency.toUpperCase(),
                  })}
      </p>
      {/* <p>Stripe customer id: {session.customer}</p> */}
      <p>Customer: {orderedBy.name}</p>
    </Modal>
  );
};

export default OrderModal;
