import { Modal } from "antd";
import moment from "moment";

import { currencyFormatter } from "../../actions/stripe";

const OrderModal = ({ session, orderedBy, showModal, setShowModal,to,from,bed }) => {
  return (
    <Modal
      visible={showModal}
      title="Order payment info"
      onCancel={() => setShowModal(!showModal)}

    >
      <p>Rooms: {bed}</p>
      <p>From: {moment(from).format("Do MMMM YYYY")}</p>
      <p>To: {moment(to).format("Do MMMM YYYY")}</p>
      <p>Payment status: {session.payment_status}</p>
      <p>
        Amount total: { currencyFormatter({
                    amount: session.amount_total || 0,
                    currency: session.currency.toUpperCase(),
                  })}
      </p>
      <p>Customer: {orderedBy.name}</p>
    </Modal>
  );
};

export default OrderModal;
