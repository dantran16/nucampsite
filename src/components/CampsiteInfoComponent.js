import React from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	Breadcrumb,
	BreadcrumbItem,
} from "reactstrap";
import {
  Link
} from 'react-router-dom'

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

const RenderComments = ({ comments }) => {
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
					<RenderComments comments={props.comments} />
				</div>
			</div>
		);
	} else {
		return <div />;
	}
};

export default CampsiteInfo;
