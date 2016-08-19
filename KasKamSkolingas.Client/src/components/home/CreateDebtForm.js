import React from 'react';
import {reduxForm} from 'redux-form';
import { createDebtFormSubmit } from '../../actions';

// class CreateDebtForm extends React.Component {
//   render() {
//     const {fields: {user, amount, whatFor}, handleSubmit} = this.props;
//     return (
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>User</label>
//           <input type="text" placeholder="User" {...user} />
//         </div>
//         <div>
//           <label>Amount</label>
//           <input type="number" placeholder="Amount" {...amount} />
//         </div>
//         <div>
//           <label>What for</label>
//           <input type="text" placeholder="What for" {...whatFor} />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     );
//   }
// }

const CreateDebtForm = (props) => {
  const {fields: {user, amount, whatFor}, index} = props;
  const handleSubmit = () =>
    createDebtFormSubmit('test', user, amount, whatFor, index);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User</label>
        <input type="text" placeholder="User" {...user} />
      </div>
      <div>
        <label>Amount</label>
        <input type="number" placeholder="Amount" {...amount} />
      </div>
      <div>
        <label>What for</label>
        <input type="text" placeholder="What for" {...whatFor} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

CreateDebtForm.propTypes = {
  index: React.PropTypes.number.isRequired,
  fields: React.PropTypes.object.isRequired
};

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'createDebt',                   // a unique name for this form
  fields: ['user', 'amount', 'whatFor'] // all the fields in your form
})(CreateDebtForm);