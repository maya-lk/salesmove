import React from 'react';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import { connect } from 'react-redux';
import Select from 'react-virtualized-select';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Swal from 'sweetalert2';

import API from '../../lib/api';
import { CountryOptionRenderer } from '../../lib/utils';

import ImagePreview from '../../components/image-preview/image-preview.component';
import LoadingScreen from '../../components/loading/loading.component';

import { selectServiceCategory , selectCountyObj } from '../../redux/common/common.selectors';
import { selectAdPostingLoading } from '../../redux/advertisements/advertisements.selectors';
import { selectUserDetails , selectEditAd } from '../../redux/user/user.selectors';

import { setAdPostingLoading } from '../../redux/advertisements/advertisements.actions';

import './edit-ad.styles.scss';
import 'react-day-picker/lib/style.css';

class EditAdvertisement extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            postID : this.props.editAd[0].ID,
            type : this.props.editAd[0].type,
            title: this.props.editAd[0].title,
            terms : '',
            country : { value : this.props.editAd[0].country, countryFlag : this.props.editAd[0].country_flag },
            specifications : this.props.editAd[0].specifications,
            quantity : this.props.editAd[0].quantity,
            price : this.props.editAd[0].price,
            shippingTerms : this.props.editAd[0].shipping_terms,
            destinationPort : this.props.editAd[0].destination_port,
            otherSpecificRequrements : this.props.editAd[0].other_specific_requrements,
            addDisplayPeriod : new Date(this.props.editAd[0].add_display_period),
            images : this.props.editAd[0].images,
            imagesPreviewUrls : this.props.editAd[0].images,
            imagesID : this.props.editAd[0].imagesID,
            message: '',
            isSubmit : false
        }

        this.handleDayChange = this.handleDayChange.bind(this);
    }

    componentDidMount(){
        const { editAd } = this.props;
        const termIDArr = [];
        editAd[0].terms.map( term => termIDArr.push(term.term_id.toString()) );

        this.setState({ terms : termIDArr });
    }

    handleChange = event => {
        const { name , value } = event.target;
        this.setState({ [name] : value });
    }

    handleMedia = event => {
        this.setState({ images: [...this.state.images, ...event.target.files] });

        let files = Array.from(event.target.files);

        files.forEach((file) => {
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({    
                    imagesPreviewUrls: [...this.state.imagesPreviewUrls, reader.result]
                });
            }
            reader.readAsDataURL(file);
        });
    }

    toggleCheckbox = (event) => {
        const { terms } = this.state;
        const item = event.target.value;
        let newArr = [];
    
        if (!terms.includes(item)) {
            newArr = [...terms, item];
        } else {
          newArr = terms.filter(a => a !== item);
        }
        this.setState({ terms: newArr })
    };

    renderTerms(){
        const { serviceTerms , editAd } = this.props;
        const { terms } = this.state;
        const termIDArr = [];

        editAd[0].terms.map( term => termIDArr.push(term.term_id) ); 

        return (serviceTerms)? serviceTerms.map(term => 
            <FormCheck key={term.ID} className="col-md-6 col-12">
                <FormCheck.Input 
                    type="checkbox" 
                    name="term" 
                    onChange={this.toggleCheckbox} 
                    id={term.ID} 
                    value={term.ID} 
                    defaultChecked={ 
                        (termIDArr.includes(term.ID)) ? true : (terms.includes(term.ID)) ? true : false  
                    } 
                />
                <FormCheck.Label htmlFor={term.ID}>{term.name}</FormCheck.Label>
            </FormCheck>) : ''
    }

    handleDayChange(day) {
        this.setState({ addDisplayPeriod: day });
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { setAdPostingLoading , userDetails } = this.props;        
        const { 
            postID,
            type, 
            title, 
            terms , 
            country, 
            specifications, 
            quantity,
            price,
            shippingTerms, 
            destinationPort, 
            otherSpecificRequrements,
            addDisplayPeriod,
            images,
            imagesID
        } = this.state;

        setAdPostingLoading();

        const formData = new FormData();
        formData.append('postID',postID);
        formData.append('type',type);
        formData.append('title',title);
        formData.append('terms',terms);
        formData.append('country',country.value);
        formData.append('countryFlag',country.flagPath);
        formData.append('specifications',specifications);
        formData.append('quantity',quantity);
        formData.append('price',price);
        formData.append('shippingTerms',shippingTerms);
        formData.append('destinationPort',destinationPort);
        formData.append('otherSpecificRequrements',otherSpecificRequrements);
        formData.append('addDisplayPeriod',addDisplayPeriod);
        formData.append('userID',userDetails.user_id);
        formData.append('imagesID',imagesID);

        var imgLeng = images.length;
        for (let index = 0; index < imgLeng; index++) {
            formData.append('images[]',images[index]);
        }

        API.post("edit-ad", formData ,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => {
            //console.log('response' , response.data);
            this.setState({ message : response.data });
            setAdPostingLoading();
            Swal.fire({
                icon: 'success',
                title: 'Good job!',
                text: 'You have Successfully edited Advertisement.',
            });
        }).catch(err => {
            //console.log('err' , err);
        });

    }

    render(){
        const { countries , isLoading } = this.props;
        const { imagesPreviewUrls , message , type } = this.state;

        return(
            <div className="postNewAdWrap">
                {
                    (isLoading)?
                    (<LoadingScreen />)
                    : ''
                }
                <div className="container">
                    
                    {
                        (message.status)?
                        (<div className="alert alert-success" role="alert">{message.message}</div>)
                        : (<div className="alert alert-danger" role="alert">{message.message}</div>)
                    }

                    <h1>Post New Advertisement</h1>
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <Form.Check
                                type="radio"
                                label="Buy"
                                id="want"
                                name="type"
                                onChange={this.handleChange}
                                value="Buy"
                                checked={(type === 'Buy') ? true : false}
                            />
                            <Form.Check
                                type="radio"
                                label="Sell"
                                id="offer"
                                name="type"
                                onChange={this.handleChange}
                                value="Sell"
                                checked={(type === 'Sell') ? true : false}
                            />
                        </div>

                        <div className="form-group">
                            <label>Advertisement Title</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="title"
                                onChange={this.handleChange}
                                value={this.state.title}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Name of  Product or sevices</label>
                            <div className="d-flex flex-wrap">{this.renderTerms()}</div>
                        </div>

                        <div className="form-group">
                            <label>The County/Countries we sell /buy</label>
                            <Select
                                labelKey='value'
                                onChange={(country) => (country) ? this.setState({ country }) : this.setState({ country : '' })}
                                optionRenderer={CountryOptionRenderer}
                                options={countries}
                                value={this.state.country}
                                valueKey='value'
                                name="country"
                                placeholder="Country"
                            />
                        </div>

                        <div className="form-group">
                            <label>Specifications (Size,Materials, Packaging Terms etc)</label>
                            <textarea 
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.specifications}
                                name="specifications"
                            />
                        </div>

                        <div className="form-group">
                            <label>Quantity</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="quantity"
                                onChange={this.handleChange}
                                value={this.state.quantity}
                            />
                        </div>

                        <div className="form-group">
                            <label>Price per Unit</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="price"
                                onChange={this.handleChange}
                                value={this.state.price}
                            />
                        </div>

                        <div className="form-group">
                            <label>Shipping Terms</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="shippingTerms"
                                onChange={this.handleChange}
                                value={this.state.shippingTerms}
                            />
                        </div>

                        <div className="form-group">
                            <label>Shipping/Destination Port</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="destinationPort"
                                onChange={this.handleChange}
                                value={this.state.destinationPort}
                            />
                        </div>

                        <div className="form-group">
                            <label>Other Specific Requirements</label>
                            <textarea 
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.otherSpecificRequrements}
                                name="otherSpecificRequrements"
                            />
                        </div>

                        <div className="form-group">
                            <label>Add Display Period</label>
                            <DayPickerInput 
                                onDayChange={this.handleDayChange} 
                                value={this.state.addDisplayPeriod}
                            />
                        </div>

                        <div className="form-group">
                            <label>Images</label>
                            <div className="imagePreviewWrap">
                                {
                                    (imagesPreviewUrls)?
                                    imagesPreviewUrls.map( (image , idx) => <ImagePreview 
                                        key={idx} 
                                        image={image} 
                                        /> )
                                    : ''
                                }
                            </div>
                            <input type="file" name="images" id="images" className="inputfile" onChange={this.handleMedia} multiple/>
                            <label htmlFor="images"><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg></figure> <span>Choose images&hellip;</span></label>
                        </div>

                        <div className="form-group text-right btnsWrap">
                            <input type="submit" value="Update" className="btn submitBtn"/>
                        </div>

                    </form>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state , ownProps) => ({
    editAd : selectEditAd(parseInt(ownProps.match.params.editId))(state),
    serviceTerms : selectServiceCategory(state),
    countries : selectCountyObj(state),
    isLoading : selectAdPostingLoading(state),
    userDetails: selectUserDetails(state)
});

const mapDispatchToProps = dispatch => ({
    setAdPostingLoading : () => dispatch(setAdPostingLoading())
})

export default connect(mapStateToProps , mapDispatchToProps)(EditAdvertisement);