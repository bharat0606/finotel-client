import { Modal } from "antd";
import moment from "moment";

import { currencyFormatter } from "../../actions/stripe";
import { DATE_WITH_MONTH } from "../../constants";

const OrderModal = ({ session, orderedBy, showModal, setShowModal,to,from,bed }) => {
  return (
    <Modal
      visible={showModal}
      title="Order payment info"
      onCancel={() => setShowModal(!showModal)}

    >
      <p><b>Rooms:</b> {bed}</p>
      <p><b>From:</b> {moment(from).format(DATE_WITH_MONTH)}</p>
      <p><b>To:</b> {moment(to).format(DATE_WITH_MONTH)}</p>
      <p><b>Payment status:</b> {session.payment_status}</p>
      <p>
      <b>Amount:</b> { currencyFormatter({
                    amount: session.amount_total,
                    currency: session.currency.toUpperCase(),
                  })}
      </p>
      <p>
      <b>Discount:</b> { currencyFormatter({
                    amount: session.discount,
                    currency: session.currency.toUpperCase(),
                  })}
      </p>
      <p><b>Customer:</b> {orderedBy.name}</p>
    </Modal>
  );
};

export default OrderModal;
