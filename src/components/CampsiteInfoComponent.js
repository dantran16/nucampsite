import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	Breadcrumb,
  BreadcrumbItem,
  Button, 
  Modal,
  Label,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import {
  Link
} from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len)
const minLength = len => val => val && (val.length >= len)

class CommentForm extends Component{
  constructor(props) {
    super(props);
    
		this.state = {
      isModalOpen: false,
      author: '',
      text: '',
      touched: {
        author: false,
        text: false
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleModal = this.toggleModal.bind(this);
	}

  toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

  handleSubmit(values) {
    this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text)
    this.toggleModal()
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggleModal} outline={true}><i className="fa fa-pencil fa-lg" /> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select defaultValue={1} className="form-control" model=".rating" id="rating" name="rating">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label htmlFor="author">Your Name</Label>
                <Control.text className="form-control" placeholder="Your Name" model=".author" id="author" name="author"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15)
                  }}/>
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div" 
                  messages={{
                    required: 'Required',
                    minLength: 'Must be at least 2 characters',
                    maxLength: 'Must be at l5 characters or less'
                  }}    
              />
              </div>
              <div className="form-group">
                <Label htmlFor="text">Comment</Label>
                <Control.textarea rows={6} className="form-control" model=".text" id="text" name="text"
                  validators={{
                    required,
                    minLength: minLength(1),
                  }}></Control.textarea>
                <Errors
                  className="text-danger"
                  model=".text"
                  show="touched"
                  component="div" 
                  messages={{
                    required: 'Required',
                    minLength: 'Must be at least 1 character',
                  }}
              /> 
              </div>
              <div className="form-group">
                <Button type="submit" color="primary"> Submit </Button>
              </div>
            </LocalForm>
          </ModalBody>
          
        </Modal>
      </React.Fragment>
    )
  }
}

const RenderCampsite = ({ campsite }) => {
	return (
		<div className="col-md-5 m-1">
			<Card>
				<CardImg width="100%" top src={campsite.image} alt={campsite.name} />
				<CardBody>
					<CardText>{campsite.description}</CardText>
				</CardBody>
			</Card>
		</div>
	);
};

const RenderComments = ({ comments, addComment, campsiteId }) => {
	if (comments) {
		return (
			<div className="col-md-5 m-1">
				<h4>Comments</h4>
				{comments.map((comment) => {
					return (
						<div className="mb-3" key={comment.id}>
							<div>{comment.text}</div>
							<div>
								-- {comment.author},{" "}
								{new Intl.DateTimeFormat("en-US", {
									year: "numeric",
									month: "short",
									day: "2-digit",
								}).format(new Date(Date.parse(comment.date)))}
							</div>
						</div>
					);
        })}
        <CommentForm campsiteId={campsiteId} addComment={addComment} />
			</div>
		);
	}
	return <div />;
};

const CampsiteInfo = (props) => {
	if (props.campsite) {
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<Breadcrumb>
							<BreadcrumbItem>
								<Link to="/home">Directory</Link>
							</BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
						</Breadcrumb>
						<h2>{props.campsite.name}</h2>
						<hr />
					</div>
				</div>
				<div className="row">
					<RenderCampsite campsite={props.campsite} />
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            campsiteId={props.campsite.id} />
				</div>
			</div>
		);
	} else {
		return <div />;
	}
};

export default CampsiteInfo;
