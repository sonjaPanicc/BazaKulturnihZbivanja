import React, { useState, useEffect } from "react";
import {
    MDBContainer,
    MDBCol,
    MDBTextArea,
    MDBIcon,
    MDBSpinner,
    MDBRow,
    MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getCommentsOnEvent,
    editComment,
    deleteComment,
} from "../redux/features/postsSlice";
import { toast } from "react-toastify";

const initialState = {
    edited: false,
    commentId: "",
    comment: "",
};

const Comments = () => {

    const [editData, setEditData] = useState(initialState);

    const { user } = useSelector((state) => ({ ...state.auth }));
    const { comments, loading } = useSelector((state) => ({ ...state.posts }));
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getCommentsOnEvent(id));
    }, [id]);

    const handleEdit = (commentId, comment) => {
        setEditData({ edited: true, commentId: commentId, comment: comment });
    };

    const onCommentChange = (e) => {

        let { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const submitEdit = (e) => {

        e.preventDefault();

        if (editData.comment) {
            dispatch(editComment({ editData, toast }));
            dispatch(getCommentsOnEvent(id));
        }
        setEditData(initialState);
    };

    const handleDelete = (commentId) => {

        if (window.confirm("Are you sure you want to delete this comment ?")) {
            dispatch(deleteComment({ commentId, toast }));
        }
    };

    return (

        <MDBContainer className="md">
            <MDBRow className="mb-3 mt-2">
                <h5>Comments:</h5>
                {comments.length === 0 && (
                    <p> Sadly, there are no comments for this event yet :( </p>
                )}
                <MDBContainer>
                    {comments.map((item) => (
                        <div key={item._id}>
                            <MDBRow>{item.creator} :</MDBRow>
                            <MDBRow>
                                {editData.edited && editData.commentId === item._id ? (
                                    <div>
                                        <MDBTextArea
                                            type="text"
                                            value={editData.comment}
                                            name="comment"
                                            onChange={onCommentChange}
                                            rows={1}
                                        >
                                        </MDBTextArea>
                                        <MDBBtn style={{ width: "100%" }} className="mt-2" type="submit" onClick={submitEdit}>
                                            {loading && (
                                                <MDBSpinner
                                                    size="sm"
                                                    role="status"
                                                    tag="span"
                                                    className="me-2"
                                                />
                                            )}
                                            Edit comment
                                        </MDBBtn>
                                    </div>
                                ) : (
                                    <MDBCol>{item.comment}</MDBCol>
                                )}
                                {user?.result?._id === item.creatorId && !editData.edited && (
                                    <div>
                                        <MDBBtn className="mt-1" tag="a" color="none">
                                            <MDBIcon
                                                fas
                                                icon="edit"
                                                style={{ color: "#55acee", marginLeft: "10px" }}
                                                size="lg"
                                                onClick={() => handleEdit(item._id, item.comment)}
                                            />
                                        </MDBBtn>
                                        <MDBBtn className="mt-1" tag="a" color="none">
                                            <MDBIcon
                                                fas
                                                icon="trash"
                                                style={{ color: "#dd4b39" }}
                                                size="lg"
                                                onClick={() => handleDelete(item._id)}
                                            />
                                        </MDBBtn>
                                    </div>
                                )}
                            </MDBRow>
                            <br />
                        </div>
                    ))
                    }
                </MDBContainer >
            </MDBRow >
        </MDBContainer >
    );
};

export default Comments;
