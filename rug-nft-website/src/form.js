import React from 'react'
import emailjs from 'emailjs-com';
import { useRef } from 'react';

const Form = ( { bigNft }) => {
const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_wvg8pw2', 'template_nitjx59', form.current, '2R90rlu33705ETVdh')
    e.target.reset()
  };


  return (
    <div className='py-4'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-7'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Basic Information</h4>
                        </div>
                        <div className='card-body'>
                            <form ref={form} onSubmit={sendEmail} className='row'>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>First Name</label>
                                        <input type="text" name="firstname" className='form-control' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Last Name</label>
                                        <input type="text" name="lastname" className='form-control' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Email address</label>
                                        <input type="text" name="email" className='form-control' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Phone number</label>
                                        <input type="text" name="phone" className='form-control' />
                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <div className='form-group mb-3'>
                                        <label>Full address</label>
                                        <input type="text" name="address" className='form-control' />
                                    </div> 
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Postal Code</label>
                                        <input type="text" name="postal-code" className='form-control' />
                                    </div> 
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Country</label>
                                        <input type="text" name="country" className='form-control' />
                                    </div> 
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Nft Image</label>
                                        <img src={bigNft} name="img" className='form-control' />
                                    </div> 
                                </div>
                                <button type='submit' className=' btn btn-primary'>Confirm Order</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Form